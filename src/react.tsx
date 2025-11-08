/**
 * Strimz SDK - React Entry Point
 * React components and hooks
 */

// Components
export {
  StrimzProvider,
  useStrimz,
  useStrimzSDK,
  StrimzButton
} from './components'

// Re-export core SDK for use in React
export { StrimzSDK, createStrimzSDK } from './core/StrimzSDK'

// Types
export type {
  // Component Props
  StrimzProviderProps,
  StrimzButtonProps,

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
  Subscription
} from './types'

// Utilities (useful in React apps)
export {
  parsePaymentResult,
  parsePaymentResultFromWindow,
  isStrimzError,
  createError
} from './utils'
