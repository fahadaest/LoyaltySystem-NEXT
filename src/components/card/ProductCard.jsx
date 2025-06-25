import Card from "components/card";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Button from "components/button/Button";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductCard = ({ title, price, image, size, product, onEdit, onDelete, extra }) => {
    const fullImageUrl = baseUrl + image;
    return (
        <Card extra={`flex flex-col w-full !p-0 bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden ${extra}`} >
            <div className="relative w-full aspect-[4/3]">
                <img
                    src={fullImageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="flex justify-between gap-3 p-4 ">
                <div className=" flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-navy-800 dark:text-white">{title}</h2>
                    <div className="flex items-center justify-start">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60">
                            <span className="text-xs font-medium text-gray-600">Size: {size}</span>
                            <span className="text-sm font-bold text-emerald-600">{price}</span>
                        </div>
                    </div>
                </div>

                <div className=" flex flex-col gap-2">
                    <Button
                        icon={IoCreateOutline}
                        text="Edit"
                        size="icon"
                        color="bg-brandGreen"
                        onClick={onEdit}
                    />
                    <Button
                        icon={IoTrashOutline}
                        text="Delete"
                        size="icon"
                        color="bg-brandRed"
                        onClick={() => onDelete(product.id)}
                    />
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
