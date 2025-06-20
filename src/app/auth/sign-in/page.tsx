'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import Checkbox from 'components/checkbox';
import Button from 'components/button/Button';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
} from 'utils/data';

function SignInDefault() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
      setError('');
      localStorage.setItem('superadmin_session', 'true');
      router.push('/superadmin/manage-admin/list');
    } else if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError('');
      localStorage.setItem('admin_session', 'true');
      router.push('/product/all');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    const superAdminSession = localStorage.getItem('superadmin_session');

    if (adminSession) {
      router.replace('/product/all');
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
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
            <div className="mb-6 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div>

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

            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              state={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div>
              <a
                className="text-sm font-medium text-brandGreen hover:text-brand-600 dark:text-white"
                href=" "
              >
                Forgot Password?
              </a>
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
