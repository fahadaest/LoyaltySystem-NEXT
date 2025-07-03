import Card from 'components/card';
import { MdEdit, MdEmail, MdPhone, MdLanguage } from 'react-icons/md';

const Support = ({ data, onEdit }) => {
  const contactData = data?.[0] || {};

  const contactFields = [
    {
      name: 'Email Address',
      icon: MdEmail,
      value: contactData?.emailAddress || '',
      placeholder: 'Add your email address',
      href: contactData?.emailAddress ? `mailto:${contactData.emailAddress}` : null,
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'hover:border-blue-300'
    },
    {
      name: 'Phone Number',
      icon: MdPhone,
      value: contactData?.phoneNumber || '',
      placeholder: 'Add your phone number',
      href: contactData?.phoneNumber ? `tel:${contactData.phoneNumber}` : null,
      color: 'text-green-600 hover:text-green-700',
      bgColor: 'hover:bg-green-50',
      borderColor: 'hover:border-green-300'
    },
    {
      name: 'Website',
      icon: MdLanguage,
      value: contactData?.website || '',
      placeholder: 'Add your website URL',
      href: contactData?.website || null,
      color: 'text-purple-600 hover:text-purple-700',
      bgColor: 'hover:bg-purple-50',
      borderColor: 'hover:border-purple-300'
    }
  ];

  const handleContactClick = (href) => {
    if (href) {
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <Card extra={'items-center w-full h-full p-6 bg-white dark:bg-navy-800'}>
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center w-full mb-6">
        <div>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Contact Information
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Your primary contact details
          </p>
        </div>
        {/* {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 bg-brandGreen hover:bg-green-600 text-white rounded-full shadow-md transition-colors"
          >
            <MdEdit size={20} />
          </button>
        )} */}
      </div>

      {/* Contact Fields */}
      <div className="w-full space-y-4">
        {contactFields.map((field) => {
          const IconComponent = field.icon;
          const isActive = field.value && field.value.trim() !== '';

          return (
            <div
              key={field.name}
              className={`relative flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${isActive
                ? `cursor-pointer ${field.bgColor} border-gray-200 ${field.borderColor} hover:shadow-lg transform hover:-translate-y-1`
                : 'border-gray-100 bg-gray-50 dark:bg-navy-700 opacity-60'
                }`}
              onClick={() => isActive && handleContactClick(field.href)}
            >
              {/* Icon */}
              <div className={`p-3 rounded-full ${isActive ? 'bg-white shadow-md' : 'bg-gray-200'} mr-4`}>
                <IconComponent
                  size={24}
                  className={isActive ? field.color : 'text-gray-400'}
                />
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold ${isActive ? 'text-navy-700 dark:text-white' : 'text-gray-400'
                    }`}>
                    {field.name}
                  </span>
                  {isActive && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  )}
                </div>

                {isActive ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                    {field.value}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    {field.placeholder}
                  </p>
                )}
              </div>

              {/* Click indicator */}
              {isActive && (
                <div className="ml-3 opacity-60">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 justify-center">
          {contactFields.filter(field => field.value && field.value.trim() !== '').map((field) => (
            <button
              key={field.name}
              onClick={() => handleContactClick(field.href)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${field.color} ${field.bgColor} border`}
            >
              {field.name}
            </button>
          ))}
        </div>
        {contactFields.every(field => !field.value || field.value.trim() === '') && (
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            Add your contact information to get started
          </p>
        )}
      </div>
    </Card>
  );
};

export default Support;