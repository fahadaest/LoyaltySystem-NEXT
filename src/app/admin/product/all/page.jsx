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
import { useGetAllProductsQuery, useDeleteProductMutation } from 'store/apiEndPoints/productsApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import CircularProgress from '@mui/material/CircularProgress';

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
        <HeadingCard icon={<FaBox className="text-brandGreen" />} subtitle="Manage Products">
          <HeaderButton
            icon={MdAdd}
            text="Add Product"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddProduct}
          />
        </HeadingCard>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-20">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <CircularProgress style={{ color: "#36a18f" }} />
            </div>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                image={product.image}
                size={product.size ? product.size.size : null}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product.id)}
                extra="any-additional-classes"
              />
            ))
          ) : (
            <div className="col-span-full text-center flex flex-col items-center justify-center">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                No products available yet
              </div>
              <p className="text-sm text-gray-500 mb-4">
                It looks like you haven't added any products. Click the button below to add your first product.
              </p>
              <HeaderButton
                icon={MdAdd}
                text="Add Your First Product"
                size="md"
                color="bg-brandGreen"
                onClick={handleAddProduct}
                className="mt-4"
              />
            </div>
          )}
        </div>
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title={selectedProduct ? "Edit Product" : "Add Product"} size="xl">
        <AddProductForm product={selectedProduct} onClose={onClose} />
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