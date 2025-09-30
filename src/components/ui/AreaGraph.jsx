import React, { useRef, useEffect, useState } from 'react';

const AreaChart = ({
    data = [],
    width = "100%",
    height = 280,
    maxValue = 500,
    chartHeight = 180,
    showGrid = true,
    showXAxisLabels = true,
    showYAxisLabels = true
}) => {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(1200);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Extract data from props
    const months = data.map(d => d.month);
    const customersData = data.map(d => d.customers);
    const productsData = data.map(d => d.products);
    const loyaltyData = data.map(d => d.loyalty);

    // Chart dimensions
    const chartPadding = { left: 50, right: 50, top: 30, bottom: 50 };
    const svgHeight = height;
    const effectiveChartHeight = svgHeight - chartPadding.top - chartPadding.bottom;
    const effectiveChartWidth = containerWidth - chartPadding.left - chartPadding.right;

    // Create smooth SVG path for area
    const createSmoothPath = (dataPoints) => {
        if (dataPoints.length === 0) return '';

        const xStep = effectiveChartWidth / (dataPoints.length - 1);
        const yScale = effectiveChartHeight / maxValue;

        const points = dataPoints.map((value, index) => ({
            x: chartPadding.left + index * xStep,
            y: chartPadding.top + effectiveChartHeight - (value * yScale)
        }));

        const getControlPoints = (points) => {
            const controlPoints = [];
            for (let i = 0; i < points.length; i++) {
                if (i === 0 || i === points.length - 1) {
                    controlPoints.push({ cp1: null, cp2: null });
                    continue;
                }

                const prev = points[i - 1];
                const curr = points[i];
                const next = points[i + 1];

                const dx1 = curr.x - prev.x;
                const dy1 = curr.y - prev.y;
                const dx2 = next.x - curr.x;
                const dy2 = next.y - curr.y;

                const slope = (dy1 / dx1 + dy2 / dx2) * 0.5;
                const tension = 0.3;
                const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) * tension;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) * tension;

                controlPoints.push({
                    cp1: {
                        x: curr.x - distance1 / Math.sqrt(1 + slope * slope),
                        y: curr.y - (distance1 * slope) / Math.sqrt(1 + slope * slope)
                    },
                    cp2: {
                        x: curr.x + distance2 / Math.sqrt(1 + slope * slope),
                        y: curr.y + (distance2 * slope) / Math.sqrt(1 + slope * slope)
                    }
                });
            }
            return controlPoints;
        };

        const controlPoints = getControlPoints(points);
        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            const prevPoint = points[i - 1];
            const currPoint = points[i];
            const prevControl = controlPoints[i - 1];
            const currControl = controlPoints[i];

            if (i === 1) {
                const cp1x = prevPoint.x + (currPoint.x - prevPoint.x) * 0.25;
                const cp1y = prevPoint.y;
                const cp2x = currControl.cp1 ? currControl.cp1.x : currPoint.x - (currPoint.x - prevPoint.x) * 0.25;
                const cp2y = currControl.cp1 ? currControl.cp1.y : currPoint.y;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            } else if (i === points.length - 1) {
                const cp1x = prevControl.cp2 ? prevControl.cp2.x : prevPoint.x + (currPoint.x - prevPoint.x) * 0.25;
                const cp1y = prevControl.cp2 ? prevControl.cp2.y : prevPoint.y;
                const cp2x = currPoint.x - (currPoint.x - prevPoint.x) * 0.25;
                const cp2y = currPoint.y;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            } else {
                const cp1x = prevControl.cp2 ? prevControl.cp2.x : prevPoint.x + (currPoint.x - prevPoint.x) * 0.3;
                const cp1y = prevControl.cp2 ? prevControl.cp2.y : prevPoint.y;
                const cp2x = currControl.cp1 ? currControl.cp1.x : currPoint.x - (currPoint.x - prevPoint.x) * 0.3;
                const cp2y = currControl.cp1 ? currControl.cp1.y : currPoint.y;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            }
        }

        const lastPoint = points[points.length - 1];
        const bottomY = chartPadding.top + effectiveChartHeight;
        path += ` L ${lastPoint.x} ${bottomY}`;
        path += ` L ${points[0].x} ${bottomY}`;
        path += ' Z';

        return path;
    };

    // Create smooth line path (without closing to bottom)
    const createSmoothLine = (dataPoints) => {
        if (dataPoints.length === 0) return '';

        const xStep = effectiveChartWidth / (dataPoints.length - 1);
        const yScale = effectiveChartHeight / maxValue;

        const points = dataPoints.map((value, index) => ({
            x: chartPadding.left + index * xStep,
            y: chartPadding.top + effectiveChartHeight - (value * yScale)
        }));

        const getControlPoints = (points) => {
            const controlPoints = [];
            for (let i = 0; i < points.length; i++) {
                if (i === 0 || i === points.length - 1) {
                    controlPoints.push({ cp1: null, cp2: null });
                    continue;
                }

                const prev = points[i - 1];
                const curr = points[i];
                const next = points[i + 1];

                const dx1 = curr.x - prev.x;
                const dy1 = curr.y - prev.y;
                const dx2 = next.x - curr.x;
                const dy2 = next.y - curr.y;

                const slope = (dy1 / dx1 + dy2 / dx2) * 0.5;
                const tension = 0.3;
                const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) * tension;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) * tension;

                controlPoints.push({
                    cp1: {
                        x: curr.x - distance1 / Math.sqrt(1 + slope * slope),
                        y: curr.y - (distance1 * slope) / Math.sqrt(1 + slope * slope)
                    },
                    cp2: {
                        x: curr.x + distance2 / Math.sqrt(1 + slope * slope),
                        y: curr.y + (distance2 * slope) / Math.sqrt(1 + slope * slope)
                    }
                });
            }
            return controlPoints;
        };

        const controlPoints = getControlPoints(points);
        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            const prevPoint = points[i - 1];
            const currPoint = points[i];
            const prevControl = controlPoints[i - 1];
            const currControl = controlPoints[i];

            if (i === 1) {
                const cp1x = prevPoint.x + (currPoint.x - prevPoint.x) * 0.25;
                const cp1y = prevPoint.y;
                const cp2x = currControl.cp1 ? currControl.cp1.x : currPoint.x - (currPoint.x - prevPoint.x) * 0.25;
                const cp2y = currControl.cp1 ? currControl.cp1.y : currPoint.y;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            } else if (i === points.length - 1) {
                const cp1x = prevControl.cp2 ? prevControl.cp2.x : prevPoint.x + (currPoint.x - prevPoint.x) * 0.25;
                const cp1y = prevControl.cp2 ? prevControl.cp2.y : prevPoint.y;
                const cp2x = currPoint.x - (currPoint.x - prevPoint.x) * 0.25;
                const cp2y = currPoint.y;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            } else {
                const cp1x = prevControl.cp2 ? prevControl.cp2.x : prevPoint.x + (currPoint.x - prevPoint.x) * 0.3;
                const cp1y = prevControl.cp2 ? prevControl.cp2.y : prevPoint.y;
                const cp2x = currControl.cp1 ? currControl.cp1.x : currPoint.x - (currPoint.x - prevPoint.x) * 0.3;
                const cp2y = currControl.cp1 ? currControl.cp1.y : currPoint.y;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            }
        }

        return path;
    };

    // Grid lines
    const gridLines = [];
    if (showGrid) {
        for (let i = 0; i <= 5; i++) {
            const y = chartPadding.top + (i * effectiveChartHeight / 5);
            gridLines.push(
                <line
                    key={i}
                    x1={chartPadding.left}
                    y1={y}
                    x2={containerWidth - chartPadding.right}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />
            );
        }
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: width,
                height: `${height}px`,
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                borderRadius: '37px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${containerWidth} ${svgHeight}`}
                preserveAspectRatio="none"
                style={{ position: 'absolute', top: 0, left: 0 }}
            >
                {gridLines}

                {showYAxisLabels && (
                    <>
                        <text x="25" y={chartPadding.top + effectiveChartHeight + 5} fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">0</text>
                        <text x="20" y={chartPadding.top + effectiveChartHeight * 0.8 + 5} fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">100</text>
                        <text x="20" y={chartPadding.top + effectiveChartHeight * 0.6 + 5} fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">200</text>
                        <text x="20" y={chartPadding.top + effectiveChartHeight * 0.4 + 5} fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">300</text>
                        <text x="20" y={chartPadding.top + effectiveChartHeight * 0.2 + 5} fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">400</text>
                        <text x="20" y={chartPadding.top + 5} fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">500</text>
                    </>
                )}

                <defs>
                    {/* Gray gradient for Products */}
                    <linearGradient id="productsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0.88%" stopColor="#B6B6B6" />
                        <stop offset="32.16%" stopColor="rgba(182, 182, 182, 0.576923)" />
                        <stop offset="77%" stopColor="rgba(182, 182, 182, 0)" />
                    </linearGradient>

                    {/* Black gradient for Customers - lighter */}
                    <linearGradient id="customersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0.24%" stopColor="rgba(0, 0, 0, 0.3)" />
                        <stop offset="67.63%" stopColor="rgba(0, 0, 0, 0.18)" />
                        <stop offset="117.05%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>

                    {/* Green gradient for Loyalty */}
                    <linearGradient id="loyaltyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(65, 204, 64, 0.61)" />
                        <stop offset="78.42%" stopColor="rgba(65, 204, 64, 0.34899)" />
                        <stop offset="117.34%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                </defs>

                {/* Products area (gray - middle layer) */}
                <path
                    d={createSmoothPath(productsData)}
                    fill="url(#productsGradient)"
                />

                {/* Customers area (black - top layer) */}
                <path
                    d={createSmoothPath(customersData)}
                    fill="url(#customersGradient)"
                />

                {/* Loyalty area (green - bottom layer) */}
                <path
                    d={createSmoothPath(loyaltyData)}
                    fill="url(#loyaltyGradient)"
                />

                {showXAxisLabels && months.map((month, index) => (
                    <text
                        key={month}
                        x={chartPadding.left + (index * effectiveChartWidth / (months.length - 1))}
                        y={svgHeight - 15}
                        fontSize="10"
                        fontFamily="Poppins"
                        fontWeight="600"
                        fill="#636363"
                        textAnchor="middle"
                    >
                        {month}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default AreaChart;