'use client';

import React from 'react';
import Button from 'components/button/Button';
import { MdSave, MdCancel, MdAdd, MdSubscriptions, MdAttachMoney, MdSchedule, MdToggleOn, MdDescription, MdDateRange } from 'react-icons/md';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedSelect from 'components/ui/AnimatedSelect';
import AnimatedDateInput from 'components/ui/AnimatedDateInput';
import AnimatedTextarea from 'components/ui/AnimatedTextarea';
import AnimatedPriceField from 'components/ui/AnimatedPriceField';
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
  const isCustomBilling = formData.billingCycle === 'custom';

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleAnimatedInputChange = (name: string) => (value: string) => {
    const syntheticEvent = {
      target: {
        name,
        value: name === 'price' ? parseFloat(value) || 0 : value,
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
  };

  const handleTextareaChange = (value: string) => {
    const syntheticEvent = {
      target: {
        name: 'description',
        value: value,
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    onInputChange(syntheticEvent);
  };

  const handlePriceChange = (value: string) => {
    const syntheticEvent = {
      target: {
        name: 'price',
        value: parseFloat(value) || 0,
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
  };

  const handleCurrencyChange = (currency: string) => {
    const syntheticEvent = {
      target: {
        name: 'currency',
        value: currency,
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onInputChange(syntheticEvent);
  };

  return (
    <form onSubmit={onSubmit} className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none" >
      <div className="col-span-8 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800 space-y-4">

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

          <AnimatedPriceField
            label="Subscription Price"
            icon={MdAttachMoney}
            value={formData.price || ''}
            currency={formData.currency || 'AED'}
            onPriceChange={handlePriceChange}
            onCurrencyChange={handleCurrencyChange}
            error={formErrors.price}
            placeholder="0.00"
            step="0.01"
            required
            disabled={isReadOnly}
          />
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedDateInput
            label="Start Date"
            icon={MdDateRange}
            value={formData.startDate}
            onChange={handleAnimatedInputChange('startDate')}
            error={isCustomBilling ? formErrors.startDate : undefined}
            placeholder="Select start date"
            required={isCustomBilling}
            disabled={isReadOnly}
            min={undefined}
            max={undefined}
          />

          <AnimatedDateInput
            label="End Date"
            icon={MdDateRange}
            value={formData.endDate}
            onChange={handleAnimatedInputChange('endDate')}
            error={isCustomBilling ? formErrors.endDate : undefined}
            placeholder="Select end date"
            required={isCustomBilling}
            disabled={isReadOnly}
            min={formData.startDate}
            max={undefined}
          />
        </div>

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