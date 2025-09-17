"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "../input-fields/InputField";
import PasswordField from "../input-fields/PasswordField";
import SwitchButton from "../buttons/SwitchButton";
import { useLoginMutation } from "@/store/slices/authentication";

export default function SignInForm({
    title = "Welcome Back",
    subtitle = "Enter your email and password to sign in",
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const result = await login({
                email,
                password,
            }).unwrap();

            console.log("Login successful:", result);
            router.push('/dashboard');

        } catch (err) {
            console.error("Login failed:", err);

            // Handle different error types
            if (err?.data?.message) {
                setError(err.data.message);
            } else if (err?.error) {
                setError(err.error);
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="w-full max-w-[560px]">
            {/* Page header */}
            <h2 className="mb-2 text-center text-3xl font-bold text-black md:text-left">
                {title}
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500 md:text-left">
                {subtitle}
            </p>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="rounded-md bg-red-50 p-3 border border-red-200">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Email */}
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />

                {/* Password */}
                <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />

                {/* Remember + Forgot */}
                <div className="mt-1 flex items-center justify-between">
                    <SwitchButton
                        checked={remember}
                        onChange={setRemember}
                        label="Remember me"
                        disabled={isLoading}
                    />

                    <Link
                        href="/forgot-password"
                        className="text-sm text-gray-500 hover:text-gray-700"
                        tabIndex={isLoading ? -1 : 0}
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-full bg-black py-3 text-center text-white font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>

                {/* Sign up */}
                <p className="mt-8 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-black underline-offset-4 hover:underline"
                        tabIndex={isLoading ? -1 : 0}
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}