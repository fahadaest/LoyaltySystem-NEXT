'use client';

import React from 'react';
import Button from 'components/button/Button';
import { MdSave, MdCancel, MdAdd, MdSubscriptions, MdAttachMoney, MdSchedule, MdToggleOn, MdDescription, MdDateRange } from 'react-icons/md';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedSelect from 'components/ui/AnimatedSelect';
import AnimatedDateInput from 'components/ui/AnimatedDateInput';
import AnimatedTextarea from 'components/ui/AnimatedTextarea';
import { billingCycleOptions } from 'utils/billingCycle';

type SubscriptionFormProps = {
  mode: 'create' | 'edit' | 'view';
  formData: any;
  formErrors: { [key: string]: string };
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  mode,
  formData,
  formErrors,
  isLoading,
  onInputChange,
  onSubmit,
  onCancel,
}) => {
  const isReadOnly = mode === 'view';

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Handle input changes for AnimatedInput components
  const handleAnimatedInputChange = (name: string) => (value: string) => {
    const syntheticEvent = {
      target: {
        name,
        value: name === 'price' ? parseFloat(value) || 0 : value,
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
  };

  // Handle textarea changes for AnimatedTextarea
  const handleTextareaChange = (value: string) => {
    const syntheticEvent = {
      target: {
        name: 'description',
        value: value,
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    onInputChange(syntheticEvent);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
    >
      <div className="col-span-8 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800 space-y-4">
        {/* Subscription Name and Price in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInput
            label="Subscription Name"
            icon={MdSubscriptions}
            value={formData.name}
            onChange={handleAnimatedInputChange('name')}
            error={formErrors.name}
            placeholder="Enter subscription name"
            required
            disabled={isReadOnly}
          />

          <AnimatedInput
            label="Price"
            icon={MdAttachMoney}
            type="number"
            value={formData.price || ''}
            onChange={handleAnimatedInputChange('price')}
            error={formErrors.price}
            placeholder="0.00"
            step="0.01"
            required
            disabled={isReadOnly}
          />
        </div>

        {/* Billing Cycle and Status in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedSelect
            label="Billing Cycle"
            icon={MdSchedule}
            value={formData.billingCycle}
            onChange={handleAnimatedInputChange('billingCycle')}
            options={billingCycleOptions}
            placeholder="Select billing cycle"
            required
            disabled={isReadOnly}
            error={formErrors.billingCycle}
          />

          <AnimatedSelect
            label="Status"
            icon={MdToggleOn}
            value={formData.status}
            onChange={handleAnimatedInputChange('status')}
            options={statusOptions}
            placeholder="Select status"
            required
            disabled={isReadOnly}
            error={undefined}
          />
        </div>

        {/* Start Date and End Date in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedDateInput
            label="Start Date"
            icon={MdDateRange}
            value={formData.startDate}
            onChange={handleAnimatedInputChange('startDate')}
            error={formErrors.startDate}
            placeholder="Select start date"
            required
            disabled={isReadOnly}
            min={undefined}
            max={undefined}
          />

          <AnimatedDateInput
            label="End Date"
            icon={MdDateRange}
            value={formData.endDate}
            onChange={handleAnimatedInputChange('endDate')}
            error={formErrors.endDate}
            placeholder="Select end date"
            disabled={isReadOnly}
            min={formData.startDate}
            max={undefined}
          />
        </div>

        {/* Description using AnimatedTextarea */}
        <div className="col-span-full">
          <AnimatedTextarea
            label="Description"
            icon={MdDescription}
            value={formData.description}
            onChange={handleTextareaChange}
            error={formErrors.description}
            placeholder="Enter subscription description"
            disabled={isReadOnly}
            rows={4}
            maxLength={500}
          />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionForm;