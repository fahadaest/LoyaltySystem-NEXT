"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "@/components/auth/SignUpForm";
import VerifyOtpForm from "@/components/auth/VerifyOTP";
import WelcomeSuccess from "@/components/auth/WelcomeSuccess";

export default function Page() {
    const [currentStep, setCurrentStep] = useState("signup");
    const [signupData, setSignupData] = useState(null);
    const router = useRouter();

    const handleSignupSuccess = (data) => {
        setSignupData(data);
        setCurrentStep("verify-otp");
    };

    const handleOtpVerified = () => {
        setCurrentStep("welcome");
    };

    const handleBackToSignup = () => {
        setCurrentStep("signup");
        setSignupData(null);
    };

    const handleContinueToLogin = () => {
        // Redirect to login page
        router.push('/sign-in');
        // Or if you want to redirect to dashboard:
        // router.push('/dashboard');
    };

    return (
        <div>
            {currentStep === "signup" && (
                <SignUpForm onSignupSuccess={handleSignupSuccess} />
            )}
            {currentStep === "verify-otp" && (
                <VerifyOtpForm
                    signupData={signupData}
                    onVerified={handleOtpVerified}
                    onBack={handleBackToSignup}
                />
            )}
            {currentStep === "welcome" && (
                <WelcomeSuccess
                    signupData={signupData}
                    onContinue={handleContinueToLogin}
                />
            )}
        </div>
    );
}