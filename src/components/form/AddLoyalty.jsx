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

  const productOptions = (products || []).map(product => ({
    label: product.name,
    value: product.id,
  }));

  console.log("selectedLoyaltyData", selectedLoyaltyData)

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

            {/* Product Loyalty Template Fields */}
            {sourcePage === 'products' && (
              <FormSection
                title="Product Loyalty Configuration"
                icon={Gift}
                delay={200}
                isVisible={loyaltyFormData.isVisible}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Reward Title"
                      icon={MdTitle}
                      placeholder="Enter Product Loyalty Name"
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
                      label="Select Purchasing Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Purchasing Product"
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

            {/* Point-Based Loyalty Template Fields */}
            {sourcePage === 'points' && (
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
            {(sourcePage === 'products' ||
              sourcePage === 'points') && (
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
            {sourcePage && (
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

          </div>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );
};

export default AddLoyalty;