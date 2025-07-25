import React, { useState } from 'react';
import { Coins, DollarSign } from 'lucide-react';
import AnimatedButton from 'components/ui/AnimatedButton';
import AnimatedInput from 'components/ui/AnimatedInput';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';

const RedeemPointsModal = ({
    isOpen,
    onClose,
    onConfirm,
    scannedData,
    isLoading = false
}) => {
    const dispatch = useDispatch();
    const [pointsToRedeem, setPointsToRedeem] = useState('');
    const [redeemByAmount, setRedeemByAmount] = useState(false);
    const [redeemAmount, setRedeemAmount] = useState('');

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

    const handleConfirm = async () => {
        let pointsToRedeemValue;

        if (redeemByAmount) {
            if (!redeemAmount || parseFloat(redeemAmount) <= 0) {
                dispatch(showAlert({
                    message: 'Please enter a valid reward amount',
                    severity: "error",
                    duration: 3000
                }));
                return;
            }

            // Calculate points needed for the desired reward amount
            const pointLoyalty = scannedData.scannedLoyalty.program;
            const rewardPerPoint = pointLoyalty.rewardPointsEquivalent / pointLoyalty.rewardPoints;
            pointsToRedeemValue = Math.ceil(parseFloat(redeemAmount) / rewardPerPoint);
        } else {
            if (!pointsToRedeem || parseInt(pointsToRedeem) <= 0) {
                dispatch(showAlert({
                    message: 'Please enter a valid number of points',
                    severity: "error",
                    duration: 3000
                }));
                return;
            }
            pointsToRedeemValue = pointsToRedeem;
        }

        // Check if user has enough points
        if (pointsToRedeemValue > scannedData.scannedLoyalty.progress.currentCollectedPoints) {
            dispatch(showAlert({
                message: `Insufficient points. Available: ${scannedData.scannedLoyalty.progress.currentCollectedPoints}, Required: ${pointsToRedeemValue}`,
                severity: "error",
                duration: 3000
            }));
            return;
        }

        await onConfirm(pointsToRedeemValue);
        handleClose();
    };

    const handleClose = () => {
        setPointsToRedeem('');
        setRedeemAmount('');
        setRedeemByAmount(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4 text-yellow-800 flex items-center">
                    <Coins className="mr-2" size={20} />
                    Redeem Points
                </h3>

                <div className="mb-4">
                    <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                        <div className="text-sm text-yellow-800">
                            <div className="font-medium">Available Points:</div>
                            <div className="text-lg font-bold">
                                {scannedData?.scannedLoyalty?.progress?.currentCollectedPoints || 0} points
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                Current Reward Value: {(scannedData?.scannedLoyalty?.progress?.currentAvailableReward || 0).toFixed(2)} AED
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setRedeemByAmount(false)}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!redeemByAmount
                                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                                    : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                                    }`}
                            >
                                By Points
                            </button>
                            <button
                                onClick={() => setRedeemByAmount(true)}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${redeemByAmount
                                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                                    : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                                    }`}
                            >
                                By Amount
                            </button>
                        </div>

                        {!redeemByAmount ? (
                            <>
                                <AnimatedInput
                                    label="Points to Redeem"
                                    type="number"
                                    min="1"
                                    max={scannedData?.scannedLoyalty?.progress?.currentCollectedPoints || 0}
                                    value={pointsToRedeem}
                                    onChange={setPointsToRedeem}
                                    placeholder="Enter number of points"
                                    icon={Coins}
                                />

                                {pointsToRedeem && scannedData?.scannedLoyalty?.program && (
                                    <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                                        <div className="text-sm text-yellow-800">
                                            <div className="font-medium">Reward Amount:</div>
                                            <div className="text-lg font-bold">
                                                {calculateRewardFromPoints(pointsToRedeem)} AED
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <AnimatedInput
                                    label="Reward Amount (AED)"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={redeemAmount}
                                    onChange={setRedeemAmount}
                                    placeholder="Enter reward amount"
                                    icon={DollarSign}
                                />

                                {redeemAmount && scannedData?.scannedLoyalty?.program && (
                                    <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                                        <div className="text-sm text-yellow-800">
                                            <div className="font-medium">Points Required:</div>
                                            <div className="text-lg font-bold">
                                                {calculatePointsFromReward(redeemAmount)} points
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
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
                        disabled={isLoading || (!pointsToRedeem && !redeemAmount)}
                        loading={isLoading}
                        variant="primary"
                        size="md"
                        className="flex-1"
                    >
                        Redeem
                    </AnimatedButton>
                </div>
            </div>
        </div>
    );
};

export default RedeemPointsModal;