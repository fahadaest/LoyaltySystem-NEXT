'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import Checkbox from 'components/checkbox';
import Button from 'components/button/Button';
import { Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from 'store/authApi';
import Cookies from 'js-cookie';

function SignInDefault() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading: loginLoading, error: loginError, data: loginData }] = useLoginMutation();

  const handleSignIn = async () => {
    const response = await login({ email, password });
    Cookies.set('token', response?.data?.token, { expires: 7 });
    console.log('Login response:', response);
    if (response?.data.role === 'superadmin' && response?.data?.token) {
      setError('');
      localStorage.setItem('superadmin_session', 'true');
      router.push('/superadmin/manage-admin');
    } else if (response?.data.role === 'admin' && response?.data?.token) {
      setError('');
      localStorage.setItem('admin_session', 'true');
      router.push('/admin/default');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    const superAdminSession = localStorage.getItem('superadmin_session');

    if (adminSession) {
      router.replace('/admin/default');
    }

    if (superAdminSession) {
      router.replace('/superadmin/manage-admin/list');
    }
  }, [router]);

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

            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              state={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative mb-3">
              <InputField
                variant="auth"
                extra=""
                label="Password*"
                placeholder="Min. 8 characters"
                id="password"
                type={showPassword ? "text" : "password"}
                state={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-12 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Remember Password
                </p>
              </div>
            </div>

            <Button
              text="Sign In"
              color="bg-brandGreen"
              className="w-full"
              size="lg"
              icon={undefined}
              onClick={handleSignIn}
            />
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;