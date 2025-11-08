/**
 * Redirect Service
 * Handles payment flow redirects
 */

import type { PaymentSession, Environment } from '../types'
import { buildCheckoutUrl } from '../utils/url'

// ============================================================================
// Redirect Service
// ============================================================================

export class RedirectService {
  private environment: Environment

  constructor(environment: Environment = 'live') {
    this.environment = environment
  }

  /**
   * Redirect to checkout page with payment session
   */
  redirectToCheckout(session: PaymentSession): void {
    if (typeof window === 'undefined') {
      throw new Error(
        'redirectToCheckout can only be called in a browser environment. ' +
        'Use session.checkoutUrl on the server side.'
      )
    }

    const checkoutUrl = buildCheckoutUrl(session.id, this.environment)
    window.location.href = checkoutUrl
  }

  /**
   * Open checkout in a new window/tab
   */
  openCheckoutInNewWindow(session: PaymentSession): Window | null {
    if (typeof window === 'undefined') {
      throw new Error('openCheckoutInNewWindow can only be called in a browser environment')
    }

    const checkoutUrl = buildCheckoutUrl(session.id, this.environment)
    return window.open(checkoutUrl, '_blank')
  }

  /**
   * Get checkout URL without redirecting
   */
  getCheckoutUrl(session: PaymentSession): string {
    return buildCheckoutUrl(session.id, this.environment)
  }
}

// ============================================================================
// Factory Function
// ============================================================================

export const createRedirectService = (environment: Environment = 'live'): RedirectService => {
  return new RedirectService(environment)
}
