import React, { useState, useEffect } from 'react';
import { MdCreditCard, MdCheck, MdRefresh } from 'react-icons/md';
import { CreditCard, Loader2, AlertCircle } from 'lucide-react';
import WalletCard from 'components/wallet-cards/WalletCard';
import { useGetWalletCardsQuery } from 'store/apiEndPoints/customWalletCard';
import { AnimatedCard, AnimatedCardContent } from "components/ui/AnimatedCard";
import FormSection from 'components/ui/FormSection';

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

    const cards = walletCardsData?.data?.cards || [];

    return (
        <div>
            <AnimatedCard>
                <AnimatedCardContent>
                    <div className="space-y-8 px-2">
                        <FormSection
                            icon={MdCreditCard}
                            delay={100}
                            isVisible={true}
                        >
                            <div className="space-y-4">

                                {/* Cards Grid */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Available Cards ({cards.length})
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 overflow-y-auto p-1">
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
                                                    <div className="relative border">
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
                        </FormSection>
                    </div>
                </AnimatedCardContent>
            </AnimatedCard>
        </div>
    );
};

export default WalletCardSelector;