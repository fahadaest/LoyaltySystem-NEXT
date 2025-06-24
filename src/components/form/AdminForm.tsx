'use client';
import React, { useState, useEffect } from 'react';
import Button from 'components/button/Button';
import { MdOutlineArrowBack, MdSave, MdAdd, MdInfoOutline, MdClose, MdCheckCircle, MdAutorenew, } from 'react-icons/md';
import { useCreateAdminMutation, useUpdateAdminMutation } from 'store/adminApi';

const countryCodes = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' }, { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+33', country: 'FR', flag: '🇫🇷' }, { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+91', country: 'IN', flag: '🇮🇳' }, { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' }, { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+61', country: 'AU', flag: '🇦🇺' }, { code: '+82', country: 'KR', flag: '🇰🇷' },
];

const subscriptionOptions = [
  { id: '1', name: 'Basic Plan' },
  { id: '2', name: 'Pro Plan' },
  { id: '3', name: 'Enterprise Plan' },
];

interface InputFieldProps {
  label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; placeholder?: string;
}

const InputField = ({ label, name, type = "text", value, onChange, error, placeholder }: InputFieldProps) => (
  <div>
    <label htmlFor={name} className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none 
        ${error ? 'border-red-500' : 'border-gray-200'} dark:!border-white/10 dark:text-white`}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
);


const AdminForm = ({ initialData = {}, onSubmit, onCancel, isEditMode = false }: any) => {
  const [createAdmin, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateAdminMutation();
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: '',
    role: 'Admin', status: 'Active', countryCode: '+1', phoneNumber: '',
    loyaltyAccess: { pointBased: false, productBased: false },
    subscriptionId: '',
    ...initialData,
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(formData)

  useEffect(() => {
    if (initialData && Object.keys(initialData).length) {
      const phoneMatch = initialData.phoneNumber?.match(/^(\+\d{1,4})(\d{10,15})$/);
      const countryCode = phoneMatch?.[1] || '+1';
      const phoneNumber = phoneMatch?.[2] || initialData.phoneNumber || '';

      setFormData((prev) => ({
        ...prev,
        name: [initialData.firstName, initialData.lastName].filter(Boolean).join(' '),
        email: initialData.email || '',
        role: initialData.role || 'Admin',
        status: initialData.status || 'Active',
        countryCode,
        phoneNumber,
        loyaltyAccess: {
          pointBased: initialData.pointBasedLoyalty ?? false,
          productBased: initialData.productBasedLoyalty ?? false,
        },
        password: '',
        confirmPassword: '',
        subscriptionId: initialData.subscriptionId || '',
      }));
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p: any) => ({ ...p, [name]: '' }));
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    setFormData((p) => ({ ...p, loyaltyAccess: { ...p.loyaltyAccess, [name]: checked } }));
  };

  const validateForm = () => {
    const errs: any = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, '')))
      errs.phoneNumber = 'Phone number must be 10-15 digits';
    if (!isEditMode || formData.password || formData.confirmPassword) {
      if (!formData.password) errs.password = 'Password is required';
      else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) errs.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword)
        errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.subscriptionId) {
      errs.subscriptionId = 'Subscription plan is required';
    }
    if (!formData.loyaltyAccess.pointBased && !formData.loyaltyAccess.productBased)
      errs.loyaltyAccess = 'Please select at least one loyalty access option';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const [firstName = '', lastName = ''] = formData.name.trim().split(/ (.+)/);

    try {
      const payload = {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password || undefined,
        phoneNumber: formData.countryCode + formData.phoneNumber.replace(/\D/g, ''),
        role: formData.role.toLowerCase(),
        status: formData.status.toLowerCase(),
        subscriptionId: Number(formData.subscriptionId),
        pointBasedLoyalty: formData.loyaltyAccess.pointBased,
        productBasedLoyalty: formData.loyaltyAccess.productBased,
      };

      console.log(payload)

      if (isEditMode) {
        await updateAdmin({ id: initialData.id, data: payload }).unwrap();
      } else {
        await createAdmin(payload).unwrap();
      }

      onSubmit && onSubmit(formData);
    } catch (err) {
      console.error('Failed to submit form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full px-4 py-6">
      {(isCreating || isUpdating) ? (
        <div className="flex justify-center items-center space-x-2 text-gray-600 dark:text-gray-300">
          <MdAutorenew className="animate-spin" size={18} />
          <span className="text-sm">Loading...</span>
        </div>
      ) : (isCreateSuccess || isUpdateSuccess) ? (
        <div className="flex justify-center items-center space-x-2 text-green-600 dark:text-green-400 font-semibold text-center">
          <MdCheckCircle size={18} />
          <span>{isEditMode ? 'Admin updated successfully!' : 'Admin created successfully!'}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InputField label="Full Name *" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Enter full name" />
            <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="Enter email address" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InputField label={`Password ${isEditMode ? '(Leave blank to keep current)' : '*'}`} name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder={isEditMode ? 'Enter new password' : 'Enter password'} />
            <InputField label={`Confirm Password ${isEditMode ? '' : '*'}`} name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder={isEditMode ? 'Confirm new password' : 'Confirm password'} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label htmlFor="phoneNumber" className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">Phone Number *</label>
              <div className="flex rounded-xl border border-gray-200 dark:!border-white/10">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="rounded-l-xl bg-white/0 px-3 py-3 text-sm outline-none dark:text-white">
                  {countryCodes.map(({ code, flag }) => (
                    <option key={code} value={code}>{flag} {code}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`flex-1 rounded-r-xl bg-white/0 px-4 py-3 text-sm outline-none dark:text-white ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-navy-700 dark:text-white">Loyalty Access *</label>
              <div className="flex flex-wrap gap-6">
                {['pointBased', 'productBased'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type}
                      name={type}
                      checked={formData.loyaltyAccess[type]}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-brandLinear focus:ring-brandLinear dark:border-white/10"
                    />
                    <label htmlFor={type} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {type === 'pointBased' ? 'Point-Based Loyalty' : 'Product-Based Loyalty'}
                    </label>
                  </div>
                ))}
              </div>
              {errors.loyaltyAccess && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.loyaltyAccess}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Subscription Plan Dropdown */}
            <div>
              <label htmlFor="subscriptionId" className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                Subscription Plan *
              </label>
              <select
                id="subscriptionId"
                name="subscriptionId"
                value={formData.subscriptionId}
                onChange={handleChange}
                className={`mt-2 flex h-12 w-full rounded-xl border bg-white/0 p-3 text-sm outline-none 
                  ${errors.subscriptionId ? 'border-red-500' : 'border-gray-200'} dark:!border-white/10 dark:text-white`}
              >
                <option value="">Select a subscription plan</option>
                {subscriptionOptions.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
              {errors.subscriptionId && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.subscriptionId}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              text={isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Admin' : 'Create Admin')}
              icon={isEditMode ? MdSave : MdAdd}
              size="md"
              color="bg-brandGreen"
              hoverColor="hover:bg-brandGreenDark"
              className="w-full"
              onClick={() => { }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminForm;