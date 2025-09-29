'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/ui/LoadingScreen';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

    return (
        <div className="h-screen w-screen bg-black-200">
            <LoadingScreen />
        </div>
    );
}