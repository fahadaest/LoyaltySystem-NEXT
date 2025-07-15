import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline, IoCopyOutline } from "react-icons/io5";
import Button from "components/button/Button";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductLoyaltyCard = ({ product, extra, onDelete, onEdit, onView, onCopy }) => {
  const [heart, setHeart] = useState(true);
  const fullImageUrl = baseUrl + product?.product?.image;

  console.log("product", product)

  const handleView = () => {
    onView(product)
  }
  const handleEdit = () => {
    onEdit(product)
  }
  const handleDelete = () => {
    onDelete(product.id);
  }
  const handleCopy = () => {
    onCopy(product);
  }
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full flex justify-between">
        <div className=" flex gap-5 justify-between ">
          <div className="relative w-36 h-36">
            <img
              src={fullImageUrl}
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              alt=""
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {product?.rewardTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {product?.rewardDescription}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Product: {product?.product?.name}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Purchase Quantity: {product?.purchaseQuantity}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Reward Product: {product?.rewardProducts}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Reward Description: {product?.rewardDescription}{" "}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <Button
            icon={IoEyeOutline}
            size="icon"
            color="bg-brandBlue"
            onClick={handleView}
          />
          <Button
            icon={IoCreateOutline}
            size="icon"
            color="bg-brandGreen"
            onClick={handleEdit}
          />
          <Button
            icon={IoTrashOutline}
            size="icon"
            color="bg-brandRed"
            onClick={handleDelete}
          />
          <Button
            icon={IoCopyOutline}
            size="icon"
            color="bg-brandYellow"
            onClick={handleCopy}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductLoyaltyCard;
