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
import ImageSelector from '../ui/ImageSelector'; // Import the new ImageSelector
import { loyaltyTypes } from 'utils/loyaltyTypes';
import { barcodeOptions } from 'utils/barcodeOptions';

const WalletForm = forwardRef(({
    cardData,
    setCardData,
    colorOption,
    onSubmit,
    isLoading = false
}, ref) => {
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    console.log("cardData", cardData)

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
        setCardData(prev => ({
            ...prev,
            [key]: value
        }));

        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    // Handle logo image change - store blob directly in cardData.logoImage
    const handleLogoImageChange = (imageUrl, blob) => {
        console.log('Logo image change:', { imageUrl, blob });

        // Check if this is a removal case (empty imageUrl and no blob)
        if ((!imageUrl || imageUrl === '') && !blob) {
            console.log('Removing logo image');
            // Clean up existing blob URL if it exists
            if (cardData.logoImageUrl && cardData.logoImageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(cardData.logoImageUrl);
            }

            setCardData(prev => ({
                ...prev,
                logoImage: null,
                logoImageUrl: ''
            }));
        } else {
            // Normal case - set both blob and URL
            setCardData(prev => ({
                ...prev,
                logoImage: blob || prev.logoImage,
                logoImageUrl: imageUrl || prev.logoImageUrl || (blob ? URL.createObjectURL(blob) : '')
            }));
        }

        // Clear any logo image errors
        if (errors.logoImage) {
            setErrors(prev => ({ ...prev, logoImage: '' }));
        }
    };

    // Handle background image change - store blob directly in cardData.backgroundImage
    const handleBackgroundImageChange = (imageUrl, blob) => {
        console.log('Background image change:', { imageUrl, blob });

        // Check if this is a removal case (empty imageUrl and no blob)
        if ((!imageUrl || imageUrl === '') && !blob) {
            console.log('Removing background image');
            // Clean up existing blob URL if it exists
            if (cardData.backgroundImageUrl && cardData.backgroundImageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(cardData.backgroundImageUrl);
            }

            setCardData(prev => ({
                ...prev,
                backgroundImage: null,
                backgroundImageUrl: ''
            }));
        } else {
            // Normal case - set both blob and URL
            setCardData(prev => ({
                ...prev,
                backgroundImage: blob || prev.backgroundImage,
                backgroundImageUrl: imageUrl || prev.backgroundImageUrl || (blob ? URL.createObjectURL(blob) : '')
            }));
        }

        // Clear any background image errors
        if (errors.backgroundImage) {
            setErrors(prev => ({ ...prev, backgroundImage: '' }));
        }
    };

    // Handle stamp collected image change
    const handleStampCollectedImageChange = (imageUrl, blob) => {
        console.log('Stamp collected image change:', { imageUrl, blob });

        // Check if this is a removal case (empty imageUrl and no blob)
        if ((!imageUrl || imageUrl === '') && !blob) {
            console.log('Removing stamp collected image');
            // Clean up existing blob URL if it exists
            if (cardData.stampCollectedImgUrl && cardData.stampCollectedImgUrl.startsWith('blob:')) {
                URL.revokeObjectURL(cardData.stampCollectedImgUrl);
            }

            setCardData(prev => ({
                ...prev,
                stampCollectedImg: null,
                stampCollectedImgUrl: ''
            }));
        } else {
            // Normal case - set both blob and URL
            setCardData(prev => ({
                ...prev,
                stampCollectedImg: blob || prev.stampCollectedImg,
                stampCollectedImgUrl: imageUrl || prev.stampCollectedImgUrl || (blob ? URL.createObjectURL(blob) : '')
            }));
        }

        // Clear any stamp collected image errors
        if (errors.stampCollectedImg) {
            setErrors(prev => ({ ...prev, stampCollectedImg: '' }));
        }
    };

    // Handle uncollected stamp image change
    const handleNoStampCollectedImageChange = (imageUrl, blob) => {
        console.log('Uncollected stamp image change:', { imageUrl, blob });

        // Check if this is a removal case (empty imageUrl and no blob)
        if ((!imageUrl || imageUrl === '') && !blob) {
            console.log('Removing uncollected stamp image');
            // Clean up existing blob URL if it exists
            if (cardData.noStampCollectedImgUrl && cardData.noStampCollectedImgUrl.startsWith('blob:')) {
                URL.revokeObjectURL(cardData.noStampCollectedImgUrl);
            }

            setCardData(prev => ({
                ...prev,
                noStampCollectedImg: null,
                noStampCollectedImgUrl: ''
            }));
        } else {
            // Normal case - set both blob and URL
            setCardData(prev => ({
                ...prev,
                noStampCollectedImg: blob || prev.noStampCollectedImg,
                noStampCollectedImgUrl: imageUrl || prev.noStampCollectedImgUrl || (blob ? URL.createObjectURL(blob) : '')
            }));
        }

        // Clear any uncollected stamp image errors
        if (errors.noStampCollectedImg) {
            setErrors(prev => ({ ...prev, noStampCollectedImg: '' }));
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
        <div className={`max-w-4xl mx-auto transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            <AnimatedCardContent>
                <div className="space-y-8">

                    <FormSection
                        icon={Edit3}
                        delay={200}
                        isVisible={isVisible}
                    >
                        <div className="space-y-1">
                            <div className="grid grid-cols-1 gap-4">
                                <AnimatedInput
                                    label="Card Name"
                                    icon={Building}
                                    value={cardData.cardName || ''}
                                    onChange={(value) => handleInputChange('cardName', value)}
                                    error={errors.cardName}
                                    placeholder="Enter Card Name"
                                    required
                                />
                            </div>
                        </div>
                    </FormSection>

                    {/* Card Type Selection */}
                    <FormSection
                        title="Card Type"
                        icon={Building}
                        delay={100}
                        isVisible={isVisible}
                    >
                        <CardTypeSelector
                            value={cardData.cardType || ''}
                            onChange={(value) => handleInputChange('cardType', value)}
                            options={loyaltyTypes}
                            error={errors.cardType}
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

                                <ImageSelector
                                    label="Card Logo"
                                    value={cardData.logoImageUrl || ''}
                                    onChange={handleLogoImageChange}
                                    onBlobChange={(blob) => handleLogoImageChange('', blob)}
                                    aspectRatio={1}
                                    error={errors.logoImage}
                                    placeholder="Upload card logo"
                                    maxWidth={200}
                                    maxHeight={200}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Background Image Selector - Takes 2 columns */}
                                <div className="md:col-span-2">
                                    <ImageSelector
                                        label="Card Background Image"
                                        value={cardData.backgroundImageUrl || ''}
                                        onChange={handleBackgroundImageChange}
                                        onBlobChange={(blob) => handleBackgroundImageChange('', blob)}
                                        aspectRatio={16 / 9}
                                        error={errors.backgroundImage}
                                        placeholder="Upload background image"
                                        maxWidth={400}
                                        maxHeight={225}
                                    />
                                </div>

                                {cardData.cardType !== 'point' && (
                                    <>
                                        {/* Stamp Collected Image Selector - Takes 1 column */}
                                        <ImageSelector
                                            label="Stamp Collected"
                                            value={cardData.stampCollectedImgUrl || ''}
                                            onChange={handleStampCollectedImageChange}
                                            onBlobChange={(blob) => handleStampCollectedImageChange('', blob)}
                                            aspectRatio={1}
                                            error={errors.stampCollectedImg}
                                            placeholder="Upload stamp collected image"
                                            maxWidth={200}
                                            maxHeight={200}
                                        />

                                        {/* Uncollected Stamp Image Selector - Takes 1 column */}
                                        <ImageSelector
                                            label="Uncollected Stamp"
                                            value={cardData.noStampCollectedImgUrl || ''}
                                            onChange={handleNoStampCollectedImageChange}
                                            onBlobChange={(blob) => handleNoStampCollectedImageChange('', blob)}
                                            aspectRatio={1}
                                            error={errors.noStampCollectedImg}
                                            placeholder="Upload uncollected stamp image"
                                            maxWidth={200}
                                            maxHeight={200}
                                        />
                                    </>
                                )}
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