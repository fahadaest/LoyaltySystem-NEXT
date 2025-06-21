'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Subscription } from 'utils/types';
import { subscriptionsData } from 'utils/data';
import { ArrowLeft, Edit, CheckCircle, Clock, XCircle } from 'lucide-react';

// --- Helper Components for a Cleaner UI ---

// A reusable component to display each piece of information
const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-base font-semibold text-gray-800 dark:text-gray-200">
      {value}
    </p>
  </div>
);

// A component to render a colored status badge
const StatusBadge = ({
  status,
}: {
  status: 'Active' | 'Inactive' | 'Pending';
}) => {
  const baseClasses =
    'px-3 py-1 text-xs font-medium tracking-wider rounded-full';
  const statusClasses = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };
  const Icon = {
    Active: <CheckCircle className="mr-1 h-3 w-3" />,
    Inactive: <XCircle className="mr-1 h-3 w-3" />,
    Pending: <Clock className="mr-1 h-3 w-3" />,
  };
  return (
    <span
      className={`${baseClasses} ${statusClasses[status]} inline-flex items-center`}
    >
      {Icon[status]}
      {status}
    </span>
  );
};

// --- Main Page Component ---

export default function ViewSubscriptionPage() {
  const params = useParams();
  const router = useRouter(); // For the back button
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      // Simulate fetching data
      setTimeout(() => {
        try {
          const response = subscriptionsData.find(
            (subs) => subs.id == params.id,
          );
          if (response) {
            setSubscription(response);
          } else {
            setError('Subscription not found.');
          }
        } catch (err) {
          setError('Failed to load subscription');
          console.error('Error fetching subscription:', err);
        } finally {
          setLoading(false);
        }
      }, 500); // Added a small delay to showcase the loader
    }
  }, [params.id]);

  // Your existing loading state UI is great, so we'll keep it.
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-4 md:p-6">
        <div className="animate-pulse rounded-lg bg-white p-6 shadow-md dark:bg-navy-800">
          <div className="mb-6 h-8 w-1/3 rounded bg-gray-200 dark:bg-navy-700"></div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 rounded bg-gray-200 dark:bg-navy-700"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error || 'Subscription not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subscriptions
        </button>
        <Link href={`/superadmin/subscriptions/edit/${subscription.id}`}>
          <button className="flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-600">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-navy-800">
        <div className="p-6">
          <div className="flex flex-col justify-between md:flex-row">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {subscription.name}
            </h1>
            <StatusBadge status={'Active'} />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Subscription ID: {subscription.id}
          </p>
        </div>

        <div className="border-t border-gray-200 p-6 dark:border-navy-700">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
            <DetailItem label="Plan Name" value={subscription.name} />
            <DetailItem
              label="Price"
              value={`$${subscription.price} / ${subscription.billingCycle}`}
            />
            <DetailItem label="Description" value={subscription.description} />
            <DetailItem
              label="Start Date"
              value={new Date(subscription.createdAt).toLocaleDateString()}
            />
            <DetailItem
              label="End Date"
              value={new Date(subscription.createdAt).toLocaleDateString()}
            />
          </dl>
        </div>
      </div>
    </div>
  );
}
