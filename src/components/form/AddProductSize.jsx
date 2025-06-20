import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import Button from "components/button/Button";
import { MdAdd, MdFilterList } from "react-icons/md";

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

      <Button
        icon={MdAdd}
        text="Add Product"
        size="sm"
        color="bg-brandGreen"
        className="col-span-11 w-full"
      />
    </Card >
  );
};

export default AddProductSizeComponent;
