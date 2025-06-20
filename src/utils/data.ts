import { Subscription } from './types';

export const subscriptionsData: Subscription[] = [
  {
    id: '1',
    name: 'Basic Plan',
    status: 'active',
    description: 'Basic subscription plan with essential features',
    price: 9.99,
    billingCycle: 'monthly',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Premium Plan',
    status: 'active',
    description: 'Premium subscription with advanced features',
    price: 19.99,
    billingCycle: 'monthly',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Enterprise Plan',
    status: 'inactive',
    description: 'Enterprise solution for large organizations',
    price: 99.99,
    billingCycle: 'yearly',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15'),
  },
];

export const SUPER_ADMIN_EMAIL = 'superadmin@gmail.com';
export const SUPER_ADMIN_PASSWORD = 'password123';

export const ADMIN_EMAIL = 'admin@gmail.com';
export const ADMIN_PASSWORD = 'password123';
