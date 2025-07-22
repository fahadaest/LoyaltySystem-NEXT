import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';

const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/register-customer'
];

export const AuthWrapper = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isInitialized && !isAuthenticated && !publicRoutes.includes(pathname)) {
            router.push('/auth/sign-in');
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