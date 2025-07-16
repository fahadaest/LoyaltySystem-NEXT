'use client';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useDisclosure } from '@chakra-ui/react';
import PointLoyaltyTable from 'components/admin/default/PointLoyaltyTable';
import AddLoyalty from 'components/form/AddLoyalty';
import { useCreatePointLoyaltyCampaignMutation, useGetAllPointLoyaltyCampaignsQuery, useGetPointLoyaltyCampaignByIdQuery, useUpdatePointLoyaltyCampaignMutation, useDeletePointLoyaltyCampaignMutation } from 'store/apiEndPoints/pointLoyalty';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import LoyaltyBannerPreview from 'components/banner/LoyaltyBannerPreview';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from 'react-icons/md';
import { MdStar } from "react-icons/md";

const Dashboard = () => {
  const { data: pointLoyaltyCampaigns, error, isLoading } = useGetAllPointLoyaltyCampaignsQuery('');
  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: openViewModal, onClose: closeViewModal } = useDisclosure();
  const [createPointLoyaltyCampaign] = useCreatePointLoyaltyCampaignMutation();
  const [updatePointLoyaltyCampaign] = useUpdatePointLoyaltyCampaignMutation();
  const [deletePointLoyaltyCampaign] = useDeletePointLoyaltyCampaignMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLoyaltyData, setSelectedLoyaltyData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCampaignId, setDeleteCampaignId] = useState(null);
  const dispatch = useDispatch();
  const printRef = useRef(null);
  const currentUrl = window.location.origin;
  const [registerCustomerLink, setRegisterCustomerLink] = useState("");

  const handleOpenAddModal = () => {
    setSelectedLoyaltyData(null);
    onOpen();
  };

  const handleAddLoyalty = async (formData) => {
    try {
      await createPointLoyaltyCampaign(formData).unwrap();
      dispatch(showAlert({ message: "Point Loyalty created successfully", severity: "success", duration: 2000 }));
      onClose();
    } catch (error) {
      dispatch(showAlert({ message: "Error occurred!", severity: "error", duration: 2000 }));
    }
  };

  const handleUpdateLoyalty = async (formData, id) => {
    try {
      await updatePointLoyaltyCampaign({ id, formData }).unwrap();
      dispatch(showAlert({ message: "Point Loyalty updated successfully", severity: "success", duration: 2000 }));
      onClose();
    } catch (error) {
      dispatch(showAlert({ message: "Error occurred while updating!", severity: "error", duration: 2000 }));
    }
  };

  const handleEditLoyalty = (loyaltyData) => {
    const selectedLoyalty = pointLoyaltyCampaigns.find(campaign => campaign.id === loyaltyData.id);
    if (selectedLoyalty) {
      setSelectedLoyaltyData(selectedLoyalty);
    } else {
      console.log("No matching loyalty campaign found for edit");
    }
    onOpen();
  };


  const handleDeleteConfirmation = (id) => {
    setDeleteCampaignId(id);
    setDeleteModalOpen(true);
  };

  const handleView = (loyaltyData) => {
    const selectedLoyalty = pointLoyaltyCampaigns.find(campaign => campaign.id === loyaltyData.id);
    const adminId = selectedLoyalty?.adminId;
    const loyalty = selectedLoyalty?.id;
    const registerCustomerUrl = `${currentUrl}/register-customer?adminId=${adminId}&loyalty=${loyalty}&type=point`;
    setRegisterCustomerLink(registerCustomerUrl);
    if (selectedLoyalty) {
      setSelectedLoyaltyData(selectedLoyalty);
    } else {
      console.log("No matching loyalty campaign found");
    }
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

  const handleDeleteLoyalty = async () => {
    if (deleteCampaignId) {
      try {
        await deletePointLoyaltyCampaign(deleteCampaignId).unwrap();
        setDeleteModalOpen(false);
        console.log('Loyalty campaign deleted successfully');
      } catch (error) {
        console.error('Error deleting loyalty campaign:', error);
      }
    }
  };

  const tableDataComplex = pointLoyaltyCampaigns?.map((campaign) => ({
    id: campaign.id,
    name: campaign.rewardTitle,
    spendingAmount: parseFloat(campaign.spendingAmount),
    rewardPoints: campaign.rewardPoints,
  })) || [];

  const handleCopy = (loyaltyData) => {
    const selectedLoyalty = pointLoyaltyCampaigns.find(campaign => campaign.id === loyaltyData.id);
    const adminId = selectedLoyalty?.adminId;
    const loyalty = selectedLoyalty?.id;
    const registerCustomerUrl = `${currentUrl}/register-customer?adminId=${adminId}&loyalty=${loyalty}&type=point`;
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
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard icon={<MdStar className="text-brandGreen text-3xl" />} subtitle="Point-Based Loyalties">
          <HeaderButton
            icon={MdAdd}
            text="Add New Loyalty"
            size="lg"
            color="bg-brandGreen"
            onClick={handleOpenAddModal}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <PointLoyaltyTable tableData={tableDataComplex} onAddClick={onOpen} onDelete={handleDeleteConfirmation} onEdit={handleEditLoyalty} onView={handleView} onCopy={handleCopy} />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Add Point Loyalty"
        handlePrint={null}
        size="4xl"
        headerTitle={undefined}
        headerDescription={undefined}
        showFooter={undefined}
        showFooterCancelButton={undefined}
        footerConfirmation={undefined}
        footerConfirmButtonIcon={undefined}
        showModalBackButton={undefined}
        handleClickBack={undefined}
      >
        <AddLoyalty
          sourcePage="points"
          onClose={onClose}
          selectedLoyaltyData={selectedLoyaltyData}
          onSubmit={selectedLoyaltyData ? handleUpdateLoyalty : handleAddLoyalty}
          products={undefined}
          loyaltyFormData={undefined}
          updateLoyaltyFormField={undefined}
          updateLoyaltyFormData={undefined}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteLoyalty}
        itemName={''} />

      <CustomModal
        headerTitle={undefined}
        headerDescription={undefined}
        showFooter={undefined}
        showFooterCancelButton={undefined}
        footerConfirmation={undefined}
        footerConfirmButtonIcon={undefined}
        showModalBackButton={undefined}
        handleClickBack={undefined}
        isOpen={isViewModalOpen} onClose={closeViewModal} handlePrint={handlePrint} title="Real-Time Banner Preview" size="lg">
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