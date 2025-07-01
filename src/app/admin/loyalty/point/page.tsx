'use client';
import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import PointLoyaltyTable from 'components/admin/default/PointLoyaltyTable';
import AddLoyalty from 'components/form/AddLoyalty';
import { useCreatePointLoyaltyCampaignMutation, useGetAllPointLoyaltyCampaignsQuery, useGetPointLoyaltyCampaignByIdQuery, useUpdatePointLoyaltyCampaignMutation, useDeletePointLoyaltyCampaignMutation } from 'store/pointLoyalty';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';

const Dashboard = () => {
  const { data: pointLoyaltyCampaigns, error, isLoading } = useGetAllPointLoyaltyCampaignsQuery('');
  const [createPointLoyaltyCampaign] = useCreatePointLoyaltyCampaignMutation();
  const [updatePointLoyaltyCampaign] = useUpdatePointLoyaltyCampaignMutation();
  const [deletePointLoyaltyCampaign] = useDeletePointLoyaltyCampaignMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLoyaltyData, setSelectedLoyaltyData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCampaignId, setDeleteCampaignId] = useState(null);

  const handleAddLoyalty = async (formData) => {
    try {
      await createPointLoyaltyCampaign(formData).unwrap();
      console.log('Point Loyalty created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating loyalty campaign:', error);
    }
  };

  const handleUpdateLoyalty = async (formData) => {
    if (selectedLoyaltyData) {
      try {
        await updatePointLoyaltyCampaign({ id: selectedLoyaltyData.id, formData }).unwrap();
        onClose();
      } catch (error) {
        console.error('Error updating loyalty campaign:', error);
      }
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteCampaignId(id);
    setDeleteModalOpen(true);
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

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <PointLoyaltyTable tableData={tableDataComplex} onAddClick={onOpen} onDelete={handleDeleteConfirmation} onEdit={setSelectedLoyaltyData} />
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title={selectedLoyaltyData ? 'Edit Point Loyalty' : 'Add Point Loyalty'} size="4xl">
        <AddLoyalty
          sourcePage="points"
          onClose={onClose}
          selectedLoyaltyData={selectedLoyaltyData}
          onSubmit={handleAddLoyalty}
          products={undefined}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteLoyalty}
        itemName={''} />
    </div>
  );
};

export default Dashboard;