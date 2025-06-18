import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";

const AddProductSizeComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">

      <div className="col-span-11 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Size"
          placeholder="Enter Size (e.g., Small, Medium)"
          id="product-name"
          type="text"
        />
      </div>


      <button
        href=" "
        className="col-span-11 linear mt-4 flex items-center justify-center rounded-xl bg-brandGreen px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Add Size
      </button>

    </Card>
  );
};

export default AddProductSizeComponent;
