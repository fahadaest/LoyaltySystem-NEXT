import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Upload, Plus, Check } from 'lucide-react';
import Button from '@/components/buttons/Button';

const AddProductComponent = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        productName: '',
        productPrice: '0.00',
        currency: 'AED',
        productDescription: '',
        productImage: null,
        selectedSizes: ['Small'], // Default selection
        customSize: ''
    });

    const [showSizeDropdown, setShowSizeDropdown] = useState(false);
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
    const [showAddNewSize, setShowAddNewSize] = useState(false);

    const availableSizes = ['Small', 'Medium', 'Large'];
    const currencies = ['AED', 'USD', 'EUR', 'GBP'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSizeToggle = (size) => {
        setFormData(prev => ({
            ...prev,
            selectedSizes: prev.selectedSizes.includes(size)
                ? prev.selectedSizes.filter(s => s !== size)
                : [...prev.selectedSizes, size]
        }));
    };

    const handleAddNewSize = () => {
        if (formData.customSize.trim() && !availableSizes.includes(formData.customSize)) {
            setFormData(prev => ({
                ...prev,
                selectedSizes: [...prev.selectedSizes, prev.customSize],
                customSize: ''
            }));
            setShowAddNewSize(false);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, productImage: file }));
        }
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <div className="">
            {/* Form Content */}
            <div className="bg-gray-50 rounded-[25px] border border-gray-200 p-4 h-[320px] relative">
                {/* Top Row - Product Name, Price, Size */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Product Name */}
                    <div>
                        <label className="block text-xs font-bold text-black mb-1">
                            Product Name*
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your product name"
                            value={formData.productName}
                            onChange={(e) => handleInputChange('productName', e.target.value)}
                            className="w-full h-7 px-3 bg-white border border-gray-200 rounded-full text-xs placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="block text-xs font-medium text-black mb-1">
                            Product Price*
                        </label>
                        <div className="relative">
                            <div className="flex h-7 bg-white border border-gray-200 rounded-full overflow-hidden">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                                        className="h-7 px-3 bg-gray-200 flex items-center gap-1 text-xs font-medium text-black"
                                    >
                                        {formData.currency}
                                        <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                                            <ChevronDown className="w-1.5 h-1.5 text-white" />
                                        </div>
                                    </button>
                                    {showCurrencyDropdown && (
                                        <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            {currencies.map((curr) => (
                                                <button
                                                    key={curr}
                                                    onClick={() => {
                                                        handleInputChange('currency', curr);
                                                        setShowCurrencyDropdown(false);
                                                    }}
                                                    className="block w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50"
                                                >
                                                    {curr}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={formData.productPrice}
                                    onChange={(e) => handleInputChange('productPrice', e.target.value)}
                                    className="flex-1 px-3 text-xs text-gray-500 bg-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Size */}
                    <div>
                        <label className="block text-xs font-medium text-black mb-1">
                            Product Size*
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                                className="w-full h-7 px-3 bg-gray-200 border border-gray-200 rounded-full flex items-center justify-between text-xs text-black"
                            >
                                Select your product size
                                <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                                    <ChevronUp className="w-1.5 h-1.5 text-white" />
                                </div>
                            </button>

                            {showSizeDropdown && (
                                <div className="absolute top-8 left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-20">
                                    {availableSizes.map((size, index) => (
                                        <div key={size}>
                                            <div className="flex items-center justify-between px-3 py-2">
                                                <span className="text-xs text-black">{size}</span>
                                                <div
                                                    onClick={() => handleSizeToggle(size)}
                                                    className={`w-2.5 h-2.5 rounded cursor-pointer ${formData.selectedSizes.includes(size)
                                                        ? 'bg-black flex items-center justify-center'
                                                        : 'bg-gray-200'
                                                        }`}
                                                >
                                                    {formData.selectedSizes.includes(size) && (
                                                        <Check className="w-1.5 h-1.5 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                            {index < availableSizes.length - 1 && (
                                                <div className="h-px bg-gray-200"></div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="h-px bg-gray-200"></div>

                                    <div className="p-3">
                                        {showAddNewSize ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter new size"
                                                    value={formData.customSize}
                                                    onChange={(e) => handleInputChange('customSize', e.target.value)}
                                                    className="flex-1 h-6 px-2 border border-gray-200 rounded text-xs"
                                                />
                                                <button
                                                    onClick={handleAddNewSize}
                                                    className="h-6 px-2 bg-black text-white rounded text-xs"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        ) : (
                                            <Button
                                                text="Add New Size"
                                                onClick={() => setShowAddNewSize(true)}
                                                backgroundColor="#000000"
                                                textColor="#FFFFFF"
                                                showIcon={true}
                                                iconPosition="right"
                                                icon={<Plus className="w-1.5 h-1.5" />}
                                                className="h-6 text-xs"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Description and Image */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Product Description */}
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-black mb-1">
                            Product Description*
                        </label>
                        <textarea
                            placeholder="Enter a detailed product description"
                            value={formData.productDescription}
                            onChange={(e) => handleInputChange('productDescription', e.target.value)}
                            className="w-full h-[180px] p-3 bg-white border border-gray-200 rounded-[15px] text-xs placeholder-gray-500 resize-none focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Product Image */}
                    <div className="col-span-1">
                        <label className="block text-xs font-medium text-black mb-1">
                            Product Image*
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="w-full h-[180px] border-2 border-dashed border-gray-200 rounded-[15px] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
                            >
                                <Upload className="w-14 h-14 text-gray-400 mb-2" />
                                <span className="text-xs text-gray-500 text-center">
                                    Click to Upload product image
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductComponent;