import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputDropdown from "components/fields/InputDropDown";

const AddLoyalty = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedRewardProduct, setSelectedRewardProduct] = useState("");
  const loyaltyTemplate = [
    { value: 'us', label: 'General Loyalty' },
    { value: 'ca', label: 'Coffee Loyalty' },
  ];

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-12">

      <div className="col-span-12 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800 2xl:grid-cols-12">
        <InputDropdown
          label="Select loyalty template"
          id="template"
          placeholder="Select a template"
          options={loyaltyTemplate}
          value={selectedTemplate}
          onChange={(option) => setSelectedTemplate(option.value)}
          variant="auth"
        />
      </div>

      <div className="col-span-4 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Reward Title"
          placeholder="Enter Loyalty Name"
          id="product-name"
          type="text"
        />
      </div>

      <div className="col-span-4 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Purchase Quantity"
          placeholder="Enter quantity to purchase"
          id="product-name"
          type="text"
        />
      </div>

      <div className="col-span-4 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Reward Description"
          placeholder="Enter reward description"
          id="product-name"
          type="text"
        />
      </div>

      <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
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

      <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
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

      <div className="2xl:col-span-4 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 ">
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

      <div className="2xl:col-span-4 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 ">
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

      <div className="2xl:col-span-4 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 ">
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

      <button
        href=" "
        className="col-span-12 linear mt-4 flex items-center justify-center rounded-xl bg-brandGreen px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Add Product
      </button>

    </Card>
  );
};

export default AddLoyalty;