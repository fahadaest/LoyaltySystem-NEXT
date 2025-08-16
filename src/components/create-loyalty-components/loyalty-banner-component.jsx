import React, { useState, useRef, useCallback, useMemo, memo } from 'react';
import { Upload, RotateCcw, X, Square, Download, Move } from 'lucide-react';
import AnimatedInput from 'components/ui/AnimatedInput';
import ColorPicker from 'components/ui/ColorPicker';
import QRCode from 'react-qr-code';

// Memoized QR Pattern Component
const QRCodePattern = memo(() => {
    const qrPattern = [
        1, 0, 1, 0, 1,
        0, 1, 1, 1, 0,
        1, 1, 0, 1, 1,
        0, 1, 1, 0, 1,
        1, 0, 1, 1, 0
    ];

    return (
        <div className="w-full h-full grid grid-cols-5 gap-0">
            {qrPattern.map((cell, i) => (
                <div
                    key={i}
                    className={`w-full h-full ${cell ? 'bg-gray-800' : 'bg-white'}`}
                />
            ))}
        </div>
    );
});

// Memoized Icon Selector Component
const IconSelector = memo(({ iconKey, index, formData, onOpenImageSelector, onImageRemove }) => {
    const selectedKey = `selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`;

    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
                Icon {index + 1}
            </label>
            {formData?.[selectedKey] ? (
                <div className="relative group">
                    <img
                        src={formData[selectedKey]}
                        alt={`Icon ${index + 1}`}
                        className="w-full h-16 object-contain bg-gray-100 rounded border-2 border-gray-300"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                        <button
                            type="button"
                            onClick={() => onOpenImageSelector(iconKey)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
                            title="Change icon"
                        >
                            <Upload className="w-3 h-3" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onImageRemove(selectedKey)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                            title="Remove icon"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
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
    );
});

// Memoized Draggable Element Component
const DraggableElement = memo(({
    elementKey,
    children,
    styles,
    element,
    isSelected,
    isDragging,
    onElementClick,
    onElementDragStart,
    onElementResize
}) => {
    const isTitle = elementKey === 'title';
    const colorMap = {
        title: 'blue',
        qr: 'green',
        logo: 'purple',
        icon1: 'orange',
        icon2: 'orange',
        icon3: 'orange'
    };
    const color = colorMap[elementKey];

    if (elementKey === 'logo' && !element.isVisible) return null;

    return (
        <div
            className={`absolute cursor-pointer select-none z-20 ${isSelected ? `ring-2 ring-${color}-400 ring-opacity-50` : ''
                } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                fontSize: isTitle ? `${element.fontSize}px` : undefined,
                width: !isTitle ? `${element.size}px` : undefined,
                height: !isTitle ? `${element.size}px` : undefined,
                transform: styles.transform || 'none',
                ...styles
            }}
            onClick={onElementClick}
            onMouseDown={onElementDragStart}
            title={`Click to select, drag to move ${elementKey}`}
        >
            {children}

            {isSelected && (
                <>
                    <div className={`absolute -top-1 -left-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                    <div className={`absolute -top-1 -right-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                    <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full cursor-nw-resize hover:bg-${color}-600`}
                        onMouseDown={onElementResize}
                    ></div>
                </>
            )}
        </div>
    );
});

const BannerEditor = ({ formData, setFormData, previewImages, onOpenImageSelector }) => {
    // Simplified state management
    const [dragState, setDragState] = useState({
        isDragging: null,
        isDraggingDivider: null,
        dragStart: null,
        initialHeights: null
    });
    const [selectedElement, setSelectedElement] = useState(null);

    // Refs
    const bannerRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Constants - moved outside to prevent recreation
    const ELEMENT_DEFAULTS = useMemo(() => ({
        title: { x: 0, y: 0, fontSize: 18 },
        qr: { x: 155, y: 125, size: 64 },
        logo: { x: 12, y: 12, size: 40, isVisible: true },
        icon1: { size: 24, text: 'Scan QR with your mobile phone' },
        icon2: { size: 24, text: 'Download the Point Pass into your mobile' },
        icon3: { size: 24, text: 'Enter Your promotion' }
    }), []);

    // Optimized helper functions
    const getElementData = useCallback((elementKey) => {
        const positionKey = `${elementKey}Position`;
        return { ...ELEMENT_DEFAULTS[elementKey], ...formData[positionKey] };
    }, [formData, ELEMENT_DEFAULTS]);

    const updateElementData = useCallback((elementKey, updates) => {
        const positionKey = `${elementKey}Position`;
        setFormData(prev => {
            const currentData = { ...ELEMENT_DEFAULTS[elementKey], ...prev[positionKey] };
            return {
                ...prev,
                [positionKey]: { ...currentData, ...updates }
            };
        });
    }, [ELEMENT_DEFAULTS, setFormData]);

    // Throttled mouse move handler
    const throttledMouseMove = useCallback((e) => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const { isDragging, isDraggingDivider, dragStart, initialHeights } = dragState;

            // Handle divider dragging
            if (isDraggingDivider && dragStart && initialHeights) {
                const deltaY = e.clientY - dragStart.y;
                const deltaPercent = (deltaY / 525) * 100;

                if (isDraggingDivider === 'top') {
                    const requestedTopHeight = initialHeights.top + deltaPercent;
                    const requestedMiddleHeight = initialHeights.middle - deltaPercent;

                    // Apply constraints
                    const newTopHeight = Math.max(18, Math.min(70, requestedTopHeight));
                    const newMiddleHeight = Math.max(20, requestedMiddleHeight);
                    const newBottomHeight = 100 - newTopHeight - newMiddleHeight;

                    // Only update if all constraints are satisfied
                    if (requestedTopHeight >= 18 && newMiddleHeight >= 20 && newBottomHeight >= 22) {
                        setFormData(prev => ({
                            ...prev,
                            sectionHeights: {
                                top: newTopHeight,
                                middle: newMiddleHeight,
                                bottom: newBottomHeight
                            }
                        }));
                    }
                } else if (isDraggingDivider === 'bottom') {
                    const requestedMiddleHeight = initialHeights.middle + deltaPercent;
                    const requestedBottomHeight = initialHeights.bottom - deltaPercent;

                    // Apply constraints
                    const newMiddleHeight = Math.max(20, requestedMiddleHeight);
                    const newBottomHeight = Math.max(22, requestedBottomHeight);
                    const newTopHeight = 100 - newMiddleHeight - newBottomHeight;

                    // Only update if all constraints are satisfied
                    if (newMiddleHeight >= 20 && requestedBottomHeight >= 22 && newTopHeight >= 18) {
                        setFormData(prev => ({
                            ...prev,
                            sectionHeights: {
                                top: newTopHeight,
                                middle: newMiddleHeight,
                                bottom: newBottomHeight
                            }
                        }));
                    }
                }
            }
            // Handle element dragging (logo, QR, title)
            else if (isDragging && dragStart) {
                if (isDragging.includes('-resize')) {
                    const elementKey = isDragging.replace('-resize', '');
                    const deltaY = dragStart.startY - e.clientY;
                    const isTitle = elementKey === 'title';
                    const newValue = Math.max(
                        isTitle ? 12 : 16,
                        Math.min(isTitle ? 32 : 64, dragStart.startValue + deltaY * 0.5)
                    );

                    updateElementData(elementKey, {
                        [isTitle ? 'fontSize' : 'size']: newValue
                    });
                } else {
                    const deltaX = e.clientX - dragStart.x;
                    const deltaY = e.clientY - dragStart.y;
                    const newX = dragStart.elementX + deltaX;
                    const newY = dragStart.elementY + deltaY;

                    const element = getElementData(isDragging);
                    const elementSize = element.size || 20;
                    const bounds = {
                        minX: 12,
                        maxX: 377 - elementSize - 12,
                        minY: 12,
                        maxY: 525 - elementSize - 12
                    };

                    updateElementData(isDragging, {
                        x: Math.max(bounds.minX, Math.min(bounds.maxX, newX)),
                        y: Math.max(bounds.minY, Math.min(bounds.maxY, newY))
                    });
                }
            }
        });
    }, [dragState, updateElementData, getElementData, setFormData]);

    // Event handlers
    const handleMouseUp = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        setDragState({ isDragging: null, isDraggingDivider: null, dragStart: null, initialHeights: null });
    }, []);

    const handleElementClick = useCallback((elementKey, e) => {
        e.stopPropagation();
        setSelectedElement(elementKey);
    }, []);

    const handleElementDragStart = useCallback((elementKey, e) => {
        if (selectedElement !== elementKey) return;
        // Only allow dragging for title, logo, and qr - not bottom icons
        if (['icon1', 'icon2', 'icon3'].includes(elementKey)) return;

        e.preventDefault();
        e.stopPropagation(); // Add this line to prevent event bubbling

        const element = getElementData(elementKey);
        setDragState(prev => ({
            ...prev,
            isDragging: elementKey,
            dragStart: { x: e.clientX, y: e.clientY, elementX: element.x, elementY: element.y }
        }));
    }, [selectedElement, getElementData]);

    const handleElementResize = useCallback((elementKey, e) => {
        e.stopPropagation();
        e.preventDefault();

        const element = getElementData(elementKey);
        const currentValue = elementKey === 'title' ? element.fontSize : element.size;
        setDragState(prev => ({
            ...prev,
            isDragging: `${elementKey}-resize`,
            dragStart: { startY: e.clientY, startValue: currentValue }
        }));
    }, [getElementData]);

    const handleDividerDragStart = useCallback((dividerType, e) => {
        e.preventDefault();
        const sectionHeights = formData.sectionHeights || { top: 30, middle: 40, bottom: 30 };
        setDragState(prev => ({
            ...prev,
            isDraggingDivider: dividerType,
            dragStart: { y: e.clientY },
            initialHeights: { ...sectionHeights }
        }));
    }, [formData.sectionHeights]);

    // Optimized event listeners
    React.useEffect(() => {
        if (dragState.isDragging || dragState.isDraggingDivider) {
            document.addEventListener('mousemove', throttledMouseMove, { passive: true });
            document.addEventListener('mouseup', handleMouseUp, { passive: true });

            return () => {
                document.removeEventListener('mousemove', throttledMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }
    }, [dragState.isDragging, dragState.isDraggingDivider, throttledMouseMove, handleMouseUp]);

    // Memoized form handlers
    const handleFormDataChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, [setFormData]);

    const handleImageRemove = useCallback((field) => {
        setFormData(prev => ({ ...prev, [field]: '' }));
    }, [setFormData]);

    const resetAll = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            sectionHeights: { top: 30, middle: 40, bottom: 30 },
            titlePosition: { x: 0, y: 0, fontSize: 18 },
            qrPosition: { x: 155, y: 125, size: 64 },
            logoPosition: { x: 167, y: 20, size: 40, isVisible: true },
            icon1Position: { size: 24, text: 'Scan QR with your mobile phone' },
            icon2Position: { size: 24, text: 'Download the Point Pass into your mobile' },
            icon3Position: { size: 24, text: 'Enter Your promotion' }
        }));
        setSelectedElement(null);
    }, [setFormData]);

    const handleBannerClick = useCallback((e) => {
        if (e.target === bannerRef.current || e.target.closest('.banner-background')) {
            setSelectedElement(null);
        }
    }, []);

    // Memoized values
    const sectionHeights = useMemo(() =>
        formData.sectionHeights || { top: 30, middle: 40, bottom: 30 },
        [formData.sectionHeights]
    );

    // Memoized icon selectors
    const iconSelectors = useMemo(() =>
        ['icon1', 'icon2', 'icon3'].map((iconKey, index) => (
            <IconSelector
                key={iconKey}
                iconKey={iconKey}
                index={index}
                formData={formData}
                onOpenImageSelector={onOpenImageSelector}
                onImageRemove={handleImageRemove}
            />
        )),
        [formData, onOpenImageSelector, handleImageRemove]
    );

    // Render draggable element with memoization
    const renderDraggableElement = useCallback((elementKey, content, styles = {}) => {
        const element = getElementData(elementKey);
        const isSelected = selectedElement === elementKey;
        const isDragging = dragState.isDragging === elementKey;

        return (
            <DraggableElement
                key={elementKey}
                elementKey={elementKey}
                element={element}
                isSelected={isSelected}
                isDragging={isDragging}
                styles={styles}
                onElementClick={(e) => handleElementClick(elementKey, e)}
                onElementDragStart={(e) => handleElementDragStart(elementKey, e)}
                onElementResize={(e) => handleElementResize(elementKey, e)}
            >
                {content}
            </DraggableElement>
        );
    }, [selectedElement, dragState.isDragging, getElementData, handleElementClick, handleElementDragStart, handleElementResize]);

    return (
        <div className="w-full flex gap-3">
            {/* Controls Panel */}
            <div className="w-[60%] shadow-lg rounded-lg p-4 h-fit">
                <h2 className="text-xl font-bold mb-6">Banner Settings</h2>

                {/* Row 1: Title + Colors */}
                <div className="mb-6">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-2">
                            <AnimatedInput
                                label="Banner Title"
                                placeholder="Enter banner title"
                                value={formData?.bannerTitle || ''}
                                onChange={(value) => handleFormDataChange('bannerTitle', value)}
                            />

                        </div>
                        <div className="col-span-2">
                            <ColorPicker
                                label="Top Background"
                                value={formData?.templateColor || '#4F46E5'}
                                onChange={(value) => handleFormDataChange('templateColor', value)}
                            />

                            {/* <ColorPicker
                                label="Bottom Background"
                                value={formData?.bottomColor || '#374151'}
                                onChange={(value) => handleFormDataChange('bottomColor', value)}
                            /> */}
                        </div>
                        <div className="col-span-2">
                            <ColorPicker
                                label="Title Color"
                                value={formData?.bannerTitleColor || '#ffffff'}
                                onChange={(value) => handleFormDataChange('bannerTitleColor', value)}
                            />
                            {/* <ColorPicker
                                label="Bottom Text Color"
                                value={formData?.bottomTextColor || '#ffffff'}
                                onChange={(value) => handleFormDataChange('bottomTextColor', value)}
                            /> */}
                        </div>
                    </div>
                </div>

                {/* Row 2: Banner Image (2/3) + Logo (1/3) */}
                <div className="mb-6">
                    <div className="flex gap-4">
                        {/* Logo - 1/3 width */}
                        <div className="flex-[1]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                            {formData?.selectedLogo || previewImages?.logo ? (
                                <div className="relative group">
                                    <img
                                        src={formData?.selectedLogo || previewImages?.logo}
                                        alt="Logo"
                                        className="w-full h-20 object-contain bg-gray-100 rounded border-2 border-gray-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => onOpenImageSelector('logo')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
                                        >
                                            <Upload className="w-3 h-3" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleImageRemove('selectedLogo')}
                                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onOpenImageSelector('logo')}
                                    className="w-full h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                >
                                    <div className="text-center">
                                        <Upload className="w-6 h-6 mx-auto mb-1" />
                                        <span className="text-sm">Upload Logo</span>
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Banner Image - 2/3 width */}
                        <div className="flex-[2]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                            {formData?.selectedImage || previewImages?.banner ? (
                                <div className="relative group">
                                    <img
                                        src={formData?.selectedImage || previewImages?.banner}
                                        alt="Banner preview"
                                        className="w-full h-20 object-cover rounded-lg border-2 border-gray-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onOpenImageSelector('banner')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleImageRemove('selectedImage')}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onOpenImageSelector('banner')}
                                    className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                >
                                    <div className="text-center">
                                        <Upload className="w-6 h-6 mx-auto mb-1" />
                                        <span className="text-sm">Upload Banner Image</span>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Row 1: Title + Colors */}
                <div className="mb-6">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-2">
                            <ColorPicker
                                label="Bottom Background"
                                value={formData?.bottomColor || '#374151'}
                                onChange={(value) => handleFormDataChange('bottomColor', value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <ColorPicker
                                label="Bottom Text Color"
                                value={formData?.bottomTextColor || '#ffffff'}
                                onChange={(value) => handleFormDataChange('bottomTextColor', value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Row 3: Icon Selectors */}
                <div className="mb-6">
                    <div className="grid grid-cols-3 gap-4">
                        {iconSelectors}
                    </div>
                </div>

                {/* Row 4: Icon Texts */}
                <div className="mb-6">
                    <div className="grid grid-cols-3 gap-4">
                        {['icon1', 'icon2', 'icon3'].map((iconKey, index) => {
                            const defaultTexts = [
                                'Scan QR with your mobile phone',
                                'Download the Point Pass into your mobile',
                                'Enter Your promotion'
                            ];
                            return (
                                <div key={iconKey}>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Text {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        value={getElementData(iconKey)?.text || defaultTexts[index]}
                                        onChange={(e) => updateElementData(iconKey, { text: e.target.value })}
                                        className="w-full px-2 py-1 border rounded text-sm"
                                        placeholder={defaultTexts[index]}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reset Button */}
                <div className="border-t pt-4">
                    <button
                        type="button"
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
                        <li>• <strong>Move:</strong> Click and drag title, logo, and QR code</li>
                        <li>• <strong>Resize:</strong> Select any element, drag corner handle</li>
                        <li>• <strong>Bottom Icons:</strong> Fixed position, click to select and resize only</li>
                        <li>• <strong>Sections:</strong> Drag white bars to resize sections</li>
                        <li>• <strong>QR Code:</strong> Functional QR code pointing to codehive.ae</li>
                    </ul>
                </div>
            </div>

            {/* Banner Preview */}
            <div className="w-[40%] flex flex-col">
                <h2 className="text-lg font-bold mb-4">Banner Preview</h2>

                <div className="flex w-full justify-center">
                    <div
                        ref={bannerRef}
                        className="relative shadow-2xl overflow-hidden banner-background"
                        style={{
                            width: '377px',
                            height: '525px',
                            backgroundColor: '#f3f4f6'
                        }}
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
                                    transform: `translate(calc(-50% + ${getElementData('title').x}px), calc(-50% + ${getElementData('title').y}px))`
                                }
                            )}

                            {/* Logo */}
                            {renderDraggableElement('logo',
                                formData?.selectedLogo || previewImages?.logo ? (
                                    <img
                                        src={formData?.selectedLogo || previewImages?.logo}
                                        alt="Logo"
                                        className="w-full h-full object-contain rounded"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-20 rounded text-white text-xs font-bold">
                                        LOGO
                                    </div>
                                )
                            )}

                            {/* QR Code */}
                            {renderDraggableElement('qr',
                                <div className="w-full h-full bg-brandGreen rounded flex items-center justify-center overflow-hidden p-1">
                                    <QRCode
                                        value="https://codehive.ae/"
                                        size={Math.min(getElementData('qr').size - 8, getElementData('qr').size * 0.9)}
                                        bgColor="transparent"
                                        fgColor="#ffffff"
                                    />
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
                            {formData?.selectedImage || previewImages?.banner ? (
                                <img
                                    src={formData?.selectedImage || previewImages?.banner}
                                    alt="Banner content"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <img
                                    src="/img/loyaltyBannerIcons/bannerplaceholder.png"
                                    alt="Banner placeholder"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
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
                        <div className="absolute bottom-0 left-0 w-full px-4 py-4 flex flex-col justify-between"
                            style={{
                                height: `${sectionHeights.bottom}%`,
                                backgroundColor: formData?.bottomColor || '#374151'
                            }}
                        >
                            {/* Icons */}
                            <div className="flex-1 flex items-center justify-center relative w-full" style={{ paddingBottom: '40px' }}>
                                <div className="flex items-center justify-between w-full px-4">
                                    {['icon1', 'icon2', 'icon3'].map((iconKey, index) => {
                                        const IconComponent = [Square, Download, Move][index];
                                        const selectedKey = `selected${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`;
                                        const element = getElementData(iconKey);
                                        const isSelected = selectedElement === iconKey;
                                        const color = 'orange';
                                        const bottomTextColor = formData?.bottomTextColor || '#ffffff';

                                        // Default icons from your system
                                        const defaultIcons = [
                                            '/img/loyaltyBannerIcons/scanQR.png',
                                            '/img/loyaltyBannerIcons/downloadPoints.png',
                                            '/img/loyaltyBannerIcons/promotion.png',
                                        ];

                                        // Use uploaded image if available, otherwise use default icon
                                        const iconSrc = formData?.[selectedKey] && formData[selectedKey].trim() !== ''
                                            ? formData[selectedKey]
                                            : defaultIcons[index];

                                        return (
                                            <div
                                                key={iconKey}
                                                className={`flex flex-col items-center cursor-pointer select-none relative ${isSelected ? `ring-2 ring-${color}-400 ring-opacity-50 rounded p-1` : ''
                                                    }`}
                                                style={{ color: bottomTextColor }}
                                                onClick={(e) => handleElementClick(iconKey, e)}
                                                title={`Click to select and resize ${iconKey}`}
                                            >
                                                <div className="bg-white bg-opacity-20 rounded p-2 mb-1">
                                                    <img
                                                        src={iconSrc}
                                                        alt={`Icon ${index + 1}`}
                                                        className="object-contain"
                                                        style={{
                                                            width: `${element.size * 0.6}px`,
                                                            height: `${element.size * 0.6}px`
                                                        }}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            // Fallback to Lucide icon if image fails to load
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'block';
                                                        }}
                                                    />
                                                    <div style={{ display: 'none' }}>
                                                        <IconComponent size={element.size * 0.6} />
                                                    </div>
                                                </div>
                                                <p
                                                    className="text-center leading-tight"
                                                    style={{
                                                        fontSize: `${element.size * 0.4}px`,
                                                        color: bottomTextColor
                                                    }}
                                                >
                                                    {element.text}
                                                </p>

                                                {isSelected && (
                                                    <>
                                                        <div className={`absolute -top-1 -left-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                                                        <div className={`absolute -top-1 -right-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                                                        <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-${color}-500 rounded-full`}></div>
                                                        <div
                                                            className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full cursor-nw-resize hover:bg-${color}-600`}
                                                            onMouseDown={(e) => handleElementResize(iconKey, e)}
                                                        ></div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="absolute bottom-0 left-0 w-full">
                                {/* Light separator line */}
                                <div
                                    className="w-full h-px mb-1"
                                    style={{
                                        backgroundColor: formData?.bottomTextColor || '#ffffff',
                                        opacity: 0.3
                                    }}
                                ></div>

                                <div className="text-center pb-2 px-4">
                                    <div className="leading-tight" style={{ color: formData?.bottomTextColor || '#ffffff' }}>
                                        <p className='text-[8px]' style={{ opacity: 0.9 }}>
                                            Powered by RewardHive{' '}
                                            <span className="underline">www.codehive.com</span>
                                        </p>
                                        <p className=" text-[6px]" style={{ opacity: 0.75 }}>
                                            Compatible with iPhone and Android — users need to download Apple Pass and Google Wallet
                                        </p>
                                    </div>
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