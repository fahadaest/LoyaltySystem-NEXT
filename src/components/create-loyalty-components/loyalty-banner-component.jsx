import React, { useState, useRef, useCallback } from 'react';
import { Upload, RotateCcw, X, Square, Download, Move } from 'lucide-react';
import AnimatedInput from 'components/ui/AnimatedInput';
import ColorPicker from 'components/ui/ColorPicker';

const BannerEditor = ({ formData, setFormData, previewImage, onOpenImageSelector }) => {
    // Initialize states from formData with defaults
    const [sectionHeights, setSectionHeights] = useState(formData?.sectionHeights || { top: 30, middle: 40, bottom: 30 });
    const [elements, setElements] = useState({
        title: { x: 0, y: 0, fontSize: 18, isSelected: false, isDragging: false, isResizing: false, ...formData?.titlePosition },
        qr: { x: 333, y: 12, size: 32, isSelected: false, isDragging: false, isResizing: false, ...formData?.qrPosition },
        logo: { x: 12, y: 12, size: 40, isVisible: true, isSelected: false, isDragging: false, isResizing: false, ...formData?.logoPosition },
        icon1: { x: 20, y: 0, size: 24, text: 'Feature 1', isSelected: false, isDragging: false, isResizing: false, ...formData?.icon1Position },
        icon2: { x: 120, y: 0, size: 24, text: 'Feature 2', isSelected: false, isDragging: false, isResizing: false, ...formData?.icon2Position },
        icon3: { x: 220, y: 0, size: 24, text: 'Feature 3', isSelected: false, isDragging: false, isResizing: false, ...formData?.icon3Position }
    });

    // Dragging states
    const [dragState, setDragState] = useState({ isDragging: null, isDraggingDivider: null, dragStart: {}, initialHeights: {} });

    // Refs
    const bannerRef = useRef(null);
    const elementRefs = useRef({});

    // Update form data when states change
    const updateFormData = useCallback((updates) => {
        setFormData(prev => ({ ...prev, ...updates }));
    }, [setFormData]);

    // Sync states to form data
    React.useEffect(() => {
        updateFormData({
            sectionHeights,
            titlePosition: { x: elements.title.x, y: elements.title.y, fontSize: elements.title.fontSize },
            qrPosition: { x: elements.qr.x, y: elements.qr.y, size: elements.qr.size },
            logoPosition: { x: elements.logo.x, y: elements.logo.y, size: elements.logo.size, isVisible: elements.logo.isVisible },
            icon1Position: { x: elements.icon1.x, y: elements.icon1.y, size: elements.icon1.size, text: elements.icon1.text },
            icon2Position: { x: elements.icon2.x, y: elements.icon2.y, size: elements.icon2.size, text: elements.icon2.text },
            icon3Position: { x: elements.icon3.x, y: elements.icon3.y, size: elements.icon3.size, text: elements.icon3.text }
        });
    }, [sectionHeights, elements, updateFormData]);

    // Generic element event handlers
    const handleElementClick = useCallback((elementKey, e) => {
        e.stopPropagation();
        setElements(prev => Object.keys(prev).reduce((acc, key) => {
            acc[key] = { ...prev[key], isSelected: key === elementKey };
            return acc;
        }, {}));
    }, []);

    const handleElementDragStart = useCallback((elementKey, e) => {
        if (!elements[elementKey]?.isSelected) return;
        e.preventDefault();

        setDragState(prev => ({
            ...prev,
            isDragging: elementKey,
            dragStart: { x: e.clientX, y: e.clientY, elementX: elements[elementKey].x, elementY: elements[elementKey].y }
        }));

        setElements(prev => ({ ...prev, [elementKey]: { ...prev[elementKey], isDragging: true } }));
    }, [elements]);

    const handleElementResize = useCallback((elementKey, e) => {
        e.stopPropagation();
        e.preventDefault();

        const currentValue = elementKey === 'title' ? elements[elementKey].fontSize : elements[elementKey].size;
        setDragState(prev => ({
            ...prev,
            isDragging: `${elementKey}-resize`,
            dragStart: { startY: e.clientY, startValue: currentValue }
        }));

        setElements(prev => ({ ...prev, [elementKey]: { ...prev[elementKey], isResizing: true } }));
    }, [elements]);

    // Divider drag handlers
    const handleDividerDragStart = useCallback((dividerType, e) => {
        e.preventDefault();
        setDragState(prev => ({
            ...prev,
            isDraggingDivider: dividerType,
            dragStart: { y: e.clientY },
            initialHeights: { ...sectionHeights }
        }));
    }, [sectionHeights]);

    // Mouse move handler
    const handleMouseMove = useCallback((e) => {
        const { isDragging, isDraggingDivider, dragStart, initialHeights } = dragState;

        if (isDraggingDivider) {
            const deltaY = e.clientY - dragStart.y;
            const deltaPercent = (deltaY / 525) * 100;

            if (isDraggingDivider === 'top') {
                setSectionHeights(prev => ({
                    ...prev,
                    top: Math.max(15, Math.min(70, initialHeights.top + deltaPercent)),
                    middle: Math.max(15, Math.min(70, initialHeights.middle - deltaPercent))
                }));
            } else if (isDraggingDivider === 'bottom') {
                setSectionHeights(prev => ({
                    ...prev,
                    middle: Math.max(15, Math.min(70, initialHeights.middle + deltaPercent)),
                    bottom: Math.max(15, Math.min(70, initialHeights.bottom - deltaPercent))
                }));
            }
        } else if (isDragging) {
            if (isDragging.includes('-resize')) {
                const elementKey = isDragging.replace('-resize', '');
                const deltaY = dragStart.startY - e.clientY;
                const isTitle = elementKey === 'title';
                const newValue = Math.max(
                    isTitle ? 12 : 16,
                    Math.min(isTitle ? 32 : 64, dragStart.startValue + deltaY * 0.5)
                );

                setElements(prev => ({
                    ...prev,
                    [elementKey]: {
                        ...prev[elementKey],
                        [isTitle ? 'fontSize' : 'size']: newValue
                    }
                }));
            } else {
                const deltaX = e.clientX - dragStart.x;
                const deltaY = e.clientY - dragStart.y;
                const newX = dragStart.elementX + deltaX;
                const newY = dragStart.elementY + deltaY;

                // Calculate bounds based on element
                const elementSize = elements[isDragging].size || 20;
                const bounds = {
                    minX: 12,
                    maxX: 377 - elementSize - 12,
                    minY: 12,
                    maxY: 525 - elementSize - 12
                };

                setElements(prev => ({
                    ...prev,
                    [isDragging]: {
                        ...prev[isDragging],
                        x: Math.max(bounds.minX, Math.min(bounds.maxX, newX)),
                        y: Math.max(bounds.minY, Math.min(bounds.maxY, newY))
                    }
                }));
            }
        }
    }, [dragState, elements]);

    // Mouse up handler
    const handleMouseUp = useCallback(() => {
        setDragState({ isDragging: null, isDraggingDivider: null, dragStart: {}, initialHeights: {} });
        setElements(prev => Object.keys(prev).reduce((acc, key) => {
            acc[key] = { ...prev[key], isDragging: false, isResizing: false };
            return acc;
        }, {}));
    }, []);

    // Event listeners
    React.useEffect(() => {
        if (dragState.isDragging || dragState.isDraggingDivider) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [dragState.isDragging, dragState.isDraggingDivider, handleMouseMove, handleMouseUp]);

    // Utility functions
    const resetAll = () => {
        setSectionHeights({ top: 30, middle: 40, bottom: 30 });
        setElements(prev => Object.keys(prev).reduce((acc, key) => {
            const defaults = {
                title: { x: 0, y: 0, fontSize: 18 },
                qr: { x: 333, y: 12, size: 32 },
                logo: { x: 12, y: 12, size: 40, isVisible: true },
                icon1: { x: 20, y: 0, size: 24, text: 'Feature 1' },
                icon2: { x: 120, y: 0, size: 24, text: 'Feature 2' },
                icon3: { x: 220, y: 0, size: 24, text: 'Feature 3' }
            };
            acc[key] = { ...prev[key], ...defaults[key], isSelected: false, isDragging: false, isResizing: false };
            return acc;
        }, {}));
    };

    const handleBannerClick = useCallback((e) => {
        if (e.target === bannerRef.current || e.target.closest('.banner-background')) {
            setElements(prev => Object.keys(prev).reduce((acc, key) => {
                acc[key] = { ...prev[key], isSelected: false };
                return acc;
            }, {}));
        }
    }, []);

    // Render draggable element
    const renderDraggableElement = (elementKey, content, styles = {}) => {
        const element = elements[elementKey];
        if (elementKey === 'logo' && !element.isVisible) return null;

        const isTitle = elementKey === 'title';
        const colorMap = { title: 'blue', qr: 'green', logo: 'purple', icon1: 'orange', icon2: 'orange', icon3: 'orange' };
        const color = colorMap[elementKey];

        return (
            <div
                key={elementKey}
                ref={el => elementRefs.current[elementKey] = el}
                className={`absolute cursor-pointer select-none z-20 ${element.isSelected ? `ring-2 ring-${color}-400 ring-opacity-50` : ''
                    } ${element.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    fontSize: isTitle ? `${element.fontSize}px` : undefined,
                    width: !isTitle ? `${element.size}px` : undefined,
                    height: !isTitle ? `${element.size}px` : undefined,
                    ...styles
                }}
                onClick={(e) => handleElementClick(elementKey, e)}
                onMouseDown={(e) => handleElementDragStart(elementKey, e)}
                title={`Click to select, drag to move ${elementKey}`}
            >
                {content}

                {element.isSelected && (
                    <>
                        <div className={`absolute -top-1 -left-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                        <div className={`absolute -top-1 -right-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                        <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                        <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full cursor-nw-resize hover:bg-${color}-600`}
                            onMouseDown={(e) => handleElementResize(elementKey, e)}
                        ></div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="flex gap-6">
                {/* Controls Panel */}
                <div className="flex-1 bg-pink-100 shadow-lg rounded-lg p-4 h-fit">
                    <h2 className="text-xl font-bold mb-6">Banner Settings</h2>

                    {/* Row 1: Title + Title Color + Background Colors + Logo Selector */}
                    <div className="mb-6">
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-2">
                                <AnimatedInput
                                    label="Banner Title"
                                    placeholder="Enter banner title"
                                    value={formData?.bannerTitle || ''}
                                    onChange={(value) => updateFormData({ bannerTitle: value })}
                                />
                                <ColorPicker
                                    label="Top Background"
                                    value={formData?.templateColor || '#4F46E5'}
                                    onChange={(value) => updateFormData({ templateColor: value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <ColorPicker
                                    label="Title Color"
                                    value={formData?.bannerTitleColor || '#ffffff'}
                                    onChange={(value) => updateFormData({ bannerTitleColor: value })}
                                />
                                <ColorPicker
                                    label="Bottom Background"
                                    value={formData?.bottomColor || '#374151'}
                                    onChange={(value) => updateFormData({ bottomColor: value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                                {formData?.selectedLogo ? (
                                    <div className="relative group">
                                        <img
                                            src={formData.selectedLogo}
                                            alt="Logo"
                                            className="w-full h-12 object-contain bg-gray-100 rounded border-2 border-gray-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => onOpenImageSelector('logo')}
                                                className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
                                                title="Change logo"
                                            >
                                                <Upload className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => updateFormData({ selectedLogo: '' })}
                                                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                                                title="Remove logo"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onOpenImageSelector('logo')}
                                        className="w-full h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                    >
                                        <div className="text-center">
                                            <Upload className="w-4 h-4 mx-auto mb-1" />
                                            <span className="text-xs">Logo</span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Center Image Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                        <div className="flex gap-4">
                            {formData?.selectedImage || previewImage ? (
                                <div className="flex-1 relative group">
                                    <img
                                        src={formData?.selectedImage || previewImage}
                                        alt="Banner preview"
                                        className="w-full h-20 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onOpenImageSelector('banner')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                                            title="Change image"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => updateFormData({ selectedImage: '' })}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                            title="Remove image"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <button
                                        onClick={() => onOpenImageSelector('banner')}
                                        className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                    >
                                        <div className="text-center">
                                            <Upload className="w-6 h-6 mx-auto mb-1" />
                                            <span className="text-sm">Upload Image</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Row 3: Icon Selectors */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icons</label>
                        <div className="grid grid-cols-3 gap-4">
                            {['icon1', 'icon2', 'icon3'].map((iconKey, index) => (
                                <div key={iconKey}>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Icon {index + 1}
                                    </label>
                                    {formData?.[`selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`] ? (
                                        <div className="relative group">
                                            <img
                                                src={formData[`selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`]}
                                                alt={`Icon ${index + 1}`}
                                                className="w-full h-16 object-contain bg-gray-100 rounded border-2 border-gray-300"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => onOpenImageSelector(iconKey)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
                                                    title="Change icon"
                                                >
                                                    <Upload className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => updateFormData({ [`selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`]: '' })}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                                                    title="Remove icon"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => onOpenImageSelector(iconKey)}
                                            className="w-full h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                        >
                                            <div className="text-center">
                                                <Upload className="w-4 h-4 mx-auto mb-1" />
                                                <span className="text-xs">Upload</span>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 4: Icon Texts */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon Texts</label>
                        <div className="grid grid-cols-3 gap-4">
                            {['icon1', 'icon2', 'icon3'].map((iconKey, index) => (
                                <div key={iconKey}>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Text {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        value={elements[iconKey]?.text || `Feature ${index + 1}`}
                                        onChange={(e) => setElements(prev => ({
                                            ...prev,
                                            [iconKey]: { ...prev[iconKey], text: e.target.value }
                                        }))}
                                        className="w-full px-2 py-1 border rounded text-sm"
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <div className="border-t pt-4">
                        <button
                            onClick={resetAll}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                        >
                            <RotateCcw size={16} />
                            Reset All
                        </button>
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 How to Edit</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li>• <strong>Move:</strong> Click and drag any element</li>
                            <li>• <strong>Resize:</strong> Select element, drag corner handle</li>
                            <li>• <strong>Sections:</strong> Drag white bars to resize sections</li>
                            <li>• <strong>QR Code:</strong> Drag to position, auto-shows loyaltysystem.com</li>
                        </ul>
                    </div>
                </div>

                {/* Banner Preview */}
                <div style={{ width: '377px', height: '525px' }}>
                    <h2 className="text-lg font-bold mb-4">Banner Preview</h2>

                    <div
                        ref={bannerRef}
                        className="relative shadow-2xl overflow-hidden banner-background"
                        style={{ width: '377px', height: '525px', backgroundColor: '#f3f4f6' }}
                        onClick={handleBannerClick}
                    >
                        {/* Top Section */}
                        <div
                            className="absolute top-0 left-0 w-full"
                            style={{
                                height: `${sectionHeights.top}%`,
                                backgroundColor: formData?.templateColor || '#4F46E5'
                            }}
                        >
                            {/* Title */}
                            {renderDraggableElement('title',
                                formData?.bannerTitle || 'Your Banner Title',
                                {
                                    color: formData?.bannerTitleColor || '#ffffff',
                                    fontWeight: 'bold',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(calc(-50% + ${elements.title.x}px), calc(-50% + ${elements.title.y}px))`
                                }
                            )}

                            {/* Logo */}
                            {renderDraggableElement('logo',
                                formData?.selectedLogo ? (
                                    <img src={formData.selectedLogo} alt="Logo" className="w-full h-full object-contain rounded" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-20 rounded text-white text-xs font-bold">
                                        LOGO
                                    </div>
                                )
                            )}

                            {/* QR Code */}
                            {renderDraggableElement('qr',
                                <div className="w-full h-full bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700 overflow-hidden">
                                    {/* Simple QR Code representation */}
                                    <div className="w-full h-full grid grid-cols-5 gap-0">
                                        {/* Generate a simple QR-like pattern */}
                                        {Array.from({ length: 25 }, (_, i) => {
                                            // Create a pseudo-QR pattern based on "loyaltysystem.com"
                                            const pattern = [
                                                1, 0, 1, 0, 1,
                                                0, 1, 1, 1, 0,
                                                1, 1, 0, 1, 1,
                                                0, 1, 1, 0, 1,
                                                1, 0, 1, 1, 0
                                            ];
                                            return (
                                                <div
                                                    key={i}
                                                    className={`w-full h-full ${pattern[i] ? 'bg-gray-800' : 'bg-white'}`}
                                                />
                                            );
                                        })}
                                    </div>
                                    {/* URL text overlay for small sizes */}
                                    {elements.qr.size < 40 && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 text-xs font-bold text-gray-700">
                                            QR
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Divider 1 */}
                        <div
                            className="absolute left-0 w-full h-2 cursor-row-resize hover:bg-blue-500 hover:bg-opacity-30 z-30 flex items-center justify-center"
                            style={{ top: `${sectionHeights.top}%`, transform: 'translateY(-50%)' }}
                            onMouseDown={(e) => handleDividerDragStart('top', e)}
                        >
                            <div className="w-8 h-1 bg-white bg-opacity-60 rounded-full"></div>
                        </div>

                        {/* Middle Section */}
                        <div
                            className="absolute left-0 w-full flex items-center justify-center overflow-hidden"
                            style={{
                                top: `${sectionHeights.top}%`,
                                height: `${sectionHeights.middle}%`,
                                backgroundColor: 'rgba(255,255,255,0.05)'
                            }}
                        >
                            {formData?.selectedImage || previewImage ? (
                                <img
                                    src={formData?.selectedImage || previewImage}
                                    alt="Banner content"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <div className="text-4xl mb-2">🖼️</div>
                                    <p className="text-sm">Upload an image</p>
                                </div>
                            )}
                        </div>

                        {/* Divider 2 */}
                        <div
                            className="absolute left-0 w-full h-2 cursor-row-resize hover:bg-blue-500 hover:bg-opacity-30 z-30 flex items-center justify-center"
                            style={{ top: `${sectionHeights.top + sectionHeights.middle}%`, transform: 'translateY(-50%)' }}
                            onMouseDown={(e) => handleDividerDragStart('bottom', e)}
                        >
                            <div className="w-8 h-1 bg-white bg-opacity-60 rounded-full"></div>
                        </div>

                        {/* Bottom Section */}
                        <div
                            className="absolute bottom-0 left-0 w-full px-4 py-4 flex flex-col justify-between"
                            style={{
                                height: `${sectionHeights.bottom}%`,
                                backgroundColor: formData?.bottomColor || '#374151'
                            }}
                        >
                            {/* Icons */}
                            <div className="flex-1 flex items-center justify-center relative">
                                {['icon1', 'icon2', 'icon3'].map((iconKey, index) => {
                                    const IconComponent = [Square, Download, Move][index];
                                    return renderDraggableElement(iconKey,
                                        <div className="flex flex-col items-center text-white">
                                            <div className="bg-white bg-opacity-20 rounded p-2 mb-1">
                                                {formData?.[`selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`] ? (
                                                    <img
                                                        src={formData[`selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`]}
                                                        alt={`Icon ${index + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <IconComponent size={elements[iconKey].size * 0.6} />
                                                )}
                                            </div>
                                            <p className="text-xs text-center leading-tight" style={{ fontSize: `${elements[iconKey].size * 0.4}px` }}>
                                                {elements[iconKey].text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="text-center">
                                <div className="text-white text-xs opacity-60">
                                    {formData?.footerText || 'Powered by RewardHive'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerEditor;