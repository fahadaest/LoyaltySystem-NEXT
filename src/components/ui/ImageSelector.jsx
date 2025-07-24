'use client';
import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdFileUpload, MdClose, MdCrop, MdCheck, MdImage } from "react-icons/md";
import AnimatedButton from "./AnimatedButton";

const ImageSelector = ({
    label,
    value,
    onChange,
    onBlobChange,
    aspectRatio,
    error,
    required = false,
    placeholder = "Upload an image",
    className = '',
    maxWidth = 400,
    maxHeight = 300,
    quality = 0.95,
    ...props
}) => {
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [currentImageToCrop, setCurrentImageToCrop] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 60,
        height: 60,
        x: 20,
        y: 20
    });
    const cropImageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [imageNaturalDimensions, setImageNaturalDimensions] = useState({ width: 0, height: 0 });

    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const hasError = !!error;
    const hasValue = value && value.trim() !== '';

    console.log("crop-----> ", crop)

    // Calculate proper crop dimensions based on aspect ratio and image dimensions
    const calculateCropDimensions = (imageWidth, imageHeight, aspectRatio) => {
        const imageAspectRatio = imageWidth / imageHeight;

        let cropWidth, cropHeight;

        if (imageAspectRatio > aspectRatio) {
            // Image is wider than desired aspect ratio
            // Base crop size on image height
            cropHeight = Math.min(60, (imageHeight / Math.max(imageWidth, imageHeight)) * 100);
            cropWidth = cropHeight * aspectRatio * (imageHeight / imageWidth);
        } else {
            // Image is taller than desired aspect ratio
            // Base crop size on image width
            cropWidth = Math.min(60, (imageWidth / Math.max(imageWidth, imageHeight)) * 100);
            cropHeight = cropWidth / aspectRatio * (imageWidth / imageHeight);
        }

        return {
            width: Math.min(cropWidth, 80), // Max 80% of image
            height: Math.min(cropHeight, 80), // Max 80% of image
            x: Math.max(10, (100 - cropWidth) / 2), // Center horizontally
            y: Math.max(10, (100 - cropHeight) / 2) // Center vertically
        };
    };

    useEffect(() => {
        if (imageNaturalDimensions.width && imageNaturalDimensions.height && aspectRatio) {
            const newCropDimensions = calculateCropDimensions(
                imageNaturalDimensions.width,
                imageNaturalDimensions.height,
                aspectRatio
            );

            setCrop(prev => {
                // Only update if the new dimensions are significantly different
                const widthDiff = Math.abs(prev.width - newCropDimensions.width);
                const heightDiff = Math.abs(prev.height - newCropDimensions.height);

                if (widthDiff > 1 || heightDiff > 1) {
                    return {
                        ...prev,
                        ...newCropDimensions
                    };
                }
                return prev;
            });
        }
    }, [aspectRatio, imageNaturalDimensions.width, imageNaturalDimensions.height]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (cropModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [cropModalOpen]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150);
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCurrentImageToCrop({ file, src: e.target.result, name: file.name });
                setCropModalOpen(true);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    const onImageLoadCallback = useCallback((img) => {
        cropImageRef.current = img;
        if (img && img.naturalWidth && img.naturalHeight) {
            setImageNaturalDimensions(prev => {
                // Only update if dimensions actually changed
                if (prev.width !== img.naturalWidth || prev.height !== img.naturalHeight) {
                    return {
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    };
                }
                return prev;
            });
        }
    }, []);

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

        ctx.drawImage(
            image,
            cropX * scaleX,
            cropY * scaleY,
            cropWidth * scaleX,
            cropHeight * scaleY,
            0,
            0,
            cropWidth * scaleX,
            cropHeight * scaleY
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
        });
    };

    const handleCropComplete = async () => {
        if (cropImageRef.current && crop.width && crop.height) {
            try {
                const blob = await getCroppedImg(cropImageRef.current, crop);
                const imageUrl = URL.createObjectURL(blob);
                onChange(imageUrl);
                if (onBlobChange) {
                    onBlobChange(blob);
                }
            } catch (error) {
                console.error('Error cropping image:', error);
            }
        }

        setCropModalOpen(false);
        setCurrentImageToCrop(null);
    };

    const handleRemoveImage = (e) => {
        e?.stopPropagation();

        if (value && value.startsWith('blob:')) {
            URL.revokeObjectURL(value);
        }

        onChange('');
        if (onBlobChange) {
            onBlobChange(null);
        }

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150);
    };

    const handleCropMouseDown = (e) => {
        e.stopPropagation();
        if (!cropImageRef.current) return;

        setIsDragging(true);
        const rect = cropImageRef.current.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        setDragStart({
            x: mouseX - crop.x,
            y: mouseY - crop.y
        });
    };

    const handleResizeMouseDown = (e, corner) => {
        e.stopPropagation();
        if (!cropImageRef.current) return;

        setIsResizing(corner);
        const rect = cropImageRef.current.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        setDragStart({ x: mouseX, y: mouseY });
    };

    const handleMouseMove = (e) => {
        if (!cropImageRef.current || (!isDragging && !isResizing)) return;

        const rect = cropImageRef.current.getBoundingClientRect();
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
        }

        if (isResizing && imageNaturalDimensions.width && imageNaturalDimensions.height) {
            const deltaX = mouseX - dragStart.x;
            const deltaY = mouseY - dragStart.y;

            let newWidth = crop.width;
            let newHeight = crop.height;
            let newX = crop.x;
            let newY = crop.y;

            // Calculate the actual aspect ratio correction factor based on image dimensions
            const imageAspectRatio = imageNaturalDimensions.width / imageNaturalDimensions.height;
            const aspectRatioCorrection = aspectRatio / imageAspectRatio;

            if (isResizing === 'se') {
                newWidth = Math.max(10, Math.min(crop.width + deltaX, 100 - crop.x));
                newHeight = newWidth / aspectRatioCorrection;

                // Ensure height doesn't exceed bounds
                if (newHeight > 100 - crop.y) {
                    newHeight = 100 - crop.y;
                    newWidth = newHeight * aspectRatioCorrection;
                }
            }

            if (isResizing === 'sw') {
                const maxWidthChange = Math.min(deltaX, crop.x);
                newWidth = Math.max(10, crop.width - maxWidthChange);
                newHeight = newWidth / aspectRatioCorrection;
                newX = crop.x + crop.width - newWidth;

                // Ensure height doesn't exceed bounds
                if (newHeight > 100 - crop.y) {
                    newHeight = 100 - crop.y;
                    newWidth = newHeight * aspectRatioCorrection;
                    newX = crop.x + crop.width - newWidth;
                }
            }

            if (isResizing === 'ne') {
                const maxHeightChange = Math.min(-deltaY, crop.y);
                newHeight = Math.max(10, crop.height - maxHeightChange);
                newWidth = newHeight * aspectRatioCorrection;
                newY = crop.y + crop.height - newHeight;

                // Ensure width doesn't exceed bounds
                if (newWidth > 100 - crop.x) {
                    newWidth = 100 - crop.x;
                    newHeight = newWidth / aspectRatioCorrection;
                    newY = crop.y + crop.height - newHeight;
                }
            }

            if (isResizing === 'nw') {
                const maxWidthChange = Math.min(deltaX, crop.x);
                const maxHeightChange = Math.min(-deltaY, crop.y);

                newWidth = Math.max(10, crop.width - maxWidthChange);
                newHeight = newWidth / aspectRatioCorrection;

                newX = crop.x + crop.width - newWidth;
                newY = crop.y + crop.height - newHeight;

                // Adjust if exceeding bounds
                if (newY < 0) {
                    newY = 0;
                    newHeight = crop.y + crop.height;
                    newWidth = newHeight * aspectRatioCorrection;
                    newX = crop.x + crop.width - newWidth;
                }
            }

            // Final bounds checking
            newWidth = Math.min(newWidth, 100 - newX);
            newHeight = Math.min(newHeight, 100 - newY);

            setCrop(prev => ({
                ...prev,
                width: Math.max(10, newWidth),
                height: Math.max(10, newHeight),
                x: Math.max(0, newX),
                y: Math.max(0, newY)
            }));

            setDragStart({ x: mouseX, y: mouseY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, crop, aspectRatio, imageNaturalDimensions]);

    // Modal component to render with createPortal
    const CropModal = () => (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
            style={{ zIndex: 999999 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setCropModalOpen(false);
                    setCurrentImageToCrop(null);
                }
            }}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-white flex items-center gap-2">
                        <MdCrop className="text-brandGreen" />
                        Crop Image
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                            ({aspectRatio.toFixed(2)}:1 ratio)
                        </span>
                    </h3>
                    <button
                        onClick={() => {
                            setCropModalOpen(false);
                            setCurrentImageToCrop(null);
                        }}
                        className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <MdClose size={24} />
                    </button>
                </div>

                {/* Image Crop Area */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            ref={onImageLoadCallback}
                            src={currentImageToCrop?.src}
                            alt="Crop preview"
                            className="max-w-full max-h-[50vh] object-contain select-none rounded-lg"
                            style={{ cursor: 'default' }}
                        />
                    </div>


                    {/* Crop Overlay */}
                    <div
                        className="absolute border-2 border-brandGreen bg-brandGreen bg-opacity-20 cursor-move rounded"
                        style={{
                            left: `${crop.x}%`,
                            top: `${crop.y}%`,
                            width: `${crop.width}%`,
                            height: `${crop.height}%`
                        }}
                        onMouseDown={handleCropMouseDown}
                    >
                        {/* Resize Handles */}
                        <div
                            className="absolute -top-1 -left-1 w-3 h-3 bg-brandGreen border-2 border-white cursor-nw-resize rounded-full shadow-md"
                            onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
                        ></div>
                        <div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-brandGreen border-2 border-white cursor-ne-resize rounded-full shadow-md"
                            onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
                        ></div>
                        <div
                            className="absolute -bottom-1 -left-1 w-3 h-3 bg-brandGreen border-2 border-white cursor-sw-resize rounded-full shadow-md"
                            onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
                        ></div>
                        <div
                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-brandGreen border-2 border-white cursor-se-resize rounded-full shadow-md"
                            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
                        ></div>
                    </div>
                </div>

                {/* Debug Info */}
                <div className="text-xs text-gray-500 mb-4">
                    <div>Image: {imageNaturalDimensions.width} × {imageNaturalDimensions.height}</div>
                    <div>Crop: {crop.width.toFixed(1)}% × {crop.height.toFixed(1)}% at ({crop.x.toFixed(1)}%, {crop.y.toFixed(1)}%)</div>
                    <div>Target Aspect Ratio: {aspectRatio.toFixed(2)}:1</div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Instructions:</span> Drag to move • Drag corners to resize
                    </div>
                    <div className="flex gap-3">
                        <AnimatedButton
                            variant="secondary"
                            onClick={() => {
                                setCropModalOpen(false);
                                setCurrentImageToCrop(null);
                            }}
                            icon={MdClose}
                        >
                            Cancel
                        </AnimatedButton>
                        <AnimatedButton
                            variant="primary"
                            onClick={handleCropComplete}
                            icon={MdCheck}
                        >
                            Apply Crop
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label with Icon */}
            <div className="flex items-center gap-2">
                <MdImage size={16} className="text-brandGreen" />
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {hasValue && (
                    <div className="flex items-center animate-fadeIn">
                        <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                        <span className="text-xs text-brandGreen font-medium">✓</span>
                    </div>
                )}
            </div>

            {/* Image Selector */}
            <div className="relative group">
                {!hasValue ? (
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className={`w-full py-8 px-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200
                            ${hasError
                                ? 'border-red-500 hover:border-red-400'
                                : 'border-gray-200 hover:border-brandGreen dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }
                            ${isAnimating ? 'scale-105 border-brandGreen' : 'scale-100'}
                            transform focus:outline-none focus:ring-2 focus:ring-brandGreen focus:ring-opacity-50`}
                    >
                        <MdFileUpload
                            className={`text-4xl mb-2 transition-all duration-200 
                                ${hasError ? 'text-red-500' : 'text-brandGreen dark:text-white group-hover:text-brandGreen'}
                                ${isAnimating ? 'scale-110' : 'scale-100'} transform`}
                        />
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-white mb-1">
                            {placeholder}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, and GIF files are allowed
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Aspect Ratio: {aspectRatio.toFixed(2)}:1
                        </p>
                    </button>
                ) : (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                        <img
                            src={value}
                            alt="Selected"
                            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                            style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                                <AnimatedButton
                                    size="sm"
                                    variant="secondary"
                                    onClick={handleUploadClick}
                                    className="bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100"
                                >
                                    Change
                                </AnimatedButton>
                                <AnimatedButton
                                    size="sm"
                                    variant="secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage(e);
                                    }}
                                    className="bg-red-500 bg-opacity-90 text-white hover:bg-red-600 hover:bg-opacity-100"
                                    icon={MdClose}
                                >
                                    Remove
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                )}

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                {...props}
            />

            {/* Error Message */}
            {hasError && (
                <div className="animate-slideDown">
                    <p className="text-sm text-red-500 flex items-center gap-2">
                        <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                </div>
            )}

            {/* Render Crop Modal using createPortal */}
            {cropModalOpen && currentImageToCrop && typeof window !== 'undefined' &&
                createPortal(<CropModal />, document.body)
            }

            {/* Hidden Canvas for Image Processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default ImageSelector;