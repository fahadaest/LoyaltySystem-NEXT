import React, { useState, useEffect } from "react";
import { MdFileUpload, MdAdd, MdCategory, MdCardGiftcard, MdTitle, MdNumbers, MdDescription, MdAttachMoney, MdStars, MdCreditCard } from "react-icons/md";
import { Edit3, Palette, Star, Type, Clock, CreditCard, Building, Gift, Award, QrCode, AlertCircle } from 'lucide-react';
import AnimatedSelect from "components/ui/AnimatedSelect";
import AnimatedInput from "components/ui/AnimatedInput";
import FormSection from "components/ui/FormSection";
import { AnimatedCard, AnimatedCardContent } from "components/ui/AnimatedCard";
import LoyaltyAdditionalDetails from "./LoyaltyAdditionalDetails";
import WalletCardSelector from "components/loyalty/WalletCardSelector";

const AddLoyalty = ({
  onClose,
  products,
  selectedLoyaltyData,
  onSubmit,
  sourcePage,
  loyaltyFormData,
  updateLoyaltyFormField,
  updateLoyaltyFormData
}) => {
  const loyaltyTemplate = sourcePage === "products"
    ? [
      { value: 'general', label: 'General Loyalty' },
      { value: 'coffee', label: 'Coffee Loyalty' },
    ]
    : [
      { value: 'point', label: 'Point-Based Loyalty' },
    ];

  const productOptions = (products || []).map(product => ({
    label: product.name,
    value: product.id,
  }));

  // Handler for wallet card selection
  const handleWalletCardSelect = (cardId) => {
    updateLoyaltyFormField('cardId', cardId);
  };

  return (
    // <div className={`transform transition-all duration-500 ${loyaltyFormData.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
    <div className={`transform transition-all duration-500 ${loyaltyFormData.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <AnimatedCard>
        <AnimatedCardContent>
          <div className="space-y-8 px-6">
            {/* Template Selection Section */}
            <FormSection
              title="Loyalty Template"
              icon={MdCategory}
              delay={100}
              isVisible={loyaltyFormData.isVisible}
            >
              <div className="grid grid-cols-1 gap-4">
                <AnimatedSelect
                  label="Select Loyalty Template"
                  icon={MdCategory}
                  placeholder="Select a template"
                  options={loyaltyTemplate}
                  value={loyaltyFormData.loyaltyTemplates}
                  onChange={(value) => updateLoyaltyFormField('loyaltyTemplates', value)}
                  required
                />
              </div>
            </FormSection>

            {/* General Loyalty Template Fields */}
            {loyaltyFormData.loyaltyTemplates === 'general' && (
              <FormSection
                title="General Loyalty Configuration"
                icon={Gift}
                delay={200}
                isVisible={loyaltyFormData.isVisible}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Reward Title"
                      icon={MdTitle}
                      placeholder="Enter Loyalty Name"
                      value={loyaltyFormData.rewardTitle}
                      onChange={(value) => updateLoyaltyFormField('rewardTitle', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Description"
                      icon={MdDescription}
                      placeholder="Enter reward description"
                      value={loyaltyFormData.rewardDescription}
                      onChange={(value) => updateLoyaltyFormField('rewardDescription', value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Purchase Quantity"
                      icon={MdNumbers}
                      placeholder="Enter quantity to purchase"
                      type="number"
                      value={loyaltyFormData.purchaseQuantity}
                      onChange={(value) => updateLoyaltyFormField('purchaseQuantity', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Quantity"
                      icon={MdNumbers}
                      placeholder="Enter reward quantity"
                      type="number"
                      value={loyaltyFormData.rewardQuantity || loyaltyFormData.purchaseQuantity}
                      onChange={(value) => updateLoyaltyFormField('rewardQuantity', value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedSelect
                      label="Select Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Product"
                      options={productOptions}
                      value={loyaltyFormData.productId}
                      onChange={(value) => updateLoyaltyFormField('productId', value)}
                      required
                    />

                    <AnimatedSelect
                      label="Select Reward Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Reward Product"
                      options={productOptions}
                      value={loyaltyFormData.rewardProductId}
                      onChange={(value) => updateLoyaltyFormField('rewardProductId', value)}
                      required
                    />
                  </div>
                </div>
              </FormSection>
            )}

            {/* Coffee Loyalty Template Fields */}
            {loyaltyFormData.loyaltyTemplates === 'coffee' && (
              <FormSection
                title="Coffee Loyalty Configuration"
                icon={Gift}
                delay={200}
                isVisible={loyaltyFormData.isVisible}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Reward Title"
                      icon={MdTitle}
                      placeholder="Enter Coffee Loyalty Name"
                      value={loyaltyFormData.rewardTitle}
                      onChange={(value) => updateLoyaltyFormField('rewardTitle', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Description"
                      icon={MdDescription}
                      placeholder="Enter reward description"
                      value={loyaltyFormData.rewardDescription}
                      onChange={(value) => updateLoyaltyFormField('rewardDescription', value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Cups to Purchase"
                      icon={MdNumbers}
                      placeholder="Enter number of cups to purchase"
                      type="number"
                      value={loyaltyFormData.purchaseQuantity}
                      onChange={(value) => updateLoyaltyFormField('purchaseQuantity', value)}
                      required
                    />

                    <AnimatedInput
                      label="Free Cups Reward"
                      icon={MdNumbers}
                      placeholder="Enter number of free cups"
                      type="number"
                      value={loyaltyFormData.rewardQuantity || '1'}
                      onChange={(value) => updateLoyaltyFormField('rewardQuantity', value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedSelect
                      label="Select Coffee Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Coffee Product"
                      options={productOptions}
                      value={loyaltyFormData.productId}
                      onChange={(value) => updateLoyaltyFormField('productId', value)}
                      required
                    />

                    <AnimatedSelect
                      label="Select Reward Coffee"
                      icon={MdCardGiftcard}
                      placeholder="Select a Reward Coffee"
                      options={productOptions}
                      value={loyaltyFormData.rewardProductId}
                      onChange={(value) => updateLoyaltyFormField('rewardProductId', value)}
                      required
                    />
                  </div>
                </div>
              </FormSection>
            )}

            {/* Point-Based Loyalty Template Fields */}
            {loyaltyFormData.loyaltyTemplates === 'point' && (
              <FormSection
                title="Point-Based Loyalty Configuration"
                icon={Star}
                delay={200}
                isVisible={loyaltyFormData.isVisible}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Reward Title"
                      icon={MdTitle}
                      placeholder="Enter Loyalty Name"
                      value={loyaltyFormData.rewardTitle}
                      onChange={(value) => updateLoyaltyFormField('rewardTitle', value)}
                      required
                    />

                    <AnimatedInput
                      label="Spending Amount (AED)"
                      icon={MdAttachMoney}
                      placeholder="Enter spending amount"
                      type="number"
                      value={loyaltyFormData.spendingAmount}
                      onChange={(value) => updateLoyaltyFormField('spendingAmount', value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Reward Points"
                      icon={MdStars}
                      placeholder="Enter reward points"
                      type="number"
                      value={loyaltyFormData.rewardPoints}
                      onChange={(value) => updateLoyaltyFormField('rewardPoints', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Points Equivalent to AED"
                      icon={MdAttachMoney}
                      placeholder="Enter equivalent amount"
                      type="number"
                      value={loyaltyFormData.rewardPointsEquivalent}
                      onChange={(value) => updateLoyaltyFormField('rewardPointsEquivalent', value)}
                      required
                    />
                  </div>
                </div>
              </FormSection>
            )}

            {/* Additional Details Section */}
            {(loyaltyFormData.loyaltyTemplates === 'general' ||
              loyaltyFormData.loyaltyTemplates === 'coffee' ||
              loyaltyFormData.loyaltyTemplates === 'point') && (
                <FormSection
                  title="Additional Details"
                  icon={Palette}
                  delay={300}
                  isVisible={loyaltyFormData.isVisible}
                >
                  <LoyaltyAdditionalDetails
                    formData={loyaltyFormData}
                    updateFormField={updateLoyaltyFormField}
                    selectedLoyaltyData={selectedLoyaltyData}
                  />
                </FormSection>
              )}

            {/* Wallet Card Selection Section */}
            {loyaltyFormData.loyaltyTemplates && (
              <FormSection
                title="Wallet Card Association"
                icon={MdCreditCard}
                delay={150}
                isVisible={loyaltyFormData.isVisible}
              >
                <WalletCardSelector
                  selectedCardId={loyaltyFormData.cardId}
                  onCardSelect={handleWalletCardSelect}
                  isVisible={loyaltyFormData.isVisible}
                />
              </FormSection>
            )}

            {/* Validation Notice */}
            {loyaltyFormData.loyaltyTemplates && !loyaltyFormData.cardId && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      Wallet Card Required
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Please select a wallet card to associate with this loyalty campaign.
                      This ensures customers can properly enroll and track their rewards.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );
};

export default AddLoyalty;