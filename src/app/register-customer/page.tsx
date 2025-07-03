'use client';
import { useState, useEffect } from 'react';
import { MdEmail, MdPhone, MdPerson, MdPersonOutline } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateCustomerMutation } from 'store/customerApi';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';

const AnimatedContactForm = () => {
    const [createCustomer, { isLoading, isSuccess, isError, error }] = useCreateCustomerMutation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [fieldAnimations, setFieldAnimations] = useState({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const adminId = searchParams.get('adminId');
    const loyalty = searchParams.get('loyalty');
    const isProduct = searchParams.get('isProduct');
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const contactFields = [
        {
            name: 'First Name',
            key: 'firstName',
            icon: MdPerson,
            placeholder: 'Enter your first name',
            type: 'text',
            color: 'text-brandGreen',
            focusColor: 'focus:border-brandGreen focus:ring-brandGreen',
            validation: (value) => {
                if (!value.trim()) return 'First name is required';
                if (value.trim().length < 2) return 'First name must be at least 2 characters';
                return '';
            }
        },
        {
            name: 'Last Name',
            key: 'lastName',
            icon: MdPersonOutline,
            placeholder: 'Enter your last name',
            type: 'text',
            color: 'text-brandGreen',
            focusColor: 'focus:border-brandGreen focus:ring-brandGreen',
            validation: (value) => {
                if (!value.trim()) return 'Last name is required';
                if (value.trim().length < 2) return 'Last name must be at least 2 characters';
                return '';
            }
        },
        {
            name: 'Email Address',
            key: 'email',
            icon: MdEmail,
            placeholder: 'Enter your email address',
            type: 'email',
            color: 'text-brandGreen',
            focusColor: 'focus:border-brandGreen focus:ring-brandGreen',
            validation: (value) => {
                if (!value.trim()) return 'Email address is required';
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
            color: 'text-brandGreen',
            focusColor: 'focus:border-brandGreen focus:ring-brandGreen',
            validation: (value) => {
                if (!value.trim()) return 'Phone number is required';
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? '' : 'Please enter a valid phone number';
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

        // Trigger field animation - faster animation
        setFieldAnimations(prev => ({
            ...prev,
            [key]: true
        }));

        // Reset animation after a shorter delay
        setTimeout(() => {
            setFieldAnimations(prev => ({
                ...prev,
                [key]: false
            }));
        }, 150);
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

    const handleSubmit = async () => {
        if (validateForm()) {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                isProductLoyalty: isProduct,
                loyaltyId: loyalty ? parseInt(loyalty) : 0,
                adminId: adminId ? parseInt(adminId) : 0,
            };

            try {
                await createCustomer(payload).unwrap();
                dispatch(showAlert({ message: "Customer created successfully!", severity: "success", duration: 2000 }));
            } catch (err) {
                console.log(err)
                dispatch(showAlert({ message: err.data.message, severity: "error", duration: 2000 }));
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brandGreenHighlight via-brandGreenHighlight to-brandGreenLight dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(34,197,94,0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className={`w-full max-w-2xl transform transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>

                    {/* Card Container */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">

                        {/* Header Section */}
                        <div className="relative bg-brandGreen p-6 text-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>

                            <div className="relative z-10">
                                {/* Logo */}
                                <div className={`flex items-center justify-center mb-4 transform transition-all duration-500 delay-150 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                                    }`}>
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                                        <div className="w-12 h-12 bg-brandGreen rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                            ☕
                                        </div>
                                    </div>
                                </div>

                                {/* Heading */}
                                <h1 className={`text-2xl font-bold text-center mb-3 transform transition-all duration-500 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    }`}>
                                    Welcome to Coffee House's Loyalty Program
                                </h1>

                                {/* Paragraph */}
                                <p className={`text-base text-center leading-relaxed transform transition-all duration-500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    }`}>
                                    Enter your details to get your QR code for rewards and offers.
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8">
                            <div className="space-y-4">
                                {contactFields.map((field, index) => {
                                    const IconComponent = field.icon;
                                    const hasError = errors[field.key];
                                    const hasValue = formData[field.key] && formData[field.key].trim() !== '';
                                    const isAnimating = fieldAnimations[field.key];

                                    return (
                                        <div
                                            key={field.key}
                                            className={`space-y-2 transform transition-all duration-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                                }`}
                                            style={{ transitionDelay: `${400 + index * 100}ms` }}
                                        >
                                            {/* Field Label */}
                                            <div className="flex items-center gap-2">
                                                <IconComponent size={16} className="text-brandGreen" />
                                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    {field.name}
                                                </label>
                                                {hasValue && (
                                                    <div className="flex items-center animate-fadeIn">
                                                        <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                                                        <span className="text-xs text-brandGreen font-medium">✓</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Input Field */}
                                            <div className="relative group">
                                                <input
                                                    type={field.type}
                                                    value={formData[field.key]}
                                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                            ${hasError
                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                                                        } 
                            focus:outline-none focus:ring-2 focus:ring-opacity-50 
                            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                            ${isAnimating ? 'scale-105' : 'scale-100'}
                            transform`}
                                                />

                                                {/* Input Icon */}
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-150">
                                                    <IconComponent
                                                        size={18}
                                                        className={`${hasError ? 'text-red-500' : hasValue ? 'text-brandGreen' : 'text-gray-400'} 
                              ${isAnimating ? 'scale-110' : 'scale-100'} transform transition-all duration-150`}
                                                    />
                                                </div>

                                                {/* Focus Ring Animation */}
                                                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                                            </div>

                                            {/* Error Message */}
                                            {hasError && (
                                                <div className="animate-slideDown">
                                                    <p className="text-sm text-red-500 flex items-center gap-2">
                                                        <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        {hasError}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Submit Button */}
                                <div className={`pt-4 transform transition-all duration-500 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full bg-brandGreen hover:bg-brandGreen text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isLoading ? 'Submitting...' : 'Register'}
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations - Faster */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
            max-height: 0;
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
            max-height: 50px;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.15s ease-out;
        }
      `}</style>
        </div>
    );
};

export default AnimatedContactForm;