'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminForm from 'components/superadmin/AdminForm';
import Card from 'components/card';

export default function CreateAdminPage() {
  const router = useRouter();

  const handleCreateSubmit = async (formData) => {
    console.log('Submitting new admin:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/superadmin/manage-admin/list');
  };

  const handleCancel = () => {
    router.push('/superadmin/manage-admin/list');
  };

  return (
    <div className="mt-3 h-full px-4 py-5">
      <Card extra="p-6">
        <AdminForm
          onSubmit={handleCreateSubmit}
          onCancel={handleCancel}
          isEditMode={false}
        />
      </Card>
    </div>
  );
}
