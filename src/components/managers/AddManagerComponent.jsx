import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronDown, X } from 'lucide-react';
import InputField from '../input-fields/InputField';
import PasswordField from '../input-fields/PasswordField';
import MultiSelectDropdown from '../input-fields/MultiSelectDropdown';

const AddManagerComponent = ({
    onSubmit,
    editMode = false,
    initialData = null,
    permissions = []
}) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        email: initialData?.email || '',
        password: '',
        confirmPassword: '',
        permissionIds: initialData?.permissions?.map(p => p.id) || []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editMode && initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                password: '',
                confirmPassword: '',
                permissionIds: initialData.permissions?.map(p => p.id) || []
            });
        }
    }, [editMode, initialData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        // Password validation (only for create mode or when password is provided)
        if (!editMode || formData.password) {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (onSubmit) {
            const payload = {
                name: formData.name.trim(),
                email: formData.email,
                password: formData.password,
                permissionIds: formData.permissionIds
            };

            // Only include password for create or if it's being updated
            if (editMode && !formData.password) {
                delete payload.password;
            }

            onSubmit(payload);
        }
    };

    // Flatten grouped permissions into a single array for dropdown options
    const flatPermissions = React.useMemo(() => {
        if (Array.isArray(permissions)) return permissions;
        if (typeof permissions === 'object' && permissions !== null) {
            return Object.values(permissions).flat();
        }
        return [];
    }, [permissions]);

    // Create permission options for MultiSelectDropdown
    const permissionOptions = flatPermissions.map(permission => ({
        value: permission.id,
        label: permission.name,
        id: permission.id
    }));

    const handlePermissionSelectionChange = (selectedValues) => {
        setFormData(prev => ({
            ...prev,
            permissionIds: selectedValues
        }));
    };

    const selectedPermissions = flatPermissions.filter(p => formData.permissionIds.includes(p.id));

    const handlePermissionToggle = (permissionId) => {
        setFormData(prev => ({
            ...prev,
            permissionIds: prev.permissionIds.includes(permissionId)
                ? prev.permissionIds.filter(id => id !== permissionId)
                : [...prev.permissionIds, permissionId]
        }));
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="bg-[#F5F5F5] border border-[#E2E2E2] rounded-[30px] px-4 py-4 w-full max-w-[711px] mx-auto">

                    {/* Personal Information Section */}
                    <div className="mb-3">
                        <h3 className="text-[0.7rem] font-semibold text-black mb-2">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <InputField
                                    label="Name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required={true}
                                    labelSize="0.6rem"
                                    placeholderSize="0.6rem"
                                    fieldHeight="8px"
                                    customStyles={{
                                        container: "w-full",
                                        label: "block text-[12px] font-medium text-black mb-3 font-['Poppins']",
                                        input: "w-full h-[42px] px-6 bg-white border border-[#E2E2E2] rounded-[36px] text-[12px] placeholder-[#636363] text-black font-['Poppins'] focus:outline-none focus:border-gray-400"
                                    }}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>
                                )}
                            </div>

                            <div>
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required={true}
                                    labelSize="0.6rem"
                                    placeholderSize="0.6rem"
                                    fieldHeight="8px"
                                    customStyles={{
                                        container: "w-full",
                                        label: "block text-[12px] font-medium text-black mb-3 font-['Poppins']",
                                        input: "w-full h-[42px] px-6 bg-white border border-[#E2E2E2] rounded-[36px] text-[12px] placeholder-[#636363] text-black font-['Poppins'] focus:outline-none focus:border-gray-400"
                                    }}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Information Section */}
                    <div className="mb-3">

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <PasswordField
                                    label="Password"
                                    name="password"
                                    placeholder={editMode ? "Leave blank to keep current" : "Enter password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    required={!editMode}
                                    labelSize="0.6rem"
                                    placeholderSize="0.6rem"
                                    fieldHeight="8px"
                                    customStyles={{
                                        container: "w-full",
                                        label: "block text-[12px] font-medium text-black mb-3 font-['Poppins']",
                                        input: "w-full h-[42px] px-6 bg-white border border-[#E2E2E2] rounded-[36px] text-[12px] placeholder-[#636363] text-black font-['Poppins'] focus:outline-none focus:border-gray-400"
                                    }}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-[10px] mt-1 block">{errors.password}</span>
                                )}
                            </div>

                            <div>
                                <PasswordField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    placeholder={editMode ? "Confirm new password" : "Confirm password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    required={!editMode || formData.password}
                                    labelSize="0.6rem"
                                    placeholderSize="0.6rem"
                                    fieldHeight="8px"
                                    customStyles={{
                                        container: "w-full",
                                        label: "block text-[12px] font-medium text-black mb-3 font-['Poppins']",
                                        input: "w-full h-[42px] px-6 bg-white border border-[#E2E2E2] rounded-[36px] text-[12px] placeholder-[#636363] text-black font-['Poppins'] focus:outline-none focus:border-gray-400"
                                    }}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-[10px] mt-1 block">{errors.confirmPassword}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Permissions & Access Section */}
                    <div>
                        <h3 className="text-[0.7rem] font-semibold text-black mb-2">
                            Permissions & Access
                        </h3>

                        <div className="mb-6">
                            <MultiSelectDropdown
                                forcePosition="top"
                                label="Manager Permissions"
                                text="Select permissions"
                                placeholder="Select permissions"
                                options={permissionOptions}
                                selectedValues={formData.permissionIds}
                                onSelectionChange={handlePermissionSelectionChange}
                                backgroundColor="#FFFFFF"
                                textColor="#000000"
                                circleColor="black"
                                iconColor="white"
                                width="100%"
                                height="42px"
                                fontSize="12px"
                                labelSize="12px"
                                showSelectedCount={true}
                                required={false}
                                customStyles={{
                                    label: "block text-[12px] font-medium text-black mb-3 font-['Poppins']",
                                    button: "w-full h-[42px] px-6 bg-white border border-[#E2E2E2] rounded-[36px] text-[12px] text-black font-['Poppins'] focus:outline-none focus:border-gray-400 flex items-center justify-between"
                                }}
                            />
                        </div>
                    </div>

                    {/* Selected Permissions Display */}
                    {selectedPermissions.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-[10px] font-medium text-[#636363] mb-2 font-['Poppins']">
                                Selected Permissions:
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedPermissions.map((permission) => (
                                    <span
                                        key={permission.id}
                                        className="px-2 py-1 bg-black text-white text-[9px] rounded-full flex items-center gap-1.5 font-['Poppins']"
                                    >
                                        {permission.name}
                                        <button
                                            type="button"
                                            onClick={() => handlePermissionToggle(permission.id)}
                                            className="hover:bg-gray-700 rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="w-2 h-2" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </form>
        </div>
    );
};

export default AddManagerComponent;