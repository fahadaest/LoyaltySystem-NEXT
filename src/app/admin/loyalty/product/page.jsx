'use client';
import React, { useRef, useCallback, useMemo } from 'react';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import ProductLoyaltyCard from 'components/card/ProductLoyaltyCard';
import AddLoyalty from 'components/form/AddLoyalty';
import { MdAdd, MdPrint } from "react-icons/md";
import {
  useCreateProductLoyaltyCampaignMutation,
  useGetAllProductLoyaltyCampaignsQuery,
  useUpdateProductLoyaltyCampaignMutation,
  useDeleteProductLoyaltyCampaignMutation
} from 'store/apiEndPoints/productLoyalty';
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

// Initial form state constant to avoid recreation
const INITIAL_LOYALTY_FORM_DATA = {
  loyaltyTemplates: "",
  rewardTitle: "",
  purchaseQuantity: "",
  rewardDescription: "",
  productId: "",
  rewardProductId: "",
  spendingAmount: "",
  rewardPoints: "",
  rewardPointsEquivalent: "",
  bannerTitle: "",
  templateColor: '#4a5568',
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
  isVisible: false,
  cardId: "",
};

const Dashboard = () => {
  const { data: loyaltyCampaigns, isLoading: loyaltyCampaignsLoading } = useGetAllProductLoyaltyCampaignsQuery();
  const { data: products, isLoading: productsLoading } = useGetAllProductsQuery();
  const [deleteProductLoyaltyCampaign, { isLoading: isDeleting }] = useDeleteProductLoyaltyCampaignMutation();
  const [updateProductLoyaltyCampaign, { isLoading: isUpdating }] = useUpdateProductLoyaltyCampaignMutation();
  const [createProductLoyaltyCampaign, { isLoading: isCreating }] = useCreateProductLoyaltyCampaignMutation();

  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: openViewModal, onClose: closeViewModal } = useDisclosure();

  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedLoyaltyData, setSelectedLoyaltyData] = useState(null);
  const [registerCustomerLink, setRegisterCustomerLink] = useState("");
  const [loyaltyFormData, setLoyaltyFormData] = useState(INITIAL_LOYALTY_FORM_DATA);

  const printRef = useRef(null);

  // Memoized current URL to avoid recalculation
  const currentUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  }, []);

  // Memoized loading state
  const isLoading = useMemo(() => {
    return isCreating || isUpdating || isDeleting;
  }, [isCreating, isUpdating, isDeleting]);

  // Optimized form field updater
  const updateLoyaltyFormField = useCallback((field, value) => {
    setLoyaltyFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Optimized bulk form data updater
  const updateLoyaltyFormData = useCallback((updates) => {
    setLoyaltyFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Optimized form reset function
  const resetLoyaltyFormData = useCallback(() => {
    setLoyaltyFormData({ ...INITIAL_LOYALTY_FORM_DATA, isVisible: true });
  }, []);

  // Optimized form population function
  const populateFormFromLoyaltyData = useCallback((data) => {
    if (!data) return;

    setLoyaltyFormData({
      loyaltyTemplates: data.loyaltyTemplates || '',
      rewardTitle: data.rewardTitle || '',
      rewardDescription: data.rewardDescription || '',
      purchaseQuantity: data.purchaseQuantity || '',
      productId: data.productId || '',
      rewardProductId: data.rewardProductId || '',
      templateColor: data.templateColor || '#4a5568',
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
      isVisible: true,
      cardId: data.id || "",
    });
  }, [baseUrl]);

  // Enhanced form submission with better error handling
  const handleAddLoyalty = useCallback(async () => {
    if (isLoading) return; // Prevent double submission

    try {
      // Validate required fields based on template type
      const requiredFields = ['loyaltyTemplates', 'rewardTitle'];
      if (loyaltyFormData.loyaltyTemplates === 'general') {
        requiredFields.push('purchaseQuantity', 'productId', 'rewardProductId');
      } else if (loyaltyFormData.loyaltyTemplates === 'point') {
        requiredFields.push('spendingAmount', 'rewardPoints', 'rewardPointsEquivalent');
      }

      const missingFields = requiredFields.filter(field => !loyaltyFormData[field]);
      if (missingFields.length > 0) {
        dispatch(showAlert({
          message: `Please fill in required fields: ${missingFields.join(', ')}`,
          severity: "error",
          duration: 3000
        }));
        return;
      }

      // Create FormData for file uploads
      const formData = new FormData();

      // Add all text fields
      Object.entries(loyaltyFormData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && !key.includes('Blob') && key !== 'logo' && key !== 'templateImage' && !key.includes('icon1') && !key.includes('icon2') && !key.includes('icon3')) {
          formData.append(key, value.toString());
        }
      });

      // Handle file uploads with proper naming
      const fileFields = [
        { blob: loyaltyFormData.logoBlob, name: 'logo', fileName: 'logo.png' },
        { blob: loyaltyFormData.templateImageBlob, name: 'templateImage', fileName: 'template.png' },
        { blob: loyaltyFormData.icon1Blob, name: 'icon1', fileName: 'icon1.png' },
        { blob: loyaltyFormData.icon2Blob, name: 'icon2', fileName: 'icon2.png' },
        { blob: loyaltyFormData.icon3Blob, name: 'icon3', fileName: 'icon3.png' },
      ];

      fileFields.forEach(({ blob, name, fileName }) => {
        if (blob) {
          formData.append(name, blob, fileName);
        }
      });

      // Execute API call
      if (selectedLoyaltyData) {
        await updateProductLoyaltyCampaign({ id: selectedLoyaltyData.id, formData }).unwrap();
        dispatch(showAlert({ message: "Product Loyalty Updated Successfully", severity: "success", duration: 2000 }));
      } else {
        await createProductLoyaltyCampaign(formData).unwrap();
        dispatch(showAlert({ message: "Product Loyalty Added Successfully", severity: "success", duration: 2000 }));
      }

      handleCloseAddModal();
    } catch (error) {
      console.error('Error creating/updating loyalty:', error);
      const errorMessage = error?.data?.message || error?.message || "An error occurred while processing your request";
      dispatch(showAlert({ message: errorMessage, severity: "error", duration: 3000 }));
    }
  }, [loyaltyFormData, selectedLoyaltyData, isLoading, updateProductLoyaltyCampaign, createProductLoyaltyCampaign, dispatch]);

  // Optimized view handler
  const handleView = useCallback((loyaltyData) => {
    const adminId = loyaltyData?.adminId;
    const loyalty = loyaltyData?.id;
    const registerCustomerUrl = `${currentUrl}/register-customer?adminId=${adminId}&loyalty=${loyalty}&type=product`;
    setRegisterCustomerLink(registerCustomerUrl);
    setSelectedLoyaltyData(loyaltyData);
    openViewModal();
  }, [currentUrl, openViewModal]);

  // Enhanced print handler with error handling
  const handlePrint = useCallback(async () => {
    if (!printRef.current) {
      dispatch(showAlert({ message: "Nothing to print", severity: "warning", duration: 2000 }));
      return;
    }

    try {
      const canvas = await html2canvas(printRef.current, {
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
        scale: 2, // Higher quality
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `loyalty-banner-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      dispatch(showAlert({ message: "Banner downloaded successfully", severity: "success", duration: 2000 }));
    } catch (error) {
      console.error('Print error:', error);
      dispatch(showAlert({ message: "Failed to download banner", severity: "error", duration: 2000 }));
    }
  }, [dispatch]);

  // Optimized edit handler
  const handleEdit = useCallback((loyaltyData) => {
    setSelectedLoyaltyData(loyaltyData);
    populateFormFromLoyaltyData(loyaltyData);
    openAddModal();
  }, [populateFormFromLoyaltyData, openAddModal]);

  // Optimized delete handler
  const handleDelete = useCallback((productId) => {
    setSelectedProductId(productId);
    openDeleteModal();
  }, [openDeleteModal]);

  // Enhanced delete confirmation with loading state
  const handleConfirmDelete = useCallback(async () => {
    if (isDeleting) return;

    try {
      await deleteProductLoyaltyCampaign(selectedProductId).unwrap();
      dispatch(showAlert({ message: "Product loyalty deleted successfully!", severity: "success", duration: 2000 }));
      closeDeleteModal();
      setSelectedProductId(null);
    } catch (error) {
      console.error('Delete error:', error);
      dispatch(showAlert({ message: "Failed to delete, Try again!", severity: "error", duration: 2000 }));
    }
  }, [selectedProductId, isDeleting, deleteProductLoyaltyCampaign, dispatch, closeDeleteModal]);

  // Optimized add modal opener
  const handleOpenAddModal = useCallback(() => {
    setSelectedLoyaltyData(null);
    resetLoyaltyFormData();
    openAddModal();
  }, [resetLoyaltyFormData, openAddModal]);

  // Enhanced copy handler with better error handling
  const handleCopy = useCallback(async (loyaltyData) => {
    const adminId = loyaltyData?.adminId;
    const loyalty = loyaltyData?.id;
    const registerCustomerUrl = `${currentUrl}/register-customer?adminId=${adminId}&loyalty=${loyalty}&type=product`;

    try {
      await navigator.clipboard.writeText(registerCustomerUrl);
      dispatch(showAlert({
        message: "Link copied successfully!",
        severity: "success",
        duration: 2000
      }));
    } catch (error) {
      console.error('Copy error:', error);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = registerCustomerUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        dispatch(showAlert({
          message: "Link copied successfully!",
          severity: "success",
          duration: 2000
        }));
      } catch (fallbackError) {
        dispatch(showAlert({
          message: "Failed to copy the link!",
          severity: "error",
          duration: 2000
        }));
      }
    }
  }, [currentUrl, dispatch]);

  // Optimized modal close handler
  const handleCloseAddModal = useCallback(() => {
    closeAddModal();
    resetLoyaltyFormData();
    setSelectedLoyaltyData(null);
  }, [closeAddModal, resetLoyaltyFormData]);

  // Memoized modal size calculation
  const modalSize = useMemo(() => {
    return loyaltyFormData?.loyaltyTemplates === '' ? '1xl' : '4xl';
  }, [loyaltyFormData?.loyaltyTemplates]);

  // Memoized footer visibility
  const showFooter = useMemo(() => {
    return loyaltyFormData?.loyaltyTemplates !== '';
  }, [loyaltyFormData?.loyaltyTemplates]);

  // Loading state rendering
  if (loyaltyCampaignsLoading || productsLoading) {
    return (
      <div className="mt-3 grid h-full grid-cols-1 gap-5">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandGreen"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">
        <div className="mt-3 mb-5">
          <HeadingCard
            icon={<FaGift className="text-brandGreen text-3xl" />}
            subtitle="Manage Product-Based Loyalties Reward"
          >
            <HeaderButton
              icon={MdAdd}
              text="Add New Loyalty"
              size="lg"
              color="bg-brandGreen"
              onClick={handleOpenAddModal}
              disabled={isLoading}
            />
          </HeadingCard>
        </div>

        <div className="z-20 grid grid-cols-1 gap-5">
          {loyaltyCampaigns?.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FaGift className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium">No loyalty campaigns found</h3>
              <p className="mt-2">Create your first loyalty campaign to get started</p>
            </div>
          ) : (
            loyaltyCampaigns?.map((product) => (
              <ProductLoyaltyCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                onCopy={handleCopy}
                disabled={isLoading}
              />
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <CustomModal
        headerTitle={selectedLoyaltyData ? "Edit Loyalty" : "Add New Loyalty"}
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        size={modalSize}
        showFooter={showFooter}
        showFooterCancelButton={showFooter}
        footerConfirmation={showFooter ? handleAddLoyalty : null}
        footerConfirmButtonText={selectedLoyaltyData ? 'Update Loyalty' : 'Create Loyalty'}
        footerConfirmButtonIcon={MdCardGiftcard}
        footerConfirmButtonLoading={isLoading}
      >
        <AddLoyalty
          sourcePage="products"
          products={products}
          onClose={handleCloseAddModal}
          selectedLoyaltyData={selectedLoyaltyData}
          loyaltyFormData={loyaltyFormData}
          updateLoyaltyFormField={updateLoyaltyFormField}
          updateLoyaltyFormData={updateLoyaltyFormData}
        />
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />

      {/* View/Preview Modal */}
      <CustomModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        handlePrint={handlePrint}
        title="Real-Time Banner Preview"
        size="lg"
      >
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