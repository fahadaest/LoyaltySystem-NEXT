"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateOrUpdateCustomerMutation } from "@/store/slices/customerApis";
import InputField from "@/components/input-fields/InputField";
import PhoneNumberField from "@/components/input-fields/PhoneNumberField";
import DatePickerField from "@/components/input-fields/DatePickerField";
import DropdownField from "@/components/input-fields/Dropdown";

const RegisterCustomer = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Redux RTK Query mutation hook
    const [createOrUpdateCustomer, { isLoading, error }] = useCreateOrUpdateCustomerMutation();

    // Parse custom URL format: register-customer?point&2&5
    const parseCustomParams = () => {
        const query = window.location.search.substring(1); // Remove the '?'
        if (!query) return null; // Return null if no parameters

        const parts = query.split('&');
        return {
            type: parts[0] || null,
            loyaltyId: parts[1] ? parseInt(parts[1]) : null,
            adminId: parts[2] ? parseInt(parts[2]) : null
        };
    };

    // Get URL parameters from custom format
    const [urlParams, setUrlParams] = useState(null);

    useEffect(() => {
        // Parse URL parameters on client side
        const params = parseCustomParams();
        setUrlParams(params);
    }, []);

    const { type, loyaltyId, adminId } = urlParams || {};

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dateOfBirth: ''
    });

    const [errors, setErrors] = useState({});

    const genderOptions = [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' }
    ];

    // Update form data when URL params change
    useEffect(() => {
        if (urlParams) {
            setFormData(prev => ({
                ...prev,
                ...(type && { type }),
                ...(adminId && { adminId }),
                ...(loyaltyId && { loyaltyId })
            }));
        }
    }, [urlParams, type, adminId, loyaltyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleGenderSelect = (value, label) => {
        setFormData(prev => ({ ...prev, gender: value }));
        if (errors.gender) {
            setErrors(prev => ({ ...prev, gender: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            if (age < 13 || age > 120) {
                newErrors.dateOfBirth = 'Please enter a valid date of birth';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const customerData = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                phoneNumber: formData.phoneNumber,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth
            };

            if (type) customerData.type = type;
            if (loyaltyId) customerData.loyaltyId = loyaltyId;
            if (adminId) customerData.adminId = adminId;

            const result = await createOrUpdateCustomer(customerData).unwrap();

        } catch (err) {
            // Handle API errors
            if (err?.data?.message) {
                if (err.data.message.includes('email')) {
                    setErrors({ email: 'This email is already registered' });
                } else if (err.data.message.includes('phone')) {
                    setErrors({ phoneNumber: 'This phone number is already registered' });
                } else {
                    alert(`Registration failed: ${err.data.message}`);
                }
            } else if (err?.status) {
                alert(`Registration failed: Server error (${err.status})`);
            } else {
                alert('Registration failed. Please check your connection and try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-xl p-0 overflow-hidden">
                        {/* Header */}
                        <div className="text-center pt-8 pb-6">
                            <h1 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'Poppins' }}>
                                Register New Customer
                            </h1>
                            <p className="text-sm text-gray-500" style={{ fontFamily: 'Poppins' }}>
                                Register customer for {type || 'default'} loyalty program
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="px-6 mb-4">
                                <InputField
                                    label="Full Name"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required={true}
                                    fieldHeight="0.75rem"
                                    labelSize="1rem"
                                    placeholderSize="0.875rem"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Poppins' }}>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="px-6 mb-4">
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required={true}
                                    fieldHeight="0.75rem"
                                    labelSize="1rem"
                                    placeholderSize="0.875rem"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Poppins' }}>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="px-6 mb-4">
                                <PhoneNumberField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="50 000 0000"
                                    required={true}
                                    defaultCountry="AE"
                                    fieldHeight="0.75rem"
                                    labelSize="1rem"
                                    placeholderSize="0.875rem"
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Poppins' }}>
                                        {errors.phoneNumber}
                                    </p>
                                )}
                            </div>

                            <div className="px-6 mb-4">
                                <label className="mb-2 block font-semibold text-black" style={{ fontSize: '1rem', fontFamily: 'Poppins' }}>
                                    Gender
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <DropdownField
                                    text={formData.gender ? genderOptions.find(opt => opt.value === formData.gender)?.label : "Select Gender"}
                                    backgroundColor="#FFFFFF"
                                    textColor="#374151"
                                    circleColor="black"
                                    iconColor="white"
                                    width="100%"
                                    height="3rem"
                                    fontSize="0.875rem"
                                    options={genderOptions}
                                    onChange={handleGenderSelect}
                                    value={formData.gender ? genderOptions.find(opt => opt.value === formData.gender)?.label : ""}
                                    placeholder="Select Gender"
                                />
                                {errors.gender && (
                                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Poppins' }}>
                                        {errors.gender}
                                    </p>
                                )}
                            </div>

                            <div className="px-6 mb-6">
                                <DatePickerField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    placeholder="dd/mm/yyyy"
                                    required={true}
                                    fieldHeight="0.75rem"
                                    labelSize="1rem"
                                    placeholderSize="0.875rem"
                                    max={new Date().toISOString().split('T')[0]}
                                    showCalendarIcon={true}
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Poppins' }}>
                                        {errors.dateOfBirth}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="px-6 pb-8">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-black text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    style={{ fontFamily: 'Poppins' }}
                                >
                                    {isLoading ? "Adding..." : "Add to Wallet"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;