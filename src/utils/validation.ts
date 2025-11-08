/**
 * Validation Utilities
 * Modular validation functions using Zod schemas
 */

import { z } from 'zod'
import type {
  PaymentOptions,
  SDKConfig,
  ServerSDKConfig,
  ValidationResult
} from '../types'
import { createError } from './errors'

// ============================================================================
// Zod Schemas
// ============================================================================

const environmentSchema = z.enum(['live', 'test'])

const currencySchema = z.enum(['USD'])

const paymentTypeSchema = z.enum(['one-time', 'subscription'])

const subscriptionIntervalSchema = z.enum(['daily', 'weekly', 'monthly', 'yearly'])

const amountSchema = z
  .number()
  .min(100, 'Amount must be at least $1 (100 cents)')
  .max(1000000, 'Amount cannot exceed $10,000 (1,000,000 cents)')
  .int('Amount must be an integer (cents)')

const emailSchema = z.string().email('Invalid email format').optional()

const urlSchema = z
  .string()
  .url('Invalid URL format')
  .refine((url) => url.startsWith('https://'), {
    message: 'URL must use HTTPS protocol'
  })

const publicKeySchema = z
  .string()
  .refine(
    (key) => key.startsWith('STRZlive_') || key.startsWith('STRZtest_'),
    'Public key must start with STRZlive_ or STRZtest_'
  )

const secretKeySchema = z
  .string()
  .refine(
    (key) => key.startsWith('STRZ_'),
    'Secret key must start with STRZ_'
  )

// ============================================================================
// SDK Config Schemas
// ============================================================================

const sdkConfigSchema = z.object({
  publicKey: publicKeySchema,
  environment: environmentSchema.optional(),
  debug: z.boolean().optional(),
  apiUrl: z.string().url().optional()
})

const serverSDKConfigSchema = z.object({
  secretKey: secretKeySchema,
  environment: environmentSchema.optional(),
  apiUrl: z.string().url().optional()
})

// ============================================================================
// Payment Options Schemas
// ============================================================================

const basePaymentOptionsSchema = z.object({
  amount: amountSchema,
  currency: currencySchema,
  customerEmail: emailSchema,
  successUrl: urlSchema,
  cancelUrl: urlSchema,
  metadata: z.record(z.any()).optional()
})

const oneTimePaymentOptionsSchema = basePaymentOptionsSchema.extend({
  paymentType: z.literal('one-time')
})

const subscriptionPaymentOptionsSchema = basePaymentOptionsSchema.extend({
  paymentType: z.literal('subscription'),
  interval: subscriptionIntervalSchema
})

const paymentOptionsSchema = z.discriminatedUnion('paymentType', [
  oneTimePaymentOptionsSchema,
  subscriptionPaymentOptionsSchema
])

// ============================================================================
// Validation Functions
// ============================================================================

export const validate = {
  /**
   * Validate SDK configuration
   */
  sdkConfig: (config: SDKConfig): ValidationResult => {
    try {
      const validated = sdkConfigSchema.parse(config)
      return { success: true, data: validated }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]
        return {
          success: false,
          error: firstError.message
        }
      }
      return {
        success: false,
        error: 'Invalid configuration'
      }
    }
  },

  /**
   * Validate server SDK configuration
   */
  serverConfig: (config: ServerSDKConfig): ValidationResult => {
    try {
      const validated = serverSDKConfigSchema.parse(config)
      return { success: true, data: validated }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]
        return {
          success: false,
          error: firstError.message
        }
      }
      return {
        success: false,
        error: 'Invalid server configuration'
      }
    }
  },

  /**
   * Validate payment options
   */
  paymentOptions: (options: PaymentOptions): ValidationResult => {
    try {
      const validated = paymentOptionsSchema.parse(options)
      return { success: true, data: validated }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]
        return {
          success: false,
          error: firstError.message
        }
      }
      return {
        success: false,
        error: 'Invalid payment options'
      }
    }
  },

  /**
   * Validate amount
   */
  amount: (amount: number): void => {
    const result = amountSchema.safeParse(amount)
    if (!result.success) {
      throw createError.invalidAmount(amount)
    }
  },

  /**
   * Validate payment type
   */
  paymentType: (type: string): void => {
    const result = paymentTypeSchema.safeParse(type)
    if (!result.success) {
      throw createError.invalidPaymentType(type)
    }
  },

  /**
   * Validate subscription interval
   */
  interval: (interval: string): void => {
    const result = subscriptionIntervalSchema.safeParse(interval)
    if (!result.success) {
      throw createError.invalidInterval(interval)
    }
  },

  /**
   * Validate email
   */
  email: (email: string): void => {
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      throw createError.invalidEmail(email)
    }
  },

  /**
   * Validate URL
   */
  url: (url: string, field: 'successUrl' | 'cancelUrl'): void => {
    const result = urlSchema.safeParse(url)
    if (!result.success) {
      throw createError.invalidUrl(field, url)
    }
  },

  /**
   * Validate public key
   */
  publicKey: (key: string): void => {
    const result = publicKeySchema.safeParse(key)
    if (!result.success) {
      throw createError.invalidApiKey('public')
    }
  },

  /**
   * Validate secret key
   */
  secretKey: (key: string): void => {
    const result = secretKeySchema.safeParse(key)
    if (!result.success) {
      throw createError.invalidApiKey('secret')
    }
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if payment options require subscription interval
 */
export const requiresInterval = (options: PaymentOptions): boolean => {
  return options.paymentType === 'subscription'
}

/**
 * Validate payment options and throw on error
 */
export const validatePaymentOptionsOrThrow = (options: PaymentOptions): void => {
  const result = validate.paymentOptions(options)
  if (!result.success) {
    throw new Error(result.error)
  }

  // Additional check for subscription interval
  if (options.paymentType === 'subscription' && !options.interval) {
    throw createError.missingInterval()
  }
}

/**
 * Sanitize metadata to remove any potentially harmful data
 */
export const sanitizeMetadata = (metadata?: Record<string, any>): Record<string, any> | undefined => {
  if (!metadata) return undefined

  // Remove any functions or symbols
  const sanitized: Record<string, any> = {}

  for (const [key, value] of Object.entries(metadata)) {
    if (typeof value !== 'function' && typeof value !== 'symbol') {
      sanitized[key] = value
    }
  }

  return sanitized
}
