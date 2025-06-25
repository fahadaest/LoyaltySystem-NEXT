'use client';
import { useState } from 'react';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from "react-icons/md";
import { useGetAllProductsQuery, useDeleteProductMutation } from 'store/productsApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deleteItemId, setDeleteItemId] = useState(null);

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
        await deleteProduct(deleteItemId);
        onClose();
      } catch (error) {
        console.error('Error deleting product:', error);
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
        <HeadingCard subtitle="Manage Products">
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
          {products && products.length > 0 ? (
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
            <div>No products available.</div>
          )}
        </div>
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title={selectedProduct ? "Edit Product" : "Add Product"} size="xl">
        <AddProductForm product={selectedProduct} />
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