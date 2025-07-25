import React, { useState, useEffect } from 'react';
import { Camera, User, Gift, Plus, Minus, CheckCircle, AlertCircle, QrCode, CreditCard, Package, Star, DollarSign, Coins } from 'lucide-react';
import AnimatedButton from 'components/ui/AnimatedButton';
import AnimatedInput from 'components/ui/AnimatedInput';
import Table from 'components/ui/Table';
import AddPointsModal from './AddPointsModal';
import RedeemPointsModal from './RedeemPointsModal';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { useDispatch } from 'react-redux';

const LoyaltyCardScannerUI = ({
    scannedData,
    error,
    success,
    qrInput,
    setQrInput,
    handleManualInput,
    handleAddStamp,
    handleRemoveStamp,
    handleRedeemReward,
    handleLogSpending,
    handleRedeemPoints,
    resetScan,
    loading,
    isRemoveStampLoading,
    isLogSpendingLoading,
    isRedeemPointsLoading,
    availableProducts = [] // New prop for products list
}) => {
    const dispatch = useDispatch();
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [removeReason, setRemoveReason] = useState('');
    const [selectedLoyalty, setSelectedLoyalty] = useState(null);

    // Point system modals state
    const [showAddPointsModal, setShowAddPointsModal] = useState(false);
    const [showRedeemPointsModal, setShowRedeemPointsModal] = useState(false);

    const canRemoveStamp = scannedData && scannedData.scannedLoyalty.progress.currentCollectedStamps > 0;

    useEffect(() => {
        if (success) {
            dispatch(showAlert({
                message: success,
                severity: "success",
                duration: 3000
            }));
        }
    }, [success, dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(showAlert({
                message: error,
                severity: "error",
                duration: 3000
            }));
        }
    }, [error, dispatch]);

    const handleRemoveStampConfirm = async () => {
        await handleRemoveStamp(removeReason);
        setShowRemoveConfirm(false);
        setRemoveReason('');
    };

    const handleRemoveStampCancel = () => {
        setShowRemoveConfirm(false);
        setRemoveReason('');
    };

    // Point system handlers
    const handleAddPointsConfirm = async (payload) => {
        await handleLogSpending(payload);
        setShowAddPointsModal(false);
    };

    const handleRedeemPointsConfirm = async (pointsToRedeemValue) => {
        await handleRedeemPoints(pointsToRedeemValue);
        setShowRedeemPointsModal(false);
    };

    const calculateRewardFromPoints = (points) => {
        if (!points || !scannedData?.scannedLoyalty?.program) return 0;
        const program = scannedData.scannedLoyalty.program;
        const rewardPerPoint = program.rewardPointsEquivalent / program.rewardPoints;
        return (parseInt(points) * rewardPerPoint).toFixed(2);
    };

    const calculatePointsFromReward = (amount) => {
        if (!amount || !scannedData?.scannedLoyalty?.program) return 0;
        const program = scannedData.scannedLoyalty.program;
        const rewardPerPoint = program.rewardPointsEquivalent / program.rewardPoints;
        return Math.ceil(parseFloat(amount) / rewardPerPoint);
    };

    const getTypeConfig = (type) => {
        const typeUpper = type?.toUpperCase();

        switch (typeUpper) {
            case 'PRODUCT':
                return {
                    icon: Package,
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-800',
                    iconColor: 'text-blue-600'
                };
            case 'POINT':
                return {
                    icon: Star,
                    bgColor: 'bg-yellow-100',
                    textColor: 'text-yellow-800',
                    iconColor: 'text-yellow-600'
                };
            case 'STAMP':
                return {
                    icon: CheckCircle,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-800',
                    iconColor: 'text-green-600'
                };
            case 'VISIT':
                return {
                    icon: User,
                    bgColor: 'bg-purple-100',
                    textColor: 'text-purple-800',
                    iconColor: 'text-purple-600'
                };
            default:
                return {
                    icon: Gift,
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-800',
                    iconColor: 'text-gray-600'
                };
        }
    };

    const loyaltyColumns = [
        {
            accessorKey: 'program.title',
            header: 'Program',
            cell: ({ row }) => (
                <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{row.original.program.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{row.original.type.toLowerCase()}</p>
                </div>
            )
        },
        {
            accessorKey: 'progress',
            header: 'Progress',
            cell: ({ row }) => {
                const loyalty = row.original;
                if (loyalty.type.toUpperCase() === 'POINT') {
                    return (
                        <div className="text-center">
                            <div className="text-sm font-medium text-yellow-600">
                                {loyalty.progress.currentCollectedPoints || 0} points
                            </div>
                            <div className="text-xs text-gray-500">
                                Available: {(loyalty.progress.currentAvailableReward || 0).toFixed(2)} AED
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="text-center">
                            <div className="text-sm font-medium">
                                {loyalty.progress.currentCollectedStamps}/{loyalty.progress.totalRequired}
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                                <div
                                    className="bg-green-500 h-1.5 rounded-full"
                                    style={{ width: `${loyalty.progress.progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                }
            }
        },
        {
            accessorKey: 'progress.currentAvailableReward',
            header: 'Rewards',
            cell: ({ row }) => {
                const loyalty = row.original;
                if (loyalty.type.toUpperCase() === 'POINT') {
                    return (
                        <div className="text-center">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {(loyalty.progress.currentAvailableReward || 0).toFixed(2)} AED
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div className="text-center">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {loyalty.progress.currentAvailableReward}
                            </span>
                        </div>
                    );
                }
            }
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => {
                const typeConfig = getTypeConfig(row.original.type);
                const IconComponent = typeConfig.icon;

                return (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                        <IconComponent className={`w-3 h-3 mr-1 ${typeConfig.iconColor}`} />
                        {row.original.type}
                    </span>
                );
            }
        },
        {
            accessorKey: 'isScannedCard',
            header: 'Status',
            cell: ({ row }) => (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${row.original.isScannedCard
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                    }`}>
                    {row.original.isScannedCard ? 'Scanned' : 'Active'}
                </span>
            )
        }
    ];

    const handleLoyaltyView = (loyalty) => {
        setSelectedLoyalty(loyalty);
    };

    return (
        <div className="mx-auto p-4 bg-white rounded-lg shadow-lg max-w-7xl">
            {!scannedData && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1">
                            <AnimatedInput
                                label="Enter QR Code Data"
                                icon={QrCode}
                                type="text"
                                value={qrInput}
                                onChange={setQrInput}
                                placeholder="Enter QR code data or serial number"
                                onKeyPress={(e) => e.key === 'Enter' && handleManualInput()}
                            />
                        </div>
                        <AnimatedButton
                            onClick={handleManualInput}
                            disabled={loading || !qrInput.trim()}
                            loading={loading}
                            icon={Camera}
                            variant="primary"
                            size="md"
                            className="h-12 px-6"
                        >
                            Scan
                        </AnimatedButton>
                    </div>
                </div>
            )}

            {scannedData && (
                <div className="space-y-4">
                    {/* Customer Info & Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Customer Details */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-800">
                                <User className="mr-2" size={20} />
                                Customer
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">
                                        {scannedData.customer.firstName} {scannedData.customer.lastName}
                                    </span>
                                </div>
                                <div className="text-gray-600">{scannedData.customer.email}</div>
                                <div className="text-gray-600">{scannedData.customer.phoneNumber || 'N/A'}</div>
                                <div className="text-xs text-gray-500">
                                    Joined {scannedData.customer.daysSinceJoined} day(s) ago
                                </div>
                            </div>
                        </div>

                        {/* Scanned Card Details */}
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3 flex items-center text-green-800">
                                <CreditCard className="mr-2" size={20} />
                                Scanned Card
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{scannedData.scannedLoyalty.program.title}</span>
                                    {(() => {
                                        const typeConfig = getTypeConfig(scannedData.scannedLoyalty.type);
                                        const IconComponent = typeConfig.icon;
                                        return (
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                                                <IconComponent className={`w-3 h-3 mr-1 ${typeConfig.iconColor}`} />
                                                {scannedData.scannedLoyalty.type}
                                            </span>
                                        );
                                    })()}
                                </div>

                                {scannedData.scannedLoyalty.type.toUpperCase() === 'POINT' ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-yellow-600">
                                                {scannedData.scannedLoyalty.progress.currentCollectedPoints || 0}
                                            </span>
                                            <span className="text-gray-600">points</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Available Reward: {(scannedData.scannedLoyalty.progress.currentAvailableReward || 0).toFixed(2)} AED
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-green-600">
                                                {scannedData.scannedLoyalty.progress.currentCollectedStamps}
                                            </span>
                                            <span className="text-gray-600">
                                                / {scannedData.scannedLoyalty.progress.totalRequired} stamps
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${scannedData.scannedLoyalty.progress.progressPercentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {scannedData.scannedLoyalty.progress.currentAvailableReward} rewards available
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-800">
                                <Gift className="mr-2" size={20} />
                                Summary
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-purple-600">
                                        {scannedData.summary.totalLoyaltyPrograms}
                                    </div>
                                    <div className="text-xs text-gray-600">Total Programs Enrolled</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-purple-600">
                                        {scannedData.summary.totalTransactions}
                                    </div>
                                    <div className="text-xs text-gray-600">Total Transactions</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-purple-600">
                                        {scannedData.summary.totalAmountSpent} AED
                                    </div>
                                    <div className="text-xs text-gray-600">Total Amount Spent</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-purple-600">
                                        {scannedData.summary.totalAmountRedeemed} AED
                                    </div>
                                    <div className="text-xs text-gray-600">Total Amount Redeemed</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Scanned Card Actions</h3>
                        {scannedData && scannedData.scannedLoyalty.type.toUpperCase() === 'POINT' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatedButton
                                    onClick={() => setShowAddPointsModal(true)}
                                    disabled={loading}
                                    loading={isLogSpendingLoading}
                                    icon={DollarSign}
                                    variant="primary"
                                    size="lg"
                                    className="w-full h-12 text-base font-medium"
                                >
                                    Log Spending
                                </AnimatedButton>

                                <AnimatedButton
                                    onClick={() => setShowRedeemPointsModal(true)}
                                    // disabled={loading || (scannedData.scannedLoyalty.progress.currentCollectedPoints || 0) <= 0}
                                    loading={isRedeemPointsLoading}
                                    icon={Coins}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full h-12 text-base font-medium"
                                >
                                    Redeem Points
                                    {(scannedData.scannedLoyalty.progress.currentCollectedPoints || 0) <= 0 && (
                                        <span className="ml-1 text-xs">(No points)</span>
                                    )}
                                </AnimatedButton>
                            </div>
                        )}

                        {scannedData && scannedData.scannedLoyalty.type.toUpperCase() === 'PRODUCT' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <AnimatedButton
                                    onClick={handleAddStamp}
                                    disabled={loading || !scannedData.scannedLoyalty.actions.canAddStamp}
                                    loading={loading}
                                    icon={Plus}
                                    variant="primary"
                                    size="lg"
                                    className="w-full h-12 text-base font-medium"
                                >
                                    Add Stamp
                                </AnimatedButton>

                                <AnimatedButton
                                    onClick={() => setShowRemoveConfirm(true)}
                                    disabled={loading || !canRemoveStamp}
                                    loading={isRemoveStampLoading}
                                    icon={Minus}
                                    variant="warning"
                                    size="lg"
                                    className="w-full h-12 text-base font-medium"
                                >
                                    Remove Stamp
                                    {!canRemoveStamp && (
                                        <span className="ml-1 text-xs">(No stamps)</span>
                                    )}
                                </AnimatedButton>

                                <AnimatedButton
                                    onClick={handleRedeemReward}
                                    disabled={loading || !scannedData.scannedLoyalty.actions.canRedeemReward}
                                    loading={loading}
                                    icon={Gift}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full h-12 text-base font-medium"
                                >
                                    Redeem Reward
                                    {!scannedData.scannedLoyalty.actions.canRedeemReward && (
                                        <span className="ml-1 text-xs">(No rewards)</span>
                                    )}
                                </AnimatedButton>
                            </div>
                        )}
                    </div>

                    {/* All Loyalty Programs Table */}
                    <div className="bg-white rounded-lg">
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">All Loyalty Programs</h3>
                        </div>
                        <Table
                            data={scannedData.allLoyalties}
                            columns={loyaltyColumns}
                            isLoading={false}
                            onView={handleLoyaltyView}
                        />
                    </div>
                </div>
            )}

            {/* Add Points Modal */}
            <AddPointsModal
                isOpen={showAddPointsModal}
                onClose={() => setShowAddPointsModal(false)}
                onConfirm={handleAddPointsConfirm}
                scannedData={scannedData}
                isLoading={isLogSpendingLoading}
                availableProducts={availableProducts}
            />

            {/* Redeem Points Modal */}
            <RedeemPointsModal
                isOpen={showRedeemPointsModal}
                onClose={() => setShowRedeemPointsModal(false)}
                onConfirm={handleRedeemPointsConfirm}
                scannedData={scannedData}
                isLoading={isRedeemPointsLoading}
            />

            {/* Loyalty Detail Modal */}
            {selectedLoyalty && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-96 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            {selectedLoyalty.program.title}
                            {(() => {
                                const typeConfig = getTypeConfig(selectedLoyalty.type);
                                const IconComponent = typeConfig.icon;
                                return (
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                                        <IconComponent className={`w-3 h-3 mr-1 ${typeConfig.iconColor}`} />
                                        {selectedLoyalty.type}
                                    </span>
                                );
                            })()}
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-medium">Type:</span>
                                <span className="ml-2 capitalize">{selectedLoyalty.type.toLowerCase()}</span>
                            </div>

                            {selectedLoyalty.type.toUpperCase() === 'POINT' ? (
                                <>
                                    <div>
                                        <span className="font-medium">Current Points:</span>
                                        <span className="ml-2">{selectedLoyalty.progress.currentCollectedPoints || 0}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Available Reward:</span>
                                        <span className="ml-2">{(selectedLoyalty.progress.currentAvailableReward || 0).toFixed(2)} AED</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Total Points Collected:</span>
                                        <span className="ml-2">{selectedLoyalty.progress.totalCollectedPoints || 0}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <span className="font-medium">Progress:</span>
                                        <span className="ml-2">
                                            {selectedLoyalty.progress.currentCollectedStamps}/{selectedLoyalty.progress.totalRequired}
                                            ({selectedLoyalty.progress.progressPercentage}%)
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Available Rewards:</span>
                                        <span className="ml-2">{selectedLoyalty.progress.currentAvailableReward}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Total Stamps Collected:</span>
                                        <span className="ml-2">{selectedLoyalty.progress.totalCollectedStamps}</span>
                                    </div>
                                </>
                            )}

                            <div>
                                <span className="font-medium">Total Rewards Earned:</span>
                                <span className="ml-2">{selectedLoyalty.progress.totalRewardsEarned}</span>
                            </div>

                            <div>
                                <span className="font-medium">Joined:</span>
                                <span className="ml-2">{selectedLoyalty.activity.daysSinceJoined} day(s) ago</span>
                            </div>

                            {selectedLoyalty.program.description && (
                                <div>
                                    <span className="font-medium">Description:</span>
                                    <p className="mt-1 text-gray-600">{selectedLoyalty.program.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <AnimatedButton
                                onClick={() => setSelectedLoyalty(null)}
                                variant="outline"
                                size="md"
                            >
                                Close
                            </AnimatedButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove Stamp Confirmation Modal */}
            {showRemoveConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4 text-orange-800">Remove Stamp</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to remove a stamp from this customer's scanned card?
                        </p>

                        <div className="mb-4">
                            <AnimatedInput
                                label="Reason (optional)"
                                type="text"
                                value={removeReason}
                                onChange={setRemoveReason}
                                placeholder="e.g., Customer returned item, Mistake, etc."
                            />
                        </div>

                        <div className="flex gap-3">
                            <AnimatedButton
                                onClick={handleRemoveStampCancel}
                                variant="outline"
                                size="md"
                                className="flex-1"
                            >
                                Cancel
                            </AnimatedButton>
                            <AnimatedButton
                                onClick={handleRemoveStampConfirm}
                                disabled={isRemoveStampLoading}
                                loading={isRemoveStampLoading}
                                variant="primary"
                                size="md"
                                className="flex-1 bg-orange-600 hover:bg-orange-700"
                            >
                                Remove Stamp
                            </AnimatedButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg flex items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                        <span className="text-lg">Processing...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoyaltyCardScannerUI;