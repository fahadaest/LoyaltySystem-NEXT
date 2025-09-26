"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';
import { useGetAllAddressesQuery } from "@/store/slices/adminSettingsApis";

const AddBeaconComponent = ({
    onSubmit,
    editMode = false,
    initialData = null
}) => {
    const [formData, setFormData] = useState({
        beaconText: '',
        addressId: '',
        radius: ''
    });

    const [showAddressDropdown, setShowAddressDropdown] = useState(false);
    const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);

    // Fetch addresses
    const { data: addressesResponse, isLoading: isLoadingAddresses } = useGetAllAddressesQuery();
    const addresses = addressesResponse?.data || [];

    // Radius options
    const radiusOptions = [
        { value: '10', label: '10 meters' },
        { value: '25', label: '25 meters' },
        { value: '50', label: '50 meters' },
        { value: '100', label: '100 meters' },
        { value: '250', label: '250 meters' },
        { value: '500', label: '500 meters' },
        { value: '1000', label: '1 kilometer' }
    ];

    // Initialize form data for edit mode
    useEffect(() => {
        if (editMode && initialData) {
            setFormData({
                beaconText: initialData.beaconText || '',
                addressId: initialData.addressId || '',
                radius: initialData.radius || ''
            });
        }
    }, [editMode, initialData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddressSelect = (address) => {
        handleInputChange('addressId', address.id);
        setShowAddressDropdown(false);
    };

    const handleRadiusSelect = (radius) => {
        handleInputChange('radius', radius.value);
        setShowRadiusDropdown(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.beaconText.trim()) {
            alert("Please enter beacon text");
            return;
        }

        if (!formData.addressId) {
            alert("Please select an address");
            return;
        }

        if (!formData.radius) {
            alert("Please select a radius");
            return;
        }

        const submitData = {
            text: formData.beaconText.trim(),
            addressId: parseInt(formData.addressId),
            radius: parseInt(formData.radius)
        };

        onSubmit(submitData);
    };

    const getSelectedAddress = () => {
        const selected = addresses.find(addr => addr.id.toString() === formData.addressId.toString());
        return selected ? `${selected.street}, ${selected.city}` : 'Select address';
    };

    const getSelectedRadius = () => {
        const selected = radiusOptions.find(r => r.value === formData.radius);
        return selected ? selected.label : 'Select radius';
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Beacon Text Input */}
                <div>
                    <label className="block text-xs font-medium text-black mb-3">
                        Beacon Text
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={formData.beaconText}
                            onChange={(e) => handleInputChange('beaconText', e.target.value)}
                            placeholder="Enter beacon text"
                            className="w-full h-[42px] px-6 bg-white border border-gray-300 rounded-full text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Address and Radius Row */}
                <div className="flex gap-4">
                    {/* Saved Address Dropdown */}
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-black mb-3">
                            Saved Address
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddressDropdown(!showAddressDropdown);
                                    setShowRadiusDropdown(false);
                                }}
                                className="w-full h-[42px] px-6 bg-gray-100 border border-gray-300 rounded-full text-xs text-black text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                                disabled={isLoadingAddresses}
                            >
                                <span className={formData.addressId ? 'text-black' : 'text-gray-600'}>
                                    {isLoadingAddresses ? 'Loading addresses...' : getSelectedAddress()}
                                </span>
                                <ChevronDown className="w-4 h-4 text-black" />
                            </button>

                            {/* Address Dropdown */}
                            {showAddressDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg z-10 max-h-48 overflow-y-auto">
                                    {addresses.length === 0 ? (
                                        <div className="px-4 py-3 text-xs text-gray-500">
                                            No addresses available
                                        </div>
                                    ) : (
                                        addresses.map((address) => (
                                            <button
                                                key={address.id}
                                                type="button"
                                                onClick={() => handleAddressSelect(address)}
                                                className="w-full px-4 py-3 text-left text-xs text-black hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl"
                                            >
                                                <div className="font-medium">{address.street}</div>
                                                <div className="text-gray-500">{address.city}, {address.country}</div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Radius Dropdown */}
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-black mb-3">
                            Radius
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowRadiusDropdown(!showRadiusDropdown);
                                    setShowAddressDropdown(false);
                                }}
                                className="w-full h-[42px] px-6 bg-gray-100 border border-gray-300 rounded-full text-xs text-black text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <span className={formData.radius ? 'text-black' : 'text-gray-600'}>
                                    {getSelectedRadius()}
                                </span>
                                <ChevronDown className="w-4 h-4 text-black" />
                            </button>

                            {/* Radius Dropdown */}
                            {showRadiusDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg z-10 max-h-48 overflow-y-auto">
                                    {radiusOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleRadiusSelect(option)}
                                            className="w-full px-4 py-3 text-left text-xs text-black hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            {/* Click outside handler */}
            {(showAddressDropdown || showRadiusDropdown) && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => {
                        setShowAddressDropdown(false);
                        setShowRadiusDropdown(false);
                    }}
                />
            )}
        </div>
    );
};

export default AddBeaconComponent;