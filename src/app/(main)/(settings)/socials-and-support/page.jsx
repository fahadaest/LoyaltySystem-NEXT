"use client";
import React from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import SocialCard from "@/components/settings/SocialCard";
import ContactInformation from "@/components/settings/ContactInformation";

const WalletSocialLinksPage = () => {
    const socialPlatforms = [
        {
            id: 1,
            icon: "/img/socials/facebook.svg",
            platformName: "Facebook",
            url: "https://www.facebook.com/codehive.ae",
            isActive: true,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 2,
            icon: "/img/socials/instagram.svg",
            platformName: "Instagram",
            url: "https://www.instagram.com/codehive.ae",
            isActive: true,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 3,
            icon: "/img/socials/twitter.svg",
            platformName: "Twitter",
            url: "https://www.twitter.com/codehive.ae",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 4,
            icon: "/img/socials/whatsapp.svg",
            platformName: "Whatsapp",
            url: "https://www.whatsapp.com/codehive.ae",
            isActive: true,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 5,
            icon: "/img/socials/tiktok.svg",
            platformName: "Tiktok",
            url: "https://www.tiktok.com/codehive.ae",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 6,
            icon: "/img/socials/website.svg",
            platformName: "Website",
            url: "https://www.codehive.com/codehive.ae",
            isActive: true,
            backgroundColor: "#F5F5F5"
        }
    ];

    const handleEditLinks = () => {
        console.log("Edit Links clicked");
        // Handle edit links action
    };

    return (
        <main className="min-h-[80vh] flex flex-col">
            <div className="flex items-start justify-between flex-shrink-0 mb-8">
                <ComponentHeader
                    title="Wallet Social Links"
                    subtitle="Add, edit, update or remove social links"
                    infoMessage="This page allows you to manage social media links that appear in your digital wallet."
                />

                <Button
                    text={"Edit Links"}
                    onClick={handleEditLinks}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/edit.svg"}
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

            {/* Social Cards Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                    {socialPlatforms.map((platform) => (
                        <SocialCard
                            key={platform.id}
                            icon={platform.icon}
                            platformName={platform.platformName}
                            url={platform.url}
                            isActive={platform.isActive}
                            backgroundColor={platform.backgroundColor}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <ContactInformation />
            </div>
        </main>
    );
};

export default WalletSocialLinksPage;