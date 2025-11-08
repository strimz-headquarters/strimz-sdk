/**
 * URL Building Utilities
 * Modular URL construction and parsing functions
 */

import type { PaymentSession, PaymentResult, Environment } from '../types'

// ============================================================================
// Constants
// ============================================================================

export const API_URLS = {
  live: 'https://strimz-subscription.vercel.app/api',
  test: 'https://strimz-subscription.vercel.app/api/test'
} as const

export const CHECKOUT_URLS = {
  live: 'https://strimz-subscription.vercel.app/payment',
  test: 'https://strimz-subscription.vercel.app/payment/test'
} as const

// ============================================================================
// URL Building Functions
// ============================================================================

/**
 * Get the API URL for the given environment
 */
export const getApiUrl = (environment: Environment = 'live', customUrl?: string): string => {
  if (customUrl) return customUrl
  return API_URLS[environment]
}

/**
 * Get the checkout URL for the given environment
 */
export const getCheckoutUrl = (environment: Environment = 'live'): string => {
  return CHECKOUT_URLS[environment]
}

/**
 * Build the full checkout URL with session ID
 */
export const buildCheckoutUrl = (
  sessionId: string,
  environment: Environment = 'live'
): string => {
  const baseUrl = getCheckoutUrl(environment)
  const url = new URL(baseUrl)
  url.searchParams.set('session', sessionId)
  return url.toString()
}

/**
 * Build API endpoint URL
 */
export const buildApiEndpoint = (
  path: string,
  environment: Environment = 'live',
  customUrl?: string
): string => {
  const baseUrl = getApiUrl(environment, customUrl)
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}/${cleanPath}`
}

// ============================================================================
// URL Parsing Functions
// ============================================================================

/**
 * Parse payment result from URL query parameters
 */
export const parsePaymentResult = (url: string | URL): PaymentResult | null => {
  try {
    const urlObj = typeof url === 'string' ? new URL(url) : url
    const params = urlObj.searchParams

    const status = params.get('status') as PaymentResult['status']
    const paymentId = params.get('payment_id')
    const transactionId = params.get('transaction_id')
    const subscriptionId = params.get('subscription_id')
    const message = params.get('message')
    const sessionId = params.get('session_id')

    if (!status) return null

    return {
      status,
      paymentId: paymentId || undefined,
      transactionId: transactionId || undefined,
      subscriptionId: subscriptionId || undefined,
      message: message || undefined,
      sessionId: sessionId || undefined
    }
  } catch {
    return null
  }
}

/**
 * Parse payment result from current window location (browser only)
 */
export const parsePaymentResultFromWindow = (): PaymentResult | null => {
  if (typeof window === 'undefined') return null
  return parsePaymentResult(window.location.href)
}

/**
 * Check if URL is a valid HTTPS URL
 */
export const isValidHttpsUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Add query parameters to a URL
 */
export const addQueryParams = (
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>
): string => {
  const url = new URL(baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  return url.toString()
}

// ============================================================================
// Redirect Functions (Browser Only)
// ============================================================================

/**
 * Redirect to checkout URL (browser only)
 */
export const redirectToCheckout = (checkoutUrl: string): void => {
  if (typeof window === 'undefined') {
    throw new Error('redirectToCheckout can only be called in a browser environment')
  }

  window.location.href = checkoutUrl
}

/**
 * Redirect to checkout with session (browser only)
 */
export const redirectToCheckoutWithSession = (
  session: PaymentSession,
  environment: Environment = 'live'
): void => {
  const checkoutUrl = buildCheckoutUrl(session.id, environment)
  redirectToCheckout(checkoutUrl)
}

// ============================================================================
// Query Parameter Helpers
// ============================================================================

/**
 * Build success URL with payment result
 */
export const buildSuccessUrl = (
  baseUrl: string,
  result: Partial<PaymentResult>
): string => {
  return addQueryParams(baseUrl, {
    status: result.status,
    payment_id: result.paymentId,
    transaction_id: result.transactionId,
    subscription_id: result.subscriptionId,
    message: result.message,
    session_id: result.sessionId
  })
}

/**
 * Build cancel URL with session info
 */
export const buildCancelUrl = (
  baseUrl: string,
  sessionId: string
): string => {
  return addQueryParams(baseUrl, {
    status: 'cancelled',
    session_id: sessionId
  })
}
