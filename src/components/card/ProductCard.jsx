import React, { useState } from "react";
import Card from "components/card";
import { IoCreateOutline, IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import AnimatedButton from "components/ui/AnimatedButton";
import { getImageUrl } from "utils/imageUtils";

const ProductCard = ({ title, price, image, size, product, onEdit, onDelete, extra }) => {
    const [isHovered, setIsHovered] = useState(false);
    const fullImageUrl = getImageUrl(image);

    // Currency mapping for proper symbols
    const currencySymbols = {
        'AED': 'AED',
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'SAR': 'ر.س',
        'QAR': 'ر.ق',
        'KWD': 'د.ك',
        'BHD': 'د.ب',
        'OMR': 'ر.ع.',
        'JPY': '¥',
        'CAD': 'C$',
        'AUD': 'A$',
        'CHF': 'CHF',
        'CNY': '¥',
        'INR': '₹',
    };

    // Format price with currency
    const formatPrice = () => {
        if (!price || price === 0) return 'Price not set';

        const currency = product?.currency || 'AED';
        const symbol = currencySymbols[currency] || currency;
        const numericPrice = parseFloat(price);

        if (isNaN(numericPrice)) return 'Invalid price';

        const formattedPrice = numericPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return `${symbol} ${formattedPrice}`;
    };

    // Check if product has special tags
    const isOrganic = product?.tags?.includes('organic') || product?.category?.toLowerCase().includes('organic');
    const isBestseller = product?.tags?.includes('bestseller') || product?.isBestseller;

    return (
        <Card
            extra={`!p-0 bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden rounded-md flex flex-col group ${extra}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image Container */}
            <div className="relative aspect-[4/3] bg-brandGreen/20 overflow-hidden">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {isBestseller && (
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                            ⭐ BESTSELLER
                        </div>
                    )}
                    {isOrganic && (
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                            🌿 ORGANIC
                        </div>
                    )}
                </div>

                {/* Product Image */}
                <div className="w-full h-full">
                    <img
                        src={fullImageUrl}
                        alt={title}
                        className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 rotate-2' : 'scale-100'
                            }`}
                    />
                </div>

                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <button onClick={onEdit} className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-white transition-all duration-200 flex items-center gap-2 shadow-lg">
                        <IoCreateOutline className="w-4 h-4" />
                        Edit Product
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="p-5 space-y-4 flex-1 flex flex-col">
                {/* Title */}
                <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2" title={title}>
                        {title}
                    </h3>
                </div>

                {/* Size and Category */}
                <div className="flex items-center justify-between">
                    {price && price > 0 ? (
                        <div className="flex items-baseline gap-2">
                            <span className="text-1xl font-bold text-gray-900">{formatPrice()}</span>
                            {product?.originalPrice && product.originalPrice > price && (
                                <>
                                    <span className="text-sm text-gray-500 line-through">
                                        {currencySymbols[product?.currency || 'AED']} {parseFloat(product.originalPrice).toFixed(2)}
                                    </span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                                        Save {Math.round(((product.originalPrice - price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">Price not set</span>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <span className="text-sm font-medium text-gray-700 capitalize">{size}</span>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-200"></div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <div className="flex-1">
                        <AnimatedButton
                            variant="primary"
                            size="md"
                            icon={IoCreateOutline}
                            onClick={onEdit}
                            className="w-full"
                        >
                            Edit Product
                        </AnimatedButton>
                    </div>
                    <AnimatedButton
                        variant="warning"
                        size="md"
                        icon={IoTrashOutline}
                        onClick={() => onDelete(product.id)}
                        className="px-3"
                    >
                    </AnimatedButton>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;