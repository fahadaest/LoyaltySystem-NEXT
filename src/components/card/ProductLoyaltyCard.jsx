import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline, IoCopyOutline } from "react-icons/io5";

const ProductLoyaltyCard = ({ rewardTitle, rewardDescription, product, purchaseQuantity, title, author, image, extra }) => {
  const [heart, setHeart] = useState(true);
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
          <button
            className="linear rounded-[5px] bg-brandBlue p-2 text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            aria-label="View"
          >
            <IoEyeOutline size={15} />
          </button>
          <button
            className="linear rounded-[5px] bg-brandGreen p-2 text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            aria-label="Edit"
          >
            <IoCreateOutline size={15} />
          </button>
          <button
            className="linear rounded-[5px] bg-brandRed p-2 text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            aria-label="Delete"
          >
            <IoTrashOutline size={15} />
          </button>
          <button
            className="linear rounded-[5px] bg-brandYellow p-2 text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            aria-label="Copy URL"
          >
            <IoCopyOutline size={15} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProductLoyaltyCard;
