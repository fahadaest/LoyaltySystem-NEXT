'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd, MdArrowBack, MdArrowForward } from "react-icons/md";
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { FaGift } from "react-icons/fa";
import CreateLoyaltyComponent from 'components/create-loyalty-components/create-loyalty';
import AddLoyaltyForm from 'components/create-loyalty-components/add-loyalty-form';
import ImageSelector from 'components/ui/ImageSelector';
import { initialProductFormData, initialPointFormData } from 'utils/rewardFormData';
import { useGetAllProductsQuery } from "store/apiEndPoints/productsApi";
import WalletCardSelector from 'components/loyalty/WalletCardSelector';
import { useCreateProductLoyaltyCampaignMutation } from 'store/apiEndPoints/productLoyalty';
import { useCreatePointLoyaltyCampaignMutation } from 'store/apiEndPoints/pointLoyalty';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';

const CreateLoyalty = () => {
  const { data: products, isLoading: productsLoading } = useGetAllProductsQuery();
  const [createProductLoyaltyCampaign, { isLoading: isCreatingProduct }] = useCreateProductLoyaltyCampaignMutation();
  const [createPointLoyaltyCampaign, { isLoading: isCreatingPoint }] = useCreatePointLoyaltyCampaignMutation();
  const dispatch = useDispatch();
  const [loyaltyType, setLoyaltyType] = useState('');
  const [formData, setFormData] = useState({});
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    banner: null,
    logo: null,
    icon1: null,
    icon2: null,
    icon3: null
  });
  const [imageBlob, setImageBlob] = useState(null);
  const [imageType, setImageType] = useState('banner');
  const [isWalletCardSelectorOpen, setIsWalletCardSelectorOpen] = useState(false);
  const [currentView, setCurrentView] = useState('form');

  console.log("formData", formData)

  useEffect(() => {
    if (loyaltyType === 'points') {
      setFormData(initialPointFormData);
    } else if (loyaltyType === 'products') {
      setFormData(initialProductFormData);
    } else {
      setFormData({});
    }
  }, [loyaltyType]);

  const handleCardSelect = useCallback((cardId) => {
    console.log("Selected card ID:", cardId);
    setFormData(prevData => ({
      ...prevData,
      cardId: cardId
    }));
  }, []);

  const handleImageChange = (imageUrl, blob) => {
    setImageBlob(blob);

    setPreviewImages(prev => ({
      ...prev,
      [imageType]: imageUrl
    }));

    const fieldMap = {
      banner: 'selectedImage',
      logo: 'selectedLogo',
      icon1: 'selectedIcon1',
      icon2: 'selectedIcon2',
      icon3: 'selectedIcon3'
    };

    const fieldName = fieldMap[imageType] || 'selectedImage';

    setFormData(prevData => ({
      ...prevData,
      [fieldName]: imageUrl
    }));

    setIsImageSelectorOpen(false);
  };

  const handleOpenImageSelector = (type = 'banner') => {
    setImageType(type);
    setIsImageSelectorOpen(true);
  };

  const handleCloseImageSelector = () => {
    setIsImageSelectorOpen(false);
  };

  const handleCreateLoyalty = useCallback(async () => {
    const isLoading = isCreatingProduct || isCreatingPoint;
    if (isLoading) return;

    try {
      const requiredFields = ['rewardTitle'];
      if (loyaltyType === 'products') {
        requiredFields.push('purchaseQuantity', 'productId', 'rewardProductId');
      } else if (loyaltyType === 'points') {
        requiredFields.push('spendingAmount', 'rewardPoints', 'rewardPointsEquivalent');
      }

      requiredFields.push('cardId');

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        dispatch(showAlert({
          message: `Please fill in required fields: ${missingFields.join(', ')}`,
          severity: "error",
          duration: 3000
        }));
        return;
      }

      const apiFormData = new FormData();
      const imageFields = ['selectedImage', 'selectedLogo', 'selectedIcon1', 'selectedIcon2', 'selectedIcon3'];

      Object.entries(formData).forEach(([key, value]) => {
        if (!imageFields.includes(key) && value !== null && value !== undefined) {
          if (typeof value === 'object') {
            apiFormData.append(key, JSON.stringify(value));
          } else {
            apiFormData.append(key, value.toString());
          }
        }
      });

      const imageProcessingPromises = [];

      if (formData.selectedImage && formData.selectedImage.startsWith('blob:')) {
        imageProcessingPromises.push(
          fetch(formData.selectedImage)
            .then(response => response.blob())
            .then(blob => apiFormData.append('selectedImage', blob, 'banner.png'))
            .catch(error => console.error('Error converting selectedImage blob URL to binary:', error))
        );
      }

      if (formData.selectedLogo && formData.selectedLogo.startsWith('blob:')) {
        imageProcessingPromises.push(
          fetch(formData.selectedLogo)
            .then(response => response.blob())
            .then(blob => apiFormData.append('selectedLogo', blob, 'logo.png'))
            .catch(error => console.error('Error converting selectedLogo blob URL to binary:', error))
        );
      }

      if (formData.selectedIcon1 && formData.selectedIcon1.startsWith('blob:')) {
        imageProcessingPromises.push(
          fetch(formData.selectedIcon1)
            .then(response => response.blob())
            .then(blob => apiFormData.append('selectedIcon1', blob, 'icon1.png'))
            .catch(error => console.error('Error converting selectedIcon1 blob URL to binary:', error))
        );
      }

      if (formData.selectedIcon2 && formData.selectedIcon2.startsWith('blob:')) {
        imageProcessingPromises.push(
          fetch(formData.selectedIcon2)
            .then(response => response.blob())
            .then(blob => apiFormData.append('selectedIcon2', blob, 'icon2.png'))
            .catch(error => console.error('Error converting selectedIcon2 blob URL to binary:', error))
        );
      }

      if (formData.selectedIcon3 && formData.selectedIcon3.startsWith('blob:')) {
        imageProcessingPromises.push(
          fetch(formData.selectedIcon3)
            .then(response => response.blob())
            .then(blob => apiFormData.append('selectedIcon3', blob, 'icon3.png'))
            .catch(error => console.error('Error converting selectedIcon3 blob URL to binary:', error))
        );
      }

      await Promise.all(imageProcessingPromises);

      for (let [key, value] of apiFormData.entries()) {
        console.log(key, value);
      }

      if (loyaltyType === 'products') {
        await createProductLoyaltyCampaign(apiFormData).unwrap();
        dispatch(showAlert({
          message: "Product Loyalty Created Successfully",
          severity: "success",
          duration: 2000
        }));
      } else if (loyaltyType === 'points') {
        await createPointLoyaltyCampaign(apiFormData).unwrap();
        dispatch(showAlert({
          message: "Point Loyalty Created Successfully",
          severity: "success",
          duration: 2000
        }));
      }

      setLoyaltyType('');
      setFormData({});
      setCurrentView('form');
      setPreviewImages({
        banner: null,
        logo: null,
        icon1: null,
        icon2: null,
        icon3: null
      });

    } catch (error) {
      console.error('Error creating loyalty:', error);
      const errorMessage = error?.data?.message || error?.message || "An error occurred while creating loyalty";
      dispatch(showAlert({
        message: errorMessage,
        severity: "error",
        duration: 3000
      }));
    }
  }, [formData, loyaltyType, isCreatingProduct, isCreatingPoint, createProductLoyaltyCampaign, createPointLoyaltyCampaign, dispatch]);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">

        <div className="mt-3 mb-5">
          <HeadingCard
            icon={<FaGift className="text-brandGreen text-3xl" />}
            title={
              loyaltyType === ''
                ? "Create Loyalty"
                : currentView === 'form'
                  ? "Add Loyalty Form"
                  : "Select Wallet Card"
            }
            subtitle={
              loyaltyType === ''
                ? "Create New Loyalties Reward"
                : currentView === 'form'
                  ? "Configure your loyalty program details"
                  : "Choose a wallet card for your loyalty program"
            }
          >
            {loyaltyType !== '' && (
              <div className="flex items-center gap-2">
                <HeaderButton
                  icon={MdArrowBack}
                  text="Back"
                  size="md"
                  color="bg-gray-500"
                  onClick={() => {
                    if (currentView === 'walletCard') {
                      setCurrentView('form');
                    } else {
                      setLoyaltyType('');
                      setCurrentView('form');
                    }
                  }}
                  disabled={false}
                />

                {currentView === 'form' && (
                  <HeaderButton
                    text="Select Wallet Card"
                    size="md"
                    color="bg-brandGreen"
                    onClick={() => setCurrentView('walletCard')}
                    disabled={false}
                    rightIcon={MdArrowForward}
                  />
                )}

                {currentView === 'walletCard' && (
                  <HeaderButton
                    icon={MdAdd}
                    text="Create Loyalty"
                    size="md"
                    color="bg-brandGreen"
                    onClick={handleCreateLoyalty}
                    disabled={isCreatingProduct || isCreatingPoint}
                    rightIcon={MdArrowForward}
                  />
                )}
              </div>
            )}
          </HeadingCard>
        </div>

        {loyaltyType === '' && (
          <div className="">
            <CreateLoyaltyComponent
              loyaltyType={loyaltyType}
              setLoyaltyType={setLoyaltyType}
              setFormData={setFormData}
            />
          </div>
        )}

        {loyaltyType !== '' && currentView === 'form' && (
          <div className="">
            <AddLoyaltyForm
              loyaltyType={loyaltyType}
              formData={formData}
              setFormData={setFormData}
              previewImages={previewImages}
              onOpenImageSelector={handleOpenImageSelector}
              products={products}
            />
          </div>
        )}

        {loyaltyType !== '' && currentView === 'walletCard' && (
          <div className="">
            <WalletCardSelector
              selectedCardId={formData.cardId}
              onCardSelect={handleCardSelect}
              isVisible={true}
            />
          </div>
        )}

      </div>

      {isImageSelectorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {imageType === 'logo' ? 'Select Logo' :
                  imageType.startsWith('icon') ? `Select Icon ${imageType.slice(-1)}` :
                    'Select Banner Image'}
              </h3>
              <button
                onClick={handleCloseImageSelector}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ImageSelector
              label={imageType === 'logo' ? 'Logo' :
                imageType.startsWith('icon') ? `Icon ${imageType.slice(-1)}` :
                  'Banner Image'}
              value={previewImages[imageType]}
              onChange={handleImageChange}
              onBlobChange={setImageBlob}
              aspectRatio={imageType === 'banner' ? 1.33 : 1}
              placeholder={imageType === 'logo' ? 'Upload logo image' :
                imageType.startsWith('icon') ? 'Upload icon image' :
                  'Upload banner image'}
              maxHeight={300}
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateLoyalty;