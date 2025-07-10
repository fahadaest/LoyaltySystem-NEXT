import React, { useState, useEffect } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import Button from "components/button/Button";
import { MdAdd, MdEdit } from "react-icons/md";
import { useCreateProductSizeMutation, useUpdateProductSizeMutation } from "store/apiEndPoints/productSizesApi";
import { useDispatch } from "react-redux";
import { showAlert } from "store/apiEndPoints/alertSlice";

const AddProductSizeComponent = ({ productSize, onClose }) => {
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [createProductSize, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateProductSizeMutation();
  const [updateProductSize, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateProductSizeMutation();

  useEffect(() => {
    if (productSize) {
      setSize(productSize.size);
    }
  }, [productSize]);

  const handleAddOrEditProductSize = async () => {
    if (!size) {
      dispatch(showAlert({ message: "Please enter a size.", severity: "error", duration: 2000 }));
      return;
    }

    try {
      if (productSize) {
        const formData = { size };
        await updateProductSize({ id: productSize.id, formData });
        dispatch(showAlert({ message: "Product size updated successfully!", severity: "success", duration: 2000 }));
        onClose();
      } else {
        const formData = { size };
        await createProductSize(formData);
        dispatch(showAlert({ message: "Product size added successfully!", severity: "success", duration: 2000 }));
        setSize("");
        onClose();
      }
    } catch (error) {
      console.error("Error handling product size:", error);
      dispatch(showAlert({ message: "Failed to process product size.", severity: "error", duration: 2000 }));
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
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