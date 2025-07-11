'use client';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MdPerson, MdEmail, MdLock, MdSupervisorAccount, MdSecurity, MdPersonAdd, MdClose } from 'react-icons/md';
import AnimatedInput from '../ui/AnimatedInput';
import AnimatedMultiSelect from '../ui/AnimatedMultiSelect';
import AnimatedSelect from '../ui/AnimatedSelect';
import FormSection from '../ui/FormSection';
import { AnimatedCard, AnimatedCardHeader, AnimatedCardContent } from '../ui/AnimatedCard';

const AddSalesPersonForm = forwardRef(({
    onSubmit,
    managers = [],
    permissions = [],
    initialData = null,
    isLoading = false
}, ref) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        managerId: '',
        permissionIds: []
    });

    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const isEditMode = !!initialData;

    // Expose handleSubmit to parent via ref
    useImperativeHandle(ref, () => ({
        handleSubmit
    }));

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Populate form with initial data for editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                password: '', // Don't populate password for security
                managerId: initialData.managerId || '',
                permissionIds: initialData.permissionIds || []
            });
        }
    }, [initialData]);

    const validateField = (key, value) => {
        switch (key) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) return `${key === 'firstName' ? 'First' : 'Last'} name is required`;
                if (value.trim().length < 2) return `${key === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
                return '';
            case 'email':
                if (!value.trim()) return 'Email address is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? '' : 'Please enter a valid email address';
            case 'password':
                // Only require password for new salespersons
                if (!isEditMode) {
                    if (!value) return 'Password is required';
                    if (value.length < 8) return 'Password must be at least 8 characters long';
                }
                // For edit mode, only validate if password is provided
                if (isEditMode && value && value.length < 8) {
                    return 'Password must be at least 8 characters long';
                }
                return '';
            case 'managerId':
                return !value ? 'Manager selection is required' : '';
            case 'permissionIds':
                return value.length === 0 ? 'At least one permission must be selected' : '';
            default:
                return '';
        }
    };

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));

        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const submitData = {
                    ...formData,
                    managerId: parseInt(formData.managerId),
                    permissionIds: formData.permissionIds.map(id => parseInt(id))
                };

                // For edit mode, include the ID and don't send empty password
                if (isEditMode) {
                    submitData.id = initialData.id;
                    if (!submitData.password) {
                        delete submitData.password; // Remove empty password field
                    }
                }

                if (onSubmit) {
                    await onSubmit(submitData);
                }

                if (!isEditMode) {
                    setShowSuccessScreen(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '', lastName: '', email: '', password: '', managerId: '', permissionIds: []
        });
        setShowSuccessScreen(false);
        setErrors({});
    };

    // Remove individual permission
    const removePermission = (permissionId) => {
        const newPermissions = formData.permissionIds.filter(id => id !== permissionId);
        handleInputChange('permissionIds', newPermissions);
    };

    // Get selected permission labels
    const getSelectedPermissions = () => {
        return permissions.filter(permission =>
            formData.permissionIds.includes(permission.value)
        );
    };

    return (
        <div className={`w-full transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <AnimatedCard>
                <AnimatedCardContent>
                    <div className="space-y-6">
                        {/* Personal Information */}
                        <FormSection
                            title="Personal Information"
                            icon={MdPerson}
                            delay={400}
                            isVisible={isVisible}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatedInput
                                    label="First Name"
                                    icon={MdPerson}
                                    value={formData.firstName}
                                    onChange={(value) => handleInputChange('firstName', value)}
                                    error={errors.firstName}
                                    placeholder="Enter first name"
                                    required
                                />
                                <AnimatedInput
                                    label="Last Name"
                                    icon={MdPerson}
                                    value={formData.lastName}
                                    onChange={(value) => handleInputChange('lastName', value)}
                                    error={errors.lastName}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </FormSection>

                        {/* Account Information */}
                        <FormSection
                            title="Account Information"
                            icon={MdEmail}
                            delay={500}
                            isVisible={isVisible}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatedInput
                                    label="Email Address"
                                    icon={MdEmail}
                                    type="email"
                                    value={formData.email}
                                    onChange={(value) => handleInputChange('email', value)}
                                    error={errors.email}
                                    placeholder="Enter email address"
                                    required
                                />
                                <AnimatedInput
                                    label={isEditMode ? "New Password (leave blank to keep current)" : "Password"}
                                    icon={MdLock}
                                    type="password"
                                    value={formData.password}
                                    onChange={(value) => handleInputChange('password', value)}
                                    error={errors.password}
                                    placeholder={isEditMode ? "Enter new password (optional)" : "Enter password (min. 8 characters)"}
                                    required={!isEditMode}
                                />
                            </div>
                        </FormSection>

                        {/* Role & Permissions */}
                        <FormSection
                            title="Role & Permissions"
                            icon={MdSupervisorAccount}
                            delay={600}
                            isVisible={isVisible}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Manager Selection */}
                                <div className="grid grid-cols-1 gap-4">
                                    <AnimatedSelect
                                        label="Assigned Manager"
                                        icon={MdSupervisorAccount}
                                        value={formData.managerId}
                                        onChange={(value) => handleInputChange('managerId', value)}
                                        options={managers}
                                        error={errors.managerId}
                                        placeholder="Select a manager"
                                        required
                                    />

                                    <AnimatedMultiSelect
                                        label="Permissions"
                                        icon={MdSecurity}
                                        value={formData.permissionIds}
                                        onChange={(value) => handleInputChange('permissionIds', value)}
                                        options={permissions}
                                        error={errors.permissionIds}
                                        placeholder="Select permissions"
                                        required
                                    />
                                </div>

                                {/* Selected Permissions Display */}
                                {formData.permissionIds.length > 0 && (
                                    <div className="animate-fadeIn">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MdSecurity size={16} className="text-brandGreen" />
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Selected Permissions ({formData.permissionIds.length})
                                            </label>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-600">
                                            <div className="flex flex-wrap gap-2">
                                                {getSelectedPermissions().map((permission) => (
                                                    <div
                                                        key={permission.value}
                                                        className="inline-flex items-center gap-2 bg-brandGreen text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-brandGreen-600 animate-slideIn"
                                                    >
                                                        <span>{permission.label}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removePermission(permission.value)}
                                                            className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-150"
                                                            title="Remove permission"
                                                        >
                                                            <MdClose size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {formData.permissionIds.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleInputChange('permissionIds', [])}
                                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
                                                    >
                                                        Clear all permissions
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormSection>
                    </div>
                </AnimatedCardContent>
            </AnimatedCard>
        </div>
    );
});

AddSalesPersonForm.displayName = 'AddSalesPersonForm';

export default AddSalesPersonForm;