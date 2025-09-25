"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import InputField from "@/components/input-fields/InputField";
import DropdownField from "@/components/input-fields/Dropdown";
import DatePickerField from "@/components/input-fields/DatePickerField";
import PhoneNumberField from "@/components/input-fields/PhoneNumberField";

const RegisterCustomer = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get URL parameters
    const type = searchParams.get('type') || 'point';
    const adminId = parseInt(searchParams.get('adminId')) || 1;
    const loyaltyId = parseInt(searchParams.get('loyaltyId')) || 1;

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        type: type,
        gender: '',
        dateOfBirth: '',
        loyaltyId: loyaltyId,
        adminId: adminId
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Gender options
    const genderOptions = [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' }
    ];

    // Update form data when URL params change
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            type: type,
            adminId: adminId,
            loyaltyId: loyaltyId
        }));
    }, [type, adminId, loyaltyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleGenderChange = (value) => {
        setFormData(prev => ({
            ...prev,
            gender: value
        }));

        if (errors.gender) {
            setErrors(prev => ({
                ...prev,
                gender: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (formData.phoneNumber.length < 10) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        // Date of birth validation
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();

            if (age < 13) {
                newErrors.dateOfBirth = 'Customer must be at least 13 years old';
            } else if (age > 120) {
                newErrors.dateOfBirth = 'Please enter a valid date of birth';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    phoneNumber: formData.phoneNumber,
                    type: formData.type,
                    gender: formData.gender,
                    dateOfBirth: formData.dateOfBirth,
                    loyaltyId: formData.loyaltyId,
                    adminId: formData.adminId
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Customer registered successfully:', result);

                // Show success message or redirect
                alert('Customer registered successfully!');

                // Redirect based on type
                if (formData.type === 'point') {
                    router.push('/point-loyalty');
                } else if (formData.type === 'product') {
                    router.push('/product-loyalty');
                } else {
                    router.push('/customers');
                }
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);

                if (response.status === 400 && errorData.message) {
                    // Handle specific validation errors from server
                    if (errorData.message.includes('email')) {
                        setErrors({ email: 'This email is already registered' });
                    } else if (errorData.message.includes('phone')) {
                        setErrors({ phoneNumber: 'This phone number is already registered' });
                    } else {
                        alert(`Registration failed: ${errorData.message}`);
                    }
                } else {
                    alert('Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Navigate back based on type
        if (formData.type === 'point') {
            router.push('/point-loyalty');
        } else if (formData.type === 'product') {
            router.push('/product-loyalty');
        } else {
            router.push('/customers');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-6">
                <ComponentHeader
                    title="Register New Customer"
                    subtitle={`Register customer for ${formData.type} loyalty program`}
                    infoMessage="Fill in the customer details to register them for the loyalty program. All fields marked with * are required."
                />

                <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Customer Name */}
                        <InputField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter customer's full name"
                            required={true}
                            className={errors.name ? 'mb-1' : ''}
                            labelSize="0.875rem"
                            placeholderSize="0.75rem"
                            fieldHeight="0.5rem"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}

                        {/* Email */}
                        <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter customer's email address"
                            required={true}
                            autoComplete="email"
                            className={errors.email ? 'mb-1' : ''}
                            labelSize="0.875rem"
                            placeholderSize="0.75rem"
                            fieldHeight="0.5rem"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}

                        {/* Phone Number */}
                        <PhoneNumberField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="50 000 0000"
                            required={true}
                            className={errors.phoneNumber ? 'mb-1' : ''}
                            labelSize="0.875rem"
                            placeholderSize="0.75rem"
                            fieldHeight="0.5rem"
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                        )}

                        {/* Gender */}
                        <DropdownField
                            label="Gender"
                            name="gender"
                            value={formData.gender ? genderOptions.find(opt => opt.value === formData.gender)?.label : ''}
                            onChange={handleGenderChange}
                            options={genderOptions}
                            placeholder="Select gender"
                            required={true}
                            className={errors.gender ? 'mb-1' : ''}
                            labelSize="0.875rem"
                            placeholderSize="0.75rem"
                            fieldHeight="0.5rem"
                        />
                        {errors.gender && (
                            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                        )}

                        {/* Date of Birth */}
                        <DatePickerField
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required={true}
                            max={new Date().toISOString().split('T')[0]} // Cannot select future dates
                            min="1920-01-01" // Reasonable minimum date
                            className={errors.dateOfBirth ? 'mb-1' : ''}
                            labelSize="0.875rem"
                            placeholderSize="0.75rem"
                            fieldHeight="0.5rem"
                        />
                        {errors.dateOfBirth && (
                            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                text="Cancel"
                                onClick={handleCancel}
                                backgroundColor="#EDEDED"
                                textColor="#000000"
                                disabled={isSubmitting}
                                height="2.5rem"
                                fontSize="0.875rem"
                                padding="0px 24px"
                                className="flex-1"
                            />
                            <Button
                                text={isSubmitting ? "Registering..." : "Register Customer"}
                                onClick={handleSubmit}
                                backgroundColor="#000000"
                                textColor="#FFFFFF"
                                disabled={isSubmitting}
                                height="2.5rem"
                                fontSize="0.875rem"
                                padding="0px 24px"
                                className="flex-1"
                                showIcon={!isSubmitting}
                                icon="/img/general/check.svg"
                                iconPosition="right"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default RegisterCustomer;