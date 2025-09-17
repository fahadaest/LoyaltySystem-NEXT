"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Calendar, ChevronDown, Check } from 'lucide-react';
import InputField from "../input-fields/InputField";
import DropdownButton from "../ui/DropDownButton";
import DatePickerField from "../input-fields/DatePickerField";
import PhoneNumberField from "../input-fields/PhoneNumberField";
import PasswordField from "../input-fields/PasswordField";
import SelectBox from "../input-fields/SelectBox";

const ManageAdminComponent = ({ onClose, onSubmit, editingAdmin = null, isEditMode = false }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        subscriptionPlan: '',
        password: '',
        confirmPassword: '',
        startDate: '',
        endDate: '',
        loyaltyAccess: [] // Changed to array to handle multiple selections
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSubscriptionDropdown, setShowSubscriptionDropdown] = useState(false);

    // Populate form data when editing
    useEffect(() => {
        if (isEditMode && editingAdmin) {
            // Convert old boolean fields to array format
            const loyaltyAccessArray = [];
            if (editingAdmin.loyaltyAccess?.includes('Point') || editingAdmin.pointBasedLoyalty) {
                loyaltyAccessArray.push('point-based');
            }
            if (editingAdmin.loyaltyAccess?.includes('Product') || editingAdmin.productBasedLoyalty) {
                loyaltyAccessArray.push('product-based');
            }

            setFormData({
                fullName: editingAdmin.name || '',
                email: editingAdmin.email || '',
                phoneNumber: editingAdmin.phone || '',
                subscriptionPlan: editingAdmin.subscription || '',
                password: '',
                confirmPassword: '',
                startDate: editingAdmin.startDate || '',
                endDate: editingAdmin.endDate || '',
                loyaltyAccess: loyaltyAccessArray
            });
        } else {
            // Reset form for add mode
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                subscriptionPlan: '',
                password: '',
                confirmPassword: '',
                startDate: '',
                endDate: '',
                loyaltyAccess: ['point-based'] // Default selection
            });
        }
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
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Convert loyaltyAccess array back to boolean fields if needed by your backend
        const submitData = {
            ...formData,
            pointBasedLoyalty: formData.loyaltyAccess.includes('point-based'),
            productBasedLoyalty: formData.loyaltyAccess.includes('product-based')
        };
        onSubmit(submitData);
    };

    return (
        <div className="w-full h-full bg-gray-100 rounded-[30px] border border-gray-200 p-4 overflow-y-auto">
            {/* Personal Information Section */}
            <div className="mb-4">
                <h3 className="text-[13px] font-semibold text-black mb-3">Personal Information</h3>

                <div className="grid grid-cols-2 gap-3 mb-3">
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
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Phone Number - Now using PhoneNumberField component */}
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

                    {/* Subscription Plan */}
                    <div className="flex flex-col relative">
                        <label className="text-[10px] font-medium text-black mb-1">Subscription Plan</label>
                        <div className="relative">
                            <div className="w-full h-[32px]">
                                <DropdownButton
                                    text={formData.subscriptionPlan || "Select a subscription plan"}
                                    backgroundColor="#EDEDED"
                                    textColor="black"
                                    circleColor="black"
                                    iconColor="white"
                                    onClick={() => setShowSubscriptionDropdown(!showSubscriptionDropdown)}
                                    width="100%"
                                    height="32px"
                                    fontSize="10px"
                                    required={true}
                                />
                            </div>

                            {showSubscriptionDropdown && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg z-10">
                                    {subscriptionOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                handleInputChange('subscriptionPlan', option.name);
                                                setShowSubscriptionDropdown(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-[10px] text-black hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl"
                                        >
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <PasswordField
                        label={`Password${!isEditMode ? '' : ''}${isEditMode ? ' (Leave blank to keep current)' : ''}`}
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder={isEditMode ? "Enter new password (optional)" : "Password"}
                        labelSize="0.625rem"
                        placeholderSize="0.625rem"
                        fieldHeight="0.5rem"
                        required={!isEditMode} // Only required for new admins
                    />

                    <PasswordField
                        label={`Confirm Password${!isEditMode ? '' : ''}${isEditMode ? ' (If changing password)' : ''}`}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder={isEditMode ? "Confirm new password" : "Confirm Password"}
                        labelSize="0.625rem"
                        placeholderSize="0.625rem"
                        fieldHeight="0.5rem"
                        required={!isEditMode} // Only required for new admins
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex flex-col">
                        <DatePickerField
                            label="Start Date & Time"
                            name="startDate"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            labelSize="10px"
                            placeholderSize="10px"
                            fieldHeight="8px"
                        />
                    </div>

                    <div className="flex flex-col">
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
                </div>

                {/* Loyalty Access - Now using SelectBox component */}
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