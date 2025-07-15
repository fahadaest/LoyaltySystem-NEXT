import React, { useState, useEffect } from "react";
import { MdFileUpload, MdAdd, MdCategory, MdCardGiftcard, MdTitle, MdNumbers, MdDescription, MdAttachMoney, MdStars } from "react-icons/md";
import { Edit3, Palette, Star, Type, Clock, CreditCard, Building, Gift, Award, QrCode, AlertCircle } from 'lucide-react';
import AnimatedSelect from "components/ui/AnimatedSelect";
import AnimatedInput from "components/ui/AnimatedInput";
import FormSection from "components/ui/FormSection";
import { AnimatedCard, AnimatedCardContent } from "components/ui/AnimatedCard";
import LoyaltyAdditionalDetails from "./LoyaltyAdditionalDetails";
import Button from "components/button/Button";
import { useDispatch } from 'react-redux';
import { showAlert } from "store/apiEndPoints/alertSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => updateLoyaltyFormField('isVisible', true), 50);
    return () => clearTimeout(timer);
  }, [updateLoyaltyFormField]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("loyaltyTemplates", loyaltyFormData.selectedTemplate);
    formData.append("rewardTitle", loyaltyFormData.rewardTitle);
    formData.append("rewardDescription", loyaltyFormData.rewardDescription);
    formData.append("productId", loyaltyFormData.selectedProduct);
    formData.append("bannerTitle", loyaltyFormData.bannerTitle);
    formData.append("templateColor", loyaltyFormData.color);
    formData.append("rewardProductId", loyaltyFormData.rewardProduct);
    formData.append("icon1Text", loyaltyFormData.icon1Text);
    formData.append("icon2Text", loyaltyFormData.icon2Text);
    formData.append("icon3Text", loyaltyFormData.icon3Text);
    formData.append("color", loyaltyFormData.color);

    if (loyaltyFormData.selectedTemplate === 'general') {
      formData.append("purchaseQuantity", loyaltyFormData.purchaseQuantity);
    }

    if (loyaltyFormData.selectedTemplate === 'point') {
      formData.append("spendingAmount", loyaltyFormData.spendingAmount);
      formData.append("rewardPoints", loyaltyFormData.rewardPoints);
      formData.append("rewardPointsEquivalent", loyaltyFormData.rewardPointsEquivalent);
    }

    if (loyaltyFormData.templateImageBlob) {
      formData.append("templateImage", loyaltyFormData.templateImageBlob, "templateImage.png");
    }

    if (loyaltyFormData.icon1Blob) {
      formData.append("icon1", loyaltyFormData.icon1Blob, "icon1.png");
    }
    if (loyaltyFormData.icon2Blob) {
      formData.append("icon2", loyaltyFormData.icon2Blob, "icon2.png");
    }
    if (loyaltyFormData.icon3Blob) {
      formData.append("icon3", loyaltyFormData.icon3Blob, "icon3.png");
    }

    if (loyaltyFormData.logoBlob) {
      formData.append("logo", loyaltyFormData.logoBlob, "logo.png");
    }

    if (selectedLoyaltyData) {
      onSubmit(formData, selectedLoyaltyData.id);
    } else {
      onSubmit(formData);
    }
  };

  return (
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
                  value={loyaltyFormData.selectedTemplate}
                  onChange={(value) => updateLoyaltyFormField('selectedTemplate', value)}
                  required
                />
              </div>
            </FormSection>

            {/* General Loyalty Template Fields */}
            {loyaltyFormData.selectedTemplate === 'general' && (
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
                      value={loyaltyFormData.purchaseQuantity}
                      onChange={(value) => updateLoyaltyFormField('purchaseQuantity', value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatedSelect
                      label="Select Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Product"
                      options={productOptions}
                      value={loyaltyFormData.selectedProduct}
                      onChange={(value) => updateLoyaltyFormField('selectedProduct', value)}
                      required
                    />

                    <AnimatedSelect
                      label="Select Reward Product"
                      icon={MdCardGiftcard}
                      placeholder="Select a Reward Product"
                      options={productOptions}
                      value={loyaltyFormData.rewardProduct}
                      onChange={(value) => updateLoyaltyFormField('rewardProduct', value)}
                      required
                    />
                  </div>
                </div>
              </FormSection>
            )}

            {/* Point-Based Loyalty Template Fields */}
            {loyaltyFormData.selectedTemplate === 'point' && (
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
            {(loyaltyFormData.selectedTemplate === 'general' || loyaltyFormData.selectedTemplate === 'point') && (
              <FormSection
                title="Additional Details"
                icon={Palette}
                delay={300}
                isVisible={loyaltyFormData.isVisible}
              >
                <LoyaltyAdditionalDetails
                  bannerTitle={loyaltyFormData.bannerTitle}
                  setbannerTitle={(value) => updateLoyaltyFormField('bannerTitle', value)}
                  color={loyaltyFormData.color}
                  setColor={(value) => updateLoyaltyFormField('color', value)}
                  logoSize={loyaltyFormData.logoSize}
                  setLogoSize={(value) => updateLoyaltyFormField('logoSize', value)}
                  qrSize={loyaltyFormData.qrSize}
                  setQrSize={(value) => updateLoyaltyFormField('qrSize', value)}
                  logo={loyaltyFormData.logo}
                  setLogo={(value) => updateLoyaltyFormField('logo', value)}
                  logoBlob={loyaltyFormData.logoBlob}
                  setLogoBlob={(value) => updateLoyaltyFormField('logoBlob', value)}
                  templateImage={loyaltyFormData.templateImage}
                  setTemplateImage={(value) => updateLoyaltyFormField('templateImage', value)}
                  templateImageBlob={loyaltyFormData.templateImageBlob}
                  setTemplateImageBlob={(value) => updateLoyaltyFormField('templateImageBlob', value)}
                  icon1Text={loyaltyFormData.icon1Text}
                  setIcon1Text={(value) => updateLoyaltyFormField('icon1Text', value)}
                  icon2Text={loyaltyFormData.icon2Text}
                  setIcon2Text={(value) => updateLoyaltyFormField('icon2Text', value)}
                  icon3Text={loyaltyFormData.icon3Text}
                  setIcon3Text={(value) => updateLoyaltyFormField('icon3Text', value)}
                  icon1TextSize={loyaltyFormData.icon1TextSize}
                  setIcon1TextSize={(value) => updateLoyaltyFormField('icon1TextSize', value)}
                  icon2TextSize={loyaltyFormData.icon2TextSize}
                  setIcon2TextSize={(value) => updateLoyaltyFormField('icon2TextSize', value)}
                  icon3TextSize={loyaltyFormData.icon3TextSize}
                  setIcon3TextSize={(value) => updateLoyaltyFormField('icon3TextSize', value)}
                  icon1={loyaltyFormData.icon1}
                  setIcon1={(value) => updateLoyaltyFormField('icon1', value)}
                  icon2={loyaltyFormData.icon2}
                  setIcon2={(value) => updateLoyaltyFormField('icon2', value)}
                  icon3={loyaltyFormData.icon3}
                  setIcon3={(value) => updateLoyaltyFormField('icon3', value)}
                  icon1Blob={loyaltyFormData.icon1Blob}
                  setIcon1Blob={(value) => updateLoyaltyFormField('icon1Blob', value)}
                  icon2Blob={loyaltyFormData.icon2Blob}
                  setIcon2Blob={(value) => updateLoyaltyFormField('icon2Blob', value)}
                  icon3Blob={loyaltyFormData.icon3Blob}
                  setIcon3Blob={(value) => updateLoyaltyFormField('icon3Blob', value)}
                  selectedLoyaltyData={selectedLoyaltyData}
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