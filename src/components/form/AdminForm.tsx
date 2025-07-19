import React from 'react';
import Button from 'components/button/Button';
import { MdSave, MdAdd, MdVisibility, MdVisibilityOff, MdPerson, MdEmail, MdLock, MdPhone, MdSchedule, MdEventNote } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';
import { CheckCircle } from '@mui/icons-material';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedPhoneInput from 'components/ui/AnimatedPhoneInput';
import AnimatedDateTimeInput from 'components/ui/AnimatedDateTimeInput'; // Import the new component
import { Eye, EyeOff } from 'lucide-react';

const AdminForm = ({
  formData,
  errors,
  subscriptions,
  isEditMode,
  isSubmitting,
  isCreating,
  isUpdating,
  isCreateSuccess,
  isUpdateSuccess,
  passwordVisible,
  confirmPasswordVisible,
  onChange,
  onCheckboxChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onSubmit
}) => {
  return (
    <div className="h-full w-full px-6 py-8">
      {(isCreating || isUpdating) ? (
        <div className="flex flex-col mt-10 mb-10 justify-center items-center space-x-2 text-gray-600">
          <CircularProgress size={104} style={{ color: '#36a18f' }} />
        </div>
      ) : (isCreateSuccess && !isEditMode) ? (
        <div className="flex flex-col justify-center items-center space-x-2 text-green-600 font-semibold text-center">
          <CheckCircle sx={{ fontSize: 40, color: '#36a18f' }} />
          <span className='text-brandGreen'>
            Admin created successfully!
          </span>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6 px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AnimatedInput
              label="Full Name"
              icon={MdPerson}
              name="name"
              value={formData.name}
              onChange={(value) => onChange({ target: { name: 'name', value } })}
              error={errors.name}
              placeholder="Enter full name"
              required
            />
            <AnimatedInput
              label="Email Address"
              icon={MdEmail}
              name="email"
              type="email"
              value={formData.email}
              onChange={(value) => onChange({ target: { name: 'email', value } })}
              error={errors.email}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AnimatedPhoneInput
              label="Phone Number"
              icon={MdPhone}
              value={formData.phoneNumber}
              onChange={(value) => onChange({ target: { name: 'phoneNumber', value } })}
              countryCode={formData.countryCode}
              onCountryChange={(code) => onChange({ target: { name: 'countryCode', value: code } })}
              error={errors.phoneNumber}
              placeholder="Enter phone number"
              required
            />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Subscription Plan
                  <span className="text-red-500 ml-1">*</span>
                </span>
                {formData.subscriptionId && (
                  <div className="flex items-center animate-fadeIn">
                    <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                    <span className="text-xs text-brandGreen font-medium">✓</span>
                  </div>
                )}
              </div>
              <div className="relative group">
                <select
                  name="subscriptionId"
                  value={formData.subscriptionId || ""}
                  onChange={onChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                    ${errors.subscriptionId
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                    }  
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white
                    transform`}
                >
                  <option value="">Select a subscription plan</option>
                  {subscriptions.map(subscription => (
                    <option key={subscription.id} value={subscription.id}>{subscription.name}</option>
                  ))}
                </select>
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
              </div>
              {errors.subscriptionId && (
                <div className="animate-slideDown">
                  <p className="text-sm text-red-500 flex items-center gap-2">
                    <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.subscriptionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="relative">
              <AnimatedInput
                label={`Password ${isEditMode ? '(Leave blank to keep current)' : ''}`}
                icon={MdLock}
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={(value) => onChange({ target: { name: 'password', value } })}
                error={errors.password}
                placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
                required={!isEditMode}
              />
              <button
                type="button"
                onClick={onTogglePasswordVisibility}
                className="absolute right-3 top-11 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                {passwordVisible ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <div className="relative">
              <AnimatedInput
                label={`Confirm Password ${isEditMode ? '' : ''}`}
                icon={MdLock}
                name="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(value) => onChange({ target: { name: 'confirmPassword', value } })}
                error={errors.confirmPassword}
                placeholder={isEditMode ? 'Confirm new password' : 'Confirm password'}
                required={!isEditMode}
              />
              <button
                type="button"
                onClick={onToggleConfirmPasswordVisibility}
                className="absolute right-3 top-11 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                {confirmPasswordVisible ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* New Date/Time Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AnimatedDateTimeInput
              label="Start Date & Time"
              icon={MdSchedule}
              value={formData.startDate}
              onChange={(value) => onChange({ target: { name: 'startDate', value } })}
              error={errors.startDate}
              placeholder="Select start date and time (optional)"
              required={false} min={undefined} max={undefined} />

            <AnimatedDateTimeInput
              label="End Date & Time"
              icon={MdEventNote}
              value={formData.endDate}
              onChange={(value) => onChange({ target: { name: 'endDate', value } })}
              error={errors.endDate}
              placeholder="Select end date and time (optional)"
              required={false}
              min={formData.startDate} // End date should be after start date
              max={undefined} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Loyalty Access
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-6 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 hover:border-gray-300">
              {['pointBased', 'productBased'].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={type}
                    name={type}
                    checked={formData.loyaltyAccess[type]}
                    onChange={onCheckboxChange}
                    className="h-4 w-4 text-brandGreen border-gray-300 rounded focus:ring-brandGreen focus:ring-2"
                  />
                  <label htmlFor={type} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {type === 'pointBased' ? 'Point-Based Loyalty' : 'Product-Based Loyalty'}
                  </label>
                </div>
              ))}
            </div>
            {errors.loyaltyAccess && (
              <div className="animate-slideDown">
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.loyaltyAccess}
                </p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminForm;