import React, { useState } from 'react';
import { FiEdit3, FiTrash2, FiCopy, FiToggleLeft, FiToggleRight, FiDownload } from 'react-icons/fi';
import { BiQrScan } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

const WalletCardDisplay = ({
    card,
    onEdit,
    onDelete,
    onDuplicate,
    onToggleStatus,
    onGeneratePass
}) => {
    const [isHovered, setIsHovered] = useState(false);

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
        return type === 'point' ? '🏆' : '🛍️';
    };

    const getCardTypeBadge = (type) => {
        const config = {
            point: { label: 'Points Card', class: 'bg-blue-100 text-blue-800' },
            product: { label: 'Product Card', class: 'bg-green-100 text-green-800' }
        };
        return config[type] || config.point;
    };

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Preview */}
            <div className="relative p-6">
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCardTypeBadge(card.cardType).class}`}>
                        {getCardTypeBadge(card.cardType).label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${card.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {card.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>

                {/* Wallet Card Preview */}
                <div
                    className="rounded-lg p-4 text-white relative overflow-hidden mb-4 mt-8"
                    style={{
                        background: card.backgroundColor || '#1a1a1a',
                        minHeight: '180px'
                    }}
                >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-bold">{card.organizationName}</h3>
                            <p className="text-sm opacity-90">{card.logoText}</p>
                        </div>
                        <div className="text-2xl">{getCardTypeIcon(card.cardType)}</div>
                    </div>

                    {/* Primary Field */}
                    {primaryFields[0] && (
                        <div className="mb-3">
                            <p className="text-xs opacity-80">{primaryFields[0].label}</p>
                            <p className="text-xl font-bold">{primaryFields[0].value}</p>
                        </div>
                    )}

                    {/* Secondary Fields */}
                    {secondaryFields.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            {secondaryFields.slice(0, 2).map((field, index) => (
                                <div key={index}>
                                    <p className="text-xs opacity-80">{field.label}</p>
                                    <p className="text-sm font-semibold">{field.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Auxiliary Fields */}
                    {auxiliaryFields.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            {auxiliaryFields.slice(0, 2).map((field, index) => (
                                <div key={index}>
                                    <p className="opacity-80">{field.label}</p>
                                    <p className="font-semibold">{field.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Barcode indicator */}
                    {card.barcodeMessage && (
                        <div className="absolute bottom-2 right-2">
                            <BiQrScan className="w-6 h-6 opacity-60" />
                        </div>
                    )}
                </div>

                {/* Card Info */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{card.cardName}</h4>
                    {card.description && (
                        <p className="text-gray-600 text-sm">{card.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Pass ID: {card.passTypeIdentifier}</span>
                        {card.locations?.length > 0 && (
                            <span className="flex items-center gap-1">
                                <MdLocationOn className="w-4 h-4" />
                                {card.locations.length} location{card.locations.length > 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    <div className="text-xs text-gray-400">
                        Created: {new Date(card.createdAt).toLocaleDateString()}
                        {card.admin && (
                            <span className="ml-2">
                                by {card.admin.firstName} {card.admin.lastName}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={`border-t border-gray-200 p-4 transition-all duration-300 ${isHovered ? 'bg-gray-50' : 'bg-white'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
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

                    <button
                        onClick={() => onGeneratePass(card)}
                        className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        <FiDownload className="w-4 h-4" />
                        Generate Pass
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WalletCardDisplay;