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
import LoyaltyBannerPreview from 'components/banner/LoyaltyBannerPreview';

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

      <CustomModal isOpen={isAddModalOpen} onClose={closeAddModal} title={selectedLoyaltyData ? "Edit Loyalty" : "Add New Loyalty"} size="4xl">
        <AddLoyalty
          sourcePage="products"
          products={products}
          onClose={closeAddModal}
          selectedLoyaltyData={selectedLoyaltyData}
          onSubmit={handleAddLoyalty}
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