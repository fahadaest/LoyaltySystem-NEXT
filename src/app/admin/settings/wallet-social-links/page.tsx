'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdEdit } from 'react-icons/md';
import { useGetAllSocialLinksQuery, useUpdateSocialLinksMutation } from 'store/settingsApi';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';
import SocialLinks from 'components/settings/walletSocialLinks/SocialLinks';
import { FaShareAlt } from "react-icons/fa";

const Dashboard = () => {
  const { data: socialLinks, error: socialLinksError, isLoading: socialLinksLoading } = useGetAllSocialLinksQuery('');
  const [updateSocialLinks, { isLoading: socialLinksUpdateLoading, error: socialLinksUpdateError }] = useUpdateSocialLinksMutation();
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true); // Enable edit mode
  };

  const handleCancelEditClick = () => {
    setIsEditMode(false); // Disable edit mode
  };

  const handleSocialLinksSave = async (updatedData) => {
    try {
      await updateSocialLinks({ formData: updatedData }).unwrap();
      dispatch(showAlert({
        message: "Social links updated successfully!",
        severity: "success",
        duration: 2000
      }));
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating social links:', error);
      dispatch(showAlert({
        message: "Error updating social links. Please try again.",
        severity: "error",
        duration: 2000
      }));
    }
  };

  const handleSocialLinksEdit = () => {
    console.log('Social links edit mode activated');
    setIsEditMode(true);
  };

  const handleSocialLinksCancel = () => {
    setIsEditMode(false);
  };

  if (socialLinksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brandGreen"></div>
      </div>
    );
  }

  if (socialLinksError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading social links</p>
          <p className="text-sm">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaShareAlt className="text-brandGreen text-3xl" />} subtitle="Manage Social Links">
          <HeaderButton
            icon={MdEdit}
            text={isEditMode ? "Cancel Edit" : "Edit Links"}
            size="md"
            color={isEditMode ? "bg-gray-500" : "bg-brandGreen"}
            onClick={isEditMode ? handleCancelEditClick : handleEditClick}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <SocialLinks
          data={socialLinks}
          onEdit={handleSocialLinksEdit}
          onSave={handleSocialLinksSave}
          onCancel={handleSocialLinksCancel}
          isEditMode={isEditMode}
        />
      </div>

      {socialLinksUpdateLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brandGreen"></div>
              <span className="text-lg font-medium">Updating social links...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;