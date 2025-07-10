'use client';
import { useState, useEffect } from 'react';
import { MdEmail, MdPhone, MdPerson, MdPersonOutline, MdWallet, MdCheckCircle } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateCustomerMutation } from 'store/apiEndPoints/customerApi';
import { useDownloadAppleWalletPassMutationMutation } from 'store/apiEndPoints/appleWalletApi';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { CircularProgress } from '@mui/material';

const AnimatedContactForm = () => {
    const [createCustomer, { isLoading, isSuccess, isError, error }] = useCreateCustomerMutation();
    const [downloadPass] = useDownloadAppleWalletPassMutationMutation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [fieldAnimations, setFieldAnimations] = useState({});
    const [customerResponse, setCustomerResponse] = useState(null);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [isDownloadingCard, setIsDownloadingCard] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const adminId = searchParams.get('adminId');
    const loyalty = searchParams.get('loyalty');
    const type = searchParams.get('type');
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const isIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };

    const isSafari = () => {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    };

    const isAndroid = () => {
        return /Android/.test(navigator.userAgent);
    };

    const canUseAppleWallet = () => {
        return isIOS() && isSafari();
    };

    const autoHandleLoyaltyCard = async (serialNumber) => {
        if (!serialNumber) return;

        setIsDownloadingCard(true);

        try {
            if (canUseAppleWallet()) {
                setDownloadStatus('Adding to Apple Wallet...');
                const blob = await downloadPass(serialNumber).unwrap();
                const url = URL.createObjectURL(blob);
                window.location.href = url;
                setDownloadStatus('Added to Apple Wallet successfully!');

                dispatch(showAlert({
                    message: "Loyalty card added to Apple Wallet!",
                    severity: "success",
                    duration: 3000
                }));
            } else if (isAndroid()) {
                setDownloadStatus('Downloading loyalty card...');
                const blob = await downloadPass(serialNumber).unwrap();

                // Create download link for Android
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `loyalty-card-${serialNumber}.pkpass`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setDownloadStatus('Loyalty card downloaded successfully!');

                dispatch(showAlert({
                    message: "Loyalty card downloaded to your device!",
                    severity: "success",
                    duration: 3000
                }));
            } else {
                // For other devices, show manual download option
                setDownloadStatus('Loyalty card is ready for download');
                dispatch(showAlert({
                    message: "Your loyalty card is ready! Click the button below to download.",
                    severity: "info",
                    duration: 4000
                }));
            }
        } catch (error) {
            console.error('Auto download/add failed:', error);
            setDownloadStatus('Ready for manual download');
            dispatch(showAlert({
                message: "Your loyalty card is ready! Click the button below to download.",
                severity: "info",
                duration: 4000
            }));
        } finally {
            setIsDownloadingCard(false);
        }
    };

    const contactFields = [
        {
            name: 'Name',
            key: 'firstName',
            icon: MdPerson,
            placeholder: 'Enter your name',
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

        if (errors[key]) {
            setErrors(prev => ({
                ...prev,
                [key]: ''
            }));
        }

        setFieldAnimations(prev => ({
            ...prev,
            [key]: true
        }));

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

    const getSerialNumber = (downloadUrl) => {
        return downloadUrl ? downloadUrl.split('/').pop() : null;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                type: type,
                loyaltyId: loyalty ? parseInt(loyalty) : 0,
                adminId: adminId ? parseInt(adminId) : 0,
            };

            try {
                const response = await createCustomer(payload).unwrap();
                setCustomerResponse(response);
                setShowSuccessScreen(true);

                dispatch(showAlert({
                    message: "Registration successful! Your loyalty card is ready.",
                    severity: "success",
                    duration: 3000
                }));

                // Auto-handle loyalty card download/add to wallet
                if (response?.appleWalletPass?.available && response?.appleWalletPass?.downloadUrl) {
                    const serialNumber = getSerialNumber(response.appleWalletPass.downloadUrl);
                    if (serialNumber) {
                        // Small delay to let success screen appear first
                        setTimeout(() => {
                            autoHandleLoyaltyCard(serialNumber);
                        }, 1000);
                    }
                }
            } catch (err) {
                console.log(err);
                dispatch(showAlert({
                    message: err.data?.message || 'Registration failed',
                    severity: "error",
                    duration: 2000
                }));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        });
        setCustomerResponse(null);
        setShowSuccessScreen(false);
        setErrors({});
        setIsDownloadingCard(false);
        setDownloadStatus('');
    };

    const SuccessScreen = () => (
        <div className="text-center space-y-6 animate-fadeIn">
            {/* Success Icon */}
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-brandGreen rounded-full flex items-center justify-center animate-bounce">
                    <MdCheckCircle className="w-12 h-12 text-white" />
                </div>
            </div>

            {/* Success Message */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Welcome to our Loyalty Program!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {customerResponse?.customer?.firstName}, you're all set!
                </p>
            </div>

            {/* Auto Download Status */}
            {isDownloadingCard && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <CircularProgress
                            size={20}
                            thickness={4}
                            sx={{
                                color: 'rgb(59 130 246)' // blue-500
                            }}
                        />
                        <span className="text-blue-700 dark:text-blue-300 font-medium">
                            {downloadStatus}
                        </span>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                        {canUseAppleWallet()
                            ? "Your loyalty card will open in Apple Wallet"
                            : isAndroid()
                                ? "Your loyalty card is being downloaded"
                                : "Preparing your loyalty card..."
                        }
                    </p>
                </div>
            )}

            {/* Download Status Message */}
            {!isDownloadingCard && downloadStatus && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                        {downloadStatus}
                    </p>
                </div>
            )}

            {/* Error Message if Pass Not Available */}
            {customerResponse?.appleWalletPass?.available === false && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-4">
                    <p className="text-orange-700 dark:text-orange-300 text-sm">
                        <strong>Note:</strong> Your loyalty card couldn't be generated automatically, but your account is ready!
                        {customerResponse?.appleWalletPass?.reason && (
                            <span className="block mt-1 text-xs">
                                Reason: {customerResponse.appleWalletPass.reason}
                            </span>
                        )}
                    </p>
                </div>
            )}

            {/* Reset Button */}
            <button
                onClick={resetForm}
                className="text-brandGreen hover:text-brandGreen-dark font-medium text-sm underline transition-colors duration-200"
            >
                Register Another Customer
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-brandGreenHighlight via-brandGreenHighlight to-brandGreenLight dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(34,197,94,0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className={`w-full max-w-2xl transform transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                    {/* Card Container */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">

                        {/* Header Section */}
                        <div className="relative bg-brandGreen p-6 text-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>

                            <div className="relative z-10">
                                {/* Logo */}
                                <div className={`flex items-center justify-center mb-4 transform transition-all duration-500 delay-150 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                                        <div className="w-12 h-12 bg-brandGreen rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                            ☕
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Heading */}
                                <h1 className={`text-2xl font-bold text-center mb-3 transform transition-all duration-500 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                    {showSuccessScreen
                                        ? "Registration Complete!"
                                        : "Welcome to Coffee House's Loyalty Program"
                                    }
                                </h1>

                                {/* Dynamic Paragraph */}
                                <p className={`text-base text-center leading-relaxed transform transition-all duration-500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                    {showSuccessScreen
                                        ? "Your loyalty journey starts now!"
                                        : "Enter your details to get your digital loyalty card."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Dynamic Content Section */}
                        <div className="p-8">
                            {showSuccessScreen ? (
                                <SuccessScreen />
                            ) : (
                                <div className="space-y-4">
                                    {contactFields.map((field, index) => {
                                        const IconComponent = field.icon;
                                        const hasError = errors[field.key];
                                        const hasValue = formData[field.key] && formData[field.key].trim() !== '';
                                        const isAnimating = fieldAnimations[field.key];

                                        return (
                                            <div
                                                key={field.key}
                                                className={`space-y-2 transform transition-all duration-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
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
                                                            focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                                                            ${isAnimating ? 'scale-105' : 'scale-100'}
                                                            transform`} />

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
                                    <div className={`pt-4 transform transition-all duration-500 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                            className="w-full bg-brandGreen hover:bg-brandGreen text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Registering...
                                                    </>
                                                ) : (
                                                    <>
                                                        Register
                                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Custom Animations */}
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
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.15s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default AnimatedContactForm;