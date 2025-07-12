import React from 'react';
import { Edit3, Palette, Star, Type, Clock, CreditCard, Building, Gift, Award } from 'lucide-react';

const WalletForm = ({ cardData, handleFieldChange, gradientOptions }) => {
    const loyaltyTypes = [
        {
            value: 'product',
            label: 'Product',
            icon: Gift
        },
        {
            value: 'points',
            label: 'Points',
            icon: Award
        },
    ];

    const sections = [
        {
            title: 'Basic Information',
            icon: Edit3,
            fields: [
                { key: 'cardName', label: 'Card Name', placeholder: 'Enter card name' },
                { key: 'organizationName', label: 'Organization Name', placeholder: 'Enter organization name' },
                { key: 'logoText', label: 'Logo Text', placeholder: 'Enter logo text' },
                { key: 'description', label: 'Description', placeholder: 'Enter card description', type: 'textarea' }
            ]
        },
        {
            title: 'Card Configuration',
            icon: CreditCard,
            fields: [
                { key: 'passTypeIdentifier', label: 'Pass Type Identifier', placeholder: 'pass.com.yourcompany.cardname' },
                { key: 'teamIdentifier', label: 'Team Identifier', placeholder: 'Your Apple Developer Team ID' }
            ]
        },
        {
            title: 'Design',
            icon: Palette,
            fields: [
                { key: 'backgroundColor', label: 'Background Color', type: 'color' },
                { key: 'foregroundColor', label: 'Text Color', placeholder: '#FFFFFF' },
                { key: 'labelColor', label: 'Label Color', placeholder: '#FFFFFF' }
            ]
        }
    ];

    const fieldSections = [
        {
            title: 'Primary Field',
            icon: Star,
            key: 'primaryFields',
            maxFields: 1
        },
        {
            title: 'Secondary Fields',
            icon: Type,
            key: 'secondaryFields',
            maxFields: 2
        },
        {
            title: 'Auxiliary Fields',
            icon: Clock,
            key: 'auxiliaryFields',
            maxFields: 2
        }
    ];

    const updateFieldArray = (fieldType, index, property, value) => {
        const fields = cardData[fieldType] || [];
        const newFields = [...fields];
        if (!newFields[index]) {
            newFields[index] = { key: '', label: '', value: '' };
        }
        newFields[index][property] = value;
        handleFieldChange(fieldType, newFields);
    };

    const renderField = (field) => {
        const value = cardData[field.key] || '';

        switch (field.type) {
            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select {field.label}</option>
                        {field.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={field.placeholder}
                        rows={3}
                    />
                );

            case 'color':
                return (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="#4F46E5 or gradient"
                        />
                        {field.key === 'backgroundColor' && (
                            <div className="grid grid-cols-3 gap-2">
                                {gradientOptions.map((gradient, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleFieldChange(field.key, gradient.value)}
                                        className="h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                                        style={{ background: gradient.value }}
                                        title={gradient.name}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={field.placeholder}
                    />
                );
        }
    };

    const renderLoyaltyTypeSelection = () => {
        const selectedType = cardData.loyaltyType || '';

        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Card Type
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {loyaltyTypes.map((type) => {
                        const isSelected = selectedType === type.value;
                        const IconComponent = type.icon;

                        return (
                            <div
                                key={type.value}
                                onClick={() => handleFieldChange('loyaltyType', type.value)}
                                className={`
                                    relative cursor-pointer rounded-lg border-2 p-3 text-center transition-all duration-200 hover:shadow-sm
                                    ${isSelected
                                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                    }
                                `}
                            >
                                {/* Selection indicator */}
                                <div className={`
                                    absolute top-1 right-1 w-3 h-3 rounded-full border transition-colors
                                    ${isSelected
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300'
                                    }
                                `}>
                                    {isSelected && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pt-1">
                                    <div className={`
                                        w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center transition-colors
                                        ${isSelected
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-gray-100 text-gray-600'
                                        }
                                    `}>
                                        <IconComponent className="w-4 h-4" />
                                    </div>

                                    <span className={`
                                        text-xs font-medium transition-colors
                                        ${isSelected ? 'text-blue-900' : 'text-gray-700'}
                                    `}>
                                        {type.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Selected type info */}
                {selectedType && (
                    <div className="bg-brandGreenHighlight/30 border border-brandGreenHighlight rounded-lg p-3">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                                {React.createElement(loyaltyTypes.find(t => t.value === selectedType)?.icon, {
                                    className: "w-3 h-3 text-brandGreen"
                                })}
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-brandGreen">
                                    {loyaltyTypes.find(t => t.value === selectedType)?.label} Card Selected
                                </h5>
                                <p className="text-xs text-brandGreen">
                                    Your wallet card will be configured for {selectedType} tracking
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Loyalty Type Selection - First Section */}
            {renderLoyaltyTypeSelection()}

            {/* Basic Sections */}
            {sections.map((section) => (
                <div key={section.title}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <section.icon className="w-5 h-5 mr-2" />
                        {section.title}
                    </h3>
                    <div className="space-y-4">
                        {section.fields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {field.label}
                                </label>
                                {renderField(field)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Dynamic Field Sections */}
            {fieldSections.map((section) => (
                <div key={section.title}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <section.icon className="w-5 h-5 mr-2" />
                        {section.title}
                    </h3>
                    <div className="space-y-4">
                        {Array.from({ length: section.maxFields }).map((_, index) => {
                            const fieldData = cardData[section.key]?.[index] || { label: '', value: '' };
                            return (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Label
                                        </label>
                                        <input
                                            type="text"
                                            value={fieldData.label}
                                            onChange={(e) => updateFieldArray(section.key, index, 'label', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Field label"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Value
                                        </label>
                                        <input
                                            type="text"
                                            value={fieldData.value}
                                            onChange={(e) => updateFieldArray(section.key, index, 'value', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Field value"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Barcode Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Barcode
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Barcode Message
                        </label>
                        <input
                            type="text"
                            value={cardData.barcodeMessage || ''}
                            onChange={(e) => handleFieldChange('barcodeMessage', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter barcode message"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Barcode Format
                        </label>
                        <select
                            value={cardData.barcodeFormat || 'QR'}
                            onChange={(e) => handleFieldChange('barcodeFormat', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="QR">QR Code</option>
                            <option value="PDF417">PDF417</option>
                            <option value="Aztec">Aztec</option>
                            <option value="Code128">Code128</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletForm;