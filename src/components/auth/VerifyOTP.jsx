"use client";

import { useState, useEffect } from "react";
import { useVerifySignupOtpMutation, useResendOtpMutation } from "@/store/slices/authentication";

export default function VerifyOtpForm({ signupData, onVerified, onBack }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const [verifySignupOtp, { isLoading: isVerifying }] = useVerifySignupOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
            setOtp(newOtp.slice(0, 6));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }

        try {
            await verifySignupOtp({
                email: signupData.email,
                otp: otpString
            }).unwrap();

            onVerified();
        } catch (error) {
            setError(error.data?.message || "Invalid OTP. Please try again.");
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        try {
            await resendOtp({
                email: signupData.email
            }).unwrap();

            setResendTimer(60);
            setCanResend(false);
            setError("");
        } catch (error) {
            setError(error.data?.message || "Failed to resend OTP. Please try again.");
        }
    };

    return (
        <div className="mx-auto mt-8 max-w-md p-8">
            {/* Heading */}
            <h2 className="mb-2 text-center text-2xl font-bold text-black">
                Verify Your Account
            </h2>
            <p className="mb-6 text-center text-xs text-gray-500">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-gray-700">{signupData?.email}</span>
            </p>

            <form onSubmit={onSubmit}>
                {/* OTP Input */}
                <div className="mb-6 flex justify-center gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                            maxLength={1}
                            inputMode="numeric"
                            pattern="[0-9]"
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    </div>
                )}

                {/* Verify Button */}
                <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isVerifying ? "Verifying..." : "Verify OTP"}
                </button>

                {/* Resend OTP */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        Didn't receive the code?{" "}
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="font-medium text-black hover:underline disabled:opacity-50"
                            >
                                {isResending ? "Sending..." : "Resend"}
                            </button>
                        ) : (
                            <span className="text-gray-400">
                                Resend in {resendTimer}s
                            </span>
                        )}
                    </p>
                </div>

                {/* Back to Signup */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-xs text-gray-500 hover:text-black transition-colors"
                    >
                        ← Back to Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}