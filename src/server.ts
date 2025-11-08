/**
 * Strimz SDK - Server Entry Point
 * Server-side SDK for Node.js backend usage
 */

// Server SDK
export {
  StrimzServer,
  createStrimzServer,
  verifyWebhook,
  constructEvent
} from './core/StrimzServer'

// Webhook utilities
export {
  verifyWebhookSignature,
  constructWebhookEvent,
  isPaymentSuccessEvent,
  isPaymentFailedEvent,
  isSubscriptionEvent,
  getEventType,
  getEventData
} from './services/webhook'

// Types
export type {
  // Server Configuration
  ServerSDKConfig,
  Environment,
  Currency,

  // Transaction
  Transaction,
  PaymentStatus,

  // Webhook Events
  WebhookEvent,
  WebhookEventType,
  PaymentWebhookData,
  SubscriptionWebhookData,

  // Subscription
  Subscription,
  SubscriptionInterval,

  // Payment Types
  PaymentType,
  OneTimePaymentMetadata,
  SubscriptionMetadata,

  // API Response
  APIResponse,
  APIError
} from './types'

// Errors
export {
  StrimzError,
  PaymentError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  RateLimitError,
  SessionError,
  createError,
  isStrimzError
} from './utils/errors'

// Validation
export {
  validate
} from './utils/validation'
