'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Subscription } from 'utils/types';
import SubscriptionForm from 'components/superadmin/SubscriptionForm';
import { subscriptionsData } from 'utils/data';

import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import Card from 'components/card';
import Button from 'components/button/Button';

export default function EditSubscriptionPageWrapper() {
  const params = useParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchSubscription(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (!loading && !error && subscription) {
      onOpen();
    }
  }, [loading, error, subscription, onOpen]);

  const fetchSubscription = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const foundSubscription = subscriptionsData.find((subs) => subs.id == id); // Assuming ID is a number
      if (foundSubscription) {
        setSubscription(foundSubscription);
      } else {
        setError('Subscription not found');
      }
    } catch (err) {
      setError('Failed to load subscription');
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    router.push('/superadmin/subscriptions/list');
  };

  if (loading) {
    return (
      <Card extra="mt-3 h-full px-4 py-5 flex items-center justify-center min-h-[300px]">
        <p className="text-xl font-medium text-gray-700 dark:text-white">
          Loading subscription details...
        </p>
      </Card>
    );
  }

  if (error || !subscription) {
    return (
      <Card extra="mt-3 h-full px-4 py-5 flex items-center justify-center min-h-[300px] bg-red-100 border border-red-200">
        <p className="text-red-600 dark:text-red-300">
          {error || 'Subscription not found'}
        </p>
        <Button
          text="Go back"
          size="sm"
          color="bg-gray-200"
          // textColor="text-gray-700"
          hoverColor="hover:bg-gray-300"
          onClick={() => router.push('/superadmin/subscriptions/list')}
          extra="ml-4"
          icon={undefined}
        />
      </Card>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Edit Subscription"
        // size="2xl"
      >
        <SubscriptionForm
          mode="edit"
          subscription={subscription}
          onSuccess={handleClose}
        />
      </CustomModal>
    </div>
  );
}
