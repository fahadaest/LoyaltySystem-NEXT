'use client';

import LoadingScreen from '../components/ui/LoadingScreen';

export default function HomePage() {
    return (
        <div className="h-screen w-screen bg-black-200">
            <LoadingScreen />
        </div>
    );
}