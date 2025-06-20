'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Subscription } from 'utils/types';
import SubscriptionForm from 'components/superadmin/SubscriptionForm';
import { subscriptionsData } from 'utils/data';

export default function ViewSubscriptionPage() {
  const params = useParams();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchSubscription(params.id as string);
    }
  }, [params.id]);

  const fetchSubscription = async (id: string) => {
    try {
      const response = subscriptionsData.find((subs) => subs.id == params.id);
      setSubscription(response);
    } catch (err) {
      setError('Failed to load subscription');
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="animate-pulse rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 rounded bg-gray-200"></div>
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

  return <SubscriptionForm mode="view" subscription={subscription} />;
}
