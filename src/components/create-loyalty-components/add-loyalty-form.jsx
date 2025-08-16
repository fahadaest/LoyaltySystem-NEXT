import React, { useState, useEffect } from "react";
import { MdFileUpload, MdAdd, MdCategory, MdCardGiftcard, MdTitle, MdNumbers, MdDescription, MdAttachMoney, MdStars, MdCreditCard } from "react-icons/md";
import { Edit3, Palette, Star, Type, Clock, CreditCard, Building, Gift, Award, QrCode, AlertCircle } from 'lucide-react';
import AnimatedSelect from "components/ui/AnimatedSelect";
import AnimatedInput from "components/ui/AnimatedInput";
import FormSection from "components/ui/FormSection";
import { AnimatedCard, AnimatedCardContent } from "components/ui/AnimatedCard";
import LoyaltyAdditionalDetails from "../form/LoyaltyAdditionalDetails";
import WalletCardSelector from "components/loyalty/WalletCardSelector";
import BannerEditor from "./loyalty-banner-component";


const AddLoyaltyForm = ({
  loyaltyType,
  formData,
  setFormData,
  previewImages,
  onOpenImageSelector,
  products
}) => {

  const productOptions = (products || []).map(product => ({
    label: product.name,
    value: product.id,
  }));


  console.log("products", products)

  // Helper function to update form data
  const updateFormData = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  return (
    <div>
      <AnimatedCard>
        <AnimatedCardContent>
          <div className="space-y-8 px-2">
            <FormSection
              title="Add Loyalty Form"
              icon={MdAdd}
              delay={100}
              isVisible={true}
            >

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatedInput
                    label="Reward Title"
                    icon={MdTitle}
                    placeholder="Enter Loyalty Name"
                    value={formData?.rewardTitle || ''}
                    onChange={(value) => updateFormData('rewardTitle', value)}
                    required
                  />

                  <AnimatedInput
                    label="Reward Description"
                    icon={MdDescription}
                    placeholder="Enter Loyalty Description"
                    value={formData?.rewardDescription || ''}
                    onChange={(value) => updateFormData('rewardDescription', value)}
                  />
                </div>

                {loyaltyType === 'products' && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <AnimatedInput
                      label="Purchase Quantity"
                      icon={MdTitle}
                      placeholder="Enter Quantity to purchase"
                      value={formData?.purchaseQuantity || ''}
                      onChange={(value) => updateFormData('purchaseQuantity', value)}
                      required
                    />

                    <AnimatedSelect
                      label="Select Purchasing Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Purchasing Product"
                      options={productOptions}
                      value={formData.productId}
                      onChange={(value) => updateFormData('productId', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Quantity"
                      icon={MdTitle}
                      placeholder="Enter Reward Quantity"
                      value={formData?.rewardQuantity || ''}
                      onChange={(value) => updateFormData('rewardQuantity', value)}
                      required
                    />

                    <AnimatedSelect
                      label="Select Reward Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Reward Product"
                      options={productOptions}
                      value={formData.rewardProductId}
                      onChange={(value) => updateFormData('rewardProductId', value)}
                      required
                    />
                  </div>
                )}

                {loyaltyType === 'points' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AnimatedInput
                      label="Spending Amount"
                      icon={MdTitle}
                      placeholder="Enter Amount to spend"
                      value={formData?.spendingAmount || ''}
                      onChange={(value) => updateFormData('spendingAmount', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Points"
                      icon={MdTitle}
                      placeholder="Enter Reward Points"
                      value={formData?.rewardPoints || ''}
                      onChange={(value) => updateFormData('rewardPoints', value)}
                      required
                    />

                    <AnimatedInput
                      label="Reward Points Amount"
                      icon={MdTitle}
                      placeholder="Enter Reward Points Equivalent to Amount"
                      value={formData?.rewardPointsEquivalent || ''}
                      onChange={(value) => updateFormData('rewardPointsEquivalent', value)}
                      required
                    />
                  </div>
                )}

                <BannerEditor
                  formData={formData}
                  setFormData={setFormData}
                  previewImages={previewImages}
                  onOpenImageSelector={onOpenImageSelector}
                />
              </div>

            </FormSection>
          </div>
        </AnimatedCardContent>
      </AnimatedCard>

    </div>
  );
};

export default AddLoyaltyForm;