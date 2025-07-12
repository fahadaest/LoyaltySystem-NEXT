import React, { useState } from 'react';
import WalletForm from './WalletForm';
import PhonePreview from './PhonePreview';

const EditorView = ({ isModal, onBack, cardData, handleFieldChange, colorOption, phoneType, setPhoneType, editMode = false, cardId = null, onSave }) => {

    return (
        <div className={`${isModal ? 'h-[70vh]' : 'min-h-screen'} bg-white flex`}>

            {/* Left Panel - Editor */}
            <div className={`w-full bg-white shadow-xl flex flex-col transition-all duration-300`}>
                <div className="flex-1 overflow-y-auto p-6">
                    <WalletForm
                        cardData={cardData}
                        handleFieldChange={handleFieldChange}
                        colorOption={colorOption}
                    />
                </div>
            </div>

            {/* Right Panel - Phone Preview */}
            <PhonePreview
                phoneType={phoneType}
                setPhoneType={setPhoneType}
                cardData={cardData}
            />
        </div>
    );
};

export default EditorView;