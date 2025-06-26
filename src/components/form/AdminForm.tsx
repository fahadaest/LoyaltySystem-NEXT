import React, { useState, useEffect } from 'react';
import Button from 'components/button/Button';
import { MdOutlineArrowBack, MdSave, MdAdd, MdCheckCircle, MdAutorenew, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';
import { CheckCircle } from '@mui/icons-material';
import { useCreateAdminMutation, useUpdateAdminMutation } from 'store/adminApi';
import { useListSubscriptionsQuery } from 'store/subscriptionApi';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from 'store/alertSlice';

const countryCodes = [
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
];

const InputField = ({ label, name, type = "text", value, onChange, error, placeholder, onToggleVisibility, isPassword }: any) => (
  <div>
    <label htmlFor={name} className="mb-2 block text-sm font-bold">{label}</label>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full h-12 p-3 rounded-xl text-sm outline-none border ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {isPassword && (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {type === "password" ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
        </button>
      )}
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const AdminForm = ({ initialData = {}, onSubmit, isEditMode = false, handleCloseModal }: any) => {
  const [createAdmin, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateAdminMutation();
  const { data: subscriptions = [] } = useListSubscriptionsQuery();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: '', role: 'Admin', status: 'Active',
    countryCode: '+971', phoneNumber: '', loyaltyAccess: { pointBased: false, productBased: false },
    subscriptionId: '', ...initialData
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      const phoneMatch = initialData.phoneNumber?.match(/^(\+\d{1,4})(\d{10,15})$/);
      const countryCode = phoneMatch?.[1] || '+971';
      const phoneNumber = phoneMatch?.[2] || initialData.phoneNumber || '';
      setFormData((prev) => ({
        ...prev, name: [initialData.firstName, initialData.lastName].join(' '),
        email: initialData.email, role: initialData.role, status: initialData.status,
        countryCode, phoneNumber, loyaltyAccess: { pointBased: initialData.pointBasedLoyalty, productBased: initialData.productBasedLoyalty },
        subscriptionId: initialData.subscriptionId || ''
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
    setFormData((p) => ({
      ...p,
      loyaltyAccess: { ...p.loyaltyAccess, [name]: checked }
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const validateForm = () => {
    const errs: any = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) errs.phoneNumber = 'Phone number must be 10-15 digits';
    if (!isEditMode || formData.password || formData.confirmPassword) {
      if (!formData.password) errs.password = 'Password is required';
      else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) errs.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.subscriptionId) errs.subscriptionId = 'Subscription plan is required';
    if (!formData.loyaltyAccess.pointBased && !formData.loyaltyAccess.productBased) {
      errs.loyaltyAccess = 'Please select at least one loyalty access option';
    }
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
        firstName, lastName, email: formData.email, password: formData.password || undefined,
        phoneNumber: formData.countryCode + formData.phoneNumber.replace(/\D/g, ''),
        role: formData.role.toLowerCase(), status: formData.status.toLowerCase(), subscriptionId: Number(formData.subscriptionId),
        pointBasedLoyalty: formData.loyaltyAccess.pointBased, productBasedLoyalty: formData.loyaltyAccess.productBased
      };

      if (isEditMode) {
        // Update admin
        await updateAdmin({ id: initialData.id, data: payload }).unwrap();
        dispatch(showAlert({ message: 'Admin updated successfully!', severity: 'success', duration: 2000 }));
      } else {
        // Create admin
        await createAdmin(payload).unwrap();
        dispatch(showAlert({ message: 'Admin created successfully!', severity: 'success', duration: 2000 }));
      }

      onSubmit && onSubmit(formData);
      setTimeout(() => {
        handleCloseModal();
      }, 2000);

    } catch (err) {
      console.error('Failed to submit form:', err);
      dispatch(showAlert({ message: 'Something went wrong!', severity: 'error', duration: 2000 }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full px-6 py-8">
      {(isCreating || isUpdating) ? (
        <div className="flex flex-col mt-10 mb-10 justify-center items-center space-x-2 text-gray-600">
          <CircularProgress size={104} style={{ color: '#36a18f' }} />
        </div>
      ) : (isCreateSuccess || isUpdateSuccess) ? (
        <div className="flex flex-col justify-center items-center space-x-2 text-green-600 font-semibold text-center">
          <CheckCircle sx={{ fontSize: 40, color: '#36a18f' }} />
          <span className='text-brandGreen'>{isEditMode ? 'Admin updated successfully!' : 'Admin created successfully!'}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InputField label="Full Name *" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Enter full name" />
            <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="Enter email address" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InputField
              label={`Password ${isEditMode ? '(Leave blank to keep current)' : '*'}`}
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
              onToggleVisibility={togglePasswordVisibility}
              isPassword
            />
            <InputField
              label={`Confirm Password ${isEditMode ? '' : '*'}`}
              name="confirmPassword"
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder={isEditMode ? 'Confirm new password' : 'Confirm password'}
              onToggleVisibility={toggleConfirmPasswordVisibility}
              isPassword
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label htmlFor="phoneNumber" className="mb-2 block text-sm font-bold">Phone Number *</label>
              <div className="flex rounded-xl border">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="rounded-l-xl px-3 py-3 text-sm outline-none border">
                  {countryCodes.map(({ code, flag }) => (
                    <option key={code} value={code}>{flag} {code}</option>
                  ))}
                </select>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`flex-1 rounded-r-xl px-4 py-3 text-sm outline-none ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter phone number" />
              </div>
              {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label htmlFor="subscriptionId" className="mb-2 block text-sm font-bold">Subscription Plan *</label>
              <select id="subscriptionId" name="subscriptionId" value={formData.subscriptionId || ""} onChange={handleChange} className={`mt-2 h-12 w-full p-3 rounded-xl text-sm outline-none border ${errors.subscriptionId ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select a subscription plan</option>
                {subscriptions.map(subscription => (
                  <option key={subscription.id} value={subscription.id}>{subscription.name}</option>
                ))}
              </select>
              {errors.subscriptionId && <p className="mt-2 text-sm text-red-600">{errors.subscriptionId}</p>}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold">Loyalty Access *</label>
            <div className="flex flex-wrap gap-6">
              {['pointBased', 'productBased'].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={type}
                    name={type}
                    checked={formData.loyaltyAccess[type]}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={type} className="ml-2 text-sm">
                    {type === 'pointBased' ? 'Point-Based Loyalty' : 'Product-Based Loyalty'}
                  </label>
                </div>
              ))}
            </div>
            {errors.loyaltyAccess && <p className="mt-2 text-sm text-red-600">{errors.loyaltyAccess}</p>}
          </div>

          <div className="pt-4">
            <Button onClick={() => { }} type="submit" disabled={isSubmitting} text={isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Admin' : 'Create Admin')} icon={isEditMode ? MdSave : MdAdd} size="lg" color="bg-brandGreen" hoverColor="hover:bg-brandGreenDark" className="w-full" />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminForm;