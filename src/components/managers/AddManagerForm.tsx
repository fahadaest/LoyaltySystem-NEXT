'use client';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MdPerson, MdEmail, MdLock, MdSupervisorAccount, MdSecurity, MdPersonAdd, MdClose } from 'react-icons/md';
import AnimatedInput from '../ui/AnimatedInput';
import AnimatedMultiSelect from 'components/ui/AnimatedMultiSelect';
import FormSection from '../ui/FormSection';
import { AnimatedCard, AnimatedCardHeader, AnimatedCardContent } from '../ui/AnimatedCard';

const AddManagerForm = forwardRef(({
    onSubmit,
    permissions = [],
    permissionsGrouped = {},
    initialData = null,
    isLoading = false
}, ref) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        permissionIds: []
    });

    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);

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
                // Only require password for new managers
                if (!isEditMode) {
                    if (!value) return 'Password is required';
                    if (value.length < 8) return 'Password must be at least 8 characters long';
                }
                // For edit mode, only validate if password is provided
                if (isEditMode && value && value.length < 8) {
                    return 'Password must be at least 8 characters long';
                }
                return '';
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
            } catch (error) {
                console.error('Error:', error);
            }
        }
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

                        {/* Manager Permissions */}
                        <FormSection
                            title="Manager Permissions & Authority"
                            icon={MdSecurity}
                            delay={600}
                            isVisible={isVisible}
                        >
                            <div className="space-y-4">
                                {/* Grouped Permission Selector */}
                                <AnimatedMultiSelect
                                    label="Manager Permissions"
                                    icon={MdSecurity}
                                    value={formData.permissionIds}
                                    onChange={(value) => handleInputChange('permissionIds', value)}
                                    permissionsGrouped={permissionsGrouped}
                                    error={errors.permissionIds}
                                    required
                                />

                                {/* Selected Permissions Summary */}
                                {formData.permissionIds.length > 0 && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MdSecurity size={16} className="text-green-600 dark:text-green-400" />
                                            <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                                                Permission Summary ({formData.permissionIds.length} selected)
                                            </h4>
                                        </div>

                                        <div className="space-y-2">
                                            {Object.keys(permissionsGrouped).map(module => {
                                                const modulePermissions = permissionsGrouped[module].filter(p =>
                                                    formData.permissionIds.includes(p.id)
                                                );

                                                if (modulePermissions.length === 0) return null;

                                                return (
                                                    <div key={module} className="text-sm">
                                                        <span className="font-medium text-green-800 dark:text-green-200">
                                                            {module}:
                                                        </span>
                                                        <span className="text-green-700 dark:text-green-300 ml-2">
                                                            {modulePermissions.length} permission{modulePermissions.length !== 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Manager Privileges Info */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <MdSupervisorAccount className="text-blue-600 dark:text-blue-400 text-xl mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                                Manager Authority
                                            </h4>
                                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                                Managers have elevated permissions to oversee salespersons, access comprehensive reports, manage territories, and maintain team performance standards.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Permission Guidelines */}
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <MdSecurity className="text-amber-600 dark:text-amber-400 text-xl mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
                                                Permission Guidelines
                                            </h4>
                                            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                                                <li>• <strong>Management:</strong> Full access to salesperson and team management</li>
                                                <li>• <strong>Reports:</strong> Access to all team and performance analytics</li>
                                                <li>• <strong>Settings:</strong> Configure team-specific system settings</li>
                                                <li>• <strong>Customer:</strong> Oversee customer relationship management</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                    </div>
                </AnimatedCardContent>
            </AnimatedCard>
        </div>
    );
});

AddManagerForm.displayName = 'AddManagerForm';

export default AddManagerForm;