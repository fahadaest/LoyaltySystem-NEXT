'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedButton from 'components/ui/AnimatedButton';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { Eye, EyeOff, Mail, Lock, LogIn, User, Globe, Shield, Phone, Building } from 'lucide-react';
import { useAuth } from 'hooks/useAuth';
import { useAdminSignupMutation, useVerifySignupOtpMutation } from 'store/apiEndPoints/authApi';

const VALIDATION_RULES = {
  firstName: { required: true, minLength: 2, message: 'First name must be at least 2 characters' },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
  password: { required: true, minLength: 8, message: 'Password must be at least 8 characters' },
  phoneNumber: { required: true, pattern: /^\+?[1-9]\d{1,14}$/, message: 'Please enter a valid phone number' },
  companyName: { required: true, minLength: 2, message: 'Company name must be at least 2 characters' },
  domain: { required: true, minLength: 3, pattern: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?$/, message: 'Please enter a valid domain name (letters, numbers, and hyphens only)' }
};

function SignUpPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [adminSignup, { isLoading: isSignupLoading }] = useAdminSignupMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifySignupOtpMutation();

  const [currentStep, setCurrentStep] = useState('signup');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: 'temporary',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    companyName: '',
    domain: ''
  });
  const [otpData, setOtpData] = useState({
    email: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({ password: false, confirmPassword: false });
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (field, value, compareValue = null) => {
    const rule = VALIDATION_RULES[field];
    if (!rule) return '';

    if (rule.required && !value) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    if (rule.minLength && value.length < rule.minLength) return rule.message;
    if (rule.pattern && !rule.pattern.test(value)) return rule.message;

    if (field === 'confirmPassword') {
      if (!value) return 'Please confirm your password';
      if (value !== compareValue) return 'Passwords do not match';
    }

    return '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setLocalError('');
    setSuccessMessage('');
  };

  const handleOtpChange = (field, value) => {
    setOtpData(prev => ({ ...prev, [field]: value }));
    setLocalError('');
    setSuccessMessage('');
  };

  const handleSignUp = async () => {
    setLocalError('');
    setSuccessMessage('');
    const newErrors = {};

    // Validate all fields except confirmPassword
    Object.keys(VALIDATION_RULES).forEach(field => {
      newErrors[field] = validateField(field, formData[field]);
    });
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword, formData.password);

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) return;

    try {
      const signupPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        domain: formData.domain
      };

      const result = await adminSignup(signupPayload).unwrap();

      setSuccessMessage('Account created successfully! Please check your email for the OTP.');
      setOtpData({ email: formData.email, otp: '' });
      setCurrentStep('otp');

    } catch (error) {
      setLocalError(error?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleOtpVerification = async () => {
    setLocalError('');
    setSuccessMessage('');

    if (!otpData.otp) {
      setLocalError('Please enter the OTP');
      return;
    }

    if (otpData.otp.length !== 6) {
      setLocalError('OTP must be 6 digits');
      return;
    }

    try {
      const result = await verifyOtp(otpData).unwrap();
      setSuccessMessage('Email verified successfully! Check your email to receive login credentials.');

    } catch (error) {
      setLocalError(error?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      router.replace('/main/dashboard');
    }
  }, [isAuthenticated, user, router]);

  const PasswordToggle = ({ field, show }) => (
    <button
      type="button"
      onClick={() => togglePasswordVisibility(field)}
      className="absolute right-3 top-11 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  const ErrorMessage = ({ error }) => error && (
    <div className="mb-4 animate-slideDown">
      <p className="text-sm text-red-500 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    </div>
  );

  const SuccessMessage = ({ message }) => message && (
    <div className="mb-4 animate-slideDown">
      <p className="text-sm text-green-600 flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {message}
      </p>
    </div>
  );

  const renderSignupForm = () => (
    <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
      <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
        Sign Up as Admin
      </h3>
      <p className="mb-7 ml-1 text-base text-gray-600">
        Create your account to get started!
      </p>

      <AnimatedInput
        label="Name"
        icon={User}
        type="text"
        placeholder="Enter your name"
        value={formData.firstName}
        onChange={(value) => handleInputChange('firstName', value)}
        error={errors.firstName}
        required
        className="flex-1"
      />

      <AnimatedInput
        label="Email"
        icon={Mail}
        type="email"
        placeholder="mail@example.com"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        error={errors.email}
        required
        className="mb-4"
      />

      <AnimatedInput
        label="Phone Number"
        icon={Phone}
        type="tel"
        placeholder="+1234567890"
        value={formData.phoneNumber}
        onChange={(value) => handleInputChange('phoneNumber', value)}
        error={errors.phoneNumber}
        required
        className="mb-4"
      />

      <AnimatedInput
        label="Company Name"
        icon={Building}
        type="text"
        placeholder="Enter your company name"
        value={formData.companyName}
        onChange={(value) => handleInputChange('companyName', value)}
        error={errors.companyName}
        required
        className="mb-4"
      />

      <div className="flex gap-3 mb-4">
        {[
          { field: 'password', label: 'Password', placeholder: 'Min. 8 characters' },
          { field: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm password' }
        ].map(({ field, label, placeholder }) => (
          <div key={field} className="relative flex-1">
            <AnimatedInput
              label={label}
              icon={Lock}
              type={showPasswords[field] ? "text" : "password"}
              placeholder={placeholder}
              value={formData[field]}
              onChange={(value) => handleInputChange(field, value)}
              error={errors[field]}
              required
            />
            <PasswordToggle field={field} show={showPasswords[field]} />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <AnimatedInput
          label="Domain"
          icon={Globe}
          type="text"
          placeholder="your-domain"
          value={formData.domain}
          onChange={(value) => handleInputChange('domain', value)}
          error={errors.domain}
          required
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your site will be available at: <span className="font-medium text-brandGreen">{formData.domain || 'your-domain'}.loyaltySystem.com</span>
        </p>
      </div>

      <ErrorMessage error={localError} />
      <SuccessMessage message={successMessage} />

      <AnimatedButton
        size="lg"
        loading={isSignupLoading}
        disabled={isSignupLoading}
        icon={LogIn}
        onClick={handleSignUp}
        className="w-full"
      >
        {isSignupLoading ? "Creating Account..." : "Sign Up"}
      </AnimatedButton>
    </div>
  );

  const renderOtpForm = () => (
    <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
      <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
        Verify Your Email
      </h3>
      <p className="mb-7 ml-1 text-base text-gray-600">
        We've sent a 6-digit code to <span className="font-medium text-brandGreen">{otpData.email}</span>
      </p>

      <AnimatedInput
        label="OTP Code"
        icon={Shield}
        type="text"
        placeholder="Enter 6-digit code"
        value={otpData.otp}
        onChange={(value) => handleOtpChange('otp', value.replace(/\D/g, '').slice(0, 6))}
        maxLength={6}
        required
        className="mb-4"
      />

      <ErrorMessage error={localError} />
      <SuccessMessage message={successMessage} />

      <div className="flex gap-3">
        <AnimatedButton
          size="lg"
          variant="outline"
          onClick={() => setCurrentStep('signup')}
          className="flex-1"
          disabled={isVerifyingOtp}
        >
          Back
        </AnimatedButton>
        <AnimatedButton
          size="lg"
          loading={isVerifyingOtp}
          disabled={isVerifyingOtp || !otpData.otp}
          icon={Shield}
          onClick={handleOtpVerification}
          className="flex-1"
        >
          {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
        </AnimatedButton>
      </div>
    </div>
  );

  return (
    <Default
      maincard={
        <div className="h-screen w-[50%] flex items-center justify-center">
          {currentStep === 'signup' ? renderSignupForm() : renderOtpForm()}
        </div>
      }
    />
  );
}

export default SignUpPage;