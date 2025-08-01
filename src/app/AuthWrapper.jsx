import React, { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';

const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/register-customer',
    '/auth/sign-in'  // Add this
];

export const AuthWrapper = ({ children }) => {
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
        }

        if (isAuthenticated && pathname.startsWith('/auth/')) {
            router.push('/main/dashboard');
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