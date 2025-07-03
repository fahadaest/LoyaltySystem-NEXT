import { useState } from 'react';
import Card from 'components/card';
import { MdSave, MdClose, MdEmail, MdPhone, MdLanguage } from 'react-icons/md';

const SupportEdit = ({ data, onSave, onCancel }) => {
  const contactData = data?.[0] || {};

  const [formData, setFormData] = useState({
    emailAddress: contactData?.emailAddress || '',
    phoneNumber: contactData?.phoneNumber || '',
    website: contactData?.website || ''
  });

  const [errors, setErrors] = useState({});

  const contactFields = [
    {
      name: 'Email Address',
      key: 'emailAddress',
      icon: MdEmail,
      placeholder: 'Enter your email address',
      type: 'email',
      color: 'text-blue-600',
      focusColor: 'focus:border-blue-500 focus:ring-blue-500',
      validation: (value) => {
        if (!value) return '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      }
    },
    {
      name: 'Phone Number',
      key: 'phoneNumber',
      icon: MdPhone,
      placeholder: 'Enter your phone number',
      type: 'tel',
      color: 'text-green-600',
      focusColor: 'focus:border-green-500 focus:ring-green-500',
      validation: (value) => {
        if (!value) return '';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? '' : 'Please enter a valid phone number';
      }
    },
    {
      name: 'Website',
      key: 'website',
      icon: MdLanguage,
      placeholder: 'Enter your website URL',
      type: 'url',
      color: 'text-purple-600',
      focusColor: 'focus:border-purple-500 focus:ring-purple-500',
      validation: (value) => {
        if (!value) return '';
        try {
          new URL(value.startsWith('http') ? value : `https://${value}`);
          return '';
        } catch {
          return 'Please enter a valid website URL';
        }
      }
    }
  ];

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    contactFields.forEach(field => {
      const error = field.validation(formData[field.key]);
      if (error) {
        newErrors[field.key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Format website URL if needed
      const processedData = {
        ...formData,
        website: formData.website && !formData.website.startsWith('http')
          ? `https://${formData.website}`
          : formData.website
      };

      onSave && onSave([processedData]);
    }
  };

  const handleCancel = () => {
    setFormData({
      emailAddress: contactData?.emailAddress || '',
      phoneNumber: contactData?.phoneNumber || '',
      website: contactData?.website || ''
    });
    setErrors({});
    onCancel && onCancel();
  };

  const hasChanges = () => {
    return (
      formData.emailAddress !== (contactData?.emailAddress || '') ||
      formData.phoneNumber !== (contactData?.phoneNumber || '') ||
      formData.website !== (contactData?.website || '')
    );
  };

  return (
    <Card extra={'items-center w-full h-full p-6 bg-white dark:bg-navy-800'}>
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-6">
        <div>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Edit Contact Information
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Update your primary contact details
          </p>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-md transition-colors"
          >
            <MdClose size={20} />
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges()}
            className={`p-2 rounded-full shadow-md transition-colors ${hasChanges()
              ? 'bg-brandGreen hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <MdSave size={20} />
          </button>
        </div> */}
      </div>

      {/* Form Fields */}
      <div className="w-full space-y-6">
        {contactFields.map((field) => {
          const IconComponent = field.icon;
          const hasError = errors[field.key];
          const hasValue = formData[field.key] && formData[field.key].trim() !== '';

          return (
            <div key={field.key} className="space-y-2">
              {/* Field Label */}
              <div className="flex items-center gap-2">
                <IconComponent size={18} className={field.color} />
                <label className="text-sm font-semibold text-navy-700 dark:text-white">
                  {field.name}
                </label>
                {hasValue && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-xs text-green-600 font-medium">Set</span>
                  </div>
                )}
              </div>

              {/* Input Field */}
              <div className="relative">
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 dark:bg-navy-700 dark:text-white ${hasError
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : `border-gray-200 ${field.focusColor} dark:border-gray-600`
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                />

                {/* Input Icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <IconComponent
                    size={18}
                    className={hasError ? 'text-red-500' : hasValue ? field.color : 'text-gray-400'}
                  />
                </div>
              </div>

              {/* Error Message */}
              {hasError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {hasError}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Actions Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${hasChanges()
              ? 'bg-brandGreen hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Save Changes
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {hasChanges() ? 'You have unsaved changes' : 'All fields are optional'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SupportEdit;