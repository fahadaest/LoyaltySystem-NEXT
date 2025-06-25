import React, { useState, useEffect } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import Button from "components/button/Button";
import { MdAdd, MdEdit } from "react-icons/md";
import { useCreateProductSizeMutation, useUpdateProductSizeMutation } from "store/productSizesApi";

const AddProductSizeComponent = ({ productSize, onClose }) => {
  const [size, setSize] = useState("");
  const [createProductSize, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateProductSizeMutation();
  const [updateProductSize, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateProductSizeMutation();

  useEffect(() => {
    if (productSize) {
      setSize(productSize.size);
    }
  }, [productSize]);

  const handleAddOrEditProductSize = async () => {
    if (!size) {
      alert("Please enter a size.");
      return;
    }

    try {
      if (productSize) {
        const formData = { size };
        await updateProductSize({ id: productSize.id, formData });

        if (isUpdateSuccess) {
          alert("Product size updated successfully!");
          onClose();
        }
      } else {
        const formData = { size };
        await createProductSize(formData);

        if (isCreateSuccess) {
          alert("Product size added successfully!");
          setSize("");
        }
      }
    } catch (error) {
      console.error("Error handling product size:", error);
      alert("Failed to process product size.");
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
        icon={productSize ? MdEdit : MdAdd}
        text={productSize ? (isUpdating ? "Updating..." : "Save Changes") : (isCreating ? "Adding..." : "Add Product Size")}
        size="sm"
        color="bg-brandGreen"
        className="col-span-11 w-full"
        onClick={handleAddOrEditProductSize}
        disabled={isCreating || isUpdating}
      />
    </Card>
  );
};

export default AddProductSizeComponent;