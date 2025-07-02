import { useState } from 'react';
import Card from 'components/card';
import { MdSave, MdCancel } from 'react-icons/md';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaTiktok,
    FaGlobe,
    FaWhatsapp
} from 'react-icons/fa';

const EditSocialLinks = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        facebookLink: data?.facebookLink || '',
        twitterLink: data?.twitterLink || '',
        instagramLink: data?.instagramLink || '',
        linkedinLink: data?.linkedinLink || '',
        tiktokLink: data?.tiktokLink || '',
        websiteLink: data?.websiteLink || '',
        whatsappLink: data?.whatsappLink || '',
        email: data?.email || '',
        phoneNumber: data?.phoneNumber || ''
    });

    const [errors, setErrors] = useState({});

    const socialPlatforms = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            field: 'facebookLink',
            placeholder: 'https://facebook.com/yourusername',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 border-blue-200'
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            field: 'twitterLink',
            placeholder: 'https://twitter.com/yourusername',
            color: 'text-blue-400',
            bgColor: 'bg-blue-50 border-blue-200'
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            field: 'instagramLink',
            placeholder: 'https://instagram.com/yourusername',
            color: 'text-pink-500',
            bgColor: 'bg-pink-50 border-pink-200'
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            field: 'linkedinLink',
            placeholder: 'https://linkedin.com/in/yourusername',
            color: 'text-blue-700',
            bgColor: 'bg-blue-50 border-blue-200'
        },
        {
            name: 'TikTok',
            icon: FaTiktok,
            field: 'tiktokLink',
            placeholder: 'https://tiktok.com/@yourusername',
            color: 'text-black',
            bgColor: 'bg-gray-50 border-gray-200'
        },
        {
            name: 'Website',
            icon: FaGlobe,
            field: 'websiteLink',
            placeholder: 'https://yourwebsite.com',
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200'
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            field: 'whatsappLink',
            placeholder: 'https://wa.me/1234567890',
            color: 'text-green-500',
            bgColor: 'bg-green-50 border-green-200'
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate URLs
        const urlFields = ['facebookLink', 'twitterLink', 'instagramLink', 'linkedinLink', 'tiktokLink', 'websiteLink', 'whatsappLink'];

        urlFields.forEach(field => {
            const value = formData[field];
            if (value && value.trim() !== '') {
                try {
                    new URL(value);
                } catch (e) {
                    newErrors[field] = 'Please enter a valid URL';
                }
            }
        });

        // Validate email
        if (formData.email && formData.email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        // Validate phone number (basic validation)
        if (formData.phoneNumber && formData.phoneNumber.trim() !== '') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
                newErrors.phoneNumber = 'Please enter a valid phone number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleCancel = () => {
        setFormData({
            facebookLink: data?.facebookLink || '',
            twitterLink: data?.twitterLink || '',
            instagramLink: data?.instagramLink || '',
            linkedinLink: data?.linkedinLink || '',
            tiktokLink: data?.tiktokLink || '',
            websiteLink: data?.websiteLink || '',
            whatsappLink: data?.whatsappLink || '',
            email: data?.email || '',
            phoneNumber: data?.phoneNumber || ''
        });
        setErrors({});
        onCancel();
    };

    return (
        <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
            <div className="w-full space-y-6">
                {/* Social Media Links */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialPlatforms.map((platform) => {
                            const IconComponent = platform.icon;
                            const hasError = errors[platform.field];

                            return (
                                <div key={platform.name} className="space-y-2">
                                    <div className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${hasError
                                        ? 'border-red-300 bg-red-50'
                                        : formData[platform.field]
                                            ? `${platform.bgColor}`
                                            : 'border-gray-200 bg-gray-50'
                                        }`}>
                                        <IconComponent
                                            size={24}
                                            className={`mr-3 flex-shrink-0 ${hasError ? 'text-red-500' : platform.color
                                                }`}
                                        />
                                        <div className="flex-grow">
                                            <label className="block text-sm font-medium text-navy-700 dark:text-white mb-1">
                                                {platform.name}
                                            </label>
                                            <input
                                                type="url"
                                                value={formData[platform.field]}
                                                onChange={(e) => handleInputChange(platform.field, e.target.value)}
                                                placeholder={platform.placeholder}
                                                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${hasError
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                    } bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                                            />
                                        </div>
                                    </div>
                                    {hasError && (
                                        <p className="text-xs text-red-600 ml-10">{hasError}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t border-gray-200">
                    <h6 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">
                        Contact Information
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${errors.email
                                ? 'border-red-300 bg-red-50'
                                : formData.email
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'border-gray-200 bg-gray-50'
                                }`}>
                                <label className="block text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${errors.email
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        } bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${errors.phoneNumber
                                ? 'border-red-300 bg-red-50'
                                : formData.phoneNumber
                                    ? 'bg-green-50 border-green-200'
                                    : 'border-gray-200 bg-gray-50'
                                }`}>
                                <label className="block text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    placeholder="+1 234 567 8900"
                                    className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${errors.phoneNumber
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        } bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                                />
                            </div>
                            {errors.phoneNumber && (
                                <p className="text-xs text-red-600">{errors.phoneNumber}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Tips:</strong> Make sure to include the full URL (starting with https://) for all social media links.
                        Leave fields empty if you don't want to display that social platform.
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <MdSave className="mr-2" size={18} />
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <MdCancel className="mr-2" size={18} />
                        Cancel
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default EditSocialLinks;