import React, { useRef, useState, useEffect } from "react";
import { MdAdd, MdDriveFileRenameOutline, MdDescription, MdPhotoSizeSelectActual, MdCategory, MdInfo, MdImage, MdAttachMoney } from "react-icons/md";
import { Package, Edit3, Image as ImageIcon, DollarSign } from "lucide-react";
import Button from "components/button/Button";
import AnimatedInput from "components/ui/AnimatedInput";
import AnimatedSelect from "components/ui/AnimatedSelect";
import AnimatedPriceField from "components/ui/AnimatedPriceField";
import FormSection from "components/ui/FormSection";
import AnimatedButton from "components/ui/AnimatedButton";
import { AnimatedCard, AnimatedCardContent } from "components/ui/AnimatedCard";

const AddProductForm = ({
  productName,
  setProductName,
  description,
  setDescription,
  price,
  setPrice,
  currency,
  setCurrency,
  size,
  setSize,
  previewImage,
  onOpenImageSelector,
  sizeOptions,
  selectedProduct,
  isLoading,
  onSubmit,
  onClose
}) => {
  const canvasRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  console.log("previewImage", previewImage)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const validateField = (key, value) => {
    switch (key) {
      case 'productName':
        if (!value?.trim()) return 'Product name is required';
        if (value.trim().length < 2) return 'Product name must be at least 2 characters';
        return '';
      case 'description':
        if (!value?.trim()) return 'Product description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        return '';
      case 'price':
        if (!value?.trim()) return 'Price is required';
        const numPrice = parseFloat(value);
        if (isNaN(numPrice) || numPrice <= 0) return 'Price must be a positive number';
        if (numPrice > 999999.99) return 'Price cannot exceed $999,999.99';
        return '';
      case 'size':
        if (!value) return 'Please select a product size';
        return '';
      case 'image':
        if (!previewImage) return 'Product image is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (key, value, setter) => {
    setter(value);
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    if (errors.price) {
      setErrors(prev => ({ ...prev, price: '' }));
    }
  };

  const handleCurrencyChange = (currencyCode) => {
    setCurrency(currencyCode);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const fields = [
      { key: 'productName', value: productName },
      { key: 'description', value: description },
      { key: 'price', value: price },
      { key: 'size', value: size },
      { key: 'image', value: previewImage }
    ];

    fields.forEach(({ key, value }) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit();
    }
  };

  return (
    <div className={`max-w-4xl mx-auto transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
      <AnimatedCard>
        <AnimatedCardContent>
          <form onSubmit={handleSubmit} className="space-y-8 p-3">

            <FormSection
              title="Basic Information"
              icon={Edit3}
              delay={200}
              isVisible={isVisible}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AnimatedInput
                    label="Product Name"
                    icon={MdDriveFileRenameOutline}
                    value={productName}
                    onChange={(value) => handleInputChange('productName', value, setProductName)}
                    placeholder="Enter your product name"
                    error={errors.productName}
                    required
                  />

                  <AnimatedPriceField
                    label="Price"
                    icon={MdAttachMoney}
                    value={price}
                    currency={currency}
                    onPriceChange={handlePriceChange}
                    onCurrencyChange={handleCurrencyChange}
                    placeholder="0.00"
                    error={errors.price}
                    required
                  />

                  <AnimatedSelect
                    label="Product Size"
                    icon={MdPhotoSizeSelectActual}
                    value={size}
                    onChange={(value) => handleInputChange('size', value, setSize)}
                    options={sizeOptions}
                    placeholder="Select product size"
                    error={errors.size}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <MdDescription size={16} className="text-brandGreen" />
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Product Description
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      {description && (
                        <div className="flex items-center animate-fadeIn">
                          <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                          <span className="text-xs text-brandGreen font-medium">✓</span>
                        </div>
                      )}
                    </div>

                    <div className="relative group">
                      <textarea
                        value={description}
                        onChange={(e) => handleInputChange('description', e.target.value, setDescription)}
                        placeholder="Enter a detailed product description..."
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                        ${errors.description
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                          }
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white
                        min-h-[170px] resize-vertical`}
                      />

                      {errors.description && (
                        <div className="mt-2 flex items-center gap-1 text-red-500 text-sm">
                          <MdInfo size={14} />
                          {errors.description}
                        </div>
                      )}

                      <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    {/* Image Selection Area */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <MdImage size={16} className="text-brandGreen" />
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Product Image
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        {previewImage && (
                          <div className="flex items-center animate-fadeIn">
                            <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                            <span className="text-xs text-brandGreen font-medium">✓</span>
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        {previewImage ? (
                          <div className="relative group">
                            <img
                              src={previewImage}
                              alt="Product preview"
                              className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 object-cover"
                              style={{ maxHeight: 200, aspectRatio: 1.3 }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <button
                                type="button"
                                onClick={onOpenImageSelector}
                                className="bg-brandGreen hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                              >
                                <MdImage className="w-4 h-4" />
                                Change Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={onOpenImageSelector}
                            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-brandGreen dark:hover:border-brandGreen transition-colors"
                            style={{ minHeight: 200 }}
                          >
                            <MdImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Upload product image
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              Click to select image
                            </p>
                          </div>
                        )}

                        {errors.image && (
                          <div className="mt-2 flex items-center gap-1 text-red-500 text-sm">
                            <MdInfo size={14} />
                            {errors.image}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </FormSection>
          </form>
        </AnimatedCardContent>
      </AnimatedCard>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default AddProductForm;