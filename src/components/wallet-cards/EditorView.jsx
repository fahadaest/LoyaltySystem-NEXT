import React, { useState } from 'react';
import { ChevronLeft, Save, Eye } from 'lucide-react';
import WalletForm from './WalletForm';
import PhonePreview from './PhonePreview';
import { useCreateWalletCardMutation, useUpdateWalletCardMutation } from 'store/apiEndPoints/customWalletCard';

const EditorView = ({
    isModal,
    onBack,
    cardData,
    handleFieldChange,
    gradientOptions,
    phoneType,
    setPhoneType,
    editMode = false,
    cardId = null,
    onSave
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [createWalletCard, { isLoading: isCreating }] = useCreateWalletCardMutation();
    const [updateWalletCard, { isLoading: isUpdating }] = useUpdateWalletCardMutation();

    const handleSave = async () => {
        try {
            const formData = new FormData();

            // Basic fields
            Object.keys(cardData).forEach(key => {
                if (cardData[key] !== null && cardData[key] !== undefined) {
                    if (typeof cardData[key] === 'object') {
                        formData.append(key, JSON.stringify(cardData[key]));
                    } else {
                        formData.append(key, cardData[key]);
                    }
                }
            });

            let result;
            if (editMode && cardId) {
                result = await updateWalletCard({ id: cardId, formData }).unwrap();
            } else {
                result = await createWalletCard(formData).unwrap();
            }

            if (onSave) {
                onSave(result.data);
            }
        } catch (error) {
            console.error('Error saving wallet card:', error);
        }
    };

    return (
        <div className={`${isModal ? 'h-[80vh]' : 'min-h-screen'} bg-gray-50 flex`}>
            {/* Left Panel - Editor */}
            <div className={`${showPreview ? 'w-full' : 'w-2/3'} bg-white shadow-xl flex flex-col transition-all duration-300`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <button
                                onClick={onBack}
                                className="flex items-center text-gray-600 hover:text-brandGreen transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Back
                            </button>
                            <div className="w-px h-8 bg-gray-300" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editMode ? 'Edit' : 'Create'} Wallet Card
                                </h2>
                                <p className="text-gray-600">Customize your wallet card</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-4 py-2 text-gray-600 hover:text-brandGreen transition-colors flex items-center"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                {showPreview ? 'Hide' : 'Show'} Preview
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isCreating || isUpdating}
                                className="px-6 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50 flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isCreating || isUpdating ? 'Saving...' : 'Save Card'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <WalletForm
                        cardData={cardData}
                        handleFieldChange={handleFieldChange}
                        gradientOptions={gradientOptions}
                    />
                </div>
            </div>

            {/* Right Panel - Phone Preview */}
            {!showPreview && (
                <PhonePreview
                    phoneType={phoneType}
                    setPhoneType={setPhoneType}
                    cardData={cardData}
                />
            )}
        </div>
    );
};

export default EditorView;