"use client";

import { useState } from "react";

export default function WelcomeSuccess({ signupData, onContinue }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="mx-auto mt-8 max-w-md p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                    <svg
                        className="h-12 w-12 text-green-600"
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
                </div>
            </div>

            {/* Heading */}
            <h2 className="mb-4 text-2xl font-bold text-black">
                Welcome to RewardHive! 🎉
            </h2>
            <p className="mb-6 text-gray-600">
                Your admin account has been successfully created and verified.
            </p>

            {/* Account Details Card */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
                <h3 className="mb-3 font-semibold text-gray-800">Your Account Details:</h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-800">{signupData?.email}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Password:</span>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">
                                {showDetails ? "Admin123@" : "••••••••"}
                            </span>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                {showDetails ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Domain:</span>
                        <span className="font-medium text-blue-600">
                            {signupData?.domain || "your-domain"}.loyaltySystem.com
                        </span>
                    </div>
                </div>
            </div>

            {/* Important Notice */}
            <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-800">
                    <strong>Important:</strong> Please save these login details.
                    You can also check your email for a confirmation message with all the details.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={onContinue}
                    className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                    Continue to Login
                </button>

                <button
                    onClick={() => window.open(`http://${signupData?.domain || "your-domain"}.loyaltySystem.com`, '_blank')}
                    className="w-full rounded-full border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                    Visit Your Domain
                </button>
            </div>

            {/* Support Info */}
            <div className="mt-6 text-xs text-gray-500">
                <p>
                    Need help? Contact our{" "}
                    <a href="mailto:support@rewardhive.com" className="text-blue-600 hover:underline">
                        support team
                    </a>
                </p>
            </div>
        </div>
    );
}