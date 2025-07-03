import React, { useState, useEffect } from 'react';
import { MdGavel, MdSecurity, MdPrivacyTip, MdWarning, MdContactSupport, MdUpdate, MdVerifiedUser, MdPolicy, MdEdit, MdSave, MdCancel } from 'react-icons/md';

const Card = ({ children, extra = '' }) => (
  <div className={`rounded-lg shadow-lg ${extra}`}>
    {children}
  </div>
);

const TermsAndConditions = ({
  termsDetail,
  isEditing,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [editedSections, setEditedSections] = useState({});

  const defaultSections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: MdGavel,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      content: termsDetail?.[0]?.text || `By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'use-license',
      title: 'Use License',
      icon: MdVerifiedUser,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      content: `Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on our website; or remove any copyright or other proprietary notations from the materials.`
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: MdPrivacyTip,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.`
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      icon: MdWarning,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      content: `You may not use our service: for any unlawful purpose or to solicit others to perform unlawful acts; to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances; to infringe upon or violate our intellectual property rights or the intellectual property rights of others; to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; to submit false or misleading information.`
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      icon: MdPolicy,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      content: `The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express, implied, statutory or otherwise. This Company shall not be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever.`
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: MdSecurity,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      id: 'updates',
      title: 'Terms Updates',
      icon: MdUpdate,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      content: `We reserve the right to update these terms and conditions at any time without prior notice. Your continued use of our service after any changes indicates your acceptance of the new terms and conditions.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: MdContactSupport,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      content: `If you have any questions about these Terms and Conditions, please contact us through our official support channels. We are committed to addressing your concerns and providing clarification on any aspect of our terms.`
    }
  ];

  const [sections, setSections] = useState(defaultSections);

  // Initialize editedSections when entering edit mode
  useEffect(() => {
    if (isEditing) {
      const initialEditData = {};
      sections.forEach(section => {
        initialEditData[section.id] = {
          title: section.title,
          content: section.content
        };
      });
      setEditedSections(initialEditData);
    }
  }, [isEditing, sections]);

  // Update sections when termsDetail changes
  useEffect(() => {
    if (termsDetail && termsDetail.length > 0) {
      const updatedSections = sections.map((section, index) => ({
        ...section,
        content: termsDetail[index]?.text || section.content
      }));
      setSections(updatedSections);
    }
  }, [termsDetail]);

  const handleSave = () => {
    const firstSection = sections[0];
    const updatedTermsData = {
      text: editedSections[firstSection.id]?.content || firstSection.content
    };

    onSave(updatedTermsData);
  };

  const handleCancel = () => {
    setEditedSections({});
    onCancel();
  };

  const handleInputChange = (sectionId, field, value) => {
    setEditedSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800">
      <div className="w-full mx-auto">
        {/* Header */}
        <Card extra="bg-white dark:bg-navy-800 p-8 mb-8 border-l-4 border-blue-500">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <MdGavel size={48} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-2">
              **Terms & Conditions**
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Please read these terms carefully before using our service
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Edit Controls - Only show if not controlled by parent */}
            {onSave === undefined && (
              <div className="mt-6 flex justify-center space-x-4">
                {!isEditing ? (
                  <button
                    // onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MdEdit size={20} className="mr-2" />
                    Edit Terms
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen transition-colors disabled:opacity-50"
                    >
                      <MdSave size={20} className="mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <MdCancel size={20} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Show save/cancel buttons when in edit mode and controlled by parent */}
            {isEditing && onSave && (
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen transition-colors disabled:opacity-50"
                >
                  <MdSave size={20} className="mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <MdCancel size={20} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} extra={`bg-white dark:bg-navy-800 overflow-hidden border-l-4 ${section.borderColor}`}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${section.bgColor} mr-4`}>
                      <IconComponent size={24} className={section.color} />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedSections[section.id]?.title || section.title}
                        onChange={(e) => handleInputChange(section.id, 'title', e.target.value)}
                        className="text-xl font-bold text-navy-700 dark:text-white bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none flex-1"
                      />
                    ) : (
                      <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                        {section.title}
                      </h2>
                    )}
                  </div>

                  {isEditing ? (
                    <textarea
                      value={editedSections[section.id]?.content || section.content}
                      onChange={(e) => handleInputChange(section.id, 'content', e.target.value)}
                      rows={4}
                      className="w-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-navy-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-vertical"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <Card extra="bg-white dark:bg-navy-800 p-6 mt-8 text-center">
          <div className="flex items-center justify-center mb-3">
            <MdVerifiedUser size={24} className="text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-600">
              Terms Acknowledged
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;