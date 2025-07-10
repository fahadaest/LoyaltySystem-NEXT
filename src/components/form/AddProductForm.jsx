import React, { useState, useRef, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import Button from "components/button/Button";
import { useCreateProductMutation, useUpdateProductMutation } from "store/apiEndPoints/productsApi";
import { useGetAllProductSizesQuery } from "store/apiEndPoints/productSizesApi";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useDispatch } from 'react-redux';
import { showAlert } from "store/apiEndPoints/alertSlice";
import ImageUploaderAndCropper from "components/imageUploader/ImageUploaderAndCropper";

const AddProductForm = ({ product, onClose }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updatingProduct }] = useUpdateProductMutation();
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const fullImageUrl = baseUrl + product?.image;
  const { data: productSizes, error: productSizesError, isLoading: productSizesLoading } = useGetAllProductSizesQuery(undefined);
  const dispatch = useDispatch();

  const sizeOptions = productSizes ? productSizes.map((option) => ({
    value: option.id,
    label: option.size,
  })) : [];

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setDescription(product.description);
      setSize(product.size ? product.size.id : '');
      setPreviewImage(fullImageUrl || null);
    } else {
      setProductName('');
      setDescription('');
      setSize('');
      setPreviewImage(null);
    }
  }, [product]);


  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentImageToCrop({ file, src: e.target.result, name: file.name });
        setCropModalOpen(true);
        setCrop({ unit: '%', width: 40, height: 30, x: 30, y: 35 });
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleAddProduct = async () => {
    if (!productName || !description || !size || !imageBlob) {
      dispatch(showAlert({ message: 'Please fill out all fields and upload an image.', severity: 'error', duration: 2000 }));
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('sizeId', size);
    formData.append('image', imageBlob, 'product.jpg');

    try {
      await createProduct(formData).unwrap();
      dispatch(showAlert({ message: 'Product created successfully!', severity: 'success', duration: 2000 }));
      setProductName('');
      setDescription('');
      setSize('');
      setPreviewImage(null);
      onClose();
    } catch (err) {
      dispatch(showAlert({ message: 'Product creation failed!', severity: 'error', duration: 2000 }));
    }
  };

  const handleUpdateProduct = async () => {
    if (!productName || !description || !size) {
      dispatch(showAlert({ message: 'Please fill out all fields.', severity: 'error', duration: 2000 }));
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('sizeId', size);

    if (imageBlob) {
      formData.append('image', imageBlob, 'product.jpg');
    } else {
      if (product && product.image) {
        formData.append('image', product.image);
      }
    }

    if (product && product.id) {
      try {
        await updateProduct({
          id: product.id,
          formData,
        }).unwrap();
        dispatch(showAlert({ message: 'Product updated successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (err) {
        dispatch(showAlert({ message: 'Product update failed!', severity: 'error', duration: 2000 }));
      }
    } else {
      dispatch(showAlert({ message: 'Product not found for update.', severity: 'error', duration: 2000 }));
    }
  };

  return (
    <div className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-8 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
        <div className="mb-3">
          <label className="text-sm font-bold text-navy-700 dark:text-white">Product Name</label>
          <input
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            placeholder="Your Product Name Here"
            id="product-name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="text-sm font-bold text-navy-700 dark:text-white">Sizes</label>
          <select className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select product size</option>
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-span-11 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-3 flex flex-col items-center justify-center bg-gray-50">
        <ImageUploaderAndCropper
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          onCropComplete={(blob) => setImageBlob(blob)}
          removeImage={() => setPreviewImage(null)}
        />
        <input type="file" accept="image/png, image/jpeg, image/gif" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <div className="col-span-11">
        <label className="text-sm font-bold text-navy-700 dark:text-white">Product Description</label>
        <textarea
          className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white min-h-[100px] resize-vertical"
          placeholder="Your Product Description Here"
          id="product-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="col-span-11">
        <Button
          icon={MdAdd}
          text={product ? (isLoading ? 'Updating...' : 'Update Product') : (isLoading ? 'Creating...' : 'Add Product')}
          size="sm"
          color="bg-brandGreen"
          className="w-full"
          onClick={product ? handleUpdateProduct : handleAddProduct}
        />
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default AddProductForm;