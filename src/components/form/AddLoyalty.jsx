import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputDropdown from "components/fields/InputDropDown";

const AddLoyalty = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedRewardProduct, setSelectedRewardProduct] = useState("");
  const [templateImage, setTemplateImage] = useState(null);
  const [icon1, setIcon1] = useState(null);

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

      {/* Conditional Fields - Only show when General Loyalty is selected */}
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

          {/* Purchase Quantity - Half Width */}
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

          {/* Reward Description - Half Width */}
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

          {/* Select Product */}
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

          {/* Select Reward Product */}
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

          {/* Horizontal line and heading */}
          <div className="col-span-12 my-4 border-t border-gray-300 dark:border-gray-600"></div>

          <div className="col-span-12 mb-2 text-lg font-bold text-gray-800 dark:text-white">
            Loyalty Additional Details
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column - Image Upload and Icon Fields */}
            <div className="flex flex-col space-y-4">
              {/* Template Image Upload */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Template Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                />
              </div>

              {/* Icon 1 Text and Icon 1 in one row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Icon 1 Text */}
                <div className="flex flex-col">
                  <InputField
                    variant="auth"
                    extra="mb-0"
                    label="Icon 1 Text"
                    placeholder="Enter text for Icon 1"
                    id="icon1-text"
                    type="text"
                  />
                </div>

                {/* Icon 1 Upload */}
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                    Icon 1
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIcon1Change}
                    className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                  />
                  {icon1 && (
                    <div className="mt-2">
                      <img
                        src={icon1}
                        alt="Icon 1 Preview"
                        className="h-12 w-12 rounded-md border border-gray-200 object-cover shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Preview Banner */}
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-600">
              <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-white">
                Real-Time Banner Preview
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                Your loyalty banner will appear here.
              </div>
              {templateImage && (
                <img
                  src={templateImage}
                  alt="Template Preview"
                  className="max-h-40 rounded-md border border-gray-200 shadow-md"
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Upload Files Sections */}
      <div className="2xl:col-span-4 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
        <button className="p-5 flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-10 dark:!border-navy-700">
          <MdFileUpload className="text-[50px] text-brandGreen dark:text-white" />
          <h4 className="text-lg font-bold text-brandGreen dark:text-white">
            Upload Files
          </h4>
          <p className="mt-2 text-xs font-medium text-gray-600">
            PNG, JPG and GIF files are allowed
          </p>
        </button>
      </div>

      <div className="2xl:col-span-4 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
        <button className="p-5 flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
          <MdFileUpload className="text-[50px] text-brandGreen dark:text-white" />
          <h4 className="text-lg font-bold text-brandGreen dark:text-white">
            Upload Files
          </h4>
          <p className="mt-2 text-xs font-medium text-gray-600">
            PNG, JPG and GIF files are allowed
          </p>
        </button>
      </div>

      <div className="2xl:col-span-4 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
        <button className="p-5 flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
          <MdFileUpload className="text-[50px] text-brandGreen dark:text-white" />
          <h4 className="text-lg font-bold text-brandGreen dark:text-white">
            Upload Files
          </h4>
          <p className="mt-2 text-xs font-medium text-gray-600">
            PNG, JPG and GIF files are allowed
          </p>
        </button>
      </div>

      {/* Add Product Button */}
      <button
        className="col-span-12 linear mt-4 flex items-center justify-center rounded-xl bg-brandGreen px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Add Product
      </button>

    </Card>
  );
};

export default AddLoyalty;