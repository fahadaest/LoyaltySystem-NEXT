import React, { useState } from 'react';
import { ChevronLeft, Save, Eye } from 'lucide-react';
import WalletForm from './WalletForm';
import PhonePreview from './PhonePreview';
import { useCreateWalletCardMutation, useUpdateWalletCardMutation } from 'store/apiEndPoints/customWalletCard';

const EditorView = ({ isModal, onBack, cardData, handleFieldChange, gradientOptions, phoneType, setPhoneType, editMode = false, cardId = null, onSave }) => {
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
        <div className={`${isModal ? 'h-[70vh]' : 'min-h-screen'} bg-white flex`}>
            {/* Left Panel - Editor */}
            <div className={`${showPreview ? 'w-full' : 'w-2/3'} bg-white shadow-xl flex flex-col transition-all duration-300`}>
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