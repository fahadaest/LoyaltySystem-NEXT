"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUserRole, restoreAuthState } from '@/store/slices/authSlice';
import '../globals.css';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function MainLayout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectUserRole);
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        dispatch(restoreAuthState());

        const getCookie = (name) => {
            if (typeof document === 'undefined') return null;
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };

        const token = getCookie('token');

        if (!token) {
            router.push('/sign-in');
            return;
        }

        setIsAuthChecked(true);
    }, [dispatch, router, isMounted]);

    if (!isMounted || !isAuthChecked || !isAuthenticated || !userRole) {
        return <LoadingScreen />;
    }

    return (
        <div className="h-screen flex overflow-hidden">
            <div className="z-50 fixed left-0 top-0 h-full">
                <Sidebar />
            </div>

            <div className="ml-60 flex-1 flex flex-col h-screen">
                <div className="sticky top-0 z-10 bg-gray-50 flex-shrink-0">
                    <Navbar />
                </div>

                <main className="flex-1 pt-1 pr-4 pb-4 min-h-0">
                    <div className="rounded-[2rem] border border-gray-200 shadow-sm p-5 h-full w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}