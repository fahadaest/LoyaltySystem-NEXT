import React, { useState, useRef, useCallback } from "react";
import { MdFileUpload, MdClose, MdCrop, MdCheck, MdAdd } from "react-icons/md";
import { FiPlus } from 'react-icons/fi';
import Button from "components/button/Button";

const AddProductForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImageToCrop, setCurrentImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 40, height: 30, x: 30, y: 35 }); // 4:3 ratio
  const [cropImageRef, setCropImageRef] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const sizeOptions = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];

  const handleUploadClick = () => fileInputRef.current?.click();

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

  const onImageLoad = useCallback((img) => setCropImageRef(img), []);

  const getCroppedImg = (image, crop) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageRect = image.getBoundingClientRect();
    const scaleX = image.naturalWidth / imageRect.width;
    const scaleY = image.naturalHeight / imageRect.height;
    const cropX = (crop.x / 100) * imageRect.width;
    const cropY = (crop.y / 100) * imageRect.height;
    const cropWidth = (crop.width / 100) * imageRect.width;
    const cropHeight = (crop.height / 100) * imageRect.height;

    canvas.width = cropWidth * scaleX;
    canvas.height = cropHeight * scaleY;
    ctx.drawImage(image, cropX * scaleX, cropY * scaleY, cropWidth * scaleX, cropHeight * scaleY, 0, 0, cropWidth * scaleX, cropHeight * scaleY);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => blob && resolve(URL.createObjectURL(blob)), 'image/jpeg', 0.95);
    });
  };

  const handleCropComplete = async () => {
    if (cropImageRef && crop.width && crop.height) {
      try {
        previewImage && URL.revokeObjectURL(previewImage);
        const croppedImageUrl = await getCroppedImg(cropImageRef, crop);
        croppedImageUrl && setPreviewImage(croppedImageUrl);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
    setCropModalOpen(false);
    setCurrentImageToCrop(null);
    setCrop({ unit: '%', width: 40, height: 30, x: 30, y: 35 });
  };

  const removeImage = () => {
    previewImage && URL.revokeObjectURL(previewImage);
    setPreviewImage(null);
  };

  const handleCropMouseDown = (e) => {
    e.stopPropagation();
    if (!cropImageRef) return;

    setIsDragging(true);
    const rect = cropImageRef.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setDragStart({
      x: mouseX - crop.x,
      y: mouseY - crop.y
    });
  };

  const handleResizeMouseDown = (e, corner) => {
    e.stopPropagation();
    if (!cropImageRef) return;

    setIsResizing(corner);
    const rect = cropImageRef.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setDragStart({ x: mouseX, y: mouseY });
  };

  const handleMouseMove = (e) => {
    if (!cropImageRef || (!isDragging && !isResizing)) return;

    const rect = cropImageRef.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    if (isDragging) {
      const newX = Math.max(0, Math.min(mouseX - dragStart.x, 100 - crop.width));
      const newY = Math.max(0, Math.min(mouseY - dragStart.y, 100 - crop.height));

      setCrop(prev => ({
        ...prev,
        x: newX,
        y: newY
      }));
    } else if (isResizing) {
      const deltaX = mouseX - dragStart.x;
      const deltaY = mouseY - dragStart.y;
      let newWidth, newHeight, newX = crop.x, newY = crop.y;

      if (isResizing === 'se') {
        const maxWidthFromPosition = 100 - crop.x;
        const maxHeightFromPosition = 100 - crop.y;

        const sizeDelta = Math.max(deltaX, deltaY * (4 / 3));
        newWidth = Math.max(10, Math.min(crop.width + sizeDelta, maxWidthFromPosition));
        newHeight = (newWidth * 3) / 4;

        if (newHeight > maxHeightFromPosition) {
          newHeight = maxHeightFromPosition;
          newWidth = (newHeight * 4) / 3;
        }

      } else if (isResizing === 'sw') {
        const maxWidthFromPosition = crop.x + crop.width;
        const maxHeightFromPosition = 100 - crop.y;

        const sizeDelta = Math.max(-deltaX, deltaY * (4 / 3));
        newWidth = Math.max(10, Math.min(crop.width + sizeDelta, maxWidthFromPosition));
        newHeight = (newWidth * 3) / 4;

        if (newHeight > maxHeightFromPosition) {
          newHeight = maxHeightFromPosition;
          newWidth = (newHeight * 4) / 3;
        }

        newX = crop.x + crop.width - newWidth;

      } else if (isResizing === 'ne') {
        const maxWidthFromPosition = 100 - crop.x;
        const maxHeightFromPosition = crop.y + crop.height;

        const sizeDelta = Math.max(deltaX, -deltaY * (4 / 3));
        newWidth = Math.max(10, Math.min(crop.width + sizeDelta, maxWidthFromPosition));
        newHeight = (newWidth * 3) / 4;

        if (newHeight > maxHeightFromPosition) {
          newHeight = maxHeightFromPosition;
          newWidth = (newHeight * 4) / 3;
        }

        newY = crop.y + crop.height - newHeight;

      } else if (isResizing === 'nw') {
        const maxWidthFromPosition = crop.x + crop.width;
        const maxHeightFromPosition = crop.y + crop.height;

        const sizeDelta = Math.max(-deltaX, -deltaY * (4 / 3));
        newWidth = Math.max(10, Math.min(crop.width + sizeDelta, maxWidthFromPosition));
        newHeight = (newWidth * 3) / 4;

        if (newHeight > maxHeightFromPosition) {
          newHeight = maxHeightFromPosition;
          newWidth = (newHeight * 4) / 3;
        }

        newX = crop.x + crop.width - newWidth;
        newY = crop.y + crop.height - newHeight;
      }

      newWidth = Math.max(10, Math.min(newWidth, 100));
      newHeight = Math.max(7.5, Math.min(newHeight, 100));
      newX = Math.max(0, Math.min(newX, 100 - newWidth));
      newY = Math.max(0, Math.min(newY, 100 - newHeight));

      setCrop(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY
      }));

      setDragStart({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, crop, dragStart]);

  return (
    <div className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-8 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
        <div className="mb-3">
          <label className="text-sm font-bold text-navy-700 dark:text-white">Product Name</label>
          <input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white" placeholder="Your Product Name Here" id="product-name" type="text" />
        </div>
        <div className="mb-3">
          <label className="text-sm font-bold text-navy-700 dark:text-white">Sizes</label>
          <select className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Select product size</option>
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-span-11 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-3 flex flex-col items-center justify-center bg-gray-50">
        <input type="file" accept="image/png, image/jpeg, image/gif" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        {!previewImage ? (
          <button type="button" onClick={handleUploadClick} className="h-full p-5 flex flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0 w-full hover:bg-gray-100 transition-colors">
            <MdFileUpload className="text-[50px] text-brandGreen dark:text-white" />
            <h4 className="text-lg font-bold text-brandGreen dark:text-white">Upload File</h4>
            <p className="mt-2 text-xs font-medium text-gray-600">PNG, JPG and GIF files are allowed</p>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative group w-full h-full rounded-lg overflow-hidden border-2 border-gray-200">
              <img src={previewImage} alt="preview" className="w-full h-full object-cover" />
              <button type="button" onClick={removeImage} className="absolute top-1 right-1 hidden rounded-full bg-red-500 bg-opacity-80 p-1 text-white group-hover:block hover:bg-red-600 transition-colors" aria-label="Remove image">
                <MdClose size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-11">
        <label className="text-sm font-bold text-navy-700 dark:text-white">Product Description</label>
        <textarea className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white min-h-[100px] resize-vertical" placeholder="Your Product Description Here" id="product-description" />
      </div>

      <Button
        icon={MdAdd}
        text="Add Product"
        size="sm"
        color="bg-brandGreen"
        className="col-span-11 w-full"
      />

      {cropModalOpen && currentImageToCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center h-full z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 max-w-4xl w-full h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
                <MdCrop className="text-blue-500" />
                Crop Image (4:3 Aspect Ratio)
              </h3>
              <button onClick={() => setCropModalOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                <MdClose size={24} />
              </button>
            </div>
            <div className="relative inline-block max-w-full">
              <img
                ref={onImageLoad}
                src={currentImageToCrop.src}
                alt="Crop preview"
                className="max-w-full max-h-[40vh] object-contain select-none"
                style={{ cursor: 'default' }}
              />
              {/* Crop overlay */}
              <div
                className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 cursor-move"
                style={{
                  left: `${crop.x}%`,
                  top: `${crop.y}%`,
                  width: `${crop.width}%`,
                  height: `${crop.height}%`
                }}
                onMouseDown={handleCropMouseDown}
              >
                {/* Resize handles */}
                <div
                  className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white cursor-nw-resize"
                  onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
                ></div>
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white cursor-ne-resize"
                  onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
                ></div>
                <div
                  className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white cursor-sw-resize"
                  onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
                ></div>
                <div
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white cursor-se-resize"
                  onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Drag to move • Drag corners to resize • 4:3 aspect ratio maintained
              </div>
              <div className="flex gap-3">
                <Button
                  icon={MdClose}
                  text="Cancel"
                  size="sm"
                  color="bg-brandRed"
                  className="col-span-11 w-full"
                  onClick={() => setCropModalOpen(false)}
                />
                <Button
                  icon={MdCheck}
                  text="Apply Crop"
                  size="sm"
                  color="bg-brandGreen"
                  className="col-span-11 w-full"
                  onClick={handleCropComplete}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default AddProductForm;