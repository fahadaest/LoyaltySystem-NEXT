'use client';
import React, { useState, useEffect } from 'react';
import AdminForm from 'components/superadmin/AdminForm';
import { useRouter, useParams } from 'next/navigation';
import Card from 'components/card';

const EditAdminPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [adminToEdit, setAdminToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const mockAdmins = [
        {
          id: 1,
          email: 'john.doe@example.com',
          name: 'John Doe',
          role: 'Super Admin',
          status: 'Active',
          createdAt: '2024-01-15',
          lastLogin: '2024-06-17',
          countryCode: '+1',
          phoneNumber: '1234567890',
          loyaltyAccess: {
            pointBased: true,
            productBased: true,
          },
        },
        {
          id: 2,
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          role: 'Admin',
          status: 'Active',
          createdAt: '2024-02-20',
          lastLogin: '2024-06-16',
          countryCode: '+44',
          phoneNumber: '9876543210',
          loyaltyAccess: {
            pointBased: true,
            productBased: false,
          },
        },
        {
          id: 3,
          email: 'mike.johnson@example.com',
          name: 'Mike Johnson',
          role: 'Admin',
          status: 'Inactive',
          createdAt: '2024-03-10',
          lastLogin: '2024-06-10',
          countryCode: '+1',
          phoneNumber: '5555555555',
          loyaltyAccess: {
            pointBased: false,
            productBased: true,
          },
        },
        {
          id: 4,
          email: 'sarah.wilson@example.com',
          name: 'Sarah Wilson',
          role: 'Admin',
          status: 'Active',
          createdAt: '2024-04-05',
          lastLogin: '2024-06-15',
          countryCode: '+91',
          phoneNumber: '7777777777',
          loyaltyAccess: {
            pointBased: true,
            productBased: true,
          },
        },
      ];

      const foundAdmin = mockAdmins.find(
        (admin) => admin.id === parseInt(id[0]),
      );
      if (foundAdmin) {
        setAdminToEdit(foundAdmin);
      } else {
        // Redirect if admin not found
        router.push('/superadmin/manage-admin/list');
      }
      setLoading(false);
    }
  }, [id, router]);

  const handleEditSubmit = async (formData) => {
    // Simulate API call for updating an admin
    console.log(`Updating Admin ${id}:`, formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Admin updated successfully!');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <p className="text-gray-600">Loading admin data...</p>
      </div>
    );
  }

  if (!adminToEdit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <p className="text-red-600">Admin not found.</p>
      </div>
    );
  }

  return (
    <div className="mt-3 h-full px-4 py-5">
      <Card extra="p-6">
        <AdminForm
          initialData={adminToEdit}
          onSubmit={handleEditSubmit}
          onCancel={handleCancel}
          isEditMode={true}
        />
      </Card>
    </div>
  );
};

export default EditAdminPage;
