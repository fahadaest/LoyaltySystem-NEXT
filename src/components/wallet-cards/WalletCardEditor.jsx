import React, { useState, useEffect } from 'react';
import { useGetWalletCardByIdQuery } from 'store/apiEndPoints/customWalletCard';
import SelectionView from './SelectionView';
import EditorView from './EditorView';

const WalletCardEditor = ({ colorOption, cardData, setCardData, setShowModalBackButton, currentModalView, setCurrentModalView, setShowFooter, isModal = false, editMode = false, cardId = null, onSave, onCancel }) => {

  console.log(currentModalView)

  useEffect(() => {
    if (setShowModalBackButton) {
      setShowModalBackButton(currentModalView === 'editor');
    }
  }, [currentModalView]);


  const handleBack = () => {
    if (editMode) {
      onCancel?.();
    } else {
      setCurrentModalView('selection');
    }
  };










  const [phoneType, setPhoneType] = useState('iphone');

  // Fetch card data if in edit mode
  const { data: existingCard, isLoading } = useGetWalletCardByIdQuery(cardId, {
    skip: !editMode || !cardId
  });

  useEffect(() => {
    if (editMode && existingCard?.data) {
      setCardData(existingCard.data);
      setCurrentModalView('editor');
    }
  }, [editMode, existingCard]);

  const handleFieldChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateFromScratch = () => {
    setCurrentModalView('editor');
  };



  const handleSaveComplete = (savedCard) => {
    onSave?.(savedCard);
  };

  if (isLoading) {
    return (
      <div className={`${isModal ? 'h-[80vh]' : 'min-h-screen'} bg-gray-50 flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandGreen mx-auto mb-4"></div>
          <p className="text-gray-600">Loading card data...</p>
        </div>
      </div>
    );
  }

  if (currentModalView === 'selection' && !editMode) {
    return (
      <SelectionView
        setShowModalBackButton={setShowModalBackButton}




        isModal={isModal}
        onCreateFromScratch={handleCreateFromScratch}
      />
    );
  }

  return (
    <EditorView
      setShowModalBackButton={setShowModalBackButton}
      colorOption={colorOption}



      setShowFooter={setShowFooter}
      isModal={isModal}
      onBack={handleBack}
      cardData={cardData}
      handleFieldChange={handleFieldChange}

      phoneType={phoneType}
      setPhoneType={setPhoneType}
      editMode={editMode}
      cardId={cardId}
      onSave={handleSaveComplete}
    />
  );
};

export default WalletCardEditor;