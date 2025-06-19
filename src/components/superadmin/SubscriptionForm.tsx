'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Subscription,
  CreateSubscriptionData,
  SubscriptionFormMode,
} from '../../utils/types';

interface SubscriptionFormProps {
  mode: SubscriptionFormMode;
  subscription?: Subscription;
  onSubmit?: (data: CreateSubscriptionData) => Promise<void>;
  onCancel?: () => void;
}

export default function SubscriptionForm({
  mode,
  subscription,
  onSubmit,
  onCancel,
}: SubscriptionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateSubscriptionData>({
    name: '',
    status: 'active',
    description: '',
    price: 0,
    billingCycle: 'monthly',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (subscription && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: subscription.name,
        status: subscription.status,
        description: subscription.description || '',
        price: subscription.price || 0,
        billingCycle: subscription.billingCycle || 'monthly',
      });
    }
  }, [subscription, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    if (formData.price && formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        router.push('/reseller-profile/subscriptions/list');
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
      setErrors({ submit: 'Failed to save subscription. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const isReadOnly = mode === 'view';
  const title =
    mode === 'create'
      ? 'Create Subscription'
      : mode === 'edit'
      ? 'Edit Subscription'
      : 'Subscription Details';

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subscription Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } ${isReadOnly ? 'bg-gray-50' : ''}`}
              placeholder="Enter subscription name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isReadOnly ? 'bg-gray-50' : ''
              }`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isReadOnly}
              rows={3}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isReadOnly ? 'bg-gray-50' : ''
              }`}
              placeholder="Optional description"
            />
          </div>

          <div>
            <label
              htmlFor="billingCycle"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Billing Cycle
            </label>
            <select
              id="billingCycle"
              name="billingCycle"
              value={formData.billingCycle}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isReadOnly ? 'bg-gray-50' : ''
              }`}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {errors.submit && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {!isReadOnly && (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? 'Saving...'
                  : mode === 'create'
                  ? 'Create Subscription'
                  : 'Update Subscription'}
              </button>
            )}

            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {isReadOnly ? 'Back' : 'Cancel'}
            </button>

            {isReadOnly && subscription && (
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/reseller-profile/subscriptions/edit/${subscription.id}`,
                  )
                }
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit Subscription
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
