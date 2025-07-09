import React, { useState, useEffect } from 'react';
import { useGetWalletCardByIdQuery } from 'store/customWalletCard';
import SelectionView from './SelectionView';
import EditorView from './EditorView';

const AppleWalletEditor = ({
  isModal = false,
  editMode = false,
  cardId = null,
  onSave,
  onCancel
}) => {
  const [currentView, setCurrentView] = useState('selection');
  const [phoneType, setPhoneType] = useState('iphone');
  const [cardData, setCardData] = useState({
    cardName: '',
    cardType: 'point',
    organizationName: '',
    logoText: '',
    description: '',
    passTypeIdentifier: '',
    teamIdentifier: '',
    backgroundColor: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    foregroundColor: '#FFFFFF',
    labelColor: '#FFFFFF',
    barcodeMessage: '',
    barcodeFormat: 'QR',
    primaryFields: [{ key: 'balance', label: 'Balance', value: '$0.00' }],
    secondaryFields: [
      { key: 'member-since', label: 'Member Since', value: '2024' },
      { key: 'status', label: 'Status', value: 'Active' }
    ],
    auxiliaryFields: [
      { key: 'points', label: 'Points', value: '0' },
      { key: 'expires', label: 'Expires', value: 'Never' }
    ],
    isActive: true
  });

  // Fetch card data if in edit mode
  const { data: existingCard, isLoading } = useGetWalletCardByIdQuery(cardId, {
    skip: !editMode || !cardId
  });

  useEffect(() => {
    if (editMode && existingCard?.data) {
      setCardData(existingCard.data);
      setCurrentView('editor');
    }
  }, [editMode, existingCard]);

  const gradientOptions = [
    { name: 'Indigo', value: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' },
    { name: 'Blue', value: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' },
    { name: 'Purple', value: 'linear-gradient(135deg, #8B5CF6 0%, #7C2D12 100%)' },
    { name: 'Green', value: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
    { name: 'Red', value: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' },
    { name: 'Orange', value: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
    { name: 'Pink', value: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)' },
    { name: 'Teal', value: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)' },
    { name: 'Black', value: 'linear-gradient(135deg, #374151 0%, #111827 100%)' }
  ];

  const handleFieldChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateFromScratch = () => {
    setCurrentView('editor');
  };

  const handleBack = () => {
    if (editMode) {
      onCancel?.();
    } else {
      setCurrentView('selection');
    }
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

  if (currentView === 'selection' && !editMode) {
    return (
      <SelectionView
        isModal={isModal}
        onCreateFromScratch={handleCreateFromScratch}
      />
    );
  }

  return (
    <EditorView
      isModal={isModal}
      onBack={handleBack}
      cardData={cardData}
      handleFieldChange={handleFieldChange}
      gradientOptions={gradientOptions}
      phoneType={phoneType}
      setPhoneType={setPhoneType}
      editMode={editMode}
      cardId={cardId}
      onSave={handleSaveComplete}
    />
  );
};

export default AppleWalletEditor;