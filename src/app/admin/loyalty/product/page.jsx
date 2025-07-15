'use client';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import ProductLoyaltyCard from 'components/card/ProductLoyaltyCard';
import AddLoyalty from 'components/form/AddLoyalty';
import { MdAdd, MdPrint } from "react-icons/md";
import { useCreateProductLoyaltyCampaignMutation, useGetAllProductLoyaltyCampaignsQuery, useUpdateProductLoyaltyCampaignMutation, useDeleteProductLoyaltyCampaignMutation } from 'store/apiEndPoints/productLoyalty';
import { useGetAllProductsQuery } from 'store/apiEndPoints/productsApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { FaGift } from "react-icons/fa";
import { MdCardGiftcard } from 'react-icons/md';
import LoyaltyBannerPreview from 'components/banner/LoyaltyBannerPreview';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Dashboard = () => {
  const { data: loyaltyCampaigns } = useGetAllProductLoyaltyCampaignsQuery();
  const { data: products } = useGetAllProductsQuery();
  const [deleteProductLoyaltyCampaign] = useDeleteProductLoyaltyCampaignMutation();
  const [updateProductLoyaltyCampaign] = useUpdateProductLoyaltyCampaignMutation();
  const [createProductLoyaltyCampaign] = useCreateProductLoyaltyCampaignMutation();
  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: openViewModal, onClose: closeViewModal } = useDisclosure();
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedLoyaltyData, setSelectedLoyaltyData] = useState(null);
  const printRef = useRef(null);
  const currentUrl = window.location.origin;
  const [registerCustomerLink, setRegisterCustomerLink] = useState("");
  const [showFooter, setShowFooter] = useState(true);
  const [showFooterCancel, setShowFooterCancel] = useState(true);

  // Centralized loyalty form state
  const [loyaltyFormData, setLoyaltyFormData] = useState({
    selectedTemplate: "",
    rewardTitle: "",
    purchaseQuantity: "",
    rewardDescription: "",
    selectedProduct: "",
    rewardProduct: "",
    spendingAmount: "",
    rewardPoints: "",
    rewardPointsEquivalent: "",
    bannerTitle: "",
    color: '#4a5568',
    logoSize: 60,
    qrSize: 80,
    logo: null,
    logoBlob: null,
    templateImage: null,
    templateImageBlob: null,
    icon1Text: 'Scan Qr with your mobile phone',
    icon2Text: 'Download the Point Pass into your mobile',
    icon3Text: 'Enter Your promotion',
    icon1TextSize: 12,
    icon2TextSize: 12,
    icon3TextSize: 12,
    icon1: null,
    icon2: null,
    icon3: null,
    icon1Blob: null,
    icon2Blob: null,
    icon3Blob: null,
    isVisible: false
  });

  // Helper function to update any field in loyalty form data
  const updateLoyaltyFormField = (field, value) => {
    setLoyaltyFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper function to update multiple fields at once
  const updateLoyaltyFormData = (updates) => {
    setLoyaltyFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Helper function to reset form data
  const resetLoyaltyFormData = () => {
    setLoyaltyFormData({
      selectedTemplate: "",
      rewardTitle: "",
      purchaseQuantity: "",
      rewardDescription: "",
      selectedProduct: "",
      rewardProduct: "",
      spendingAmount: "",
      rewardPoints: "",
      rewardPointsEquivalent: "",
      bannerTitle: "",
      color: '#4a5568',
      logoSize: 60,
      qrSize: 80,
      logo: null,
      logoBlob: null,
      templateImage: null,
      templateImageBlob: null,
      icon1Text: 'Scan Qr with your mobile phone',
      icon2Text: 'Download the Point Pass into your mobile',
      icon3Text: 'Enter Your promotion',
      icon1TextSize: 12,
      icon2TextSize: 12,
      icon3TextSize: 12,
      icon1: null,
      icon2: null,
      icon3: null,
      icon1Blob: null,
      icon2Blob: null,
      icon3Blob: null,
      isVisible: true
    });
  };

  // Helper function to populate form data from selected loyalty data
  const populateFormFromLoyaltyData = (data) => {
    if (!data) return;

    setLoyaltyFormData({
      selectedTemplate: data.loyaltyTemplates || '',
      rewardTitle: data.rewardTitle || '',
      rewardDescription: data.rewardDescription || '',
      purchaseQuantity: data.purchaseQuantity || '',
      selectedProduct: data.productId || '',
      rewardProduct: data.rewardProductId || '',
      color: data.templateColor || '#4a5568',
      logo: data.logo ? baseUrl + data.logo : null,
      bannerTitle: data.bannerTitle || '',
      logoBlob: null,
      templateImage: data.templateImage ? baseUrl + data.templateImage : null,
      icon1Text: data.icon1Text || 'Scan QR with your mobile phone',
      icon2Text: data.icon2Text || 'Download the Point Pass into your mobile',
      icon3Text: data.icon3Text || 'Enter Your promotion',
      icon1TextSize: data.icon1TextSize || 12,
      icon2TextSize: data.icon2TextSize || 12,
      icon3TextSize: data.icon3TextSize || 12,
      icon1: data.icon1Image ? baseUrl + data.icon1Image : null,
      icon2: data.icon2Image ? baseUrl + data.icon2Image : null,
      icon3: data.icon3Image ? baseUrl + data.icon3Image : null,
      spendingAmount: data.spendingAmount || '',
      rewardPoints: data.rewardPoints || '',
      rewardPointsEquivalent: data.rewardPointsEquivalent || '',
      logoSize: data.logoSize || 60,
      qrSize: data.qrSize || 80,
      templateImageBlob: null,
      icon1Blob: null,
      icon2Blob: null,
      icon3Blob: null,
      isVisible: true
    });
  };

  const handleAddLoyalty = async (formData) => {
    try {
      if (selectedLoyaltyData) {
        await updateProductLoyaltyCampaign({ id: selectedLoyaltyData.id, formData }).unwrap();
        dispatch(showAlert({ message: "Product Loyalty Updated Successfully", severity: "success", duration: 2000 }));
      } else {
        await createProductLoyaltyCampaign(formData).unwrap();
        dispatch(showAlert({ message: "Product Loyalty Added Successfully", severity: "success", duration: 2000 }));
      }
      closeAddModal();
      resetLoyaltyFormData(); // Reset form after successful submission
    } catch (error) {
      dispatch(showAlert({ message: "Error occurred!", severity: "error", duration: 2000 }));
    }
  };

  const handleView = (loyaltyData) => {
    const adminId = loyaltyData?.adminId;
    const loyalty = loyaltyData?.id;
    const registerCustomerUrl = `${currentUrl}/register-customer?adminId=${adminId}&loyalty=${loyalty}&type=product`;
    setRegisterCustomerLink(registerCustomerUrl);
    setSelectedLoyaltyData(loyaltyData);
    openViewModal();
  };

  const handlePrint = () => {
    if (printRef.current) {
      html2canvas(printRef.current, {
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'loyalty-banner.png';
        link.click();
      });
    }
  };

  const handleEdit = (loyaltyData) => {
    setSelectedLoyaltyData(loyaltyData);
    populateFormFromLoyaltyData(loyaltyData); // Populate form with existing data
    openAddModal();
  };

  const handleDelete = (productId) => {
    setSelectedProductId(productId);
    openDeleteModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProductLoyaltyCampaign(selectedProductId).unwrap();
      dispatch(showAlert({ message: "Product loyalty deleted successfully!", severity: "success", duration: 2000 }));
      closeDeleteModal();
    } catch (error) {
      dispatch(showAlert({ message: "Failed to delete, Try again!", severity: "error", duration: 2000 }));
    }
  };

  const handleOpenAddModal = () => {
    setSelectedLoyaltyData(null);
    resetLoyaltyFormData(); // Reset form for new loyalty
    openAddModal();
  };

  const handleCopy = (loyaltyData) => {
    const adminId = loyaltyData?.adminId;
    const loyalty = loyaltyData?.id;
    const registerCustomerUrl = `${currentUrl}/register-customer?adminId=${adminId}&loyalty=${loyalty}&type=product`;
    navigator.clipboard.writeText(registerCustomerUrl)
      .then(() => {
        dispatch(showAlert({
          message: "Link copied successfully!",
          severity: "success",
          duration: 2000
        }));
      })
      .catch((error) => {
        dispatch(showAlert({
          message: "Failed to copy the link!",
          severity: "error",
          duration: 2000
        }));
      });
  };

  // Function to handle modal close and reset form
  const handleCloseAddModal = () => {
    closeAddModal();
    resetLoyaltyFormData();
    setSelectedLoyaltyData(null);
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">
        <div className="mt-3 mb-5">
          <HeadingCard icon={<FaGift className="text-brandGreen text-3xl" />} subtitle="Manage Product-Based Loyalties Reward">
            <HeaderButton
              icon={MdAdd}
              text="Add New Loyalty"
              size="lg"
              color="bg-brandGreen"
              onClick={handleOpenAddModal}
            />
          </HeadingCard>
        </div>

        <div className="z-20 grid grid-cols-1 gap-5">
          {loyaltyCampaigns?.map((product) => {
            return (
              <ProductLoyaltyCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                onCopy={handleCopy}
              />
            );
          })}
        </div>
      </div>

      <CustomModal
        headerTitle={selectedLoyaltyData ? "Edit Loyalty" : "Add New Loyalty"}
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        size={loyaltyFormData?.selectedTemplate === '' ? '1xl' : '4xl'}
        showFooter={showFooter}
        showFooterCancelButton={showFooterCancel}
        footerConfirmation={loyaltyFormData?.selectedTemplate === '' ? null : handleAddLoyalty}
        footerConfirmButtonText={selectedLoyaltyData ? 'Edit Loyalty' : 'Create New Loyalty'}
        footerConfirmButtonIcon={MdCardGiftcard}
      >
        <AddLoyalty
          sourcePage="products"
          products={products}
          onClose={handleCloseAddModal}
          selectedLoyaltyData={selectedLoyaltyData}
          onSubmit={handleAddLoyalty}
          // Pass centralized state and handlers
          loyaltyFormData={loyaltyFormData}
          updateLoyaltyFormField={updateLoyaltyFormField}
          updateLoyaltyFormData={updateLoyaltyFormData}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <CustomModal isOpen={isViewModalOpen} onClose={closeViewModal} handlePrint={handlePrint} title="Real-Time Banner Preview" size="lg">
        <div ref={printRef}>
          <LoyaltyBannerPreview
            registerCustomerLink={registerCustomerLink}
            bannerTitle={selectedLoyaltyData?.bannerTitle}
            color={selectedLoyaltyData?.templateColor || '#4a5568'}
            logoSize={selectedLoyaltyData?.logoSize || 60}
            qrSize={selectedLoyaltyData?.qrSize || 80}
            logo={selectedLoyaltyData?.logo}
            templateImage={selectedLoyaltyData?.templateImage}
            icon1Text={selectedLoyaltyData?.icon1Text || 'Scan QR with your mobile phone'}
            icon2Text={selectedLoyaltyData?.icon2Text || 'Download the Point Pass into your mobile'}
            icon3Text={selectedLoyaltyData?.icon3Text || 'Enter Your promotion'}
            icon1={selectedLoyaltyData?.icon1Image}
            icon2={selectedLoyaltyData?.icon2Image}
            icon3={selectedLoyaltyData?.icon3Image}
            icon1TextSize={selectedLoyaltyData?.icon1TextSize || 12}
            icon2TextSize={selectedLoyaltyData?.icon2TextSize || 12}
            icon3TextSize={selectedLoyaltyData?.icon3TextSize || 12}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default Dashboard;