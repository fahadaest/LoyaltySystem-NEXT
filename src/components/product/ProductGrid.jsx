import React from 'react';
import ProductCard from './ProductCard';
import NoDataComponent from '@/components/ui/NoDataComponent';
import { useGetAllProductsQuery, useDeleteProductMutation } from '@/store/slices/productsApis';

const ProductsGrid = ({ onAddProduct, onEditProduct }) => {
    const { data: products = [], isLoading, error } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const handleEdit = (product) => {
        if (onEditProduct) {
            onEditProduct(product);
        }
    };

    const handleDelete = async (product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            try {
                await deleteProduct(product.id).unwrap();
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-center">
                    <div className="text-gray-500">Loading products...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-center">
                    <div className="text-red-500">Failed to load products</div>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm h-full min-h-[calc(100vh-13rem)] flex items-center justify-center">
                <NoDataComponent
                    type="products"
                    onButtonClick={onAddProduct}
                />
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-3xl p-2 shadow-sm">
            <div className="grid grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={{
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price || '0.00',
                            size: product?.size?.size || 'N/A',
                            image: product.image,
                        }}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsGrid;