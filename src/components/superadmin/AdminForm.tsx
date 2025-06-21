'use client';
import React, { useState, useEffect } from 'react';
import Button from 'components/button/Button';
import {
  MdOutlineArrowBack,
  MdSave,
  MdAdd,
  MdInfoOutline,
  MdClose,
} from 'react-icons/md';

const countryCodes = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
];

const AdminForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'Admin',
    status: 'Active',
    countryCode: '+1',
    phoneNumber: '',
    loyaltyAccess: {
      pointBased: false,
      productBased: false,
    },
    ...initialData,
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...initialData,
      password: '',
      confirmPassword: '',
    }));
    setErrors({});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      loyaltyAccess: {
        ...prev.loyaltyAccess,
        [name]: checked,
      },
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 10-15 digits';
    }

    if (
      !isEditMode ||
      (isEditMode && (formData.password || formData.confirmPassword))
    ) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (
      !formData.loyaltyAccess.pointBased &&
      !formData.loyaltyAccess.productBased
    ) {
      newErrors.loyaltyAccess =
        'Please select at least one loyalty access option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    await onSubmit(formData); // Call the onSubmit prop
    setIsSubmitting(false);
  };

  return (
    <div className="h-full w-full">
      <div className="mb-6 flex flex-col justify-between rounded-lg px-4 py-3 md:flex-row md:items-center">
        <div className="flex items-center space-x-4">
          <Button
            icon={MdOutlineArrowBack}
            onClick={onCancel}
            text="" // No text, just icon for back button
            size="md"
            color="bg-gray-200"
            // textColor="text-gray-700"
            hoverColor="hover:bg-gray-300"
          />
          <div>
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              {isEditMode ? 'Edit Admin' : 'Create New Admin'}
            </h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isEditMode
                ? 'Update administrator information'
                : 'Add a new administrator to the system'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-4">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            } dark:!border-white/10 dark:text-white`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            } dark:!border-white/10 dark:text-white`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
            >
              Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            >
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
            >
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
          >
            Phone Number *
          </label>
          <div className="flex rounded-xl border border-gray-200 dark:!border-white/10">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="rounded-l-xl bg-white/0 px-3 py-3 text-sm outline-none dark:!border-white/10 dark:text-white"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`flex-1 rounded-r-xl bg-white/0 px-4 py-3 text-sm outline-none ${
                errors.phoneNumber ? 'border-red-500' : ''
              } dark:!border-white/10 dark:text-white`}
              placeholder="Enter phone number"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold text-navy-700 dark:text-white">
            Loyalty Access *
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pointBased"
                name="pointBased"
                checked={formData.loyaltyAccess.pointBased}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-brandLinear focus:ring-brandLinear dark:border-white/10"
              />
              <label
                htmlFor="pointBased"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                Point-Based Loyalty
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="productBased"
                name="productBased"
                checked={formData.loyaltyAccess.productBased}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-brandLinear focus:ring-brandLinear dark:border-white/10"
              />
              <label
                htmlFor="productBased"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                Product-Based Loyalty
              </label>
            </div>
          </div>
          {errors.loyaltyAccess && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.loyaltyAccess}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
            >
              Password {isEditMode ? '(Leave blank to keep current)' : '*'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              } dark:!border-white/10 dark:text-white`}
              placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-bold text-navy-700 dark:text-white"
            >
              Confirm Password {isEditMode ? '' : '*'}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
              } dark:!border-white/10 dark:text-white`}
              placeholder={
                isEditMode ? 'Confirm new password' : 'Confirm password'
              }
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-navy-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <MdInfoOutline className="h-5 w-5 text-blue-400 dark:text-blue-300" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Password Requirements
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-inside list-disc space-y-1">
                  <li>Minimum 8 characters long</li>
                  <li>Should include uppercase and lowercase letters</li>
                  <li>Should include numbers and special characters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            text="Cancel"
            icon={MdClose}
            size="md"
            color="bg-gray-200"
            // textColor="text-gray-700"
            hoverColor="hover:bg-gray-300"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            text={
              isSubmitting
                ? isEditMode
                  ? 'Updating...'
                  : 'Creating...'
                : isEditMode
                ? 'Update Admin'
                : 'Create Admin'
            }
            icon={isEditMode ? MdSave : MdAdd}
            size="md"
            color="bg-brandGreen"
            hoverColor="hover:bg-brandGreenDark"
            onClick={undefined}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
