import React, { useState } from "react";
import { MdFileUpload, MdAdd } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputDropdown from "components/fields/InputDropDown";
import LoyaltyAdditionalDetails from "./LoyaltyAdditionalDetails";
import { useCreateProductLoyaltyCampaignMutation } from "store/productLoyalty";
import Button from "components/button/Button";
import { useDispatch } from 'react-redux';
import { showAlert } from "store/alertSlice";

const AddLoyalty = ({ onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedRewardProduct, setSelectedRewardProduct] = useState("");
  const [templateImage, setTemplateImage] = useState(null);
  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);
  const [color, setColor] = useState('#4A90E2');
  const dispatch = useDispatch();
  const [createProductLoyaltyCampaign, { isLoading, isSuccess, isError, error }] = useCreateProductLoyaltyCampaignMutation();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!rewardTitle || !purchaseQuantity) {
      dispatch(showAlert({
        message: 'Please fill out all fields.',
        severity: 'error',
        duration: 2000
      }));
      return;
    }

    const formData = new FormData();
    formData.append("rewardTitle", rewardTitle);
    formData.append("rewardDescription", rewardDescription);
    formData.append("purchaseQuantity", purchaseQuantity);
    formData.append("product", selectedProduct);
    formData.append("rewardProduct", selectedRewardProduct);
    formData.append("templateImage", templateImage);
    formData.append("icon1", icon1);
    formData.append("icon2", icon2);
    formData.append("icon3", icon3);
    formData.append("color", color);

    try {
      const response = await createProductLoyaltyCampaign(formData);
      dispatch(showAlert({
        message: 'Product Loyalty Added Successfully',
        severity: 'success',
        duration: 2000
      }));
      onClose();
    } catch (error) {
      console.error('Error creating loyalty campaign:', error);
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

      {selectedTemplate === 'general' && (
        <>
          <div className="col-span-12 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Reward Title"
              placeholder="Enter Loyalty Name"
              id="reward-title"
              type="text"
              value={rewardTitle}
              onChange={(e) => setRewardTitle(e.target.value)}
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
              value={purchaseQuantity}
              onChange={(e) => setPurchaseQuantity(e.target.value)}
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
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
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

      <Button
        icon={MdAdd}
        text={'Add Product Loyalty'}
        size="sm"
        color="bg-brandGreen"
        className="w-full"
        onClick={handleFormSubmit}
      />
    </Card>
  );
};

export default AddLoyalty;