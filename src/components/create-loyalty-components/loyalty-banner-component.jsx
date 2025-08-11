import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Upload, Download, Palette, Type, Square, Move, RotateCcw, Image } from 'lucide-react';
import ImageSelector from 'components/ui/ImageSelector';
import AnimatedInput from 'components/ui/AnimatedInput';
import ColorPicker from 'components/ui/ColorPicker';

const BannerEditor = () => {
    // Form data state
    const [formData, setFormData] = useState({
        bannerTitle: 'Your Banner Title',
        bannerTitleColor: '#ffffff',
        templateColor: '#4F46E5',
        selectedImage: ''
    });

    // Title positioning and sizing state
    const [titleState, setTitleState] = useState({
        x: 0,
        y: 0,
        fontSize: 18,
        isSelected: false,
        isDragging: false,
        isResizing: false
    });

    // Refs for drag functionality
    const titleRef = useRef(null);
    const bannerRef = useRef(null);
    const dragStart = useRef({ x: 0, y: 0, elementX: 0, elementY: 0 });
    const resizeStart = useRef({ fontSize: 18, startY: 0 });

    const updateFormField = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // Handle title selection
    const handleTitleClick = useCallback((e) => {
        e.stopPropagation();
        setTitleState(prev => ({ ...prev, isSelected: true }));
    }, []);

    // Handle clicking outside to deselect
    const handleBannerClick = useCallback((e) => {
        if (e.target === bannerRef.current || e.target.closest('.banner-background')) {
            setTitleState(prev => ({ ...prev, isSelected: false }));
        }
    }, []);

    // Handle drag start
    const handleDragStart = useCallback((e) => {
        if (!titleState.isSelected) return;

        e.preventDefault();
        const rect = bannerRef.current.getBoundingClientRect();

        dragStart.current = {
            x: e.clientX,
            y: e.clientY,
            elementX: titleState.x,
            elementY: titleState.y
        };

        setTitleState(prev => ({ ...prev, isDragging: true }));
    }, [titleState.isSelected, titleState.x, titleState.y]);

    // Handle resize start
    const handleResizeStart = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();

        resizeStart.current = {
            fontSize: titleState.fontSize,
            startY: e.clientY
        };

        setTitleState(prev => ({ ...prev, isResizing: true }));
    }, [titleState.fontSize]);

    // Handle mouse move
    const handleMouseMove = useCallback((e) => {
        if (titleState.isDragging) {
            const deltaX = e.clientX - dragStart.current.x;
            const deltaY = e.clientY - dragStart.current.y;

            const newX = dragStart.current.elementX + deltaX;
            const newY = dragStart.current.elementY + deltaY;

            // Constrain to banner bounds
            const maxX = 300; // Approximate banner width minus title width
            const maxY = 100; // Approximate top section height

            setTitleState(prev => ({
                ...prev,
                x: Math.max(-150, Math.min(maxX, newX)),
                y: Math.max(-30, Math.min(maxY, newY))
            }));
        } else if (titleState.isResizing) {
            const deltaY = resizeStart.current.startY - e.clientY; // Inverted for intuitive resize
            const newFontSize = Math.max(12, Math.min(32, resizeStart.current.fontSize + deltaY * 0.5));

            setTitleState(prev => ({
                ...prev,
                fontSize: newFontSize
            }));
        }
    }, [titleState.isDragging, titleState.isResizing]);

    // Handle mouse up
    const handleMouseUp = useCallback(() => {
        setTitleState(prev => ({
            ...prev,
            isDragging: false,
            isResizing: false
        }));
    }, []);

    // Add event listeners
    React.useEffect(() => {
        if (titleState.isDragging || titleState.isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [titleState.isDragging, titleState.isResizing, handleMouseMove, handleMouseUp]);

    // Reset title position and size
    const resetTitle = () => {
        setTitleState(prev => ({
            ...prev,
            x: 0,
            y: 0,
            fontSize: 18
        }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto min-h-screen p-4">
            <div className="flex gap-6">
                {/* Left Panel - Controls */}
                <div className="flex-1 bg-white bg-pink-100 shadow-lg rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Banner Settings</h2>


                    {/* Banner Title */}
                    <div className="flex gap-4 items-end mb-6">
                        <div className="flex-1">
                            <AnimatedInput
                                label="Banner Title"
                                icon={Type}
                                placeholder="Enter banner title"
                                value={formData.bannerTitle}
                                onChange={(value) => updateFormField('bannerTitle', value)}
                                required
                                error={undefined}
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <ColorPicker
                                label="Title Color"
                                value={formData.bannerTitleColor}
                                onChange={(value) => updateFormField('bannerTitleColor', value)}
                                required
                                error={undefined}
                            />
                        </div>
                    </div>

                    {/* Template Color */}
                    <div className="mb-6">
                        <ColorPicker
                            label="Background Color"
                            value={formData.templateColor}
                            onChange={(value) => updateFormField('templateColor', value)}
                        />
                    </div>

                    {/* Image Selection */}
                    <div className="mb-6">
                        <ImageSelector
                            label="Banner Image"
                            value={formData.selectedImage}
                            onChange={(value) => updateFormField('selectedImage', value)}
                            aspectRatio={1.33} // 4:3 aspect ratio for banner
                            placeholder="Upload banner image"
                            maxHeight={150}
                        />
                    </div>

                    {/* Title Controls */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-3">Title Controls</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                                <input
                                    type="range"
                                    min="12"
                                    max="32"
                                    value={titleState.fontSize}
                                    onChange={(e) => setTitleState(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-500">{titleState.fontSize}px</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">X Position</label>
                                    <input
                                        type="number"
                                        value={Math.round(titleState.x)}
                                        onChange={(e) => setTitleState(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                                        className="w-full px-2 py-1 border rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Y Position</label>
                                    <input
                                        type="number"
                                        value={Math.round(titleState.y)}
                                        onChange={(e) => setTitleState(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                                        className="w-full px-2 py-1 border rounded text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={resetTitle}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-sm"
                            >
                                <RotateCcw size={14} />
                                Reset Position
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Panel - Banner Preview */}
                <div style={{ width: '377px', height: '525px' }}>
                    <h2 className="text-lg font-bold mb-4">Banner Preview</h2>

                    {/* A4 Banner Canvas */}
                    <div
                        ref={bannerRef}
                        className="relative cursor-default shadow-2xl overflow-hidden banner-background"
                        style={{ width: '377px', height: '525px' }}
                        onClick={handleBannerClick}
                    >
                        {/* Top Section */}
                        <div
                            className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3"
                            style={{
                                height: '30%',
                                backgroundColor: formData?.templateColor,
                                borderBottom: '2px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            {/* Title */}
                            <div
                                ref={titleRef}
                                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none ${titleState.isSelected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                                    } ${titleState.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                                style={{
                                    color: formData?.bannerTitleColor,
                                    fontSize: `${titleState.fontSize}px`,
                                    fontWeight: 'bold',
                                    transform: `translate(calc(-50% + ${titleState.x}px), calc(-50% + ${titleState.y}px))`,
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    position: 'relative'
                                }}
                                onClick={handleTitleClick}
                                onMouseDown={handleDragStart}
                            >
                                {formData?.bannerTitle}

                                {/* Selection indicators */}
                                {titleState.isSelected && (
                                    <>
                                        {/* Corner handles */}
                                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>

                                        {/* Resize handle */}
                                        <div
                                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize hover:bg-blue-600"
                                            onMouseDown={handleResizeStart}
                                        ></div>
                                    </>
                                )}
                            </div>

                            {/* QR Code Placeholder */}
                            <div
                                className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center text-white text-xs font-bold"
                            >
                                QR
                            </div>
                        </div>

                        {/* Middle Section - Image Display */}
                        <div
                            className="absolute left-0 w-full flex items-center justify-center overflow-hidden"
                            style={{
                                top: '30%',
                                height: '40%',
                                backgroundColor: 'rgba(255,255,255,0.05)'
                            }}
                        >
                            {formData.selectedImage ? (
                                <img
                                    src={formData.selectedImage}
                                    alt="Banner content"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-white text-opacity-50 text-center">
                                    <Image size={48} className="mx-auto mb-2" />
                                    <p className="text-sm">Upload an image to see it here</p>
                                </div>
                            )}
                        </div>

                        {/* Bottom Section */}
                        <div
                            className="absolute bottom-0 left-0 w-full px-4 py-4"
                            style={{
                                height: '30%',
                                backgroundColor: '#374151',
                                borderTop: '2px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <div className="flex justify-between items-center h-full">
                                {[0, 1, 2].map((idx) => (
                                    <div key={idx} className="text-center text-white max-w-24">
                                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center mb-1 mx-auto">
                                            {idx === 0 && <Square size={12} />}
                                            {idx === 1 && <Download size={12} />}
                                            {idx === 2 && <Move size={12} />}
                                        </div>
                                        <p className="text-xs leading-tight">Feature {idx + 1}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-1 right-4 text-white text-xs opacity-60">
                                Powered by RewardHive
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerEditor;