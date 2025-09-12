"use client";
import React, { useState } from "react";
import { Edit, Settings } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import ProfileComponent from "@/components/profile/ProfileComponent";
import Modal from "@/components/ui/Modal";

const ProfilePage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateProfile = (profileData) => {
        console.log("Profile updated:", profileData);
        setIsEditModalOpen(false);
    };

    const buttons = [
        {
            text: "Edit Profile",
            onClick: handleEditClick,
            backgroundColor: "#000000",
            textColor: "#FFFFFF",
            showIcon: true,
            iconPosition: "right",
            icon: <Edit className="w-2 h-2" />
        },
    ];

    // Footer content for the modal
    const modalFooter = (
        <div className="flex justify-end gap-3">
            <button
                onClick={handleCloseModal}
                className="h-8 px-5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={() => handleUpdateProfile({})}
                className="h-8 px-5 bg-black rounded-full flex items-center gap-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
            >
                Update Profile
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Edit className="w-2.5 h-2.5 text-black" />
                </div>
            </button>
        </div>
    );

    return (
        <main className="min-h-[78vh]">

            {/* Pass the handleEditClick function to ProfileComponent */}
            <ProfileComponent onEditClick={handleEditClick} />

            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                title="Edit Profile"
                subtitle="Update your profile information"
                maxWidth="50vw"
                maxHeight="60vh"
                footer={modalFooter}
            >
                <div className="p-6">
                    <div className="space-y-6">

                        {/* Company/Store Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company/Store Name
                            </label>
                            <input
                                type="text"
                                defaultValue="STARBUCKS"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                defaultValue="starbucks@gmail.com"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                defaultValue="+971 50 000 0000"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                defaultValue="Admin"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                            </select>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Logo
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
        </main>
    );
};

export default ProfilePage;