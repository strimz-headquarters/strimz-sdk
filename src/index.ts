/**
 * Strimz SDK - Main Entry Point
 * Client-side SDK for browser usage
 */

// Core SDK
export { StrimzSDK, createStrimzSDK } from './core/StrimzSDK'

// Types
export type {
  // Configuration
  SDKConfig,
  Environment,
  Currency,

  // Payment Types
  PaymentType,
  PaymentOptions,
  OneTimePaymentOptions,
  SubscriptionPaymentOptions,
  SubscriptionInterval,
  PaymentStatus,

  // Metadata
  OneTimePaymentMetadata,
  SubscriptionMetadata,

  // Payment Session
  PaymentSession,

  // Payment Result
  PaymentResult,

  // Transaction
  Transaction,

  // Subscription
  Subscription,

  // Validation
  ValidationResult
} from './types'

// Utilities
export {
  // Errors
  StrimzError,
  PaymentError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  RateLimitError,
  SessionError,
  createError,
  isStrimzError,
  isPaymentError,
  isAuthenticationError,
  isValidationError,
  isNetworkError,
  isRateLimitError,

  // URL utilities
  parsePaymentResult,
  parsePaymentResultFromWindow,
  isValidHttpsUrl,

  // Validation
  validate,
  validatePaymentOptionsOrThrow,
  sanitizeMetadata
} from './utils'

// Note: React components are in a separate export ('./react')
// Note: Server SDK is in a separate export ('./server')
