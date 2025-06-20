'use client';
import React from 'react';
import AdminForm from 'components/superadmin/AdminForm';
import { useRouter } from 'next/navigation';

const CreateAdminPage = () => {
  const router = useRouter();

  const handleCreateSubmit = async (formData) => {
    // Simulate API call for creating an admin
    console.log('Creating Admin:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    alert('Admin created successfully!');
    // In a real app, you'd integrate with your backend to save the new admin
    router.push('/superadmin/manage-admin/list'); // Navigate back to the list after creation
  };

  const handleCancel = () => {
    router.push('/superadmin/manage-admin/list');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AdminForm
        onSubmit={handleCreateSubmit}
        onCancel={handleCancel}
        isEditMode={false} // Explicitly set to false for create mode
      />
    </div>
  );
};

export default CreateAdminPage;
