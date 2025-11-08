/**
 * Custom Error Classes for Strimz SDK
 * Modular error handling system
 */

export class StrimzError extends Error {
  public readonly code: string
  public readonly details?: Record<string, any>
  public readonly statusCode?: number

  constructor(
    message: string,
    code: string,
    details?: Record<string, any>,
    statusCode?: number
  ) {
    super(message)
    this.name = 'StrimzError'
    this.code = code
    this.details = details
    this.statusCode = statusCode

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      statusCode: this.statusCode
    }
  }
}

export class PaymentError extends StrimzError {
  constructor(message: string, code: string, details?: Record<string, any>) {
    super(message, code, details, 400)
    this.name = 'PaymentError'
  }
}

export class AuthenticationError extends StrimzError {
  constructor(message: string = 'Invalid API key', details?: Record<string, any>) {
    super(message, 'INVALID_API_KEY', details, 401)
    this.name = 'AuthenticationError'
  }
}

export class ValidationError extends StrimzError {
  constructor(message: string, field?: string, details?: Record<string, any>) {
    super(
      message,
      'VALIDATION_ERROR',
      field ? { field, ...details } : details,
      400
    )
    this.name = 'ValidationError'
  }
}

export class NetworkError extends StrimzError {
  constructor(message: string = 'Network request failed', details?: Record<string, any>) {
    super(message, 'NETWORK_ERROR', details, 503)
    this.name = 'NetworkError'
  }
}

export class RateLimitError extends StrimzError {
  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 'RATE_LIMIT_EXCEEDED', { retryAfter }, 429)
    this.name = 'RateLimitError'
  }
}

export class SessionError extends StrimzError {
  constructor(message: string, code: string = 'SESSION_ERROR', details?: Record<string, any>) {
    super(message, code, details, 400)
    this.name = 'SessionError'
  }
}

// ============================================================================
// Error Factory Functions
// ============================================================================

export const createError = {
  invalidAmount: (amount: number) =>
    new ValidationError(
      `Invalid amount: ${amount}. Amount must be between 100 cents ($1) and 1000000 cents ($10,000)`,
      'amount'
    ),

  invalidPaymentType: (type: string) =>
    new ValidationError(
      `Invalid payment type: ${type}. Must be 'one-time' or 'subscription'`,
      'paymentType'
    ),

  invalidInterval: (interval: string) =>
    new ValidationError(
      `Invalid subscription interval: ${interval}. Must be 'daily', 'weekly', 'monthly', or 'yearly'`,
      'interval'
    ),

  missingInterval: () =>
    new ValidationError(
      'Subscription interval is required for subscription payments',
      'interval'
    ),

  invalidUrl: (field: 'successUrl' | 'cancelUrl', url: string) =>
    new ValidationError(
      `Invalid ${field}: ${url}. Must be a valid HTTPS URL`,
      field
    ),

  invalidEmail: (email: string) =>
    new ValidationError(
      `Invalid email: ${email}`,
      'customerEmail'
    ),

  invalidApiKey: (keyType: 'public' | 'secret') =>
    new AuthenticationError(
      `Invalid ${keyType} API key. ${keyType === 'public' ? 'Public keys must start with STRZlive_ or STRZtest_' : 'Secret keys must start with STRZ_'}`,
      { keyType }
    ),

  expiredApiKey: () =>
    new AuthenticationError('API key has expired'),

  sessionExpired: () =>
    new SessionError('Payment session has expired', 'SESSION_EXPIRED'),

  sessionNotFound: (sessionId: string) =>
    new SessionError(`Payment session not found: ${sessionId}`, 'SESSION_NOT_FOUND'),

  networkError: (originalError?: any) =>
    new NetworkError(
      'Failed to connect to Strimz API. Please check your internet connection.',
      { originalError: originalError?.message }
    ),

  rateLimitExceeded: (retryAfter?: number) =>
    new RateLimitError(
      'Too many requests. Please try again later.',
      retryAfter
    )
}

// ============================================================================
// Error Type Guards
// ============================================================================

export const isStrimzError = (error: any): error is StrimzError => {
  return error instanceof StrimzError
}

export const isPaymentError = (error: any): error is PaymentError => {
  return error instanceof PaymentError
}

export const isAuthenticationError = (error: any): error is AuthenticationError => {
  return error instanceof AuthenticationError
}

export const isValidationError = (error: any): error is ValidationError => {
  return error instanceof ValidationError
}

export const isNetworkError = (error: any): error is NetworkError => {
  return error instanceof NetworkError
}

export const isRateLimitError = (error: any): error is RateLimitError => {
  return error instanceof RateLimitError
}
