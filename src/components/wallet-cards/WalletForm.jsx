'use client';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Edit3, Palette, Star, Type, Clock, CreditCard, Building, Gift, Award, QrCode, AlertCircle } from 'lucide-react';
import AnimatedInput from '../ui/AnimatedInput';
import AnimatedSelect from '../ui/AnimatedSelect';
import FormSection from '../ui/FormSection';
import AnimatedButton from '../ui/AnimatedButton';
import { AnimatedCard, AnimatedCardContent } from '../ui/AnimatedCard';
import ColorPicker from 'components/ui/ColorPicker';
import CardTypeSelector from '../ui/CardTypeSelector';
import { loyaltyTypes } from 'utils/loyaltyTypes';
import { barcodeOptions } from 'utils/barcodeOptions';

const WalletForm = forwardRef(({
    cardData,
    handleFieldChange,
    colorOption,
    onSubmit,
    isLoading = false
}, ref) => {
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        handleSubmit: validateAndSubmit
    }));

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const validateField = (key, value) => {
        switch (key) {
            case 'cardName':
                if (!value?.trim()) return 'Card name is required';
                if (value.trim().length < 2) return 'Card name must be at least 2 characters';
                return '';
            case 'organizationName':
                if (!value?.trim()) return 'Organization name is required';
                return '';
            case 'passTypeIdentifier':
                if (!value?.trim()) return 'Pass type identifier is required';
                const passIdRegex = /^[a-zA-Z0-9.-]+$/;
                if (!passIdRegex.test(value)) return 'Invalid pass type identifier format';
                return '';
            case 'teamIdentifier':
                if (!value?.trim()) return 'Team identifier is required';
                return '';
            case 'loyaltyType':
                if (!value) return 'Please select a card type';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (key, value) => {
        handleFieldChange(key, value);

        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        const requiredFields = ['cardName', 'organizationName', 'passTypeIdentifier', 'teamIdentifier', 'loyaltyType'];

        requiredFields.forEach(key => {
            const error = validateField(key, cardData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const validateAndSubmit = async () => {
        if (validateForm()) {
            try {
                if (onSubmit) {
                    await onSubmit(cardData);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <div className={`max-w-4xl mx-auto  transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            <AnimatedCardContent>
                <div className="space-y-8">
                    {/* Card Type Selection */}
                    <FormSection
                        title="Card Type"
                        icon={Building}
                        delay={100}
                        isVisible={isVisible}
                    >
                        <CardTypeSelector
                            value={cardData.loyaltyType || ''}
                            onChange={(value) => handleInputChange('loyaltyType', value)}
                            options={loyaltyTypes}
                            error={errors.loyaltyType}
                        />
                    </FormSection>

                    {/* Design Section */}
                    <FormSection
                        title="Design"
                        icon={Palette}
                        delay={400}
                        isVisible={isVisible}
                    >
                        <div className="space-y-1">
                            <ColorPicker
                                label="Background Color"
                                value={cardData.backgroundColor || ''}
                                onChange={(value) => handleInputChange('backgroundColor', value)}
                                colorOption={colorOption}
                                error={errors.backgroundColor}
                            />
                        </div>
                    </FormSection>

                    {/* Basic Information */}
                    <FormSection
                        title="Basic Information"
                        icon={Edit3}
                        delay={200}
                        isVisible={isVisible}
                    >
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatedInput
                                    label="Card Title"
                                    icon={Building}
                                    value={cardData.organizationName || ''}
                                    onChange={(value) => handleInputChange('organizationName', value)}
                                    error={errors.organizationName}
                                    placeholder="Enter organization name"
                                    required
                                />
                                <AnimatedInput
                                    label="Total Stamps"
                                    icon={Building}
                                    value={cardData.organizationName || ''}
                                    onChange={(value) => handleInputChange('organizationName', value)}
                                    error={errors.organizationName}
                                    placeholder="Enter organization name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatedInput
                                    label="Card Logo"
                                    icon={Building}
                                    value={cardData.organizationName || ''}
                                    onChange={(value) => handleInputChange('organizationName', value)}
                                    error={errors.organizationName}
                                    placeholder="Enter organization name"
                                    required
                                />
                                <AnimatedInput
                                    label="Card Background Image"
                                    icon={Building}
                                    value={cardData.organizationName || ''}
                                    onChange={(value) => handleInputChange('organizationName', value)}
                                    error={errors.organizationName}
                                    placeholder="Enter organization name"
                                    required
                                />
                            </div>

                        </div>
                    </FormSection>


                    {/* Barcode Section */}
                    <FormSection
                        title="Barcode"
                        icon={QrCode}
                        delay={800}
                        isVisible={isVisible}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AnimatedInput
                                label="Barcode Message"
                                icon={QrCode}
                                value={cardData.barcodeMessage || ''}
                                onChange={(value) => handleInputChange('barcodeMessage', value)}
                                placeholder="Enter barcode message"
                            />

                            <AnimatedSelect
                                label="Barcode Format"
                                icon={QrCode}
                                value={cardData.barcodeFormat || 'QR'}
                                onChange={(value) => handleInputChange('barcodeFormat', value)}
                                options={barcodeOptions}
                            />
                        </div>
                    </FormSection>
                </div>
            </AnimatedCardContent>
        </div>
    );
});

WalletForm.displayName = 'WalletForm';

export default WalletForm;