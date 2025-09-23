import React from 'react';
import { getImageUrl } from '@/utils/imageUtils';

const ProductCard = ({ product, onEdit, onDelete }) => {
    console.log("product", product)
    return (
        <div className="bg-gray-100 border border-gray-200 rounded-3xl p-2 w-full">
            {/* Product Image */}
            <div className="relative w-full h-40 mb-4 rounded-3xl overflow-hidden group">
                <div
                    className="w-full h-full bg-cover bg-center rounded-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2"
                    style={{ backgroundImage: `url(${getImageUrl(product.image) || '/img/sample/productSample1.svg'})` }}
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center gap-4">
                    {/* Edit Icon */}
                    <button
                        onClick={() => onEdit(product)}
                        className="bg-white bg-opacity-60 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-200"
                    >
                        <img
                            src="/img/general/edit_icon.svg"
                            alt="Edit"
                            className="w-5 h-5"
                        />
                    </button>

                    {/* Delete Icon */}
                    <button
                        onClick={() => onDelete(product)}
                        className="bg-white bg-opacity-60 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-200"
                    >
                        <img
                            src="/img/general/delete_icon.svg"
                            alt="Delete"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="mb-2 flex justify-between items-center">

                <div>
                    <h3
                        className="text-black mb-1"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '10px',
                            fontWeight: '500',
                            lineHeight: '150%'
                        }}
                    >
                        {product.name}
                    </h3>

                    <p
                        className="text-gray-500 mb-2"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '8px',
                            fontWeight: '400',
                            lineHeight: '150%',
                            color: '#636363'
                        }}
                    >
                        {product.description}
                    </p>
                </div>


                <div className="flex gap-1 flex-col justify-between items-center">
                    <span
                        className="text-black"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '10px',
                            fontWeight: '500',
                            lineHeight: '150%'
                        }}
                    >
                        AED {product.price}
                    </span>

                    <span
                        className="px-[0.4rem] py-[0.1rem] border border-gray-400 rounded-full text-gray-500"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '8px',
                            fontWeight: '300',
                            lineHeight: '140%',
                            borderColor: '#636363',
                            color: '#636363'
                        }}
                    >
                        {product.size}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-2" />

            {/* Actions */}
            <div className="flex justify-between items-center gap-1">
                <button
                    onClick={() => onEdit(product)}
                    className="bg-black text-white px-6 py-[0.5rem] rounded-full flex items-center justify-center flex-1"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '10px',
                        fontWeight: '600',
                        lineHeight: '140%',
                    }}
                >
                    Edit Product
                </button>

                <button
                    onClick={() => onDelete(product)}
                    className="p-2 flex-shrink-0"
                >
                    <img
                        src="/img/general/delete_icon.svg"
                        alt="Delete"
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;