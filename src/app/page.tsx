'use client';

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center to-indigo-50 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900">
            <div className="text-center space-y-8">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-brandGreen dark:border-brandGreen rounded-full animate-spin"></div>
                        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-brandGreen dark:border-t-brandGreen rounded-full animate-spin"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Loyalty System
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 animate-pulse">
                        Initializing your experience...
                    </p>
                </div>

                <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-brandGreen rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brandGreen rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-brandGreen rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
}