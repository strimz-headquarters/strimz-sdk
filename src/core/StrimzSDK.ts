/**
 * Strimz SDK - Client-Side SDK
 * Main SDK class for browser and client-side usage
 */

import type {
  SDKConfig,
  PaymentOptions,
  PaymentSession,
  Environment
} from '../types'
import { APIClient, createAPIClient } from '../services/api'
import { RedirectService, createRedirectService } from '../services/redirect'
import { validate, validatePaymentOptionsOrThrow } from '../utils/validation'
import { buildCheckoutUrl } from '../utils/url'

// ============================================================================
// Strimz SDK Class
// ============================================================================

export class StrimzSDK {
  private apiClient: APIClient
  private redirectService: RedirectService
  private config: Required<SDKConfig>

  /**
   * Initialize the Strimz SDK
   */
  constructor(config: SDKConfig) {
    // Validate configuration
    const validationResult = validate.sdkConfig(config)
    if (!validationResult.success) {
      throw new Error(`Invalid SDK configuration: ${validationResult.error}`)
    }

    // Set default values
    this.config = {
      publicKey: config.publicKey,
      environment: config.environment || 'live',
      debug: config.debug || false,
      apiUrl: config.apiUrl || ''
    }

    // Initialize services
    this.apiClient = createAPIClient({
      apiKey: this.config.publicKey,
      environment: this.config.environment,
      apiUrl: this.config.apiUrl || undefined
    })

    this.redirectService = createRedirectService(this.config.environment)

    if (this.config.debug) {
      this.log('Strimz SDK initialized', this.config)
    }
  }

  /**
   * Create a payment session and get the session object
   */
  async createPaymentSession(options: PaymentOptions): Promise<PaymentSession> {
    // Validate payment options
    validatePaymentOptionsOrThrow(options)

    if (this.config.debug) {
      this.log('Creating payment session', options)
    }

    try {
      const session = await this.apiClient.createPaymentSession(options)

      if (this.config.debug) {
        this.log('Payment session created', session)
      }

      return session
    } catch (error) {
      if (this.config.debug) {
        this.log('Failed to create payment session', error)
      }
      throw error
    }
  }

  /**
   * Create a payment session and redirect to checkout
   */
  async redirectToCheckout(options: PaymentOptions): Promise<void> {
    const session = await this.createPaymentSession(options)

    if (this.config.debug) {
      this.log('Redirecting to checkout', session.checkoutUrl)
    }

    this.redirectService.redirectToCheckout(session)
  }

  /**
   * Create a payment session and open checkout in new window
   */
  async openCheckoutInNewWindow(options: PaymentOptions): Promise<Window | null> {
    const session = await this.createPaymentSession(options)

    if (this.config.debug) {
      this.log('Opening checkout in new window', session.checkoutUrl)
    }

    return this.redirectService.openCheckoutInNewWindow(session)
  }

  /**
   * Get a payment session by ID
   */
  async getPaymentSession(sessionId: string): Promise<PaymentSession> {
    if (this.config.debug) {
      this.log('Fetching payment session', sessionId)
    }

    return this.apiClient.getPaymentSession(sessionId)
  }

  /**
   * Build checkout URL from session ID without creating a new session
   */
  buildCheckoutUrl(sessionId: string): string {
    return buildCheckoutUrl(sessionId, this.config.environment)
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

  /**
   * Get public key
   */
  getPublicKey(): string {
    return this.config.publicKey
  }

  /**
   * Debug logging
   */
  private log(message: string, data?: any): void {
    if (this.config.debug) {
      console.log(`[Strimz SDK] ${message}`, data || '')
    }
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a new Strimz SDK instance
 */
export const createStrimzSDK = (config: SDKConfig): StrimzSDK => {
  return new StrimzSDK(config)
}
