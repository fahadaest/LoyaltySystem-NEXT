'use client';
import React, { ReactNode, useEffect } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import 'styles/index.css';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import CustomAlert from 'components/customAlert/CustomAlert';
import { useAuth } from 'hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const _NoSSR = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

const publicRoutes = [
  '/register-customer',
  '/auth/sign-in'
];

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log('AuthWrapper state:', {
    pathname,
    isAuthenticated,
    isInitialized,
    isPublicRoute: publicRoutes.includes(pathname)
  });

  useEffect(() => {
    if (!isInitialized) return;

    if (pathname === '/' || !pathname) {
      if (isAuthenticated) {
        router.push('/main/dashboard');
      } else {
        router.push('/auth/sign-in');
      }
      return;
    }

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/auth/sign-in');
      return;
    }

    if (isAuthenticated && pathname.startsWith('/auth/')) {
      router.push('/main/dashboard');
      return;
    }

  }, [isAuthenticated, isInitialized, router, pathname]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <NoSSR>
      <Provider store={store}>
        <AuthWrapper>
          <CustomAlert />
          {children}
        </AuthWrapper>
      </Provider>
    </NoSSR>
  );
}