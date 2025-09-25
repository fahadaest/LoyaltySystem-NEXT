import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import InputField from '../input-fields/InputField';

const AddAddressComponent = ({
    onSubmit,
    editMode = false,
    initialData = null,
    onClose
}) => {
    const [formData, setFormData] = useState({
        address: initialData?.address || ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && formData.address.trim()) {
            onSubmit(formData);
        }
    };

    useEffect(() => {
        if (editMode && initialData) {
            setFormData({
                address: initialData.address || ''
            });
        }
    }, [editMode, initialData]);

    return (
        <div className="w-full max-w-[743px] mx-auto">
            <form onSubmit={handleSubmit}>
                {/* Content Area */}
                <div className="bg-[#F5F5F5] rounded-[30px] border border-gray-200 p-6 min-h-[332px]">
                    {/* Address Input */}
                    <div className="mb-6">
                        <InputField
                            label="Enter Address"
                            name="address"
                            type="text"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            required={true}
                            labelSize="0.75rem"
                            placeholderSize="0.75rem"
                            fieldHeight="1rem"
                        />
                    </div>

                    {/* Map Area */}
                    <div className="w-full h-[181px] border border-dashed border-gray-200 rounded-[20px] bg-gray-100 flex items-center justify-center relative overflow-hidden">
                        {/* Google Maps Embed or Placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm">
                                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-xs text-gray-600">Map will be displayed here</p>
                                <p className="text-xs text-gray-500 mt-1">Based on entered address</p>
                            </div>
                        </div>

                        {/* Map Controls */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button
                                type="button"
                                className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-50"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-50"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                        </div>

                        {/* Google Logo */}
                        <div className="absolute bottom-3 left-3">
                            <div className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-600 shadow-sm">
                                Google
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAddressComponent;