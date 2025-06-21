'use client';

import React, { useState, useEffect } from 'react';
import { Subscription } from 'utils/types';
import Button from 'components/button/Button';
import { MdSave, MdCancel, MdAdd } from 'react-icons/md';

type SubscriptionFormProps = {
  mode: 'create' | 'edit' | 'view';
  subscription?: Subscription;
  onSuccess?: () => void;
};

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  mode,
  subscription,
  onSuccess,
}) => {
  const isReadOnly = mode === 'view';
  const title =
    mode === 'create'
      ? 'Create New Subscription'
      : mode === 'edit'
      ? 'Edit Subscription'
      : 'Subscription Details';

  const [formData, setFormData] = useState<any>(
    subscription || {
      id: 0,
      name: '',
      price: 0,
      billingCycle: 'monthly',
      status: 'active',
      description: '',
      features: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (subscription && mode !== 'create') {
      setFormData(subscription);
    }
  }, [subscription, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }
    if (formData.price === null || formData.price < 0) {
      newErrors.price = 'Price must be a non-negative number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);

      if (onSuccess) {
        onSuccess();
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
    >
      <div className="col-span-8 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="text-sm font-bold text-navy-700 dark:text-white"
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
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            } dark:!border-white/10 dark:text-white ${
              isReadOnly ? 'bg-gray-50 dark:bg-navy-700' : ''
            }`}
            placeholder="Enter subscription name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="price"
            className="text-sm font-bold text-navy-700 dark:text-white"
          >
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            disabled={isReadOnly}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              errors.price ? 'border-red-500' : 'border-gray-200'
            } dark:!border-white/10 dark:text-white ${
              isReadOnly ? 'bg-gray-50 dark:bg-navy-700' : ''
            }`}
            placeholder="0.00"
            step="0.01"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="billingCycle"
            className="text-sm font-bold text-navy-700 dark:text-white"
          >
            Billing Cycle *
          </label>
          <select
            id="billingCycle"
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleInputChange}
            disabled={isReadOnly}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white ${
              isReadOnly ? 'bg-gray-50 dark:bg-navy-700' : ''
            }`}
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="status"
            className="text-sm font-bold text-navy-700 dark:text-white"
          >
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled={isReadOnly}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white ${
              isReadOnly ? 'bg-gray-50 dark:bg-navy-700' : ''
            }`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="col-span-8">
        <label
          htmlFor="description"
          className="text-sm font-bold text-navy-700 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          disabled={isReadOnly}
          className={`mt-2 flex min-h-[100px] w-full resize-y items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white ${
            isReadOnly ? 'bg-gray-50 dark:bg-navy-700' : ''
          }`}
          placeholder="Enter subscription description"
        />
      </div>

      {!isReadOnly && (
        <div className="col-span-8 flex justify-end gap-3 pt-4">
          <Button
            type="button"
            icon={MdCancel}
            text="Cancel"
            size="md"
            color="bg-gray-200"
            // textColor="text-gray-700"
            hoverColor="hover:bg-gray-300"
            onClick={onSuccess}
          />
          <Button
            type="submit"
            icon={mode === 'create' ? MdAdd : MdSave}
            text={mode === 'create' ? 'Create Subscription' : 'Save Changes'}
            size="md"
            color="bg-brandGreen"
            hoverColor="hover:bg-brandGreenDark"
            disabled={Object.keys(errors).length > 0}
            onClick={onSuccess}
          />
        </div>
      )}
    </form>
  );
};

export default SubscriptionForm;
