'use client';

import { useRouter } from 'next/navigation';
import { Subscription } from 'utils/types';
import CustomModal from 'components/modal/CustomModal';
import Card from 'components/card';
import Button from 'components/button/Button';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { FaCogs } from 'react-icons/fa';
import { IoPeopleOutline } from 'react-icons/io5';
import SubscriptionCard from 'components/card/SubscriptionCard';
import SubscriptionForm from 'components/superadmin/SubscriptionForm';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import {
  useListSubscriptionsQuery,
  useDeleteSubscriptionMutation,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation
} from 'store/apiEndPoints/subscriptionApi';
import { useState } from 'react';
import SubscriptionDetails from 'components/superadmin/SubscriptionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';

export default function SubscriptionsPage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState<'create' | 'edit' | 'view'>('create');
  const { data: subscriptions = [], isLoading, isError, refetch } = useListSubscriptionsQuery();
  const [deleteSubscription, { isLoading: isDeleting }] = useDeleteSubscriptionMutation();
  const [createSubscription, { isLoading: isCreating }] = useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdating }] = useUpdateSubscriptionMutation();
  const dispatch = useDispatch();
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Form state management
  const [formData, setFormData] = useState<any>({
    id: null,
    name: '',
    price: null,
    billingCycle: 'monthly',
    status: 'active',
    description: '',
    startDate: null,
    endDate: null,
    features: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  console.log("formData", formData)

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      price: null,
      billingCycle: 'monthly',
      status: 'active',
      description: '',
      startDate: null,
      endDate: null,
      features: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setFormErrors({});
  };

  const handleDeleteClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsDeleteMode(true);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSubscription) return;

    try {
      await deleteSubscription(selectedSubscription.id).unwrap();
      setSelectedSubscription(null);
      setIsDeleteMode(false);
      onClose();
      refetch();
      dispatch(showAlert({ message: 'Subscription deleted successfully!', severity: 'success', duration: 2000 }));
    } catch (error) {
      dispatch(showAlert({ message: 'Failed to delete subscription. Please try again.', severity: 'error', duration: 2000 }));
    }
  };

  const handleCreateClick = () => {
    setSelectedSubscription(null);
    setIsDeleteMode(false);
    setMode('create');
    resetForm();
    onOpen();
  };

  const handleEditClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsDeleteMode(false);
    setMode('edit');
    setFormData(subscription);
    setFormErrors({});
    onOpen();
  };

  const handleViewClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsDeleteMode(false);
    setMode('view');
    onOpen();
  };

  const handleFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    // Name is always required
    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    // Price is always required
    if (formData.price === null || formData.price < 0) {
      newErrors.price = 'Price must be a non-negative number';
    }

    // Billing cycle is always required
    if (!formData.billingCycle) {
      newErrors.billingCycle = 'Billing cycle is required';
    }

    // Start date and end date are only required for custom billing cycle
    if (formData.billingCycle === 'custom') {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required for custom billing cycle';
      }

      if (!formData.endDate) {
        newErrors.endDate = 'End date is required for custom billing cycle';
      }

      if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log('Form has errors');
      return;
    }

    try {
      if (mode === 'create') {
        const { id, ...createData } = formData;
        await createSubscription(createData).unwrap();
        dispatch(showAlert({ message: 'Subscription created successfully!', severity: 'success', duration: 2000 }));
      } else if (mode === 'edit' && selectedSubscription?.id) {
        await updateSubscription({
          id: selectedSubscription.id,
          data: {
            name: formData.name,
            price: String(formData.price),
            billingCycle: formData.billingCycle,
            status: formData.status,
            description: formData.description,
          },
        }).unwrap();
        dispatch(showAlert({ message: 'Subscription Updated successfully!', severity: 'success', duration: 2000 }));
      }

      refetch();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Failed to submit subscription form:', error);
      dispatch(showAlert({
        message: 'Failed to save subscription. Please try again.',
        severity: 'error',
        duration: 2000
      }));
    }
  };

  const handleModalClose = () => {
    onClose();
    resetForm();
    setSelectedSubscription(null);
    setIsDeleteMode(false);
  };

  if (isLoading) {
    return (
      <Card extra="mt-3 h-full px-4 py-5 flex items-center justify-center min-h-[300px]">
        <p className="text-xl font-medium text-gray-700 dark:text-white">
          Loading subscriptions...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card extra="mt-3 h-full px-4 py-5 flex items-center justify-center min-h-[300px] bg-red-100 border border-red-200">
        <p className="text-red-600 dark:text-red-300">Failed to load subscriptions</p>
        <Button
          text="Try again"
          size="sm"
          color="bg-red-500"
          hoverColor="hover:bg-red-600"
          onClick={() => refetch()}
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
          icon={<FaCogs className="text-3xl text-brandGreen dark:text-white" />}
        >
          <HeaderButton
            icon={MdAdd}
            text="Add Subscription"
            size="lg"
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
            <p className="mt-2 text-gray-500 dark:text-gray-400 mb-5">
              Get started by creating your first subscription.
            </p>
            <Button
              text="Create Subscription"
              size="md"
              color="bg-brandGreen"
              hoverColor="hover:bg-brandGreenDark"
              onClick={handleCreateClick}
              extra="mt-4"
              icon={MdAdd}
            />
          </div>
        ) : (
          <div className="z-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={{
                  ...subscription,
                  price: typeof subscription.price === 'string' ? parseFloat(subscription.price) : subscription.price,
                  createdAt: subscription.createdAt,
                  updatedAt: subscription.updatedAt,
                }}
                onEdit={() => handleEditClick(subscription)}
                onDelete={() => handleDeleteClick(subscription)}
                onView={() => handleViewClick(subscription)}
              />
            ))}
          </div>
        )}

        {isDeleteMode ? (
          <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={handleModalClose}
            onConfirm={handleDeleteConfirm}
            itemName={selectedSubscription?.name || 'this subscription'}
            title="Delete Subscription"
          />
        ) : selectedSubscription && mode === 'view' ? (
          <CustomModal
            isOpen={isOpen}
            onClose={handleModalClose}
            title="Subscription Details"
            size="2xl"
            handlePrint={undefined}
            showModalBackButton={undefined}
            handleClickBack={undefined}
            headerTitle={undefined}
            headerDescription={undefined}
            showFooter={undefined}
            showFooterCancelButton={undefined}
            footerConfirmation={undefined}
            footerConfirmButtonIcon={undefined}
          >
            <SubscriptionDetails subscription={selectedSubscription} />
          </CustomModal>
        ) : (
          <CustomModal
            isOpen={isOpen}
            onClose={handleModalClose}
            headerTitle={selectedSubscription ? 'Edit Subscription' : 'Create Subscription'}
            headerDescription={selectedSubscription ? 'Edit your current subscription' : 'These subscriptions will be used while adding new admins'}
            size="xl"
            handlePrint={undefined}
            showModalBackButton={undefined}
            handleClickBack={undefined}
            showFooter={true}
            showFooterCancelButton={onClose}
            footerConfirmation={handleFormSubmit}
            footerConfirmButtonIcon={undefined}
          >
            <SubscriptionForm
              mode={mode}
              formData={formData}
              formErrors={formErrors}
              isLoading={isCreating || isUpdating}
              onInputChange={handleFormInputChange}
              onSubmit={handleFormSubmit}
              onCancel={handleModalClose}
            />
          </CustomModal>
        )}
      </div>
    </div>
  );
}