import React from "react";
import Card from "components/card";
import { FaRuler } from "react-icons/fa";
import AnimatedInput from "components/ui/AnimatedInput";

const AddProductSizeComponent = ({
  productSize,
  formData,
  formErrors,
  onFormDataChange,
  isLoading
}) => {
  const handleSizeChange = (value) => {
    onFormDataChange('size', value);
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-11 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
        <AnimatedInput
          label="Product Size"
          icon={FaRuler}
          value={formData.size}
          onChange={handleSizeChange}
          placeholder="Enter size (e.g., Small, Medium, Large, XL)"
          error={formErrors.size}
          required={true}
          disabled={isLoading}
          className="mb-4"
        />

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2 text-brandGreen">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brandGreen"></div>
              <span className="text-sm">
                {productSize ? "Updating..." : "Adding..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AddProductSizeComponent;