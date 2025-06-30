'use client';
import { useState } from 'react';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import ProductLoyaltyCard from 'components/card/ProductLoyaltyCard';
import AddLoyalty from 'components/form/AddLoyalty';
import { MdAdd } from "react-icons/md";
import { useGetAllProductLoyaltyCampaignsQuery, useDeleteProductLoyaltyCampaignMutation, useUpdateProductLoyaltyCampaignMutation } from 'store/productLoyalty';
import { useGetAllProductsQuery } from 'store/productsApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';

const Dashboard = () => {
  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedLoyaltyData, setSelectedLoyaltyData] = useState(null);

  const { data: loyaltyCampaigns, isLoading: loyaltyProductsLoading, isError: loyaltyProductsError, refetch: loyaltyProductsRefetch } = useGetAllProductLoyaltyCampaignsQuery();
  const { data: products, error: productsError, isLoading: productsLoading, refetch: productsRefetch } = useGetAllProductsQuery();
  const [deleteProductLoyaltyCampaign] = useDeleteProductLoyaltyCampaignMutation();
  const [updateProductLoyaltyCampaign] = useUpdateProductLoyaltyCampaignMutation();

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

  const handleEdit = (loyaltyData) => {
    setSelectedLoyaltyData(loyaltyData);
    openAddModal();
  };

  const handleOpenAddModal = () => {
    setSelectedLoyaltyData(null);
    openAddModal();
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">
        <div className="mt-3 mb-5">
          <HeadingCard subtitle="Manage Product-Based Loyalties Reward">
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
              />
            );
          })}
        </div>
      </div>

      <CustomModal isOpen={isAddModalOpen} onClose={closeAddModal} title={selectedLoyaltyData ? "Edit Loyalty" : "Add New Loyalty"} size="4xl">
        <AddLoyalty
          products={products}
          onClose={closeAddModal}
          selectedLoyaltyData={selectedLoyaltyData}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Dashboard;
