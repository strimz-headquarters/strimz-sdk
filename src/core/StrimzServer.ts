/**
 * Strimz Server SDK
 * Server-side SDK for transaction verification and webhook handling
 */

import type {
  ServerSDKConfig,
  Transaction,
  WebhookEvent,
  Environment
} from '../types'
import { APIClient, createAPIClient } from '../services/api'
import {
  verifyWebhookSignature,
  constructWebhookEvent
} from '../services/webhook'
import { validate } from '../utils/validation'

// ============================================================================
// Strimz Server SDK Class
// ============================================================================

export class StrimzServer {
  private apiClient: APIClient
  private config: Required<ServerSDKConfig>

  /**
   * Initialize the Strimz Server SDK
   */
  constructor(config: ServerSDKConfig) {
    // Validate configuration
    const validationResult = validate.serverConfig(config)
    if (!validationResult.success) {
      throw new Error(`Invalid server SDK configuration: ${validationResult.error}`)
    }

    // Set default values
    this.config = {
      secretKey: config.secretKey,
      environment: config.environment || 'live',
      apiUrl: config.apiUrl || ''
    }

    // Initialize API client
    this.apiClient = createAPIClient({
      apiKey: this.config.secretKey,
      environment: this.config.environment,
      apiUrl: this.config.apiUrl || undefined
    })
  }

  /**
   * Verify a transaction by ID
   */
  async verifyTransaction(transactionId: string): Promise<Transaction> {
    return this.apiClient.verifyTransaction(transactionId)
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<Transaction['status']> {
    return this.apiClient.getTransactionStatus(transactionId)
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    payload: string,
    signature: string,
    webhookSecret: string
  ): boolean {
    return verifyWebhookSignature(payload, signature, webhookSecret)
  }

  /**
   * Construct and verify webhook event
   */
  constructWebhookEvent<T = any>(
    payload: string | object,
    signature: string,
    webhookSecret: string
  ): WebhookEvent<T> {
    return constructWebhookEvent<T>(payload, signature, webhookSecret)
  }

  /**
   * Get current environment
   */
  getEnvironment(): Environment {
    return this.config.environment
  }

  /**
   * Check if in test mode
   */
  isTestMode(): boolean {
    return this.config.environment === 'test'
  }

  /**
   * Check if in live mode
   */
  isLiveMode(): boolean {
    return this.config.environment === 'live'
  }
}

// ============================================================================
// Standalone Functions (Can be used without instantiating the class)
// ============================================================================

/**
 * Verify webhook signature (standalone function)
 */
export const verifyWebhook = verifyWebhookSignature

/**
 * Construct webhook event (standalone function)
 */
export const constructEvent = constructWebhookEvent

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a new Strimz Server SDK instance
 */
export const createStrimzServer = (config: ServerSDKConfig): StrimzServer => {
  return new StrimzServer(config)
}
