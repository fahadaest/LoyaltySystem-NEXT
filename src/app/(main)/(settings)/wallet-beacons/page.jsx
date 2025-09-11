"use client";
import React from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import BeaconCard from "@/components/settings/BeaconCard";

const WalletBeaconsPage = () => {
    const beacons = [
        {
            id: 1,
            city: "Dubai",
            address: "123 Sheikh Zayed",
            description: "Earn points every time you shop",
            radius: "50m"
        },
        {
            id: 2,
            city: "Abu Dhabi",
            address: "45 Corniche Street",
            description: "Earn points every time you shop",
            radius: "50m"
        },
        {
            id: 3,
            city: "Sharjah",
            address: "78 Al Majaz Area",
            description: "Earn points every time you shop",
            radius: "50m"
        },
        {
            id: 4,
            city: "Ajman",
            address: "22 Al Nuaimiya",
            description: "Earn points every time you shop",
            radius: "50m"
        },
        {
            id: 5,
            city: "Ajman",
            address: "56 Al Hamra Village",
            description: "Earn points every time you shop",
            radius: "50m"
        }
    ];

    const handleAddNewBeacon = () => {
        console.log("Add new beacon clicked");
        // Handle add new beacon
    };

    const handleEdit = (beacon) => {
        console.log("Edit beacon:", beacon);
        // Handle edit beacon
    };

    const handleDelete = (beacon) => {
        console.log("Delete beacon:", beacon);
        // Handle delete beacon
    };

    return (
        <main className="min-h-[80vh] flex flex-col">
            <div className="flex items-start justify-between flex-shrink-0 mb-8">
                <ComponentHeader
                    title="Wallet Beacons"
                    subtitle="Add, edit, update or remove wallet beacons"
                    infoMessage="This page allows you to manage location-based beacons for your digital wallet."
                />

                <Button
                    text={"Add New Beacon"}
                    onClick={handleAddNewBeacon}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/plus.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={false}
                    height={'2rem'}
                    fontSize={'0.7rem'}
                    padding={'0px 4px 0px 12px'}
                    iconWidth={'1.4rem'}
                    iconHeight={'1.4rem'}
                    iconImageWidth={'1rem'}
                    iconImageHeight={'1rem'}
                    gap={'12px'}
                />
            </div>

            {/* Beacons Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {beacons.map((beacon) => (
                        <BeaconCard
                            key={beacon.id}
                            city={beacon.city}
                            address={beacon.address}
                            description={beacon.description}
                            radius={beacon.radius}
                            onEdit={() => handleEdit(beacon)}
                            onDelete={() => handleDelete(beacon)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default WalletBeaconsPage;