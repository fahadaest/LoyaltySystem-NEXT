'use client';
import { useState, useEffect, forwardRef } from 'react';
import { MdExpandMore, MdExpandLess, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

const AnimatedMultiSelect = forwardRef(({
    label,
    icon: Icon,
    value = [],
    onChange,
    permissionsGrouped = {},
    error,
    required = false
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedModules, setExpandedModules] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const toggleModule = (module) => {
        setExpandedModules(prev => ({
            ...prev,
            [module]: !prev[module]
        }));
    };

    const handlePermissionToggle = (permissionId) => {
        const newValue = value.includes(permissionId)
            ? value.filter(id => id !== permissionId)
            : [...value, permissionId];
        onChange(newValue);
    };

    const handleModuleToggle = (module) => {
        const modulePermissions = permissionsGrouped[module]?.map(p => p.id) || [];
        const allSelected = modulePermissions.every(id => value.includes(id));

        if (allSelected) {
            // Remove all module permissions
            const newValue = value.filter(id => !modulePermissions.includes(id));
            onChange(newValue);
        } else {
            // Add all module permissions
            const newValue = [...new Set([...value, ...modulePermissions])];
            onChange(newValue);
        }
    };

    const getSelectedCount = () => value.length;

    const getModuleSelectionState = (module) => {
        const modulePermissions = permissionsGrouped[module]?.map(p => p.id) || [];
        const selectedCount = modulePermissions.filter(id => value.includes(id)).length;

        if (selectedCount === 0) return 'none';
        if (selectedCount === modulePermissions.length) return 'all';
        return 'partial';
    };

    return (
        <div className={`w-full transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative">
                {/* Label */}
                <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon size={16} className="text-brandGreen" />}
                    <label className={`text-sm font-semibold ${error ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                </div>

                {/* Dropdown Toggle */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full flex items-center justify-between p-3 rounded-xl border-2 
                        transition-all duration-200 bg-white dark:bg-gray-800
                        ${error
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-200 dark:border-gray-600 focus:border-brandGreen hover:border-gray-300'
                        }
                        ${isOpen ? 'border-brandGreen shadow-md' : ''}
                    `}
                >
                    <span className={`text-sm ${getSelectedCount() === 0 ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {getSelectedCount() === 0
                            ? 'Select permissions'
                            : `${getSelectedCount()} permission${getSelectedCount() !== 1 ? 's' : ''} selected`
                        }
                    </span>
                    {isOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                </button>

                {/* Dropdown Content */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                        {Object.keys(permissionsGrouped).map((module) => {
                            const moduleState = getModuleSelectionState(module);
                            const isExpanded = expandedModules[module];

                            return (
                                <div key={module} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                    {/* Module Header */}
                                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <button
                                            type="button"
                                            onClick={() => handleModuleToggle(module)}
                                            className="flex items-center gap-2 flex-1"
                                        >
                                            {moduleState === 'all' ? (
                                                <MdCheckBox className="text-brandGreen" size={20} />
                                            ) : moduleState === 'partial' ? (
                                                <div className="w-5 h-5 border-2 border-brandGreen rounded bg-brandGreen/20 flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-brandGreen rounded"></div>
                                                </div>
                                            ) : (
                                                <MdCheckBoxOutlineBlank className="text-gray-400" size={20} />
                                            )}
                                            <span className="font-medium text-gray-900 dark:text-white">{module}</span>
                                            <span className="text-xs text-gray-500 ml-1">
                                                ({permissionsGrouped[module]?.length || 0})
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => toggleModule(module)}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                        >
                                            {isExpanded ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
                                        </button>
                                    </div>

                                    {/* Module Permissions */}
                                    {isExpanded && (
                                        <div className="bg-gray-50 dark:bg-gray-750">
                                            {permissionsGrouped[module]?.map((permission) => (
                                                <button
                                                    key={permission.id}
                                                    type="button"
                                                    onClick={() => handlePermissionToggle(permission.id)}
                                                    className="w-full flex items-center gap-3 p-3 pl-12 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                                                >
                                                    {value.includes(permission.id) ? (
                                                        <MdCheckBox className="text-brandGreen" size={18} />
                                                    ) : (
                                                        <MdCheckBoxOutlineBlank className="text-gray-400" size={18} />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {permission.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {permission.description}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Clear All / Select All Actions */}
                        {Object.keys(permissionsGrouped).length > 0 && (
                            <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onChange([])}
                                        className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-500 px-2 py-1 rounded"
                                        disabled={getSelectedCount() === 0}
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const allPermissions = Object.values(permissionsGrouped)
                                                .flat()
                                                .map(p => p.id);
                                            onChange(allPermissions);
                                        }}
                                        className="text-xs text-gray-600 dark:text-gray-400 hover:text-brandGreen px-2 py-1 rounded"
                                    >
                                        Select All
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <p className="mt-1 text-xs text-red-600 animate-slideDown">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
});

AnimatedMultiSelect.displayName = 'AnimatedMultiSelect';

export default AnimatedMultiSelect;