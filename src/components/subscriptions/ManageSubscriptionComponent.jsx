"use client";
import React, { useState, useEffect } from "react";
import InputField from "../input-fields/InputField";
import DropdownButton from "../ui/DropDownButton";
import DatePickerField from "../input-fields/DatePickerField";
import PriceField from "../ui/PriceField";

const ManageSubscriptionComponent = ({ onSubmit, editingSubscription = null, isEditMode = false, triggerSubmit = false }) => {
    const [formData, setFormData] = useState({
        subscriptionName: '',
        subscriptionPrice: '',
        billingCycle: '',
        status: 'Active',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (triggerSubmit) handleSubmit();
    }, [triggerSubmit]);

    useEffect(() => {
        if (isEditMode && editingSubscription) {
            setFormData({
                subscriptionName: editingSubscription.name || '',
                subscriptionPrice: editingSubscription.price?.toString() || '',
                billingCycle: editingSubscription.billingCycle?.charAt(0).toUpperCase() + editingSubscription.billingCycle?.slice(1) || 'Monthly',
                status: editingSubscription.status?.charAt(0).toUpperCase() + editingSubscription.status?.slice(1) || 'Active',
                startDate: editingSubscription.startDate || '',
                endDate: editingSubscription.endDate || '',
                description: editingSubscription.description || ''
            });
        } else {
            setFormData({ subscriptionName: '', subscriptionPrice: '', billingCycle: 'Monthly', status: 'Active', startDate: '', endDate: '', description: '' });
        }
        setErrors({});
    }, [isEditMode, editingSubscription]);

    const billingCycleOptions = [{ id: 1, name: "Weekly" }, { id: 2, name: "Monthly" }, { id: 3, name: "Quarterly" }, { id: 4, name: "Yearly" }, { id: 5, name: "Custom" }];
    const statusOptions = [{ id: 1, name: "Active" }, { id: 2, name: "Inactive" }];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.subscriptionName?.trim()) newErrors.subscriptionName = 'Subscription name is required';
        if (!formData.subscriptionPrice?.trim()) newErrors.subscriptionPrice = 'Subscription price is required';
        else if (!/^\d+(\.\d{1,2})?$/.test(formData.subscriptionPrice)) newErrors.subscriptionPrice = 'Please enter a valid price';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <div className="w-full h-full bg-[#F5F5F5] rounded-[30px] border border-gray-200 p-4 overflow-y-auto">
            <div className="mb-4">
                <h3 className="text-[13px] font-semibold text-black mb-3">Subscription Information</h3>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <InputField
                            label="Subscription Name"
                            name="subscriptionName"
                            value={formData.subscriptionName}
                            onChange={(e) => handleInputChange('subscriptionName', e.target.value)}
                            placeholder="Enter subscription name"
                            labelSize="10px"
                            placeholderSize="10px"
                            fieldHeight="8px"
                            required={true}
                        />
                        {errors.subscriptionName && <span className="text-red-500 text-[9px] mt-1 block">{errors.subscriptionName}</span>}
                    </div>
                    <div>
                        <PriceField
                            label="Subscription Price"
                            name="subscriptionPrice"
                            value={formData.subscriptionPrice}
                            onChange={(e) => handleInputChange('subscriptionPrice', e.target.value)}
                            placeholder="0.00"
                            required={true}
                            error={errors.subscriptionPrice}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex flex-col">
                        <label className="text-[10px] font-medium text-black mb-2">Billing Cycle <span className="text-red-500 ml-1">*</span></label>
                        <div style={{ height: '32px' }}>
                            <DropdownButton
                                text={formData.billingCycle}
                                placeholder="Select billing cycle"
                                options={billingCycleOptions}
                                onSelect={(value, label) => handleInputChange('billingCycle', label)}
                                value={formData.billingCycle}
                                width="100%"
                                height="32px"
                                fontSize="10px"
                                backgroundColor="#EDEDED"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-medium text-black mb-2">Status <span className="text-red-500 ml-1">*</span></label>
                        <div style={{ height: '32px' }}>
                            <DropdownButton
                                text={formData.status}
                                placeholder="Select status"
                                options={statusOptions}
                                onSelect={(value, label) => handleInputChange('status', label)}
                                value={formData.status}
                                width="100%"
                                height="32px"
                                fontSize="10px"
                                backgroundColor="#EDEDED"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <DatePickerField
                        label="Start Date & Time"
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        placeholder="2025-04-21"
                        labelSize="10px"
                        placeholderSize="10px"
                        fieldHeight="8px"
                        helperText="Select start date and time"
                    />
                    <DatePickerField
                        label="End Date & Time"
                        name="endDate"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        placeholder="2026-11-23"
                        labelSize="10px"
                        placeholderSize="10px"
                        fieldHeight="8px"
                        helperText="Select end date and time"
                    />
                </div>

                <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-medium text-black">Description</label>
                        <span className="text-[10px] text-gray-400">{formData.description.length}/500</span>
                    </div>
                    <textarea
                        value={formData.description}
                        onChange={(e) => e.target.value.length <= 500 && handleInputChange('description', e.target.value)}
                        placeholder="Enter subscription description"
                        className="w-full h-[100px] bg-white border border-gray-200 rounded-2xl p-3 text-[10px] text-gray-600 placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageSubscriptionComponent;