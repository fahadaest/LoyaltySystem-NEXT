import React from 'react';
import { Edit3, Palette, Star, Type, Clock, CreditCard, Building } from 'lucide-react';

const WalletForm = ({ cardData, handleFieldChange, gradientOptions }) => {
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
                {
                    key: 'cardType',
                    label: 'Card Type',
                    type: 'select',
                    options: [
                        { value: 'point', label: 'Points Card' },
                        { value: 'product', label: 'Product Card' }
                    ]
                },
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

    return (
        <div className="space-y-8">
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