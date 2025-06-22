'use client';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/form/AddProductSize';
import PointLoyaltyTable from 'components/admin/default/PointLoyaltyTable';
import AddLoyalty from 'components/form/AddLoyalty';
import CustomerTable from 'components/admin/default/CustomerTable';

type Customer = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
};

const customerData: Customer[] = [
  {
    id: "CUST001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "+1-202-555-0101",
    createdAt: "2024-11-15",
  },
  {
    id: "CUST002",
    name: "Brian Smith",
    email: "brian.smith@example.com",
    phoneNumber: "+1-202-555-0102",
    createdAt: "2024-12-02",
  },
  {
    id: "CUST003",
    name: "Catherine Lee",
    email: "catherine.lee@example.com",
    phoneNumber: "+1-202-555-0103",
    createdAt: "2025-01-05",
  },
  {
    id: "CUST004",
    name: "David Kim",
    email: "david.kim@example.com",
    phoneNumber: "+1-202-555-0104",
    createdAt: "2025-01-22",
  },
  {
    id: "CUST005",
    name: "Emily Nguyen",
    email: "emily.nguyen@example.com",
    phoneNumber: "+1-202-555-0105",
    createdAt: "2025-02-10",
  },
  {
    id: "CUST006",
    name: "Frank Turner",
    email: "frank.turner@example.com",
    phoneNumber: "+1-202-555-0106",
    createdAt: "2025-02-28",
  },
  {
    id: "CUST007",
    name: "Grace Patel",
    email: "grace.patel@example.com",
    phoneNumber: "+1-202-555-0107",
    createdAt: "2025-03-14",
  },
  {
    id: "CUST008",
    name: "Henry Zhao",
    email: "henry.zhao@example.com",
    phoneNumber: "+1-202-555-0108",
    createdAt: "2025-04-01",
  },
  {
    id: "CUST009",
    name: "Isabelle Martinez",
    email: "isabelle.martinez@example.com",
    phoneNumber: "+1-202-555-0109",
    createdAt: "2025-04-21",
  },
  {
    id: "CUST010",
    name: "Jack O'Neil",
    email: "jack.oneil@example.com",
    phoneNumber: "+1-202-555-0110",
    createdAt: "2025-05-10",
  },
  {
    id: "CUST011",
    name: "Karen Chow",
    email: "karen.chow@example.com",
    phoneNumber: "+1-202-555-0111",
    createdAt: "2025-06-01",
  },
];

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <CustomerTable customerData={customerData} onAddClick={onOpen} />
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add Product" size="xl">
        <AddLoyalty />
      </CustomModal>
    </div>
  );
};

export default Dashboard;