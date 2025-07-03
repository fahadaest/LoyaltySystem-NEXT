import Card from 'components/card';
import Image from 'next/image';
import { MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { useState, useEffect } from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaGlobe,
  FaWhatsapp
} from 'react-icons/fa';
import Button from 'components/button/Button';

const SocialLinks = ({ data, onEdit, onSave, onCancel, isEditMode }) => {

  const socialData = Array.isArray(data) ? data[0] : data;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    facebookLink: socialData?.facebookLink || '',
    twitterLink: socialData?.twitterLink || '',
    instagramLink: socialData?.instagramLink || '',
    linkedInLink: socialData?.linkedInLink || '',
    tikTokLink: socialData?.tikTokLink || '',
    websiteLink: socialData?.websiteLink || '',
    whatsappNumber: socialData?.whatsappNumber || '',
    email: socialData?.email || '',
    phoneNumber: socialData?.phoneNumber || ''
  });

  useEffect(() => {
    if (isEditMode !== undefined) {
      setIsEditing(isEditMode);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (socialData) {
      setEditData({
        facebookLink: socialData?.facebookLink || '',
        twitterLink: socialData?.twitterLink || '',
        instagramLink: socialData?.instagramLink || '',
        linkedInLink: socialData?.linkedInLink || '',
        tikTokLink: socialData?.tikTokLink || '',
        websiteLink: socialData?.websiteLink || '',
        whatsappNumber: socialData?.whatsappNumber || '',
        email: socialData?.email || '',
        phoneNumber: socialData?.phoneNumber || ''
      });
    }
  }, [socialData]);

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: isEditing ? editData.facebookLink : (socialData?.facebookLink || ''),
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50',
      field: 'facebookLink',
      placeholder: 'https://facebook.com/username'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: isEditing ? editData.twitterLink : (socialData?.twitterLink || ''),
      color: 'text-blue-400 hover:text-blue-500',
      bgColor: 'hover:bg-blue-50',
      field: 'twitterLink',
      placeholder: 'https://twitter.com/username'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: isEditing ? editData.instagramLink : (socialData?.instagramLink || ''),
      color: 'text-pink-500 hover:text-pink-600',
      bgColor: 'hover:bg-pink-50',
      field: 'instagramLink',
      placeholder: 'https://instagram.com/username'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: isEditing ? editData.linkedInLink : (socialData?.linkedInLink || ''),
      color: 'text-blue-700 hover:text-blue-800',
      bgColor: 'hover:bg-blue-50',
      field: 'linkedInLink',
      placeholder: 'https://linkedin.com/in/username'
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      url: isEditing ? editData.tikTokLink : (socialData?.tikTokLink || ''),
      color: 'text-black hover:text-gray-800',
      bgColor: 'hover:bg-gray-50',
      field: 'tikTokLink',
      placeholder: 'https://tiktok.com/@username'
    },
    {
      name: 'Website',
      icon: FaGlobe,
      url: isEditing ? editData.websiteLink : (socialData?.websiteLink || ''),
      color: 'text-green-600 hover:text-green-700',
      bgColor: 'hover:bg-green-50',
      field: 'websiteLink',
      placeholder: 'https://yourwebsite.com'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: isEditing ? editData.whatsappNumber : (socialData?.whatsappNumber || ''),
      color: 'text-green-500 hover:text-green-600',
      bgColor: 'hover:bg-green-50',
      field: 'whatsappNumber',
      placeholder: 'https://wa.me/1234567890 or +1234567890'
    }
  ];

  const handleSaveClick = async () => {
    if (onSave) {
      try {
        const updatePayload = {
          facebookLink: editData.facebookLink,
          twitterLink: editData.twitterLink,
          instagramLink: editData.instagramLink,
          linkedInLink: editData.linkedInLink,
          tikTokLink: editData.tikTokLink,
          websiteLink: editData.websiteLink,
          whatsappNumber: editData.whatsappNumber
        };

        await onSave(updatePayload);
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    // Reset edit data to original data
    setEditData({
      facebookLink: socialData?.facebookLink || '',
      twitterLink: socialData?.twitterLink || '',
      instagramLink: socialData?.instagramLink || '',
      linkedInLink: socialData?.linkedInLink || '',
      tikTokLink: socialData?.tikTokLink || '',
      websiteLink: socialData?.websiteLink || '',
      whatsappNumber: socialData?.whatsappNumber || '',
      email: socialData?.email || '',
      phoneNumber: socialData?.phoneNumber || ''
    });
    setIsEditing(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialClick = (url) => {
    if (url && !isEditing) {
      // Handle WhatsApp numbers that might not be full URLs
      if (url.includes('wa.me') || url.startsWith('+') || url.startsWith('00')) {
        const whatsappUrl = url.startsWith('http') ? url : `https://wa.me/${url.replace(/[^\d]/g, '')}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Show loading state if no data
  if (!socialData && !isEditing) {
    return (
      <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">No social links data available</div>
        </div>
      </Card>
    );
  }

  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>

      <div className="mt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            const isActive = platform.url && platform.url.trim() !== '';

            return (
              <div
                key={platform.name}
                className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${isEditing
                  ? 'border-gray-300 bg-gray-50'
                  : isActive
                    ? `cursor-pointer ${platform.bgColor} border-gray-200 hover:border-gray-300 hover:shadow-md`
                    : 'border-gray-100 opacity-50 cursor-not-allowed'
                  }`}
                onClick={() => !isEditing && isActive && handleSocialClick(platform.url)}
              >
                <IconComponent
                  size={28}
                  className={`mr-4 flex-shrink-0 ${isActive || isEditing ? platform.color : 'text-gray-400'
                    }`}
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    <span
                      className={`text-sm font-medium ${isActive || isEditing ? 'text-navy-700 dark:text-white' : 'text-gray-400'
                        }`}
                    >
                      {platform.name}
                    </span>
                    {!isEditing && isActive && (
                      <div className="ml-2 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type={platform.field === 'whatsappNumber' ? 'text' : 'url'}
                      value={editData[platform.field]}
                      onChange={(e) => handleInputChange(platform.field, e.target.value)}
                      placeholder={platform.placeholder}
                      className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : isActive ? (
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {platform.url}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">
                      No link added
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save and Cancel buttons at the bottom when editing */}
        {isEditing && (
          <div className="mt-6 flex justify-end gap-3">

            <Button
              icon={MdCancel}
              text="Cancel"
              size="md"
              color="bg-gray-500"
              onClick={handleCancelClick}
              className="mt-4"
            />

            <Button
              icon={MdSave}
              text=" Save Changes"
              size="md"
              color="bg-brandGreen"
              onClick={handleSaveClick}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default SocialLinks;