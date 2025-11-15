/**
 * Strimz SDK Type Definitions
 * Modular type system for the Strimz payment SDK
 */

// ============================================================================
// Environment & Configuration Types
// ============================================================================

export type Environment = "live" | "test";

export interface SDKConfig {
  publicKey: string;
  environment?: Environment;
  debug?: boolean;
  apiUrl?: string;
}

export interface ServerSDKConfig {
  secretKey: string;
  environment?: Environment;
  apiUrl?: string;
}

// ============================================================================
// Payment Types
// ============================================================================

export type PaymentType = "one-time" | "subscription";

export type SubscriptionInterval = "daily" | "weekly" | "monthly" | "yearly";

export type Currency = "USD";

export type PaymentStatus = "success" | "failed" | "pending" | "cancelled";

// ============================================================================
// Payment Options
// ============================================================================

export interface BasePaymentOptions {
  amount: number;
  currency: Currency;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, any>;
}

export interface OneTimePaymentOptions extends BasePaymentOptions {
  paymentType: "one-time";
  metadata?: OneTimePaymentMetadata;
}

export interface SubscriptionPaymentOptions extends BasePaymentOptions {
  paymentType: "subscription";
  interval: SubscriptionInterval;
  metadata?: SubscriptionMetadata;
}

export type PaymentOptions = OneTimePaymentOptions | SubscriptionPaymentOptions;

// ============================================================================
// Metadata Types
// ============================================================================

export interface OneTimePaymentMetadata {
  orderId?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  userId?: string;
  [key: string]: any;
}

export interface SubscriptionMetadata {
  planId: string;
  planName: string;
  userId: string;
  trialDays?: number;
  startDate?: string;
  customFields?: Record<string, any>;
  [key: string]: any;
}

// ============================================================================
// Payment Session
// ============================================================================

export interface PaymentSession {
  id: string;
  checkoutUrl: string;
  expiresAt: string;
  publicKey: string;
  amount: number;
  currency: Currency;
  paymentType: PaymentType;
  interval?: SubscriptionInterval;
  metadata?: Record<string, any>;
}

// ============================================================================
// Transaction
// ============================================================================

export interface Transaction {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  paymentType: PaymentType;
  interval?: SubscriptionInterval;
  subscriptionId?: string;
  nextBillingDate?: string;
  customerEmail: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  transactionHash?: string;
  walletAddress?: string;
}

// ============================================================================
// Payment Result (from redirect)
// ============================================================================

export interface PaymentResult {
  status: PaymentStatus;
  paymentId?: string;
  transactionId?: string;
  subscriptionId?: string;
  message?: string;
  sessionId?: string;
}

// ============================================================================
// Webhook Types
// ============================================================================

export type WebhookEventType =
  | "payment.success"
  | "payment.failed"
  | "payment.pending"
  | "subscription.created"
  | "subscription.cancelled"
  | "subscription.renewed"
  | "subscription.failed";

export interface WebhookEvent<T = any> {
  id: string;
  type: WebhookEventType;
  data: T;
  createdAt: string;
  livemode: boolean;
}

export interface PaymentWebhookData {
  payment: Transaction;
}

export interface SubscriptionWebhookData {
  subscription: Subscription;
}

// ============================================================================
// Subscription
// ============================================================================

export interface Subscription {
  id: string;
  status: "active" | "cancelled" | "past_due" | "paused";
  interval: SubscriptionInterval;
  amount: number;
  currency: Currency;
  customerEmail: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  cancelAtPeriodEnd: boolean;
  metadata?: SubscriptionMetadata;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// ============================================================================
// React Component Props
// ============================================================================

export interface StrimzProviderProps {
  publicKey: string;
  environment?: Environment;
  children: React.ReactNode;
}

export interface StrimzButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "onError"
  > {
  amount: number;
  paymentType: PaymentType;
  interval?: SubscriptionInterval;
  currency?: Currency;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, any>;
  onSessionCreated?: (session: PaymentSession) => void;
  onError?: (error: Error) => void;
  loading?: boolean;
}

// ============================================================================
// Validation Schemas Export
// ============================================================================

export interface ValidationResult {
  success: boolean;
  error?: string;
  data?: any;
}
