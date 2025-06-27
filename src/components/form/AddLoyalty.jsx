import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputDropdown from "components/fields/InputDropDown";
import LoyaltyAdditionalDetails from "./LoyaltyAdditionalDetails";

const AddLoyalty = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedRewardProduct, setSelectedRewardProduct] = useState("");
  const [templateImage, setTemplateImage] = useState(null);
  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);
  const [color, setColor] = useState('#4A90E2');

  const loyaltyTemplate = [
    { value: 'general', label: 'General Loyalty' },
    { value: 'coffee', label: 'Coffee Loyalty' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTemplateImage(imageUrl);
    }
  };

  const handleIcon1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIcon1(imageUrl);
    }
  };

  const handleIcon2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIcon2(imageUrl);
    }
  };

  const handleIcon3Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIcon3(imageUrl);
    }
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 p-6 rounded-[20px] bg-white bg-clip-border font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-12">
      <div className="col-span-12 flex h-full w-full flex-col justify-center rounded-xl bg-white dark:!bg-navy-800">
        <InputDropdown
          label="Select Loyalty Template"
          id="template"
          placeholder="Select a template"
          options={loyaltyTemplate}
          value={selectedTemplate}
          onChange={(option) => setSelectedTemplate(option.value)}
          variant="auth"
        />
      </div>

      {selectedTemplate === 'general' && (
        <>
          {/* Reward Title - Full Width */}
          <div className="col-span-12 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Reward Title"
              placeholder="Enter Loyalty Name"
              id="reward-title"
              type="text"
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Purchase Quantity"
              placeholder="Enter quantity to purchase"
              id="purchase-quantity"
              type="text"
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Reward Description"
              placeholder="Enter reward description"
              id="reward-description"
              type="text"
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col justify-center rounded-xl bg-white dark:!bg-navy-800">
            <InputDropdown
              label="Select Product"
              id="product"
              placeholder="Select a Product"
              options={loyaltyTemplate}
              value={selectedProduct}
              onChange={(option) => setSelectedProduct(option.value)}
              variant="auth"
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col justify-center rounded-xl bg-white dark:!bg-navy-800">
            <InputDropdown
              label="Select Reward Product"
              id="reward-product"
              placeholder="Select a Reward Product"
              options={loyaltyTemplate}
              value={selectedRewardProduct}
              onChange={(option) => setSelectedRewardProduct(option.value)}
              variant="auth"
            />
          </div>
        </>
      )}

      <LoyaltyAdditionalDetails
        loyaltyTemplate={loyaltyTemplate}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedRewardProduct={selectedRewardProduct}
        setSelectedRewardProduct={setSelectedRewardProduct}
        handleImageChange={handleImageChange}
        handleIcon1Change={handleIcon1Change}
        handleIcon2Change={handleIcon2Change}
        handleIcon3Change={handleIcon3Change}
        handleColorChange={handleColorChange}
        templateImage={templateImage}
        icon1={icon1}
        icon2={icon2}
        icon3={icon3}
        color={color}
      />

      <button className="col-span-12 linear mt-4 flex items-center justify-center rounded-xl bg-brandGreen px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
        Add Product
      </button>
    </Card>
  );
};

export default AddLoyalty;