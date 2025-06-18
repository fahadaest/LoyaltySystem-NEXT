import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline, IoCopyOutline } from "react-icons/io5";
import Button from "components/button/Button";

const ProductLoyaltyCard = ({ rewardTitle, rewardDescription, product, purchaseQuantity, title, author, image, extra }) => {
  const [heart, setHeart] = useState(true);
  const handleEdit = () => {
    console.log('Edit clicked');
  }
  const handleDelete = () => {
    console.log('Delete clicked');
  }
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full flex justify-between">
        <div className=" flex gap-5 justify-between ">
          <div className="relative w-36 h-36">
            <img
              src={image}
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              alt=""
            />
          </div>

          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {rewardTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {rewardDescription}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Product: {product}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Purchase Quantity: {purchaseQuantity}{" "}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <Button
            icon={IoEyeOutline}
            size="icon"
            color="bg-brandBlue"
            onClick={handleEdit}
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
            onClick={handleEdit}
          />
          <Button
            icon={IoCopyOutline}
            size="icon"
            color="bg-brandYellow"
            onClick={handleEdit}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductLoyaltyCard;
