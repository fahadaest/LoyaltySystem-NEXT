import { Admin, useDeleteAdminMutation } from 'store/apiEndPoints/adminApi';
import { Spinner, Text } from '@chakra-ui/react';
import Button from 'components/button/Button';

export const DeleteAdminContent = ({ admin, onClose }: { admin: Admin; onClose: () => void }) => {
  const [deleteAdmin, { isLoading, isError, isSuccess }] = useDeleteAdminMutation();

  const handleDelete = async () => {
    try {
      await deleteAdmin(admin.id).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to delete admin:", err);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="space-y-4">
        <Text>
          Are you sure you want to delete{' '}
          <Text as="span" fontWeight="bold">
            {admin.firstName} {admin.lastName}
          </Text>
          ?
        </Text>

        {isError && <Text color="red.500">Failed to delete admin. Try again.</Text>}
        {isSuccess && <Text color="green.500">Admin deleted successfully.</Text>}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button
          text="Cancel"
          size="md"
          color="bg-gray-200"
          hoverColor="hover:bg-gray-300"
          onClick={onClose}
          extra="flex-1"
          icon={undefined}
        />
        <Button
          text="Delete"
          size="md"
          color="bg-brandRed"
          hoverColor="hover:bg-red-700"
          onClick={handleDelete}
          extra="flex-1"
          icon={undefined}
        />
      </div>
    </div>
  );
};
