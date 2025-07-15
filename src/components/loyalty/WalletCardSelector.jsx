import React, { useState, useEffect } from 'react';
import { MdCreditCard, MdCheck, MdRefresh } from 'react-icons/md';
import { CreditCard, Loader2, AlertCircle } from 'lucide-react';
import WalletCard from 'components/wallet-cards/WalletCard';
import { useGetWalletCardsQuery } from 'store/apiEndPoints/customWalletCard';

const WalletCardSelector = ({
    selectedCardId,
    onCardSelect,
    isVisible = true
}) => {
    const {
        data: walletCardsData,
        isLoading,
        isError,
        refetch
    } = useGetWalletCardsQuery();

    const [selectedCard, setSelectedCard] = useState(null);

    // Update selected card when selectedCardId changes
    useEffect(() => {
        if (selectedCardId && walletCardsData?.data?.cards) {
            const card = walletCardsData.data.cards.find(c => c.id === selectedCardId);
            setSelectedCard(card);
        } else {
            setSelectedCard(null);
        }
    }, [selectedCardId, walletCardsData]);

    const handleCardSelect = (card) => {
        setSelectedCard(card);
        onCardSelect(card.id);
    };

    const handleClearSelection = () => {
        setSelectedCard(null);
        onCardSelect(null);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading wallet cards...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            <span>Failed to load wallet cards</span>
                        </div>
                        <button
                            onClick={refetch}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-md transition-colors"
                        >
                            <MdRefresh className="w-4 h-4" />
                            <span>Retry</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const cards = walletCardsData?.data?.cards || [];

    // Empty state
    if (cards.length === 0) {
        return (
            <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <CreditCard className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No Wallet Cards Available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Create a wallet card first before setting up loyalty campaigns.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-full space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MdCreditCard className="w-5 h-5 text-brandGreen" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Select Wallet Card
                        </h3>
                    </div>
                    {selectedCard && (
                        <button
                            onClick={handleClearSelection}
                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            Clear Selection
                        </button>
                    )}
                </div>

                {/* Selected Card Preview */}
                {selectedCard && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                            <MdCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                Selected Card
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {selectedCard.cardName}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {selectedCard.organizationName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Type: {selectedCard.cardType} • ID: {selectedCard.id}
                                </p>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <div className="scale-75 origin-center">
                                    <WalletCard
                                        cardData={{
                                            ...selectedCard,
                                            logoImageUrl: selectedCard.logoImage,
                                            backgroundImageUrl: selectedCard.backgroundImage,
                                        }}
                                        platform="ios"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Available Cards ({cards.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-1">
                        {cards.map((card) => {
                            const isSelected = selectedCard?.id === card.id;

                            return (
                                <div
                                    key={card.id}
                                    className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${isSelected
                                        ? 'ring-2 ring-brandGreen ring-offset-2 dark:ring-offset-gray-800'
                                        : 'hover:shadow-lg'
                                        }`}
                                    onClick={() => handleCardSelect(card)}
                                >
                                    {/* Selection indicator */}
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-brandGreen rounded-full flex items-center justify-center shadow-lg">
                                            <MdCheck className="w-4 h-4 text-white" />
                                        </div>
                                    )}

                                    {/* Card preview */}
                                    <div className="relative">
                                        <div className="scale-90 origin-center pointer-events-none">
                                            <WalletCard
                                                cardData={{
                                                    ...card,
                                                    logoImageUrl: card.logoImage,
                                                    backgroundImageUrl: card.backgroundImage,
                                                }}
                                                platform="ios"
                                            />
                                        </div>

                                        {/* Overlay with card info */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b-xl">
                                            <p className="text-xs font-medium truncate">
                                                {card.cardName}
                                            </p>
                                            <p className="text-xs opacity-80 truncate">
                                                {card.organizationName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Info footer */}
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>
                            Select a wallet card to associate with this loyalty campaign.
                            The selected card will be used for customer enrollment and rewards tracking.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WalletCardSelector;