import React, { useState, useEffect } from 'react';
import { useGetWalletCardByIdQuery } from 'store/apiEndPoints/customWalletCard';
import SelectionView from './SelectionView';
import EditorView from './EditorView';

const WalletCardEditor = ({ phoneType, setPhoneType, colorOption, cardData, setCardData, setShowModalBackButton, currentModalView, setCurrentModalView, setShowFooter, isModal = false, editMode = false, cardId = null, onSave, onCancel }) => {

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

  const handleCreateFromScratch = () => {
    setCurrentModalView('editor');
  };







  const { data: existingCard, isLoading } = useGetWalletCardByIdQuery(cardId, {
    skip: !editMode || !cardId
  });


  const handleFieldChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };







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
      phoneType={phoneType}
      setPhoneType={setPhoneType}
      cardData={cardData}
      setCardData={setCardData}





      isModal={isModal}
      onBack={handleBack}
      // handleFieldChange={handleFieldChange}
      editMode={editMode}
      cardId={cardId}
    // onSave={handleSaveComplete}
    />
  );
};

export default WalletCardEditor;