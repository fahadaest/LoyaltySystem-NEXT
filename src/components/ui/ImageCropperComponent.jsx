import React, { useState, useRef, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import Button from '../buttons/Button';

const ImageCropperComponent = ({
    label,
    required = false,
    aspectRatio = null,
    width = "100%",
    height = "180px",
    onImageCropped = () => { },
    initialImage = null,
    placeholder = "Click to upload",
    className = ""
}) => {
    const [image, setImage] = useState(initialImage);
    const [showCropper, setShowCropper] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [originalUrl, setOriginalUrl] = useState(null);
    const fileRef = useRef();

    const onCropComplete = useCallback((_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels), []);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file?.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setOriginalUrl(url);
            setShowCropper(true);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
        }
    };

    const getCroppedImg = async () => {
        const img = new Image();
        img.src = originalUrl;
        return new Promise((resolve) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = croppedArea.width;
                canvas.height = croppedArea.height;
                ctx.drawImage(img, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, croppedArea.width, croppedArea.height);
                canvas.toBlob(resolve, 'image/jpeg', 0.9);
            };
        });
    };

    const handleCropConfirm = async () => {
        if (!croppedArea) return;
        const blob = await getCroppedImg();
        if (blob) {
            const url = URL.createObjectURL(blob);
            setImage(url);
            setShowCropper(false);
            onImageCropped(new File([blob], 'image.jpg', { type: 'image/jpeg' }), url);
        }
    };

    const reset = () => {
        setImage(null);
        originalUrl && URL.revokeObjectURL(originalUrl);
        setOriginalUrl(null);
        onImageCropped(null, null);
    };

    const closeCropper = () => {
        setShowCropper(false);
        originalUrl && URL.revokeObjectURL(originalUrl);
        setOriginalUrl(null);
    };

    return (
        <>
            <div className={className}>
                {label && (
                    <label className="block text-[0.6rem] font-medium text-black mb-1">
                        {label}{required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative" style={{ width, height }}>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                    <div onClick={() => fileRef.current?.click()} className="w-full h-full border-2 border-dashed border-gray-300 rounded-[15px] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors relative group">
                        {image ? (
                            <>
                                <img src={image} alt="" className="w-full h-full object-cover rounded-[15px]" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-[15px] flex items-center justify-center">
                                    <span className="text-white text-[0.6rem] opacity-0 group-hover:opacity-100">Click to change</span>
                                </div>
                                <Button
                                    onClick={(e) => { e.stopPropagation(); reset(); }}
                                    backgroundColor="#000000"
                                    textColor="#ffffff"
                                    width="20px"
                                    height="20px"
                                    borderRadius="50%"
                                    padding="0"
                                    border="none"
                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    showIcon={true}
                                    iconPosition="center"
                                    icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDZMNiAxOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYgNkwxOCAxOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+"
                                    iconWidth="10px"
                                    iconHeight="10px"
                                    iconImageWidth="10px"
                                    iconImageHeight="10px"
                                    iconBackgroundColor="transparent"
                                />
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                                <span className="text-[0.6rem] text-gray-500 text-center px-2">{placeholder}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showCropper && originalUrl && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] p-5 w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-medium">Crop Image</h3>
                            <Button
                                onClick={closeCropper}
                                backgroundColor="#000000"
                                textColor="#ffffff"
                                width="28px"
                                height="28px"
                                borderRadius="50%"
                                padding="0"
                                border="none"
                                showIcon={true}
                                iconPosition="center"
                                icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDZMNiAxOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYgNkwxOCAxOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+"
                                iconWidth="14px"
                                iconHeight="14px"
                                iconImageWidth="14px"
                                iconImageHeight="14px"
                                iconBackgroundColor="transparent"
                            />
                        </div>

                        <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden mb-2" style={{ minHeight: '300px' }}>
                            <Cropper image={originalUrl} crop={crop} zoom={zoom} aspect={aspectRatio} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
                        </div>

                        <div className="mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs w-8">Zoom:</span>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onChange={(e) => setZoom(+e.target.value)}
                                    className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #000 0%, #000 ${((zoom - 1) / 2) * 100}%, #e5e7eb ${((zoom - 1) / 2) * 100}%, #e5e7eb 100%)`
                                    }}
                                />
                                <span className="text-xs w-8">{zoom.toFixed(1)}x</span>
                            </div>
                        </div>

                        <style jsx>{`
                            input[type="range"]::-webkit-slider-thumb {
                                appearance: none;
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #000;
                                cursor: pointer;
                                border: 2px solid #fff;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            }
                            input[type="range"]::-moz-range-thumb {
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #000;
                                cursor: pointer;
                                border: 2px solid #fff;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                border: none;
                            }
                        `}</style>

                        <div className="flex justify-end gap-2">
                            <Button
                                text="Cancel"
                                onClick={closeCropper}
                                backgroundColor="#f3f4f6"
                                textColor="#374151"
                                height="30px"
                                fontSize="9px"
                                padding="0 16px"
                                borderRadius="18px"
                                border="none"
                            />
                            <Button
                                text="Crop Image"
                                onClick={handleCropConfirm}
                                backgroundColor="#000000"
                                textColor="#ffffff"
                                height="30px"
                                fontSize="9px"
                                padding="0 16px"
                                borderRadius="18px"
                                border="none"
                                showIcon={true}
                                icon="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4'/%3E%3C/svg%3E"
                                iconPosition="right"
                                iconWidth="16px"
                                iconHeight="16px"
                                iconImageWidth="10px"
                                iconImageHeight="10px"
                                iconBackgroundColor="#ffffff"
                                iconBorderRadius="50%"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageCropperComponent;