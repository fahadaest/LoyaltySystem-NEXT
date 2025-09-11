import React from "react";
import Button from "@/components/buttons/Button";

const BeaconCard = ({
    city,
    address,
    description,
    radius,
    onEdit,
    onDelete
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Header with Icon and Location Tags */}
            <div className="flex items-center gap-2 mb-4">
                {/* Beacon Icon */}
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>

                {/* Location Tags */}
                <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 border border-black rounded-full text-[10px] font-medium text-black">
                        {city}
                    </span>
                    <span className="px-2.5 py-1 bg-black border border-black rounded-full text-[10px] font-medium text-white">
                        {address}
                    </span>
                </div>
            </div>

            {/* Description Badge */}
            <div className="mb-3">
                <div className="inline-flex items-center px-3 py-1.5 border border-black rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-[10px] font-medium text-black">
                        {description}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-3"></div>

            {/* Radius Info and Action Buttons */}
            <div className="flex flex-col items-center justify-between w-full gap-3">
                {/* Radius Info */}
                <div className="flex w-full justify-between items-center gap-1.5">
                    <span className="text-[10px] text-gray-600">Radius</span>
                    <span className="text-[10px] font-medium text-green-500">{radius}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex  w-full justify-between items-center gap-1.5">
                    <Button
                        text={"Edit"}
                        onClick={onEdit}
                        backgroundColor={'#EDEDED'}
                        textColor={'#000000'}
                        disabled={false}
                        height={'1.8rem'}
                        fontSize={'0.6rem'}
                        padding={'0px 14px'}
                        borderRadius={'81px'}
                        border={'1px solid #E2E2E2'}
                    />
                    <Button
                        text={"Delete"}
                        onClick={onDelete}
                        backgroundColor={'#000000'}
                        textColor={'#FFFFFF'}
                        disabled={false}
                        height={'1.8rem'}
                        fontSize={'0.6rem'}
                        padding={'0px 14px'}
                        borderRadius={'81px'}
                    />
                </div>
            </div>
        </div>
    );
};

export default BeaconCard;