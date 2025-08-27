"use client";

import { useState } from "react";
import Link from "next/link";
import InputField from "../input-fields/InputField";
import PasswordField from "../input-fields/PasswordField";
import SwitchButton from "../buttons/SwitchButton";

export default function SignInForm({
    title = "Welcome Back",
    subtitle = "Enter your email and password to sign in",
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password, remember });
    };

    return (
        <div className="w-full max-w-[560px]">
            {/* Page header (moved here) */}
            <h2 className="mb-2 text-center text-3xl font-bold text-black md:text-left">
                {title}
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500 md:text-left">
                {subtitle}
            </p>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Email */}
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password */}
                <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Remember + Forgot */}
                <div className="mt-1 flex items-center justify-between">
                    <SwitchButton
                        checked={remember}
                        onChange={setRemember}
                        label="Remember me"
                    />

                    <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-black py-3 text-center text-white font-semibold transition hover:opacity-90"
                >
                    Login
                </button>

                {/* Sign up */}
                <p className="mt-8 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-black underline-offset-4 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
