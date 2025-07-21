'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedButton from 'components/ui/AnimatedButton';
import Default from 'components/auth/variants/DefaultAuthLayout';
import Checkbox from 'components/checkbox';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from 'hooks/useAuth';

function SignInDefault() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const { login, isAuthenticated, isLoginLoading, loginError, user, isSuperAdmin, isAdmin } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError('');
    setLocalError('');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError('');
    setLocalError('');
  };

  const handleSignIn = async () => {
    setLocalError('');

    // Validate inputs
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        // Success handling - router redirect will be handled by useEffect
      } else {
        setLocalError(result.error || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      setLocalError('An unexpected error occurred. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'superadmin') {
        router.replace('/superadmin/manage-admin');
      } else if (user.role === 'admin') {
        router.replace('/admin/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <p className="mb-12 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>

            <AnimatedInput
              label="Email"
              icon={Mail}
              type="email"
              placeholder="mail@example.com"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              required
              className="mb-4"
            />

            <div className="relative mb-4">
              <AnimatedInput
                label="Password"
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-11 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* General error message */}
            {localError && (
              <div className="mb-4 animate-slideDown">
                <p className="text-sm text-red-500 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {localError}
                </p>
              </div>
            )}

            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="rememberPassword"
                    checked={rememberPassword}
                    onChange={(e) => setRememberPassword(e.target.checked)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="rememberPassword"
                    className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 ${rememberPassword
                      ? 'bg-brandGreen border-brandGreen'
                      : 'bg-white border-gray-300 hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600'
                      }`}
                  >
                    {rememberPassword && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Remember Password
                </p>
              </div>
            </div>

            <AnimatedButton
              variant="primary"
              size="lg"
              loading={isLoginLoading}
              disabled={isLoginLoading}
              icon={LogIn}
              onClick={handleSignIn}
              className="w-full"
            >
              {isLoginLoading ? "Signing In" : "Sign In"}
            </AnimatedButton>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault; 