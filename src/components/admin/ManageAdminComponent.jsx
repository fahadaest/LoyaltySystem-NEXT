"use client";
import React, { useState, useEffect } from "react";
import InputField from "../input-fields/InputField";
import DropdownButton from "../ui/DropDownButton";
import DatePickerField from "../input-fields/DatePickerField";
import PhoneNumberField from "../input-fields/PhoneNumberField";
import PasswordField from "../input-fields/PasswordField";
import SelectBox from "../input-fields/SelectBox";

const ManageAdminComponent = ({ onClose, onSubmit, editingAdmin = null, isEditMode = false, triggerSubmit = false }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        subscriptionPlan: '',
        password: '',
        confirmPassword: '',
        startDate: '',
        endDate: '',
        loyaltyAccess: ['point-based']
    });

    const [errors, setErrors] = useState({});

    // Handle external submit trigger
    useEffect(() => {
        if (triggerSubmit) {
            handleSubmit();
        }
    }, [triggerSubmit]);

    // Populate form data when editing
    useEffect(() => {
        if (isEditMode && editingAdmin) {
            const loyaltyAccessArray = [];
            if (editingAdmin.loyaltyAccess?.includes('Point') || editingAdmin.pointBasedLoyalty) {
                loyaltyAccessArray.push('point-based');
            }
            if (editingAdmin.loyaltyAccess?.includes('Product') || editingAdmin.productBasedLoyalty) {
                loyaltyAccessArray.push('product-based');
            }

            setFormData({
                fullName: editingAdmin.name || `${editingAdmin.firstName || ''} ${editingAdmin.lastName || ''}`.trim() || '',
                email: editingAdmin.email || '',
                phoneNumber: editingAdmin.phoneNumber || editingAdmin.phone || '',
                subscriptionPlan: editingAdmin.subscription?.name || editingAdmin.subscriptionPlan || '',
                password: '',
                confirmPassword: '',
                startDate: editingAdmin.startDate || '',
                endDate: editingAdmin.endDate || '',
                loyaltyAccess: loyaltyAccessArray.length > 0 ? loyaltyAccessArray : ['point-based']
            });
        } else {
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                subscriptionPlan: '',
                password: '',
                confirmPassword: '',
                startDate: '',
                endDate: '',
                loyaltyAccess: ['point-based']
            });
        }
        setErrors({});
    }, [isEditMode, editingAdmin]);

    const subscriptionOptions = [
        { id: 1, name: "Weekly Plan" },
        { id: 2, name: "Monthly Plan" },
        { id: 3, name: "Yearly Plan" }
    ];

    const loyaltyOptions = [
        { value: 'point-based', label: 'Point-Based Loyalty' },
        { value: 'product-based', label: 'Product-Based Loyalty' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubscriptionSelect = (value, label) => {
        handleInputChange('subscriptionPlan', label);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!isEditMode) {
            if (!formData.password) newErrors.password = 'Password is required';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.phoneNumber && formData.phoneNumber.length < 10) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const selectedSubscription = subscriptionOptions.find(
                option => option.name === formData.subscriptionPlan
            );

            const apiPayload = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                phoneNumber: formData.phoneNumber.trim(),
                status: "active",
                pointBasedLoyalty: formData.loyaltyAccess.includes('point-based'),
                productBasedLoyalty: formData.loyaltyAccess.includes('product-based'),
                subscriptionId: selectedSubscription?.id || null
            };

            if (formData.password) {
                apiPayload.password = formData.password;
            }

            if (isEditMode && editingAdmin) {
                apiPayload.id = editingAdmin.id;
                if (formData.startDate) apiPayload.startDate = formData.startDate;
                if (formData.endDate) apiPayload.endDate = formData.endDate;
            } else {
                if (formData.startDate) apiPayload.startDate = formData.startDate;
                if (formData.endDate) apiPayload.endDate = formData.endDate;
            }

            console.log('API Payload:', apiPayload);
            await onSubmit(apiPayload);

        } catch (error) {
            console.error('Error preparing admin data:', error);
        }
    };

    return (
        <div className="w-full h-full bg-[#F5F5F5] rounded-[30px] border border-gray-200 p-4 overflow-y-auto">
            <div className="mb-4">
                <h3 className="text-[13px] font-semibold text-black mb-3">Personal Information</h3>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <InputField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Enter full name"
                            labelSize="10px"
                            placeholderSize="10px"
                            fieldHeight="8px"
                            required={true}
                        />
                        {errors.fullName && (
                            <span className="text-red-500 text-[9px] mt-1 block">{errors.fullName}</span>
                        )}
                    </div>

                    <div>
                        <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter email"
                            labelSize="10px"
                            placeholderSize="10px"
                            fieldHeight="8px"
                            required
                        />
                        {errors.email && (
                            <span className="text-red-500 text-[9px] mt-1 block">{errors.email}</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <PhoneNumberField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            placeholder="Enter phone number"
                            required
                            labelSize="10px"
                            placeholderSize="10px"
                            fieldHeight="8px"
                            fieldWidth="100%"
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500 text-[9px] mt-1 block">{errors.phoneNumber}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[10px] font-semibold text-black mb-2">
                            Subscription Plan
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div style={{ height: '32px' }}>
                            <DropdownButton
                                text={formData.subscriptionPlan}
                                placeholder="Select a subscription plan"
                                options={subscriptionOptions}
                                onSelect={handleSubscriptionSelect}
                                value={formData.subscriptionPlan}
                                width="100%"
                                height="32px"
                                fontSize="10px"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <PasswordField
                            label={`Password${isEditMode ? ' (Leave blank to keep current)' : ''}`}
                            name="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder={isEditMode ? "Enter new password (optional)" : "Password"}
                            labelSize="0.625rem"
                            placeholderSize="0.625rem"
                            fieldHeight="0.5rem"
                            required={!isEditMode}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-[9px] mt-1 block">{errors.password}</span>
                        )}
                    </div>

                    <div>
                        <PasswordField
                            label={`Confirm Password${isEditMode ? ' (If changing password)' : ''}`}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder={isEditMode ? "Confirm new password" : "Confirm Password"}
                            labelSize="0.625rem"
                            placeholderSize="0.625rem"
                            fieldHeight="0.5rem"
                            required={!isEditMode}
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-[9px] mt-1 block">{errors.confirmPassword}</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <DatePickerField
                        label="Start Date & Time"
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        labelSize="10px"
                        placeholderSize="10px"
                        fieldHeight="8px"
                    />

                    <DatePickerField
                        label="End Date & Time"
                        name="endDate"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        labelSize="10px"
                        placeholderSize="10px"
                        fieldHeight="8px"
                    />
                </div>

                <div className="mb-3">
                    <SelectBox
                        label="Loyalty Access"
                        name="loyaltyAccess"
                        options={loyaltyOptions}
                        values={formData.loyaltyAccess}
                        onChange={(e) => handleInputChange('loyaltyAccess', e.target.value)}
                        required={true}
                        multiple={true}
                        columns={2}
                        labelSize="10px"
                        optionSize="10px"
                        fieldHeight="8px"
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageAdminComponent;