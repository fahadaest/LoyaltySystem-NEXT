'use client';
import React, { useState } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from 'react-icons/md';
import { useGetSupportDetailsQuery, useUpdateSupportDetailsMutation } from 'store/apiEndPoints/settingsApi';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import Support from 'components/settings/walletSupport/Support';
import SupportEdit from 'components/settings/walletSupport/SupportEdit';
import { MdSupport } from "react-icons/md";

const Dashboard = () => {
  const { data: supportDetails, error: supportError, isLoading: supportLoading } = useGetSupportDetailsQuery('');
  const [updateSupport, { isLoading: supportUpdating, error: supportUpdatingError }] = useUpdateSupportDetailsMutation();
  console.log("supportDetails", supportDetails)
  const [isEditingSupport, setIsEditingSupport] = useState(false);
  const dispatch = useDispatch();

  const handleSupportEdit = () => {
    setIsEditingSupport(true);
  };

  const handleSupportSave = async (updatedSupportData: any) => {
    try {
      await updateSupport({
        formData: updatedSupportData[0],
      }).unwrap();
      dispatch(showAlert({
        message: "Support details updated successfully!",
        severity: "success",
        duration: 2000
      }));
      setIsEditingSupport(false);
    } catch (error) {
      console.error('Error updating support details:', error);
      dispatch(showAlert({
        message: "Error updating support details. Please try again.",
        severity: "error",
        duration: 2000
      }));
    }
  };

  const handleSupportCancel = () => {
    setIsEditingSupport(false);
  };

  if (supportLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandGreen mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading support details...</p>
        </div>
      </div>
    );
  }

  if (supportError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error loading support details</p>
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
        <HeadingCard icon={<MdSupport className="text-brandGreen text-3xl" />} subtitle="Update Support Details">
          <HeaderButton
            icon={MdAdd}
            text={isEditingSupport ? "Cancel Edit" : "Update Support"}
            size="md"
            color={isEditingSupport ? "bg-gray-500" : "bg-brandGreen"}
            onClick={isEditingSupport ? handleSupportCancel : handleSupportEdit}
            variant={undefined}
            disabled={supportUpdating}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        {isEditingSupport ? (
          <SupportEdit
            data={supportDetails}
            onSave={handleSupportSave}
            onCancel={handleSupportCancel}
          />
        ) : (
          <Support
            data={supportDetails}
            onEdit={handleSupportEdit}
          />
        )}
      </div>

      {supportUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-navy-800 rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brandGreen"></div>
            <span className="text-navy-700 dark:text-white">Updating support details...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;