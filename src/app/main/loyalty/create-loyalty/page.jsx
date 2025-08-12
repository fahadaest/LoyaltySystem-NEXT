'use client';
import React, { useState, useEffect } from 'react';
import { MdAdd } from "react-icons/md";
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { FaGift } from "react-icons/fa";
import CreateLoyaltyComponent from 'components/create-loyalty-components/create-loyalty';
import AddLoyaltyForm from 'components/create-loyalty-components/add-loyalty-form';
import BannerEditor from 'components/create-loyalty-components/loyalty-banner-component';
import ImageSelector from 'components/ui/ImageSelector';
import { initialProductFormData, initialPointFormData } from 'utils/rewardFormData';

const CreateLoyalty = () => {
  const [loyaltyType, setLoyaltyType] = useState('');
  const [formData, setFormData] = useState({});

  // Image selector state
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [imageType, setImageType] = useState('banner'); // 'banner' or 'logo'

  useEffect(() => {
    if (loyaltyType === 'points') {
      setFormData(initialPointFormData);
    } else if (loyaltyType === 'products') {
      setFormData(initialProductFormData);
    } else {
      setFormData({});
    }
  }, [loyaltyType]);

  // Function to handle image selection
  const handleImageChange = (imageUrl, blob) => {
    setPreviewImage(imageUrl);
    setImageBlob(blob);

    // Map image types to form data fields
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

  // Function to open image selector
  const handleOpenImageSelector = (type = 'banner') => {
    setImageType(type);
    setIsImageSelectorOpen(true);
  };

  // Function to close image selector
  const handleCloseImageSelector = () => {
    setIsImageSelectorOpen(false);
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">

        <div className="mt-3 mb-5">
          <HeadingCard
            icon={<FaGift className="text-brandGreen text-3xl" />}
            title="Create Loyalty"
            subtitle="Create New Loyalties Reward"
          >
          </HeadingCard>
        </div>

        {loyaltyType === '' && (
          <div className="">
            <CreateLoyaltyComponent
              loyaltyType={loyaltyType}
              setLoyaltyType={setLoyaltyType}
            />
          </div>
        )}

        {loyaltyType !== '' && (
          <div className="">
            <AddLoyaltyForm
              loyaltyType={loyaltyType}
              formData={formData}
              setFormData={setFormData}
              previewImage={previewImage}
              onOpenImageSelector={handleOpenImageSelector}
            />
          </div>
        )}

      </div>

      {/* Image Selector Modal - This will appear on top */}
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
              value={previewImage}
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