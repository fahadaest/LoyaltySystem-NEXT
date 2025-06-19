export interface Subscription {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'cancelled';
  description?: string;
  price?: number;
  billingCycle?: 'monthly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriptionData {
  name: string;
  status: 'active' | 'inactive' | 'cancelled';
  description?: string;
  price?: number;
  billingCycle?: 'monthly' | 'yearly';
}

export interface UpdateSubscriptionData extends CreateSubscriptionData {
  id: string;
}

export type SubscriptionFormMode = 'create' | 'edit' | 'view';
