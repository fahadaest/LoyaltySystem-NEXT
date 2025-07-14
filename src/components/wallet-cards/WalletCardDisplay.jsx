import React, { useState } from 'react';
import { FiEdit3, FiTrash2, FiCopy, FiToggleLeft, FiToggleRight, FiDownload } from 'react-icons/fi';
import { BiQrScan } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import WalletCard from './WalletCard'; // Import the WalletCard component
import PhonePlatformToggle from './PhonePlatformToggle'; // Import the new toggle component

const WalletCardDisplay = ({
    card,
    onEdit,
    onDelete,
    onDuplicate,
    onToggleStatus,
    onGeneratePass
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [platform, setPlatform] = useState('iphone'); // 'iphone' or 'android'

    // Parse JSON fields safely
    const parseField = (field) => {
        if (typeof field === 'string') {
            try {
                return JSON.parse(field);
            } catch {
                return [];
            }
        }
        return field || [];
    };

    const primaryFields = parseField(card.primaryFields);
    const secondaryFields = parseField(card.secondaryFields);
    const auxiliaryFields = parseField(card.auxiliaryFields);

    const getCardTypeIcon = (type) => {
        return type === 'points' ? '🏆' : '🎫';
    };

    const getCardTypeBadge = (type) => {
        const config = {
            points: { label: 'Points Card', class: 'bg-blue-100 text-blue-800' },
            product: { label: 'Product Card', class: 'bg-green-100 text-green-800' }
        };
        return config[type] || config.points;
    };

    // Transform card data to match WalletCard component expectations
    const transformCardData = (card) => {
        return {
            ...card,
            // Ensure primary fields are properly formatted
            primaryFields: primaryFields,
            secondaryFields: secondaryFields,
            auxiliaryFields: auxiliaryFields,

            // Map database fields to component expected fields
            rewardQuantity: card.rewardQuantity || 10,
            collectedStamps: card.collectedStamps || 3,
            currentStamps: card.currentStamps || 3,

            // Points related fields
            pointsAmount: card.pointsAmount || '100 points',
            pointsSpendAmount: card.spendAmount || '100',
            pointsReward: card.earnPoints || '100',
            pointsRewardAmount: card.pointsRewardAmount || '10',

            // Stamps related fields
            stampsCount: card.stampsCount,
            rewardsCount: card.rewardsCount || '0',

            // Image fields
            logoImageUrl: card.logoImageUrl || card.logoImage,
            backgroundImageUrl: card.backgroundImageUrl || card.backgroundImage,
            stampCollectedImgUrl: card.stampCollectedImgUrl || card.stampCollectedImg,
            noStampCollectedImgUrl: card.noStampCollectedImgUrl || card.noStampCollectedImg,
        };
    };

    const transformedCardData = transformCardData(card);

    return (
        <div
            className="inline-block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header with Title and Status */}
            <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{card.cardName}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCardTypeBadge(card.cardType).class}`}>
                            {getCardTypeBadge(card.cardType).label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${card.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {card.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Card Preview Section */}
            <div className="p-2">
                {/* Wallet Card Preview - Using actual WalletCard component */}
                <div className="flex justify-center">
                    <WalletCard
                        cardData={transformedCardData}
                        platform={platform === 'iphone' ? 'ios' : 'android'}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className={`border-t border-gray-200 px-4 py-3 transition-all duration-300 ${isHovered ? 'bg-gray-50' : 'bg-white'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onEdit(card)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Card"
                        >
                            <FiEdit3 className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => onDuplicate(card.id)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Duplicate Card"
                        >
                            <FiCopy className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => onToggleStatus(card.id)}
                            className={`p-2 rounded-lg transition-colors ${card.isActive
                                ? 'text-green-600 hover:text-orange-600 hover:bg-orange-50'
                                : 'text-orange-600 hover:text-green-600 hover:bg-green-50'
                                }`}
                            title={card.isActive ? 'Deactivate' : 'Activate'}
                        >
                            {card.isActive ? <FiToggleRight className="w-4 h-4" /> : <FiToggleLeft className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={() => onDelete(card.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Card"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <PhonePlatformToggle
                        phoneType={platform}
                        setPhoneType={setPlatform}
                        size="small"
                        variant="horizontal"
                    />
                </div>
            </div>
        </div>
    );
};

export default WalletCardDisplay;