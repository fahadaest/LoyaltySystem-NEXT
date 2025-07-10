'use client';
import { useState, useEffect } from 'react';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import CircularProgress from '@mui/material/CircularProgress';
import AppleWalletEditor from 'components/wallet-cards/AppleWalletEditor';
import WalletCardDisplay from 'components/wallet-cards/WalletCardDisplay';
import {
  useGetWalletCardsQuery,
  useDeleteWalletCardMutation,
  useDuplicateWalletCardMutation,
  useToggleWalletCardStatusMutation,
  useGenerateWalletPassMutation
} from 'store/apiEndPoints/customWalletCard';

const Dashboard = () => {
  const { data: cardsResponse, error: cardsError, isLoading: cardsLoading, refetch: cardsRefetch } = useGetWalletCardsQuery();
  const [deleteWalletCard, { isLoading: isDeleting }] = useDeleteWalletCardMutation();
  const [duplicateWalletCard, { isLoading: isDuplicating }] = useDuplicateWalletCardMutation();
  const [toggleWalletCardStatus, { isLoading: isToggling }] = useToggleWalletCardStatusMutation();
  const [generateWalletPass, { isLoading: isGenerating }] = useGenerateWalletPassMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPassModalOpen, onOpen: onPassModalOpen, onClose: onPassModalClose } = useDisclosure();
  const dispatch = useDispatch();

  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [generatePassCard, setGeneratePassCard] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    cardsRefetch();
  }, [cardsRefetch]);

  const cards = cardsResponse?.data?.cards || [];

  const handleEdit = (card) => {
    setSelectedCard(card);
    setEditMode(true);
    onOpen();
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        await deleteWalletCard(deleteItemId).unwrap();
        dispatch(showAlert({
          message: "Wallet card deleted successfully!",
          severity: "success",
          duration: 2000
        }));
        setDeleteItemId(null);
        cardsRefetch();
      } catch (error) {
        dispatch(showAlert({
          message: "Failed to delete wallet card!",
          severity: "error",
          duration: 2000
        }));
      }
    }
  };

  const handleDuplicate = async (cardId) => {
    try {
      await duplicateWalletCard({
        id: cardId,
        cardName: `Copy of Card ${cardId}`
      }).unwrap();
      dispatch(showAlert({
        message: "Wallet card duplicated successfully!",
        severity: "success",
        duration: 2000
      }));
      cardsRefetch();
    } catch (error) {
      dispatch(showAlert({
        message: "Failed to duplicate wallet card!",
        severity: "error",
        duration: 2000
      }));
    }
  };

  const handleToggleStatus = async (cardId) => {
    try {
      await toggleWalletCardStatus(cardId).unwrap();
      dispatch(showAlert({
        message: "Card status updated successfully!",
        severity: "success",
        duration: 2000
      }));
      cardsRefetch();
    } catch (error) {
      dispatch(showAlert({
        message: "Failed to update card status!",
        severity: "error",
        duration: 2000
      }));
    }
  };

  const handleGeneratePass = (card) => {
    setGeneratePassCard(card);
    onPassModalOpen();
  };

  const handleAddCard = () => {
    setSelectedCard(null);
    setEditMode(false);
    onOpen();
  };

  const handleSaveCard = (savedCard) => {
    dispatch(showAlert({
      message: `Wallet card ${editMode ? 'updated' : 'created'} successfully!`,
      severity: "success",
      duration: 2000
    }));
    cardsRefetch();
    onClose();
  };

  const handleGeneratePassSubmit = async (customerId, customerLoyaltyId = null) => {
    try {
      const result = await generateWalletPass({
        cardId: generatePassCard.id,
        passData: {
          customerId,
          customerLoyaltyId,
          dynamicValues: {
            // Add any dynamic values here
          }
        }
      }).unwrap();

      dispatch(showAlert({
        message: "Wallet pass generated successfully!",
        severity: "success",
        duration: 2000
      }));
      onPassModalClose();

      // You can handle the pass download here
      console.log('Generated pass:', result);
    } catch (error) {
      dispatch(showAlert({
        message: "Failed to generate wallet pass!",
        severity: "error",
        duration: 2000
      }));
    }
  };

  if (cardsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress size={40} className="text-brandGreen" />
      </div>
    );
  }

  if (cardsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading wallet cards</p>
        <button
          onClick={cardsRefetch}
          className="mt-2 px-4 py-2 bg-brandGreen text-white rounded hover:bg-brandGreen/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaWallet className="text-brandGreen" />} subtitle="Manage Wallet Cards">
          <HeaderButton
            icon={MdAdd}
            text="Add Card"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddCard}
          />
        </HeadingCard>
      </div>

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <div className="text-center py-12">
          <FaWallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No wallet cards yet</h3>
          <p className="text-gray-500 mb-6">Create your first wallet card to get started</p>
          <HeaderButton
            icon={MdAdd}
            text="Create First Card"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddCard}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <WalletCardDisplay
              key={card.id}
              card={card}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onToggleStatus={handleToggleStatus}
              onGeneratePass={handleGeneratePass}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={editMode ? "Edit Wallet Card" : "Create Wallet Card"}
        size="4xl"
        noScroll={true}
      >
        <AppleWalletEditor
          isModal={true}
          editMode={editMode}
          cardId={selectedCard?.id}
          onSave={handleSaveCard}
          onCancel={onClose}
        />
      </CustomModal>

      {/* Generate Pass Modal */}
      <CustomModal
        isOpen={isPassModalOpen}
        onClose={onPassModalClose}
        title="Generate Wallet Pass"
        size="md"
      >
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">
            Generate pass for: {generatePassCard?.cardName}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer ID
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
                placeholder="Enter customer ID"
                id="customerId"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Loyalty ID (Optional)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
                placeholder="Enter loyalty ID (optional)"
                id="customerLoyaltyId"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onPassModalClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const customerId = document.getElementById('customerId').value;
                  const customerLoyaltyId = document.getElementById('customerLoyaltyId').value;
                  if (customerId) {
                    handleGeneratePassSubmit(
                      parseInt(customerId),
                      customerLoyaltyId ? parseInt(customerLoyaltyId) : null
                    );
                  }
                }}
                disabled={isGenerating}
                className="px-4 py-2 bg-brandGreen text-white rounded-md hover:bg-brandGreen/90 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Pass'}
              </button>
            </div>
          </div>
        </div>
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteItemId !== null}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleConfirmDelete}
        itemName={deleteItemId ? `Wallet Card ${deleteItemId}` : ""}
        title="Delete Wallet Card"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Dashboard;