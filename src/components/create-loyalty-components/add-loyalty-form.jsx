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
  previewImage,
  onOpenImageSelector
}) => {

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
                    value=""
                    onChange={() => { }}
                    required
                  />

                  <AnimatedInput
                    label="Reward Description"
                    icon={MdDescription}
                    placeholder="Enter Loyalty Description"
                    value=""
                    onChange={() => { }}
                  />
                </div>

                {loyaltyType === 'products' && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <AnimatedInput
                      label="Purchase Quantity"
                      icon={MdTitle}
                      placeholder="Enter Quantity to purchase"
                      value=""
                      onChange={() => { }}
                      required
                    />

                    <AnimatedSelect
                      label="Purchase Product"
                      icon={MdDescription}
                      placeholder="Purchase Product"
                      value=""
                      onChange={() => { }}
                    />

                    <AnimatedInput
                      label="Reward Quantity"
                      icon={MdTitle}
                      placeholder="Enter Reward Quantity"
                      value=""
                      onChange={() => { }}
                      required
                    />

                    <AnimatedSelect
                      label="Reward Product"
                      icon={MdDescription}
                      placeholder="Enter Reward Product"
                      value=""
                      onChange={() => { }}
                    />
                  </div>
                )}

                {loyaltyType === 'points' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AnimatedInput
                      label="Spending Amount"
                      icon={MdTitle}
                      placeholder="Enter Amount to spend"
                      value=""
                      onChange={() => { }}
                      required
                    />

                    <AnimatedInput
                      label="Reward Points"
                      icon={MdTitle}
                      placeholder="Enter Reward Points"
                      value=""
                      onChange={() => { }}
                      required
                    />

                    <AnimatedInput
                      label="Reward Points Amount"
                      icon={MdTitle}
                      placeholder="Enter Reward Points Equivalent to Amount"
                      value=""
                      onChange={() => { }}
                      required
                    />
                  </div>
                )}

                <BannerEditor
                  formData={formData}
                  setFormData={setFormData}
                  previewImage={previewImage}
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