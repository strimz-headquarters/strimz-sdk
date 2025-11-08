/**
 * API Client Service
 * Handles all HTTP requests to the Strimz API
 */

import axios, { AxiosInstance, AxiosError } from 'axios'
import type {
  PaymentSession,
  PaymentOptions,
  Transaction,
  Environment,
  APIResponse
} from '../types'
import {
  createError,
  NetworkError,
  AuthenticationError,
  RateLimitError,
  StrimzError
} from '../utils/errors'
import { getApiUrl, buildApiEndpoint } from '../utils/url'

// ============================================================================
// API Client Configuration
// ============================================================================

export interface APIClientConfig {
  apiKey: string
  environment: Environment
  apiUrl?: string
  timeout?: number
  maxRetries?: number
}

// ============================================================================
// API Client Class
// ============================================================================

export class APIClient {
  private client: AxiosInstance
  private apiKey: string
  private environment: Environment
  private maxRetries: number

  constructor(config: APIClientConfig) {
    this.apiKey = config.apiKey
    this.environment = config.environment
    this.maxRetries = config.maxRetries || 3

    const baseURL = getApiUrl(config.environment, config.apiUrl)

    this.client = axios.create({
      baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Strimz-SDK-Version': '1.0.0'
      }
    })

    this.setupInterceptors()
  }

  /**
   * Setup axios interceptors for error handling and retries
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to prevent caching
        config.params = {
          ...config.params,
          _t: Date.now()
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        return this.handleError(error)
      }
    )
  }

  /**
   * Handle API errors with proper error types
   */
  private async handleError(error: AxiosError): Promise<never> {
    // Network errors
    if (!error.response) {
      throw createError.networkError(error)
    }

    const { status, data } = error.response as any

    // Rate limiting
    if (status === 429) {
      const retryAfter = error.response.headers['retry-after']
      throw createError.rateLimitExceeded(
        retryAfter ? parseInt(retryAfter, 10) : undefined
      )
    }

    // Authentication errors
    if (status === 401) {
      if (data?.code === 'EXPIRED_API_KEY') {
        throw createError.expiredApiKey()
      }
      throw new AuthenticationError(data?.message || 'Authentication failed')
    }

    // Session errors
    if (status === 404 && data?.code === 'SESSION_NOT_FOUND') {
      throw createError.sessionNotFound(data?.details?.sessionId)
    }

    if (status === 400 && data?.code === 'SESSION_EXPIRED') {
      throw createError.sessionExpired()
    }

    // Generic API errors
    if (data?.code && data?.message) {
      throw new StrimzError(data.message, data.code, data.details, status)
    }

    // Fallback error
    throw new NetworkError(
      `API request failed with status ${status}`,
      { status, data }
    )
  }

  /**
   * Make a request with automatic retry logic
   */
  private async requestWithRetry<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    retryCount = 0
  ): Promise<T> {
    try {
      const response = await this.client[method](url, data)
      return response.data
    } catch (error) {
      // Only retry on network errors
      if (
        error instanceof NetworkError &&
        retryCount < this.maxRetries
      ) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, retryCount) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.requestWithRetry<T>(method, url, data, retryCount + 1)
      }

      throw error
    }
  }

  /**
   * Create a payment session
   */
  async createPaymentSession(options: PaymentOptions): Promise<PaymentSession> {
    const response = await this.requestWithRetry<APIResponse<PaymentSession>>(
      'post',
      '/sessions/create',
      {
        amount: options.amount,
        currency: options.currency,
        paymentType: options.paymentType,
        interval: options.paymentType === 'subscription' ? options.interval : undefined,
        customerEmail: options.customerEmail,
        successUrl: options.successUrl,
        cancelUrl: options.cancelUrl,
        metadata: options.metadata
      }
    )

    if (!response.success || !response.data) {
      throw new StrimzError(
        response.error?.message || 'Failed to create payment session',
        response.error?.code || 'SESSION_CREATE_FAILED'
      )
    }

    return response.data
  }

  /**
   * Get a payment session by ID
   */
  async getPaymentSession(sessionId: string): Promise<PaymentSession> {
    const response = await this.requestWithRetry<APIResponse<PaymentSession>>(
      'get',
      `/sessions/${sessionId}`
    )

    if (!response.success || !response.data) {
      throw createError.sessionNotFound(sessionId)
    }

    return response.data
  }

  /**
   * Verify a transaction (server-side only)
   */
  async verifyTransaction(transactionId: string): Promise<Transaction> {
    const response = await this.requestWithRetry<APIResponse<Transaction>>(
      'get',
      `/transactions/${transactionId}`
    )

    if (!response.success || !response.data) {
      throw new StrimzError(
        'Failed to verify transaction',
        'TRANSACTION_VERIFY_FAILED'
      )
    }

    return response.data
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<Transaction['status']> {
    const transaction = await this.verifyTransaction(transactionId)
    return transaction.status
  }
}

// ============================================================================
// Factory Functions
// ============================================================================

/**
 * Create an API client instance
 */
export const createAPIClient = (config: APIClientConfig): APIClient => {
  return new APIClient(config)
}
