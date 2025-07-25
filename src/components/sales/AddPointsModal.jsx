import React, { useState } from 'react';
import { DollarSign, Package, FileText } from 'lucide-react';
import AnimatedButton from 'components/ui/AnimatedButton';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedMultiSelect from 'components/ui/AnimatedMultiSelect';
import AnimatedTextarea from 'components/ui/AnimatedTextarea';
import { useGetAllProductsQuery } from 'store/apiEndPoints/productsApi';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';

const AddPointsModal = ({
    isOpen,
    onClose,
    onConfirm,
    scannedData,
    isLoading = false,
    availableProducts = []
}) => {
    const dispatch = useDispatch();
    const [spendingAmount, setSpendingAmount] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [description, setDescription] = useState('');

    const { data: productsData, isLoading: isProductsLoading, error: productsError } = useGetAllProductsQuery();

    console.log("productsData", productsData)

    // Use productsData from API instead of availableProducts prop
    const productsToUse = productsData || availableProducts;

    const productsGrouped = {
        'Products': productsToUse.map(product => ({
            id: product.id,
            name: product.name || product.title || `Product ${product.id}`,
            description: product.description || product.category || 'No description available'
        }))
    };

    const calculatePointsFromAmount = (amount) => {
        if (!amount || !scannedData?.scannedLoyalty?.program) return 0;
        const program = scannedData.scannedLoyalty.program;
        const pointsPerAED = program.rewardPoints / program.spendingAmount;
        return (parseFloat(amount) * pointsPerAED).toFixed(2);
    };

    const handleConfirm = async () => {
        if (!spendingAmount || parseFloat(spendingAmount) <= 0) {
            dispatch(showAlert({
                message: 'Please enter a valid spending amount',
                severity: "error",
                duration: 3000
            }));
            return;
        }

        // Create payload with the specified structure
        const payload = {
            amount: spendingAmount,
            productIds: selectedProducts,
            comment: description.trim() || undefined // Only include if not empty
        };

        await onConfirm(payload);
        handleClose();
    };

    const handleClose = () => {
        setSpendingAmount('');
        setSelectedProducts([]);
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center">
                    <DollarSign className="mr-2" size={20} />
                    Log Customer Spending
                </h3>

                <div className="mb-4">
                    <AnimatedInput
                        label="Spending Amount (AED)"
                        type="number"
                        step="0.01"
                        min="0"
                        value={spendingAmount}
                        onChange={setSpendingAmount}
                        placeholder="Enter amount spent by customer"
                        icon={DollarSign}
                        required
                    />

                    {spendingAmount && scannedData?.scannedLoyalty?.program && (
                        <div className="mt-2 p-3 bg-green-50 rounded-lg">
                            <div className="text-sm text-green-800">
                                <div className="font-medium">Points to be earned:</div>
                                <div className="text-lg font-bold">
                                    {calculatePointsFromAmount(spendingAmount)} points
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                    Rate: {(scannedData.scannedLoyalty.program.rewardPoints / scannedData.scannedLoyalty.program.spendingAmount).toFixed(4)} points per AED
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Selection */}
                <div className="mb-4">
                    <AnimatedMultiSelect
                        label="Select Products (Optional)"
                        icon={Package}
                        value={selectedProducts}
                        onChange={setSelectedProducts}
                        permissionsGrouped={productsGrouped}
                        disabled={isProductsLoading}
                    />
                    {isProductsLoading && (
                        <div className="mt-2 text-xs text-gray-500">
                            Loading products...
                        </div>
                    )}
                    {productsError && (
                        <div className="mt-2 text-xs text-red-500">
                            Error loading products
                        </div>
                    )}
                    {selectedProducts.length > 0 && (
                        <div className="mt-2 text-xs text-gray-600">
                            {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
                        </div>
                    )}
                    {!isProductsLoading && !productsError && productsToUse.length === 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                            No products available
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <AnimatedTextarea
                        label="Description (Optional)"
                        icon={FileText}
                        value={description}
                        onChange={setDescription}
                        placeholder="Add any additional notes about this transaction..."
                        rows={3}
                        maxLength={500}
                    />
                </div>

                <div className="flex gap-3">
                    <AnimatedButton
                        onClick={handleClose}
                        variant="outline"
                        size="md"
                        className="flex-1"
                    >
                        Cancel
                    </AnimatedButton>
                    <AnimatedButton
                        onClick={handleConfirm}
                        disabled={isLoading || !spendingAmount || parseFloat(spendingAmount) <= 0}
                        loading={isLoading}
                        variant="primary"
                        size="md"
                        className="flex-1"
                    >
                        Add Points
                    </AnimatedButton>
                </div>
            </div>
        </div>
    );
};

export default AddPointsModal;