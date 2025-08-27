"use client";

import { useState } from "react";
import InputField from "../input-fields/InputField";
import PasswordField from "../input-fields/PasswordField";
import PhoneNumberField from "../input-fields/PhoneNumberField";

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        password: "",
        confirmPassword: "",
        domain: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 max-w-xl p-8"
        >
            {/* Heading */}
            <h2 className="mb-2 text-center text-3xl font-bold text-black md:text-left">
                Sign up as Admin
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500 md:text-left">
                Create your account to get started
            </p>

            {/* Inputs grid */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
                {/* Name */}
                <InputField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Email */}
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {/* Phone (separate component) */}
                <PhoneNumberField
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                {/* Company */}
                <InputField
                    label="Company Name"
                    name="company"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                />

                {/* Passwords */}
                <PasswordField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Domain - full width */}
            <div className="mt-5">
                <InputField
                    label="Domain"
                    name="domain"
                    type="text"
                    placeholder="your-domain"
                    value={formData.domain}
                    onChange={handleChange}
                />
                <p className="mt-2 text-center text-xs text-gray-500">
                    Your site will be available at:{" "}
                    <span className="font-medium text-gray-700">
                        your-domain.loyaltySystem.com
                    </span>
                </p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="mt-8 w-full rounded-full bg-black py-3 text-base font-semibold text-white transition hover:opacity-90"
            >
                Signup
            </button>
        </form>
    );
}
