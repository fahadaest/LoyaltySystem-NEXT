'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Subscription } from 'utils/types';
import { subscriptionsData } from 'utils/data';
import CustomModal from 'components/modal/CustomModal';
import Card from 'components/card';
import Button from 'components/button/Button';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import SubscriptionCard from 'components/card/SubscriptionCard';
import SubscriptionForm from 'components/superadmin/SubscriptionForm';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';

export default function SubscriptionsPage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setSubscriptions(subscriptionsData); // replace with API call if needed
    } catch (err) {
      setError('Failed to load subscriptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsDeleteMode(true);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    setSubscriptions(prev =>
      prev.filter(sub => sub.id !== selectedSubscription?.id)
    );
    onClose();
    setSelectedSubscription(null);
    setIsDeleteMode(false);
  };

  const handleCreateClick = () => {
    setSelectedSubscription(null);
    setIsDeleteMode(false);
    onOpen();
  };

  if (loading) {
    return (
      <Card extra="mt-3 h-full px-4 py-5 flex items-center justify-center min-h-[300px]">
        <p className="text-xl font-medium text-gray-700 dark:text-white">
          Loading subscriptions...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card extra="mt-3 h-full px-4 py-5 flex items-center justify-center min-h-[300px] bg-red-100 border border-red-200">
        <p className="text-red-600 dark:text-red-300">{error}</p>
        <Button
          text="Try again"
          size="sm"
          color="bg-red-500"
          hoverColor="hover:bg-red-600"
          onClick={fetchSubscriptions}
          extra="ml-4"
          icon={null}
        />
      </Card>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      <div className="mt-3">
        <HeadingCard
          subtitle="Manage Subscriptions"
          icon={<IoPeopleOutline className="text-3xl text-brandGreen dark:text-white" />}
        >
          <HeaderButton
            icon={MdAdd}
            text="Add Subscription"
            size="md"
            color="bg-brandGreen"
            onClick={handleCreateClick}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No subscriptions yet
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Get started by creating your first subscription.
            </p>
            <Button
              text="Create Subscription"
              size="md"
              color="bg-brandGreen"
              hoverColor="hover:bg-brandGreenDark"
              onClick={handleCreateClick}
              extra="mt-4"
              icon={null}
            />
          </div>
        ) : (
          <div className="z-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={() => {
                  setSelectedSubscription(subscription);
                  setIsDeleteMode(false);
                  onOpen();
                }}
                onDelete={() => handleDeleteClick(subscription)}
                onView={() =>
                  router.push(`/superadmin/subscriptions/view/${subscription.id}`)
                }
              />
            ))}
          </div>
        )}

        {isDeleteMode ? (
          <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleDeleteConfirm}
            itemName={selectedSubscription?.name || 'this subscription'}
            title="Delete Subscription"
          />
        ) : (
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedSubscription ? "Edit Subscription" : "Create New Subscription"}
            size="2xl"
          >
            <SubscriptionForm
              mode={selectedSubscription ? "edit" : "create"}
              subscription={selectedSubscription}
              onSuccess={onClose}
            />
          </CustomModal>
        )}
      </div>
    </div>
  );
}
