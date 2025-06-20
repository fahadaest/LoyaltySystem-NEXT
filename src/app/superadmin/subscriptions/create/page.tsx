'use client';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import SubscriptionForm from 'components/superadmin/SubscriptionForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSubscriptionPageWrapper() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = () => {
    router.push('/superadmin/subscriptions/list');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Create New Subscription"
        size="2xl"
      >
        <SubscriptionForm mode="create" onSuccess={handleClose} />
      </CustomModal>
    </div>
  );
}
