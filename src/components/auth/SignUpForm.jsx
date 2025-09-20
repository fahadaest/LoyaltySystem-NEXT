"use client";

import { useState, useEffect } from "react";
import { useAdminSignupMutation, useLazyCheckDomainQuery } from "@/store/slices/authentication";
import InputField from "../input-fields/InputField";
import PasswordField from "../input-fields/PasswordField";
import PhoneNumberField from "../input-fields/PhoneNumberField";

export default function SignUpForm({ onSignupSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        password: "",
        confirmPassword: "",
        domain: "",
    });

    const [errors, setErrors] = useState({});
    const [domainStatus, setDomainStatus] = useState(null); // null | 'checking' | 'available' | 'taken'

    const [adminSignup, { isLoading: isSigningUp }] = useAdminSignupMutation();
    const [checkDomain, { isLoading: isCheckingDomain }] = useLazyCheckDomainQuery();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear specific field error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    // Check domain availability when domain changes
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (formData.domain && formData.domain.length >= 3) {
                setDomainStatus('checking');
                try {
                    const result = await checkDomain(formData.domain).unwrap();
                    setDomainStatus(result.available ? 'available' : 'taken');
                } catch (error) {
                    setDomainStatus(null);
                }
            } else {
                setDomainStatus(null);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [formData.domain, checkDomain]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.domain.trim()) newErrors.domain = "Domain is required";
        if (domainStatus === 'taken') newErrors.domain = "Domain is already taken";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const signupPayload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phone,
                companyName: formData.company,
                domain: formData.domain,
            };

            const result = await adminSignup(signupPayload).unwrap();

            // Call the success callback with the signup data
            onSignupSuccess({
                email: formData.email,
                phone: formData.phone,
                ...result
            });
        } catch (error) {
            // Handle API errors
            if (error.data?.errors) {
                setErrors(error.data.errors);
            } else {
                setErrors({ general: error.data?.message || "Signup failed. Please try again." });
            }
        }
    };

    const getDomainIndicator = () => {
        if (!formData.domain) return null;

        if (isCheckingDomain || domainStatus === 'checking') {
            return <span className="text-blue-500 text-xs ml-2">Checking...</span>;
        }
        if (domainStatus === 'available') {
            return <span className="text-green-500 text-xs ml-2">✓ Available</span>;
        }
        if (domainStatus === 'taken') {
            return <span className="text-red-500 text-xs ml-2">✗ Taken</span>;
        }
        return null;
    };

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 max-w-xl p-8"
        >
            {/* Heading */}
            <h2 className="mb-2 text-center text-2xl font-bold text-black md:text-left">
                Sign up as Admin
            </h2>
            <p className="mb-6 text-center text-xs text-gray-500 md:text-left">
                Create your account to get started
            </p>

            {/* General Error */}
            {errors.general && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
            )}

            {/* Inputs grid */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div>
                    <InputField
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                    <PhoneNumberField
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Company */}
                <div>
                    <InputField
                        label="Company Name"
                        name="company"
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={handleChange}
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                </div>

                {/* Passwords */}
                <div>
                    <PasswordField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                    <PasswordField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
            </div>

            {/* Domain - full width */}
            <div className="mt-4">
                <div className="flex items-center">
                    <InputField
                        label="Domain"
                        name="domain"
                        type="text"
                        placeholder="your-domain"
                        value={formData.domain}
                        onChange={handleChange}
                        required
                        labelSize="0.8rem"
                        placeholderSize="0.75rem"
                        fieldHeight="0.6rem"
                    />
                    {getDomainIndicator()}
                </div>
                {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
                <p className="mt-1 text-center text-xs text-gray-500">
                    Your site will be available at:{" "}
                    <span className="font-medium text-gray-700">
                        {formData.domain || "your-domain"}.loyaltySystem.com
                    </span>
                </p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSigningUp || domainStatus === 'taken'}
                className="mt-6 w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSigningUp ? "Creating Account..." : "Signup"}
            </button>
        </form>
    );
}
