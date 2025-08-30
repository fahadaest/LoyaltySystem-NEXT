import React from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = () => {
    // Sample products data
    const products = [
        {
            id: 1,
            name: "Espresso",
            description: "Pure, rich, and intense",
            price: "35.00",
            size: "Large",
            image: "/img/sample/productSample1.svg"
        },
        {
            id: 2,
            name: "Cappuccino",
            description: "Espresso, steamed milk....",
            price: "30.00",
            size: "Medium",
            image: "/img/sample/productSample2.svg"
        },
        {
            id: 3,
            name: "Matcha Latte",
            description: "Green tea powder with mi..",
            price: "25.00",
            size: "Small",
            image: "/img/sample/productSample3.svg"
        },
        {
            id: 4,
            name: "Affogato",
            description: "Vanilla ice cream \"dron...",
            price: "30.00",
            size: "Medium",
            image: "/img/sample/productSample4.svg"
        },
        {
            id: 5,
            name: "Iced Latte",
            description: "Espresso with cold mi..",
            price: "30.00",
            size: "Large",
            image: "/img/sample/productSample5.svg"
        },
        {
            id: 6,
            name: "Matcha",
            description: "Green tea powder with...",
            price: "25.00",
            size: "Small",
            image: "/img/sample/productSample6.svg"
        },
        {
            id: 7,
            name: "Spanish Latte",
            description: "Espresso with cold mil...",
            price: "30.00",
            size: "Medium",
            image: "/img/sample/productSample7.svg"
        },
        {
            id: 8,
            name: "Hot Chocolate",
            description: "Pure, rich, and intense",
            price: "45.00",
            size: "Large",
            image: "/img/sample/productSample8.svg"
        }
    ];

    const handleEdit = (product) => {
        console.log("Edit product:", product);
    };

    const handleDelete = (product) => {
        console.log("Delete product:", product);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-3xl p-2 shadow-sm">
            <div className="grid grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsGrid;