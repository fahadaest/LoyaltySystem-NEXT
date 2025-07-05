'use client';
import { useState, useEffect } from 'react';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { useGetAllProductsQuery, useDeleteProductMutation } from 'store/productsApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';
import CircularProgress from '@mui/material/CircularProgress';
import AddWalletCardForm from 'components/wallet-cards/AddWalletCardForm';
import AppleWalletEditor from 'components/wallet-cards/AddWalletCardForm';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { data: products, error, isLoading, refetch } = useGetAllProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        await deleteProduct(deleteItemId).unwrap();
        dispatch(showAlert({ message: "Product deleted successfully!", severity: "success", duration: 2000 }));
        setDeleteItemId(null);
        onClose();
      } catch (error) {
        dispatch(showAlert({ message: "Product deletion failed!", severity: "error", duration: 2000 }));
      }
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    onOpen();
  };

  return (
    <div className="relative">
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaBox className="text-brandGreen" />} subtitle="Manage Cards">
          <HeaderButton
            icon={MdAdd}
            text="Add Card"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddProduct}
          />
        </HeadingCard>
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose}
        title="Wallet Card Editor"
        size="4xl"
        noScroll={true} >
        <AppleWalletEditor isModal={true} />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={deleteItemId !== null}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleConfirmDelete}
        itemName={deleteItemId ? `Product ${deleteItemId}` : ""}
        title="Delete Product"
      />
    </div>
  );
};

export default Dashboard;