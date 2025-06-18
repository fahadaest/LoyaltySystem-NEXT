import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";

const ProductCard = ({ title, author, price, image, extra }) => {
    return (
        <Card extra={`flex flex-col w-full !p-0 bg-white shadow-md hover:shadow-brandGreenHighlight shadow-gray-200 transition-transform duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden ${extra}`} >
            <div className="relative w-full aspect-[4/3]">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-3 p-4">
                <div>
                    <h2 className="text-xl font-semibold text-navy-800 dark:text-white">{title}</h2>
                    {author && (
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                            by <span className="font-medium text-gray-700">{author}</span>
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-start">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60">
                        <span className="text-xs font-medium text-gray-600">Size:</span>
                        <span className="text-sm font-bold text-emerald-600">{price}</span>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        className="flex-1 bg-brandGreen hover:bg-brandGreenDark text-white font-medium py-1 px-2 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg group/edit relative overflow-hidden"
                        aria-label="Edit product"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/edit:translate-y-0 transition-transform duration-300 rounded-xl" />
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            <IoCreateOutline size={18} />
                            <span>Edit</span>
                        </div>
                    </button>

                    <button
                        className="flex-1 bg-brandRed hover:bg-brandRedDark text-white font-medium py-1 px-2 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg group/delete relative overflow-hidden"
                        aria-label="Delete product"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/delete:translate-y-0 transition-transform duration-300 rounded-xl" />
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            <IoTrashOutline size={18} />
                            <span>Delete</span>
                        </div>
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;