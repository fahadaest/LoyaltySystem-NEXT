"use client";
import React, { useState } from "react";
import Button from "../buttons/Button";

const ScanSearchBar = ({ onScan, isLoading }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleScan = () => {
        if (searchValue.trim()) {
            onScan(searchValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleScan();
        }
    };

    return (
        <div className="relative w-full h-[50px] flex items-center">
            <div className="relative w-full h-full bg-white border border-[#E2E2E2] rounded-[106px] flex items-center px-8">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter QR Code data or serial number"
                    disabled={isLoading}
                    className="w-full bg-transparent outline-none font-poppins font-semibold text-xs text-[#636363] placeholder:text-[#636363] placeholder:font-semibold disabled:opacity-50"
                />
                <div className="absolute right-4">
                    <Button
                        text={isLoading ? "Scanning..." : "Scan"}
                        onClick={handleScan}
                        backgroundColor="#000000"
                        textColor="#FFFFFF"
                        height="30px"
                        fontSize="11px"
                        fontWeight="500"
                        padding="0 24px"
                        borderRadius="36px"
                        border="1px solid rgba(0, 0, 0, 0.1)"
                        disabled={isLoading || !searchValue.trim()}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScanSearchBar;