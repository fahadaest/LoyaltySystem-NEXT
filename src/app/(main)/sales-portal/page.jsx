"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ComponentHeader from "@/components/ui/ComponentHeader";
import ScanSearchBar from "@/components/sales-portal/ScanSearchBar";
import { useScanLoyaltyCardMutation } from "@/store/slices/loyaltyManagementApis";
import { showSuccess, showError } from "@/store/slices/alertSlice";

const SalesPortal = () => {
    const dispatch = useDispatch();
    const [scanLoyaltyCard, { isLoading }] = useScanLoyaltyCardMutation();
    const [scannedData, setScannedData] = useState(null);

    const handleScan = async (searchValue) => {
        try {
            const result = await scanLoyaltyCard(searchValue).unwrap();
            setScannedData(result);
            dispatch(showSuccess("Loyalty card scanned successfully!"));
            console.log("Scanned data:", result);
        } catch (error) {
            dispatch(showError(error?.data?.message || "Failed to scan loyalty card"));
            console.error("Scan error:", error);
        }
    };

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Loyalty Card Scanner"
                    subtitle="Scan customer loyalty cards"
                    infoMessage="Scan customer loyalty cards to view their details and manage their rewards."
                />
            </div>

            <div className="h-[calc(100vh-13rem)] overflow-y-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <ScanSearchBar onScan={handleScan} isLoading={isLoading} />

                {scannedData && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-2xl">
                        <h3 className="text-sm font-semibold mb-2">Scanned Data:</h3>
                        <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-auto">
                            {JSON.stringify(scannedData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </main>
    );
};

export default SalesPortal;