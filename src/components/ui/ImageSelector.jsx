import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Upload, Crop, Check, X, RotateCcw } from 'lucide-react';

const ImageSelector = ({
    label,
    value,
    onChange,
    onBlobChange,
    aspectRatio = 1,
    placeholder = "Upload image",
    maxHeight = 200,
    error,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [loading, setLoading] = useState(false);

    const imgRef = useRef(null);
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    // Handle file selection
    const handleFileSelect = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImgSrc(reader.result?.toString() || '');
            setIsOpen(true);
        });
        reader.readAsDataURL(file);
    }, []);

    // Initialize crop when image loads
    const onImageLoad = useCallback((e) => {
        const { width: displayedWidth, height: displayedHeight } = e.currentTarget;

        // Calculate crop dimensions based on the displayed image size (not natural size)
        let cropWidth, cropHeight;
        if (displayedWidth / displayedHeight > aspectRatio) {
            cropHeight = displayedHeight * 0.8; // Use 80% of displayed height
            cropWidth = cropHeight * aspectRatio;
        } else {
            cropWidth = displayedWidth * 0.8; // Use 80% of displayed width
            cropHeight = cropWidth / aspectRatio;
        }

        // Ensure crop doesn't exceed image boundaries
        cropWidth = Math.min(cropWidth, displayedWidth * 0.9);
        cropHeight = Math.min(cropHeight, displayedHeight * 0.9);

        const crop = {
            unit: 'px',
            width: cropWidth,
            height: cropHeight,
            x: (displayedWidth - cropWidth) / 2,
            y: (displayedHeight - cropHeight) / 2,
        };

        setCrop(crop);
        setCompletedCrop(crop);
    }, [aspectRatio]);

    // Generate cropped image
    const getCroppedImg = useCallback(async () => {
        if (!completedCrop || !imgRef.current || !canvasRef.current) return;

        setLoading(true);

        const image = imgRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const croppedImageUrl = URL.createObjectURL(blob);
                    onChange?.(croppedImageUrl);
                    onBlobChange?.(blob);
                    resolve(croppedImageUrl);
                }
            }, 'image/jpeg', 0.9);
        });
    }, [completedCrop, onChange, onBlobChange]);

    // Handle crop confirmation
    const handleCropConfirm = useCallback(async () => {
        await getCroppedImg();
        setIsOpen(false);
        setImgSrc('');
        setLoading(false);
    }, [getCroppedImg]);

    // Handle crop cancel
    const handleCropCancel = useCallback(() => {
        setIsOpen(false);
        setImgSrc('');
        setCrop(undefined);
        setCompletedCrop(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    // Reset/clear image
    const handleReset = useCallback(() => {
        onChange?.('');
        onBlobChange?.(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [onChange, onBlobChange]);

    return (
        <>
            <div className={`space-y-2 ${className}`}>
                {/* Label */}
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    {label}
                </label>

                {/* Upload Area or Preview */}
                <div className="relative">
                    {value ? (
                        <div className="relative group">
                            <img
                                src={value}
                                alt="Preview"
                                className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 object-cover"
                                style={{ maxHeight, aspectRatio }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                                    title="Change image"
                                >
                                    <Crop className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                    title="Remove image"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                            style={{ minHeight: maxHeight }}
                        >
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">{placeholder}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Aspect ratio: {aspectRatio.toFixed(2)}:1
                            </p>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>

                {/* Error message */}
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            {/* Crop Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Crop Image
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Ratio: {aspectRatio.toFixed(2)}:1
                                </span>
                            </div>
                        </div>

                        {/* Crop Area - This will take available space */}
                        <div className="flex-1 p-4 flex items-center justify-center overflow-hidden min-h-0">
                            {imgSrc && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        aspect={aspectRatio}
                                        minWidth={50}
                                        minHeight={50 / aspectRatio}
                                        className="max-w-full max-h-full"
                                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                                    >
                                        <img
                                            ref={imgRef}
                                            alt="Crop me"
                                            src={imgSrc}
                                            onLoad={onImageLoad}
                                            className="max-w-full max-h-full object-contain"
                                            style={{
                                                maxHeight: 'calc(95vh - 200px)', // Account for header and footer
                                                maxWidth: '100%',
                                                height: 'auto',
                                                width: 'auto'
                                            }}
                                        />
                                    </ReactCrop>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                            <button
                                type="button"
                                onClick={handleCropCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCropConfirm}
                                disabled={loading || !completedCrop}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Apply Crop
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Hidden canvas for processing */}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}
        </>
    );
};

export default ImageSelector;