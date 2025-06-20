'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Subscription } from 'utils/types';
import { subscriptionsData } from 'utils/data';
import CustomModal from 'components/modal/CustomModal';
import Card from 'components/card';
import Button from 'components/button/Button';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd, MdEdit, MdDelete, MdInfoOutline } from 'react-icons/md';
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import SubscriptionCard from 'components/card/SubscriptionCard';
import SubscriptionForm from 'components/superadmin/SubscriptionForm';

export default function SubscriptionsPage() {
  const router = useRouter();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionToDelete, setSubscriptionToDelete] =
    useState<Subscription | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleDeleteClick = (subscription: Subscription) => {
    setSubscriptionToDelete(subscription);
    onDeleteModalOpen();
  };

  const handleDeleteConfirm = () => {
    setSubscriptions((prev) =>
      prev.filter((subs) => subs.id !== subscriptionToDelete?.id),
    );
    onDeleteModalClose();
    setSubscriptionToDelete(null);
  };

  const fetchSubscriptions = async () => {
    try {
      // Simulate API call
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
        return 'text-green-500 dark:text-green-300';
      case 'inactive':
        return 'text-yellow-500 dark:text-yellow-300';
      case 'cancelled':
        return 'text-red-500 dark:text-red-300';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
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
          icon={undefined}
        />
      </Card>
    );
  }

  return (
    <div className="mt-3 h-full rounded-3xl bg-white px-4 py-5 shadow-lg shadow-brand-400/30 dark:!bg-navy-800 dark:shadow-none">
      <div className=" mb-6 flex flex-col justify-between rounded-lg px-4 py-3 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Manage Subscriptions
        </h4>
        <div className="flex gap-2">
          <Button
            icon={MdAdd}
            text="Add Subscription"
            size="sm"
            color="bg-brandGreen"
            hoverColor="hover:bg-brandGreenDark"
            onClick={onCreateModalOpen}
          />
        </div>
      </div>

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
            onClick={onCreateModalOpen}
            extra="mt-4"
            icon={undefined}
          />
        </div>
      ) : (
        <div className="z-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={() =>
                router.push(`/superadmin/subscriptions/edit/${subscription.id}`)
              }
              onDelete={() => handleDeleteClick(subscription)}
              onView={() =>
                router.push(`/superadmin/subscriptions/view/${subscription.id}`)
              }
            />
          ))}
        </div>
      )}

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title="Create New Subscription"
        // size="2xl"
      >
        <SubscriptionForm mode="create" onSuccess={onCreateModalClose} />
      </CustomModal>

      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        title="Delete Subscription"
        size="md"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-300"
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
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Delete Subscription
          </h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete{' '}
            <strong>{subscriptionToDelete?.name}</strong>? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
          <Button
            text="Cancel"
            size="md"
            color="bg-gray-200"
            // textColor="text-gray-700"
            hoverColor="hover:bg-gray-300"
            onClick={onDeleteModalClose}
            extra="flex-1"
            icon={undefined}
          />
          <Button
            text="Delete"
            size="md"
            color="bg-brandRed"
            hoverColor="hover:bg-red-700"
            onClick={handleDeleteConfirm}
            extra="flex-1"
            icon={undefined}
          />
        </div>
      </CustomModal>
    </div>
  );
}
