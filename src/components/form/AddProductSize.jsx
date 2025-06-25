import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import InputField from "components/fields/InputField";
import Button from "components/button/Button";
import { MdAdd, MdFilterList } from "react-icons/md";
import { useCreateProductSizeMutation } from "store/productSizesApi";

const AddProductSizeComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];
  const [size, setSize] = useState("");
  const [createProductSize, { isLoading, isError, error, isSuccess }] = useCreateProductSizeMutation();

  const handleAddProductSize = async () => {
    if (!size) {
      alert("Please enter a size.");
      return;
    }

    try {
      await createProductSize({ size });
      if (isSuccess) {
        alert("Product size added successfully!");
        setSize("");
      }
    } catch (error) {
      console.error("Error adding product size:", error);
      alert("Failed to add product size.");
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-11 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
        <InputField
          variant="auth"
          extra="mb-3"
          label="Size"
          placeholder="Enter Size (e.g., Small, Medium)"
          id="product-size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      <Button
        icon={MdAdd}
        text={isLoading ? "Adding..." : "Add Product Size"}
        size="sm"
        color="bg-brandGreen"
        className="col-span-11 w-full"
        onClick={handleAddProductSize}
        disabled={isLoading}
      />
    </Card>
  );
};

export default AddProductSizeComponent;
