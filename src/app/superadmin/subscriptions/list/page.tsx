'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Subscription } from 'utils/types';
import { subscriptionsData } from 'utils/data';

export default function SubscriptionsPage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleDeleteClick = (subscription) => {
    setSubscriptionToDelete(subscription);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setSubscriptions((prev) =>
      prev.filter((admin) => admin.id !== subscriptionToDelete.id),
    );
    setShowDeleteModal(false);
    setSubscriptionToDelete(null);
  };

  const fetchSubscriptions = async () => {
    try {
      setSubscriptions(subscriptionsData);
    } catch (err) {
      setError('Failed to load subscriptions');
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price?: number) => {
    return price ? `$${price.toFixed(2)}` : 'N/A';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 rounded-lg bg-white shadow"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchSubscriptions}
            className="mt-2 text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="mt-2 text-gray-600">
            Manage your subscription plans and billing
          </p>
        </div>
        <Link
          href="/superadmin/subscriptions/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Subscription
        </Link>
      </div>

      {/* Subscriptions List */}
      {subscriptions.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No subscriptions yet
          </h3>
          <p className="mt-2 text-gray-500">
            Get started by creating your first subscription.
          </p>
          <Link
            href="/subscriptions/create"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Create Subscription
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {subscription.name}
                    </h3>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(
                        subscription.status,
                      )}`}
                    >
                      {subscription.status}
                    </span>
                  </div>
                </div>

                {subscription.description && (
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {subscription.description}
                  </p>
                )}

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium">
                      {formatPrice(subscription.price)}
                    </span>
                  </div>
                  {subscription.billingCycle && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Billing:</span>
                      <span className="font-medium capitalize">
                        {subscription.billingCycle}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">
                      {formatDate(subscription.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/superadmin/subscriptions/view/${subscription.id}`}
                    className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-center text-sm text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    View
                  </Link>
                  <Link
                    href={`/superadmin/subscriptions/edit/${subscription.id}`}
                    className="flex-1 rounded-md bg-blue-100 px-3 py-2 text-center text-sm text-blue-700 transition-colors hover:bg-blue-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(subscription)}
                    disabled={deleteLoading === subscription.id}
                    className="flex-1 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
                  >
                    {'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDeleteModal && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <div className="text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Delete Subscription
              </h3>
              <p className="mb-6 text-sm text-gray-500">
                Are you sure you want to delete the Subscription? This action
                cannot be undone.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
