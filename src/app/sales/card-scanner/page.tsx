'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/header/HeadingCard';
import AnimatedButton from 'components/ui/AnimatedButton';
import LoyaltyCardScannerUI from 'components/sales/LoyaltyCardScannerUI';
import {
  useScanLoyaltyCardMutation,
  useAddStampMutation,
  useRedeemRewardMutation,
  useRemoveStampMutation
} from 'store/apiEndPoints/loyaltyManagement';
import { RiQrScanLine } from 'react-icons/ri';

const CardScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [qrInput, setQrInput] = useState('');
  const [lastScannedQrData, setLastScannedQrData] = useState('');
  const fileInputRef = useRef(null);

  const [scanLoyaltyCard, { isLoading: isScanLoading }] = useScanLoyaltyCardMutation();
  const [addStamp, { isLoading: isAddStampLoading }] = useAddStampMutation();
  const [redeemReward, { isLoading: isRedeemLoading }] = useRedeemRewardMutation();
  const [removeStamp, { isLoading: isRemoveStampLoading }] = useRemoveStampMutation();

  const loading = isScanLoading || isAddStampLoading || isRedeemLoading || isRemoveStampLoading;

  const handleScan = async (qrData) => {
    if (!qrData) return;
    setError('');
    setSuccess('');

    try {
      const result = await scanLoyaltyCard({ qrData }).unwrap();
      if (result.success) {
        setScannedData(result.data);
        setLastScannedQrData(qrData); // Store the QR data for re-scanning
        setSuccess('Customer card scanned successfully!');
      } else {
        setError(result.message || 'Failed to scan card');
      }
    } catch (err) {
      setError('Error scanning card. Please try again.');
      console.error('Scan error:', err);
    }
  };

  // Function to refresh scan data after operations
  const refreshScanData = async () => {
    if (!lastScannedQrData) return;

    try {
      const result = await scanLoyaltyCard({ qrData: lastScannedQrData }).unwrap();
      if (result.success) {
        setScannedData(result.data);
      }
    } catch (err) {
      console.error('Error refreshing scan data:', err);
    }
  };

  const handleAddStamp = async () => {
    if (!scannedData || !scannedData.scannedLoyalty) return;
    setError('');
    setSuccess('');

    try {
      const result = await addStamp({ customerLoyaltyId: scannedData.scannedLoyalty.id }).unwrap();
      console.log('Add stamp result:', result); // Debug log

      if (result.success) {
        setSuccess(result.message || 'Stamp added successfully!');
        if (result.data?.rewardEarned) {
          setTimeout(() => {
            setSuccess(prev => prev + ' 🎉 Reward earned!');
          }, 1000);
        }

        // Re-scan to get the latest data
        await refreshScanData();
      } else {
        setError(result.message || 'Failed to add stamp');
      }
    } catch (err) {
      setError('Error adding stamp. Please try again.');
      console.error('Add stamp error:', err);
    }
  };

  const handleRemoveStamp = async (reason) => {
    if (!scannedData || !scannedData.scannedLoyalty) return;
    setError('');
    setSuccess('');

    try {
      const result = await removeStamp({
        customerLoyaltyId: scannedData.scannedLoyalty.id,
        reason: reason || undefined
      }).unwrap();

      console.log('Remove stamp result:', result); // Debug log

      if (result.success) {
        setSuccess(result.message || 'Stamp removed successfully!');

        if (result.data?.changes?.rewardReverted) {
          setTimeout(() => {
            setSuccess(prev => prev + ' ⚠️ Reward was reverted!');
          }, 1000);
        }

        // Re-scan to get the latest data
        await refreshScanData();
      } else {
        setError(result.message || 'Failed to remove stamp');
      }
    } catch (err) {
      setError('Error removing stamp. Please try again.');
      console.error('Remove stamp error:', err);
    }
  };

  const handleRedeemReward = async () => {
    if (!scannedData || !scannedData.scannedLoyalty) return;
    setError('');
    setSuccess('');

    try {
      const result = await redeemReward({ customerLoyaltyId: scannedData.scannedLoyalty.id }).unwrap();
      console.log('Redeem reward result:', result); // Debug log

      if (result.success) {
        setSuccess(result.message || 'Reward redeemed successfully!');

        // Re-scan to get the latest data
        await refreshScanData();
      } else {
        setError(result.message || 'Failed to redeem reward');
      }
    } catch (err) {
      setError('Error redeeming reward. Please try again.');
      console.error('Redeem reward error:', err);
    }
  };

  const handleManualInput = () => {
    if (qrInput.trim()) {
      handleScan(qrInput.trim());
      setQrInput('');
    }
  };

  const resetScan = () => {
    setScannedData(null);
    setError('');
    setSuccess('');
    setQrInput('');
    setLastScannedQrData(''); // Clear the stored QR data
  };

  return (
    <div className="relative">
      <div className="mt-3 mb-5">
        <HeadingCard
          icon={<RiQrScanLine className="text-brandGreen" />}
          title="Loyalty Card Scanner"
          subtitle="Scan customer loyalty cards to add stamps or redeem rewards"
        >
          <AnimatedButton
            icon={RiQrScanLine}
            size="md"
            color="bg-brandGreen"
            variant="primary"
            onClick={resetScan}
          >
            Scan Another Card
          </AnimatedButton>
        </HeadingCard>
      </div>

      <LoyaltyCardScannerUI
        scannedData={scannedData}
        error={error}
        success={success}
        qrInput={qrInput}
        setQrInput={setQrInput}
        handleManualInput={handleManualInput}
        handleAddStamp={handleAddStamp}
        handleRemoveStamp={handleRemoveStamp}
        handleRedeemReward={handleRedeemReward}
        resetScan={resetScan}
        loading={loading}
        isRemoveStampLoading={isRemoveStampLoading}
      />
    </div>
  );
};

export default CardScanner;