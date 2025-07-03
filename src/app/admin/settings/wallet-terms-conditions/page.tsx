'use client';
import React, { useState } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd, MdEdit, MdCancel } from 'react-icons/md';
import { useGetAllTermsQuery, useUpdateTermsMutation } from 'store/settingsApi';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';
import TermsAndConditions from 'components/settings/walletTAC/TAC';

const Dashboard = () => {
  const { data: termsDetail, error: termsError, isLoading: termsLoading } = useGetAllTermsQuery('');
  const [updateTerms, { isLoading: termsUpdateLoading, error: termsUpdatingError }] = useUpdateTermsMutation();

  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const dispatch = useDispatch();

  const handleTermsEdit = () => {
    setIsEditingTerms(true);
  };

  const handleTermsSave = async (updatedTermsData) => {
    try {
      await updateTerms({
        formData: updatedTermsData,
      }).unwrap();

      dispatch(showAlert({
        message: "Terms and conditions updated successfully!",
        severity: "success",
        duration: 2000
      }));

      setIsEditingTerms(false);
    } catch (error) {
      console.error('Error updating terms and conditions:', error);
      dispatch(showAlert({
        message: "Error updating terms and conditions. Please try again.",
        severity: "error",
        duration: 2000
      }));
    }
  };

  const handleTermsCancel = () => {
    setIsEditingTerms(false);
  };

  // Loading state
  if (termsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandGreen mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading terms and conditions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (termsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading terms and conditions</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard subtitle="Manage Terms and Conditions">
          <HeaderButton
            icon={isEditingTerms ? MdCancel : MdEdit}
            text={isEditingTerms ? "Cancel Edit" : "Edit Terms"}
            size="md"
            color={isEditingTerms ? "bg-gray-500" : "bg-brandGreen"}
            onClick={isEditingTerms ? handleTermsCancel : handleTermsEdit}
            variant={undefined}
            disabled={termsUpdateLoading}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <TermsAndConditions
          termsDetail={termsDetail}
          isEditing={isEditingTerms}
          onSave={handleTermsSave}
          onCancel={handleTermsCancel}
          isLoading={termsUpdateLoading}
        />
      </div>

      {/* Loading overlay when updating */}
      {termsUpdateLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-navy-800 rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brandGreen"></div>
            <span className="text-navy-700 dark:text-white">Updating terms and conditions...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;