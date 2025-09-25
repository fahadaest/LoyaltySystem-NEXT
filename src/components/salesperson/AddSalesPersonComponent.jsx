import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronDown, X } from 'lucide-react';
import InputField from '../input-fields/InputField';
import PasswordField from '../input-fields/PasswordField';
import MultiSelectDropdown from '../input-fields/MultiSelectDropdown';

const AddSalesPersonComponent = ({
    onSubmit,
    editMode = false,
    initialData = null,
    permissions = []
}) => {
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        password: '',
        permissionIds: initialData?.permissions?.map(p => p.id) || []
    });

    const [showPermissionsDropdown, setShowPermissionsDropdown] = useState(false);

    useEffect(() => {
        if (editMode && initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                password: '',
                permissionIds: initialData.permissions?.map(p => p.id) || []
            });
        }
    }, [editMode, initialData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePermissionToggle = (permissionId) => {
        setFormData(prev => ({
            ...prev,
            permissionIds: prev.permissionIds.includes(permissionId)
                ? prev.permissionIds.filter(id => id !== permissionId)
                : [...prev.permissionIds, permissionId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                permissionIds: formData.permissionIds
            };

            // Only include password for create or if it's being updated
            if (!editMode || formData.password) {
                payload.password = formData.password;
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

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="bg-[#F5F5F5] border border-[#E2E2E2] rounded-[30px] px-4 py-4 w-full max-w-[711px] mx-auto">

                    {/* Personal Information Section */}
                    <div className="mb-3">
                        <h3 className="text-[0.7rem] font-semibold text-black mb-2 ">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <InputField
                                label="First Name"
                                name="firstName"
                                type="text"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
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

                            <InputField
                                label="Last Name"
                                name="lastName"
                                type="text"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                        </div>
                    </div>

                    {/* Account Information Section */}
                    <div className="mb-3">
                        <h3 className="text-[0.7rem] font-semibold text-black mb-2 ">
                            Account Information
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
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

                            <PasswordField
                                label="Password"
                                name="password"
                                placeholder="Enter password"
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
                        </div>
                    </div>

                    {/* Permissions & Access Section */}
                    <div>
                        <h3 className="text-[0.7rem] font-semibold text-black mb-2 ">
                            Permissions & Access
                        </h3>

                        <div className="mb-6">
                            <MultiSelectDropdown
                                label="Select Permissions"
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

export default AddSalesPersonComponent;