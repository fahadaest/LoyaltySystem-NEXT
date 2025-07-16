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
import WalletCardEditor from 'components/wallet-cards/WalletCardEditor';
import WalletCardDisplay from 'components/wallet-cards/WalletCardDisplay';
import { MdCardGiftcard } from 'react-icons/md';
import { useCreateWalletCardMutation, useUpdateWalletCardMutation, useGetWalletCardsQuery, useDeleteWalletCardMutation, useDuplicateWalletCardMutation, useToggleWalletCardStatusMutation, useGenerateWalletPassMutation } from 'store/apiEndPoints/customWalletCard';
import colorOptions from 'utils/colors';
import { getImageUrl } from 'utils/imageUtils';

const Dashboard = () => {
  const { data: cardsResponse, error: cardsError, isLoading: cardsLoading, refetch: cardsRefetch } = useGetWalletCardsQuery();
  const [deleteWalletCard, { isLoading: isDeleting }] = useDeleteWalletCardMutation();
  const [duplicateWalletCard, { isLoading: isDuplicating }] = useDuplicateWalletCardMutation();
  const [toggleWalletCardStatus, { isLoading: isToggling }] = useToggleWalletCardStatusMutation();
  const [generateWalletPass, { isLoading: isGenerating }] = useGenerateWalletPassMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPassModalOpen, onOpen: onPassModalOpen, onClose: onPassModalClose } = useDisclosure();
  const dispatch = useDispatch();
  const [showModalBackButton, setShowModalBackButton] = useState(false);
  const [currentModalView, setCurrentModalView] = useState('selection');
  const [editMode, setEditMode] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [showFooterCancel, setShowFooterCancel] = useState(true);
  const [phoneType, setPhoneType] = useState('iphone');
  const [createWalletCard, { isLoading: isCreating }] = useCreateWalletCardMutation();
  const [updateWalletCard, { isLoading: isUpdating }] = useUpdateWalletCardMutation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [generatePassCard, setGeneratePassCard] = useState(null);
  const [cardData, setCardData] = useState({
    cardName: '',
    cardType: 'product',
    description: '',
    logoImage: null,
    backgroundImage: null,
    stampCollectedImg: null,
    noStampCollectedImg: null,
    rewardQuantity: 10,
    rewardsCount: 0,
    pointsSpendAmount: 100,
    pointsAmount: 100,
    pointsRewardAmount: 10,
    organizationName: 'Codehive',
    logoText: '',
    foregroundColor: '#FFFFFF',
    backgroundColor: '#36a18f',
    labelColor: '#FFFFFF',
    barcodeMessage: '',
    barcodeFormat: 'QR',
    productCardPrimaryFields: [{}],
    primaryFields: [{ key: 'STAMPS UNTIL REWARD', label: 'stamps_until_reward', value: '7' }],
    secondaryFields: [
      { key: 'member-since', label: 'Member Since', value: '2024' },
      { key: 'status', label: 'Status', value: 'Active' }
    ],
    auxiliaryFields: [
      { key: 'point', label: 'Points', value: '0' },
      { key: 'expires', label: 'Expires', value: 'Never' }
    ],
    isActive: true
  });

  const resetCardData = () => {
    setCardData({
      cardName: '',
      cardType: 'product',
      description: '',

      logoImage: null,
      backgroundImage: null,
      stampCollectedImg: null,
      noStampCollectedImg: null,

      logoImageUrl: '',
      backgroundImageUrl: '',
      stampCollectedImgUrl: '',
      noStampCollectedImgUrl: '',

      rewardQuantity: 10,
      rewardsCount: 0,
      pointsSpendAmount: 100,
      pointsAmount: 100,
      pointsRewardAmount: 10,
      organizationName: 'Codehive',
      logoText: '',
      foregroundColor: '#FFFFFF',
      backgroundColor: '#36a18f',
      labelColor: '#FFFFFF',
      barcodeMessage: '',
      barcodeFormat: 'QR',
      productCardPrimaryFields: [{}],
      primaryFields: [{ key: 'STAMPS UNTIL REWARD', label: 'stamps_until_reward', value: '7' }],
      secondaryFields: [
        { key: 'member-since', label: 'Member Since', value: '2024' },
        { key: 'status', label: 'Status', value: 'Active' }
      ],
      auxiliaryFields: [
        { key: 'point', label: 'Points', value: '0' },
        { key: 'expires', label: 'Expires', value: 'Never' }
      ],
      isActive: true
    });
  };

  const populateCardData = (card) => {
    setCardData({
      cardName: card.cardName || '',
      cardType: card.cardType || 'product',
      description: card.description || '',

      logoImage: null,
      backgroundImage: null,
      stampCollectedImg: null,
      noStampCollectedImg: null,

      rewardQuantity: card.rewardQuantity || 10,
      rewardsCount: card.rewardsCount || 0,
      pointsSpendAmount: card.pointsSpendAmount || 100,
      pointsAmount: card.pointsAmount || 100,
      pointsRewardAmount: card.pointsRewardAmount || 10,
      organizationName: card.organizationName || 'Codehive',
      logoText: card.logoText || '',
      foregroundColor: card.foregroundColor || '#FFFFFF',
      backgroundColor: card.backgroundColor || '#36a18f',
      labelColor: card.labelColor || '#FFFFFF',
      barcodeMessage: card.barcodeMessage || '',
      barcodeFormat: card.barcodeFormat || 'QR',
      productCardPrimaryFields: card.productCardPrimaryFields || [{}],
      primaryFields: card.primaryFields || [{ key: 'STAMPS UNTIL REWARD', label: 'stamps_until_reward', value: '7' }],
      secondaryFields: card.secondaryFields || [
        { key: 'member-since', label: 'Member Since', value: '2024' },
        { key: 'status', label: 'Status', value: 'Active' }
      ],
      auxiliaryFields: card.auxiliaryFields || [
        { key: 'point', label: 'Points', value: '0' },
        { key: 'expires', label: 'Expires', value: 'Never' }
      ],
      isActive: card.isActive !== undefined ? card.isActive : true,

      logoImageUrl: card.logoImageUrl || card.logoImage || null,
      backgroundImageUrl: card.backgroundImageUrl || card.backgroundImage || null,
      stampCollectedImgUrl: card.stampCollectedImgUrl || card.stampCollectedImg || null,
      noStampCollectedImgUrl: card.noStampCollectedImgUrl || card.noStampCollectedImg || null
    });
  };

  const createCard = async () => {
    try {
      const formData = new FormData();

      Object.keys(cardData).forEach(key => {
        if (!['logoImage', 'backgroundImage', 'stampCollectedImg', 'noStampCollectedImg', 'logoImageUrl', 'backgroundImageUrl', 'stampCollectedImgUrl', 'noStampCollectedImgUrl'].includes(key)) {
          const value = cardData[key];
          if (value !== null && value !== undefined && value !== '') {
            if (typeof value === 'object') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value);
            }
          }
        }
      });

      const isValidBlob = (value) => {
        return value instanceof File || value instanceof Blob;
      };

      if (cardData.logoImage && isValidBlob(cardData.logoImage)) {
        formData.append('logoImage', cardData.logoImage, 'logo.jpg');
      }

      if (cardData.backgroundImage && isValidBlob(cardData.backgroundImage)) {
        formData.append('backgroundImage', cardData.backgroundImage, 'background.jpg');
      }

      if (cardData.stampCollectedImg && isValidBlob(cardData.stampCollectedImg)) {
        formData.append('stampCollectedImg', cardData.stampCollectedImg, 'stampCollectedImg.jpg');
      }

      if (cardData.noStampCollectedImg && isValidBlob(cardData.noStampCollectedImg)) {
        formData.append('noStampCollectedImg', cardData.noStampCollectedImg, 'noStampCollectedImg.jpg');
      }

      let result;
      if (editMode && selectedCard?.id) {
        result = await updateWalletCard({ id: selectedCard.id, formData }).unwrap();
      } else {
        result = await createWalletCard(formData).unwrap();
      }

      handleSaveCard(result.data);
    } catch (error) {
      console.error('Error saving wallet card:', error);
      dispatch(showAlert({
        message: `Failed to ${editMode ? 'update' : 'create'} wallet card!`,
        severity: "error",
        duration: 2000
      }));
    }
  };

  const handleClickBack = () => {
    if (editMode) {
      onClose();
    } else {
      setCurrentModalView('selection');
    }
  };

  useEffect(() => {
    cardsRefetch();
  }, [cardsRefetch]);

  const cards = cardsResponse?.data?.cards || [];

  const handleEdit = (card) => {
    setSelectedCard(card);
    setEditMode(true);
    populateCardData(card); // Populate form with card data
    setCurrentModalView('editor');
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
    setCurrentModalView('selection');
    setSelectedCard(null);
    setEditMode(false);
    resetCardData(); // Reset form data for new card
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

  const handleModalClose = () => {
    setSelectedCard(null);
    setEditMode(false);
    resetCardData();
    onClose();
  };

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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

      <CustomModal
        showModalBackButton={showModalBackButton}
        handleClickBack={handleClickBack}
        headerTitle={editMode ? "Edit Wallet Card" : "Wallet Cards"}
        headerDescription={editMode ? "Edit your wallet card" : "Customize your wallet card"}
        showFooter={showFooter}
        size={currentModalView === 'selection' ? '1xl' : '4xl'}
        showFooterCancelButton={showFooterCancel}
        footerConfirmation={currentModalView === 'selection' ? null : createCard}
        footerConfirmButtonText={editMode ? 'Update Wallet Card' : 'Create Wallet Card'}
        footerConfirmButtonIcon={MdCardGiftcard}
        isOpen={isOpen}
        onClose={handleModalClose}
      >
        <WalletCardEditor
          setShowModalBackButton={setShowModalBackButton}
          currentModalView={currentModalView}
          setCurrentModalView={setCurrentModalView}
          cardData={cardData}
          setCardData={setCardData}
          colorOption={colorOptions}
          phoneType={phoneType}
          setPhoneType={setPhoneType}
          editMode={editMode}
          isModal={true}
          cardId={selectedCard?.id}
          onSave={handleSaveCard}
          onCancel={handleModalClose}
        />
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