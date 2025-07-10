import React, { useState, useEffect } from "react";
import { MdFileUpload, MdAdd } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputDropdown from "components/fields/InputDropDown";
import LoyaltyAdditionalDetails from "./LoyaltyAdditionalDetails";
import Button from "components/button/Button";
import { useDispatch } from 'react-redux';
import { showAlert } from "store/apiEndPoints/alertSlice";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddLoyalty = ({ onClose, products, selectedLoyaltyData, onSubmit, sourcePage }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [rewardTitle, setRewardTitle] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rewardProduct, setRewardProduct] = useState("");
  const [spendingAmount, setSpendingAmount] = useState("");
  const [rewardPoints, setRewardPoints] = useState("");
  const [rewardPointsEquivalent, setRewardPointsEquivalent] = useState("");
  const [bannerTitle, setbannerTitle] = useState("");
  const [color, setColor] = useState('#4a5568');
  const [logoSize, setLogoSize] = useState(60);
  const [qrSize, setQrSize] = useState(80);
  const [logo, setLogo] = useState(null);
  const [logoBlob, setLogoBlob] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [templateImageBlob, setTemplateImageBlob] = useState(null);
  const [icon1Text, setIcon1Text] = useState('Scan Qr with your mobile phone');
  const [icon2Text, setIcon2Text] = useState('Download the Point Pass into your mobile');
  const [icon3Text, setIcon3Text] = useState('Enter Your promotion');
  const [icon1TextSize, setIcon1TextSize] = useState(12);
  const [icon2TextSize, setIcon2TextSize] = useState(12);
  const [icon3TextSize, setIcon3TextSize] = useState(12);
  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);
  const [icon1Blob, setIcon1Blob] = useState(null);
  const [icon2Blob, setIcon2Blob] = useState(null);
  const [icon3Blob, setIcon3Blob] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLoyaltyData) {
      setSelectedTemplate(selectedLoyaltyData.loyaltyTemplates || '');
      setRewardTitle(selectedLoyaltyData.rewardTitle || '');
      setRewardDescription(selectedLoyaltyData.rewardDescription || '');
      setPurchaseQuantity(selectedLoyaltyData.purchaseQuantity || '');
      setSelectedProduct(selectedLoyaltyData.productId || '');
      setRewardProduct(selectedLoyaltyData.rewardProductId || '');
      setColor(selectedLoyaltyData.templateColor || '#4a5568');
      setLogo(baseUrl + selectedLoyaltyData.logo);
      setbannerTitle(selectedLoyaltyData.bannerTitle || '');
      setLogoBlob(null);
      setTemplateImage(baseUrl + selectedLoyaltyData.templateImage || null);
      setIcon1Text(selectedLoyaltyData.icon1Text || 'Scan QR with your mobile phone');
      setIcon2Text(selectedLoyaltyData.icon2Text || 'Download the Point Pass into your mobile');
      setIcon3Text(selectedLoyaltyData.icon3Text || 'Enter Your promotion');
      setIcon1(null);
      setIcon2(null);
      setIcon3(null);
      setSpendingAmount(selectedLoyaltyData.spendingAmount || '');
      setRewardPoints(selectedLoyaltyData.rewardPoints || '');
      setRewardPointsEquivalent(selectedLoyaltyData.rewardPointsEquivalent || '');
    }
  }, [selectedLoyaltyData]);

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
    formData.append("loyaltyTemplates", selectedTemplate);
    formData.append("rewardTitle", rewardTitle);
    formData.append("rewardDescription", rewardDescription);
    formData.append("productId", selectedProduct);
    formData.append("bannerTitle", bannerTitle);
    formData.append("templateColor", color);
    formData.append("rewardProductId", rewardProduct);
    formData.append("icon1Text", icon1Text);
    formData.append("icon2Text", icon2Text);
    formData.append("icon3Text", icon3Text);
    formData.append("color", color);

    if (selectedTemplate === 'general') {
      formData.append("purchaseQuantity", purchaseQuantity);
    }

    if (selectedTemplate === 'point') {
      formData.append("spendingAmount", spendingAmount);
      formData.append("rewardPoints", rewardPoints);
      formData.append("rewardPointsEquivalent", rewardPointsEquivalent);
    }

    if (templateImageBlob) {
      formData.append("templateImage", templateImageBlob, "templateImage.png");
    }

    if (icon1Blob) {
      formData.append("icon1", icon1Blob, "icon1.png");
    }
    if (icon2Blob) {
      formData.append("icon2", icon2Blob, "icon2.png");
    }
    if (icon3Blob) {
      formData.append("icon3", icon3Blob, "icon3.png");
    }

    if (logoBlob) {
      formData.append("logo", logoBlob, "logo.png");
    }

    if (selectedLoyaltyData) {
      onSubmit(formData, selectedLoyaltyData.id);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 py-7 px-10 rounded-[20px] bg-white bg-clip-border font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-12">
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
              options={productOptions}
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
              options={productOptions}
              value={rewardProduct}
              onChange={(option) => setRewardProduct(option.value)}
              variant="auth"
            />
          </div>
        </>
      )}

      {selectedTemplate === 'point' && (
        <>
          <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
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
              label="Spending Amount (AED)"
              placeholder="Enter spending amount"
              id="spending-amount"
              type="text"
              value={spendingAmount}
              onChange={(e) => setSpendingAmount(e.target.value)}
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Reward Points"
              placeholder="Enter reward points"
              id="reward-points"
              type="text"
              value={rewardPoints}
              onChange={(e) => setRewardPoints(e.target.value)}
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Reward Points Equivalent to AED"
              placeholder="Enter equivalent amount"
              id="reward-points-equivalent"
              type="text"
              value={rewardPointsEquivalent}
              onChange={(e) => setRewardPointsEquivalent(e.target.value)}
            />
          </div>
        </>
      )}

      <LoyaltyAdditionalDetails
        bannerTitle={bannerTitle}
        setbannerTitle={setbannerTitle}
        color={color}
        setColor={setColor}
        logoSize={logoSize}
        setLogoSize={setLogoSize}
        qrSize={qrSize}
        setQrSize={setQrSize}
        logo={logo}
        setLogo={setLogo}
        logoBlob={logoBlob}
        setLogoBlob={setLogoBlob}
        templateImage={templateImage}
        setTemplateImage={setTemplateImage}
        templateImageBlob={templateImageBlob}
        setTemplateImageBlob={setTemplateImageBlob}
        icon1Text={icon1Text}
        setIcon1Text={setIcon1Text}
        icon2Text={icon2Text}
        setIcon2Text={setIcon2Text}
        icon3Text={icon3Text}
        setIcon3Text={setIcon3Text}
        icon1TextSize={icon1TextSize}
        setIcon1TextSize={setIcon1TextSize}
        icon2TextSize={icon2TextSize}
        setIcon2TextSize={setIcon2TextSize}
        icon3TextSize={icon3TextSize}
        setIcon3TextSize={setIcon3TextSize}
        icon1={icon1}
        setIcon1={setIcon1}
        icon2={icon2}
        setIcon2={setIcon2}
        icon3={icon3}
        setIcon3={setIcon3}
        icon1Blob={icon1Blob}
        setIcon1Blob={setIcon1Blob}
        icon2Blob={icon2Blob}
        setIcon2Blob={setIcon2Blob}
        icon3Blob={icon3Blob}
        setIcon3Blob={setIcon3Blob}
        selectedLoyaltyData={selectedLoyaltyData}
      />

      <div className="col-span-12">
        <Button
          icon={MdAdd}
          text={selectedLoyaltyData ? 'Edit Product Loyalty' : 'Add Product Loyalty'}
          size="sm"
          color="bg-brandGreen"
          className="w-full"
          onClick={handleFormSubmit}
        />
      </div>
    </Card>
  );
};

export default AddLoyalty;
