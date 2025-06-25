export interface Admin {
  firstName: string;
  lastName: string;
  subscriptionId: number;
  subscription: any;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: number;
  name: string;
  price: number | string;
  billingCycle: string;
  status: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
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
