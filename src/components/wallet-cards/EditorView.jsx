import React, { useState } from 'react';
import WalletForm from './WalletForm';
import PhonePreview from './PhonePreview';

const EditorView = ({ isModal, cardData, setCardData, handleFieldChange, colorOption, phoneType, setPhoneType, }) => {

    return (
        <div className={`${isModal ? 'h-[70vh]' : 'min-h-screen'} bg-white flex`}>

            <div className={`w-full bg-white shadow-xl flex flex-col transition-all duration-300`}>
                <div className="flex-1 overflow-y-auto p-6">
                    <WalletForm
                        cardData={cardData}
                        setCardData={setCardData}
                        colorOption={colorOption}
                    />
                </div>
            </div>

            <PhonePreview
                phoneType={phoneType}
                setPhoneType={setPhoneType}
                cardData={cardData}
            />
        </div>
    );
};

export default EditorView;