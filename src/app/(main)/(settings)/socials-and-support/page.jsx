"use client";
import React, { useState, useEffect } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import SocialCard from "@/components/settings/SocialCard";
import ContactInformation from "@/components/settings/ContactInformation";
import InputField from "@/components/input-fields/InputField";
import {
    useGetSocialLinksQuery,
    useCreateOrUpdateSocialLinksMutation
} from "@/store/slices/adminSettingsApis";

const WalletSocialLinksPage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedPlatforms, setEditedPlatforms] = useState([]);

    // API hooks
    const { data: socialLinksData, isLoading, error, refetch } = useGetSocialLinksQuery();
    const [createOrUpdateSocialLinks, { isLoading: isUpdating }] = useCreateOrUpdateSocialLinksMutation();

    // Default social platforms structure
    const defaultSocialPlatforms = [
        {
            id: 1,
            icon: "/img/socials/facebook.svg",
            platformName: "Facebook",
            url: "",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 2,
            icon: "/img/socials/instagram.svg",
            platformName: "Instagram",
            url: "",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 3,
            icon: "/img/socials/twitter.svg",
            platformName: "Twitter",
            url: "",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 4,
            icon: "/img/socials/whatsapp.svg",
            platformName: "Whatsapp",
            url: "",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 5,
            icon: "/img/socials/tiktok.svg",
            platformName: "Tiktok",
            url: "",
            isActive: false,
            backgroundColor: "#F5F5F5"
        },
        {
            id: 6,
            icon: "/img/socials/website.svg",
            platformName: "Website",
            url: "",
            isActive: false,
            backgroundColor: "#F5F5F5"
        }
    ];

    // Initialize platforms data
    const [socialPlatforms, setSocialPlatforms] = useState(defaultSocialPlatforms);

    // Update platforms when API data is loaded
    useEffect(() => {
        if (socialLinksData && socialLinksData.data) {
            // Merge API data with default platforms
            const updatedPlatforms = defaultSocialPlatforms.map(defaultPlatform => {
                const apiPlatform = socialLinksData.data.find(
                    item => item.platformName?.toLowerCase() === defaultPlatform.platformName.toLowerCase()
                );

                return apiPlatform ? {
                    ...defaultPlatform,
                    url: apiPlatform.url || "",
                    isActive: apiPlatform.isActive || false,
                    _id: apiPlatform._id
                } : defaultPlatform;
            });

            setSocialPlatforms(updatedPlatforms);
        }
    }, [socialLinksData]);

    // Initialize edit state when entering edit mode
    useEffect(() => {
        if (isEditMode) {
            setEditedPlatforms([...socialPlatforms]);
        }
    }, [isEditMode, socialPlatforms]);

    const handleEditLinks = () => {
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditedPlatforms([]);
    };

    const handleInputChange = (platformId, field, value) => {
        setEditedPlatforms(prev =>
            prev.map(platform =>
                platform.id === platformId
                    ? { ...platform, [field]: value }
                    : platform
            )
        );
    };

    const handleToggleActive = (platformId) => {
        setEditedPlatforms(prev =>
            prev.map(platform =>
                platform.id === platformId
                    ? { ...platform, isActive: !platform.isActive }
                    : platform
            )
        );
    };

    const handleSaveChanges = async () => {
        try {
            // Prepare data for API
            const socialLinksData = editedPlatforms
                .filter(platform => platform.url.trim() !== "") // Only save platforms with URLs
                .map(platform => ({
                    platformName: platform.platformName,
                    url: platform.url,
                    isActive: platform.isActive,
                    icon: platform.icon
                }));

            // Call API to save changes
            const result = await createOrUpdateSocialLinks({
                socialLinks: socialLinksData
            }).unwrap();

            console.log("Social links saved successfully:", result);

            // Update local state
            setSocialPlatforms(editedPlatforms);
            setIsEditMode(false);
            setEditedPlatforms([]);

            // Refetch data to ensure consistency
            refetch();

        } catch (error) {
            console.error("Error saving social links:", error);
            // You might want to show an error message to the user here
        }
    };

    const displayPlatforms = isEditMode ? editedPlatforms : socialPlatforms;

    if (isLoading) {
        return (
            <main className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading social links...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading social links</p>
                    <Button
                        text="Retry"
                        onClick={() => refetch()}
                        backgroundColor="#000000"
                        textColor="#FFFFFF"
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[80vh] flex flex-col">
            <div className="flex items-start justify-between flex-shrink-0 mb-8">
                <ComponentHeader
                    title="Wallet Social Links"
                    subtitle="Add, edit, update or remove social links"
                    infoMessage="This page allows you to manage social media links that appear in your digital wallet."
                />

                <div className="flex gap-2">
                    {isEditMode ? (
                        <>
                            <Button
                                text="Cancel"
                                onClick={handleCancelEdit}
                                backgroundColor="#6B7280"
                                textColor="#FFFFFF"
                                height="2rem"
                                fontSize="0.7rem"
                                padding="0px 12px"
                            />
                            <Button
                                text={isUpdating ? "Saving..." : "Save Changes"}
                                onClick={handleSaveChanges}
                                backgroundColor="#10B981"
                                textColor="#FFFFFF"
                                disabled={isUpdating}
                                height="2rem"
                                fontSize="0.7rem"
                                padding="0px 12px"
                                icon="/img/general/save.svg"
                                showIcon={true}
                                iconPosition="right"
                            />
                        </>
                    ) : (
                        <Button
                            text="Edit Links"
                            onClick={handleEditLinks}
                            backgroundColor="#000000"
                            textColor="#FFFFFF"
                            icon="/img/general/edit.svg"
                            showIcon={true}
                            iconPosition="right"
                            disabled={false}
                            height="2rem"
                            fontSize="0.7rem"
                            padding="0px 4px 0px 12px"
                            iconWidth="1.4rem"
                            iconHeight="1.4rem"
                            iconImageWidth="1rem"
                            iconImageHeight="1rem"
                            gap="12px"
                        />
                    )}
                </div>
            </div>

            {/* Social Cards Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                    {displayPlatforms.map((platform) => (
                        <div key={platform.id}>
                            {isEditMode ? (
                                <EditableSocialCard
                                    platform={platform}
                                    onInputChange={handleInputChange}
                                    onToggleActive={handleToggleActive}
                                />
                            ) : (
                                <SocialCard
                                    icon={platform.icon}
                                    platformName={platform.platformName}
                                    url={platform.url}
                                    isActive={platform.isActive}
                                    backgroundColor={platform.backgroundColor}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <ContactInformation />
            </div>
        </main>
    );
};

// Editable Social Card Component
const EditableSocialCard = ({ platform, onInputChange, onToggleActive }) => {
    return (
        <div
            className="border border-gray-200 rounded-3xl p-4 shadow-sm"
            style={{
                backgroundColor: platform.backgroundColor
            }}
        >
            {/* Social Media Icon */}
            <div className="mb-3 flex justify-center">
                <img
                    src={platform.icon}
                    alt={platform.platformName}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                        console.log(`Failed to load icon: ${platform.icon}`);
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            {/* Platform Name and Toggle */}
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                    {platform.platformName}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={platform.isActive}
                        onChange={() => onToggleActive(platform.id)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
            </div>

            {/* URL Input Field */}
            <div className="space-y-2">
                <InputField
                    label=""
                    name={`url-${platform.id}`}
                    type="url"
                    value={platform.url}
                    onChange={(e) => onInputChange(platform.id, 'url', e.target.value)}
                    placeholder={`Enter ${platform.platformName} URL`}
                    fieldHeight="0.5rem"
                    placeholderSize="0.75rem"
                />
            </div>

            {/* Status Display */}
            <div className="mt-3 flex justify-center">
                <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${platform.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${platform.isActive ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                    ></span>
                    {platform.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>
        </div>
    );
};

export default WalletSocialLinksPage;