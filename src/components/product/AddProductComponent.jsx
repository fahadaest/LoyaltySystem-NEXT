import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Upload, Plus, Check, Trash2 } from 'lucide-react';
import Button from '@/components/buttons/Button';
import InputField from '../input-fields/InputField';
import PriceField from '../input-fields/PriceField';
import { useGetAllProductSizesQuery, useCreateProductSizeMutation } from '@/store/slices/productSizesApis';
import { getImageUrl } from '@/utils/imageUtils';

const AddProductComponent = ({
    onSubmit,
    setSizeToDelete,
    setSizeIdToDelete,
    setShowDeleteModal,
    editMode = false,
    initialData = null
}) => {
    const [formData, setFormData] = useState({
        productName: initialData?.name || '',
        productPrice: initialData?.price || '0.00',
        productDescription: initialData?.description || '',
        productImage: null,
        existingImageUrl: initialData?.image || null,
        selectedSize: initialData?.size || '',
        customSize: ''
    });

    const [showSizeDropdown, setShowSizeDropdown] = useState(false);
    const [showAddNewSize, setShowAddNewSize] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const { data: apiSizes = [], isLoading: sizesLoading } = useGetAllProductSizesQuery();
    const [createSize, { isLoading: isCreatingSize }] = useCreateProductSizeMutation();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSizeSelect = (size) => {
        setFormData(prev => ({ ...prev, selectedSize: size }));
        setShowSizeDropdown(false);
    };

    const handleDeleteSize = (size) => {
        const sizeObject = apiSizes.find(s => (s.size || s.name || s) === size);
        const sizeId = sizeObject?.id || sizeObject?._id;
        setSizeToDelete(size);
        setSizeIdToDelete(sizeId);
        setShowDeleteModal(true);
    };

    const handleAddNewSize = async () => {
        if (formData.customSize.trim()) {
            try {
                await createSize({ size: formData.customSize }).unwrap();
                setFormData(prev => ({
                    ...prev,
                    selectedSize: prev.customSize,
                    customSize: ''
                }));
                setShowAddNewSize(false);
                setShowSizeDropdown(false);
            } catch (error) {
                console.error("Failed to create size:", error);
            }
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
            const selectedSizeObject = apiSizes.find(s => (s.size || s.name || s) === formData.selectedSize);
            const payload = {
                name: formData.productName,
                description: formData.productDescription,
                sizeId: selectedSizeObject?.id || selectedSizeObject?._id,
                image: formData.productImage
            };
            onSubmit(payload);
        }
    };

    const availableSizes = apiSizes.map(size => size.size || size.name || size);

    const checkScrollPosition = (container) => {
        if (!container) return;
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 3;
        setCanScrollDown(!isAtBottom);
    };

    const handleScroll = (e) => checkScrollPosition(e.target);

    useEffect(() => {
        if (showSizeDropdown && !sizesLoading) {
            setTimeout(() => {
                const scrollContainer = document.querySelector('.sizes-scroll-container');
                checkScrollPosition(scrollContainer);
            }, 100);
        }
    }, [showSizeDropdown, sizesLoading, availableSizes]);

    useEffect(() => {
        if (editMode && initialData) {
            setFormData({
                productName: initialData.name || '',
                productPrice: initialData.price || '0.00',
                productDescription: initialData.description || '',
                productImage: null,
                existingImageUrl: initialData.image || null,
                selectedSize: initialData.size || '',
                customSize: ''
            });
        }
    }, [editMode, initialData]);

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="bg-[#F5F5F5] rounded-[25px] border border-gray-200 p-4 h-[320px] relative">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <InputField
                                label="Product Name"
                                name="productName"
                                type="text"
                                placeholder="Enter your product name"
                                value={formData.productName}
                                onChange={(e) => handleInputChange('productName', e.target.value)}
                                required={true}
                                labelSize="0.65rem"
                                placeholderSize="0.75rem"
                                fieldHeight="0.4rem"
                            />
                        </div>

                        <div>
                            <PriceField
                                label="Product Price"
                                name="productPrice"
                                value={formData.productPrice}
                                onChange={(e) => handleInputChange('productPrice', e.target.value)}
                                placeholder="0.00"
                                required={true}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-black mb-1">Product Size*</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                                    className="w-full h-7 px-3 bg-gray-200 border border-gray-200 rounded-full flex items-center justify-between text-xs text-black"
                                >
                                    {sizesLoading ? "Loading sizes..." : (formData.selectedSize || "Select your product size")}
                                    <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                                        <ChevronUp className="w-1.5 h-1.5 text-white" />
                                    </div>
                                </button>

                                {showSizeDropdown && !sizesLoading && (
                                    <div className="absolute top-8 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 flex flex-col max-h-48">
                                        <div className="relative">
                                            <div className="max-h-32 overflow-y-auto sizes-scroll-container flex-shrink-0" onScroll={handleScroll}>
                                                {availableSizes.map((size, index) => (
                                                    <div key={size}>
                                                        <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between group">
                                                            <span className="text-xs text-black flex-1" onClick={() => handleSizeSelect(size)}>
                                                                {size}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteSize(size);
                                                                }}
                                                                className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        {index < availableSizes.length - 1 && <div className="h-px bg-gray-200"></div>}
                                                    </div>
                                                ))}
                                            </div>

                                            {canScrollDown && (
                                                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const container = document.querySelector('.sizes-scroll-container');
                                                            if (container) {
                                                                container.scrollBy({ top: 80, behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center pointer-events-auto"
                                                    >
                                                        <ChevronDown className="w-2 h-2 text-gray-600" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-200 flex-shrink-0">
                                            <div className="p-2">
                                                {showAddNewSize ? (
                                                    <div className="flex gap-2 items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowAddNewSize(false)}
                                                            className="h-6 w-6 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center flex-shrink-0"
                                                        >
                                                            <X className="w-3 h-3 text-gray-600" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter new size"
                                                            value={formData.customSize}
                                                            onChange={(e) => handleInputChange('customSize', e.target.value)}
                                                            className="flex-1 min-w-0 h-6 px-2 border border-gray-200 rounded text-xs"
                                                            disabled={isCreatingSize}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleAddNewSize}
                                                            disabled={isCreatingSize}
                                                            className="h-6 px-2 bg-black text-white rounded text-xs disabled:opacity-50"
                                                        >
                                                            {isCreatingSize ? "..." : "Add"}
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
                                                        icon="/img/general/plus_black.svg"
                                                        className="h-6 text-xs w-full"
                                                        height='25px'
                                                        fontSize='9px'
                                                        padding='0px 8px 0px 12px'
                                                        iconWidth='16px'
                                                        iconHeight='16px'
                                                        iconImageWidth='10px'
                                                        iconImageHeight='10px'
                                                        borderRadius='4px'
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-black mb-1">Product Description*</label>
                            <textarea
                                placeholder="Enter a detailed product description"
                                value={formData.productDescription}
                                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                                className="w-full h-[180px] p-3 bg-white border border-gray-200 rounded-[15px] text-xs placeholder-gray-500 resize-none focus:outline-none focus:border-gray-400"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-black mb-1">Product Image*</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="image-upload"
                                    required={!editMode}
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="w-full h-[180px] border-2 border-dashed border-gray-200 rounded-[15px] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
                                >
                                    {formData.productImage ? (
                                        <div className="text-center">
                                            <Check className="w-14 h-14 text-green-500 mb-2 mx-auto" />
                                            <span className="text-xs text-gray-700">{formData.productImage.name}</span>
                                        </div>
                                    ) : formData.existingImageUrl ? (
                                        <div className="text-center w-full h-full relative">
                                            <img
                                                src={getImageUrl(formData.existingImageUrl)}
                                                alt="Product"
                                                className="w-full h-full object-cover rounded-[15px]"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 rounded-[15px] flex items-center justify-center">
                                                <span className="text-white text-xs opacity-0 hover:opacity-100">Click to change image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-14 h-14 text-gray-400 mb-2" />
                                            <span className="text-xs text-gray-500 text-center">Click to Upload product image</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProductComponent;