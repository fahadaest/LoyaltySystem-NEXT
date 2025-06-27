import React from 'react';
import InputField from 'components/fields/InputField';
import InputDropdown from 'components/fields/InputDropDown';

const LoyaltyAdditionalDetails = ({
    loyaltyTemplate,
    selectedProduct,
    setSelectedProduct,
    selectedRewardProduct,
    setSelectedRewardProduct,
    handleImageChange,
    handleIcon1Change,
    handleIcon2Change,
    handleIcon3Change,
    handleColorChange,
    templateImage,
    icon1,
    icon2,
    icon3,
    color,
}) => {
    return (
        <>
            <div className="col-span-12 my-4 border-t border-gray-300 dark:border-gray-600"></div>

            <div className="col-span-12 mb-2 text-lg font-bold text-gray-800 dark:text-white">
                Loyalty Additional Details
            </div>

            <div className="col-span-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                            Template Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <InputField
                                variant="auth"
                                extra="mb-0"
                                label="Icon 1 Text"
                                placeholder="Enter text for Icon 1"
                                id="icon1-text"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                                Icon 1
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIcon1Change}
                                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                            />
                            {icon1 && (
                                <div className="mt-2">
                                    <img
                                        src={icon1}
                                        alt="Icon 1 Preview"
                                        className="h-12 w-12 rounded-md border border-gray-200 object-cover shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <InputField
                                variant="auth"
                                extra="mb-0"
                                label="Icon 2 Text"
                                placeholder="Enter text for Icon 2"
                                id="icon2-text"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                                Icon 2
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIcon2Change}
                                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                            />
                            {icon2 && (
                                <div className="mt-2">
                                    <img
                                        src={icon2}
                                        alt="Icon 2 Preview"
                                        className="h-12 w-12 rounded-md border border-gray-200 object-cover shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <InputField
                                variant="auth"
                                extra="mb-0"
                                label="Icon 3 Text"
                                placeholder="Enter text for Icon 3"
                                id="icon3-text"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                                Icon 3
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIcon3Change}
                                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                            />
                            {icon3 && (
                                <div className="mt-2">
                                    <img
                                        src={icon3}
                                        alt="Icon 3 Preview"
                                        className="h-12 w-12 rounded-md border border-gray-200 object-cover shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                            Select Color
                        </label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:bg-navy-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-600">
                    <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-white">
                        Real-Time Banner Preview
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                        Your loyalty banner will appear here.
                    </div>
                    {templateImage && (
                        <img
                            src={templateImage}
                            alt="Template Preview"
                            className="max-h-40 rounded-md border border-gray-200 shadow-md"
                            style={{ backgroundColor: color }}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default LoyaltyAdditionalDetails;