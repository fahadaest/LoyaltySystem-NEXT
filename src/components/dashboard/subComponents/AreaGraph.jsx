import React from 'react';

const AreaChart = ({
    data,
    width = "100%",
    height = 375,
    maxValue = 500,
    chartHeight = 250,
    showGrid = true,
    showXAxisLabels = true,
    showYAxisLabels = true,
    containerStyle = {}
}) => {
    // Fixed dimensions for proper text rendering
    const svgWidth = 1200;
    const svgHeight = height;
    const chartArea = {
        left: 60,
        top: 40,
        width: svgWidth - 80,
        height: chartHeight
    };

    // Create dramatic mountain-like curves
    const createDramaticMountainPath = (chartData, key, maxVal = maxValue) => {
        if (chartData.length === 0) return '';

        // Extract base trend from data
        const basePoints = chartData.map((item, index) => {
            const x = chartArea.left + (index / (chartData.length - 1)) * chartArea.width;
            const y = chartArea.top + chartArea.height - (item[key] / maxVal) * chartArea.height;
            return { x, y };
        });

        // Create many more interpolated points for dramatic mountain shapes
        const mountainPoints = [];
        const segments = 80; // More segments for detailed mountain shapes

        for (let i = 0; i < segments; i++) {
            const t = i / (segments - 1);
            const dataIndex = t * (basePoints.length - 1);
            const lowerIndex = Math.floor(dataIndex);
            const upperIndex = Math.min(lowerIndex + 1, basePoints.length - 1);
            const localT = dataIndex - lowerIndex;

            const x = chartArea.left + t * chartArea.width;
            const baseY = basePoints[lowerIndex].y + (basePoints[upperIndex].y - basePoints[lowerIndex].y) * localT;

            // Create dramatic mountain variations based on position
            let mountainOffset = 0;

            // Strong peaks at beginning (Jan)
            if (t < 0.1) {
                mountainOffset = Math.sin(t * Math.PI * 20) * 15 * (1 - t * 8);
            }
            // Deep valley in Feb-Mar (t = 0.08 - 0.25)
            else if (t >= 0.08 && t < 0.25) {
                const valleyT = (t - 0.08) / (0.25 - 0.08);
                mountainOffset = -Math.sin(valleyT * Math.PI) * 20 + Math.cos(valleyT * Math.PI * 6) * 12;
            }
            // Moderate variations in middle months
            else if (t >= 0.25 && t < 0.75) {
                mountainOffset = Math.sin(t * Math.PI * 8) * 10 + Math.cos(t * Math.PI * 12) * 6;
            }
            // Strong upward trend at end (Nov-Dec)
            else if (t >= 0.75) {
                const endT = (t - 0.75) / 0.25;
                mountainOffset = Math.sin(endT * Math.PI * 8) * 18 + Math.pow(endT, 2) * 25;
            }

            const y = baseY + mountainOffset;
            mountainPoints.push({ x, y });
        }

        // Build dramatic SVG path
        let path = `M ${chartArea.left},${chartArea.top + chartArea.height} L ${mountainPoints[0].x},${mountainPoints[0].y}`;

        // Create sharp mountain peaks and valleys
        for (let i = 1; i < mountainPoints.length; i++) {
            const prev = mountainPoints[i - 1];
            const curr = mountainPoints[i];
            const next = mountainPoints[i + 1];

            if (next && i < mountainPoints.length - 2) {
                // Use tighter control points for sharper mountain features
                const cpX1 = prev.x + (curr.x - prev.x) * 0.3;
                const cpY1 = prev.y + (curr.y - prev.y) * 0.2;
                const cpX2 = curr.x - (next.x - curr.x) * 0.3;
                const cpY2 = curr.y - (next.y - curr.y) * 0.2;

                path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${curr.x},${curr.y}`;
            } else {
                path += ` L ${curr.x},${curr.y}`;
            }
        }

        path += ` L ${chartArea.left + chartArea.width},${chartArea.top + chartArea.height} Z`;
        return path;
    };

    const createDramaticMountainLinePath = (chartData, key, maxVal = maxValue) => {
        if (chartData.length === 0) return '';

        const basePoints = chartData.map((item, index) => {
            const x = chartArea.left + (index / (chartData.length - 1)) * chartArea.width;
            const y = chartArea.top + chartArea.height - (item[key] / maxVal) * chartArea.height;
            return { x, y };
        });

        const mountainPoints = [];
        const segments = 80;

        for (let i = 0; i < segments; i++) {
            const t = i / (segments - 1);
            const dataIndex = t * (basePoints.length - 1);
            const lowerIndex = Math.floor(dataIndex);
            const upperIndex = Math.min(lowerIndex + 1, basePoints.length - 1);
            const localT = dataIndex - lowerIndex;

            const x = chartArea.left + t * chartArea.width;
            const baseY = basePoints[lowerIndex].y + (basePoints[upperIndex].y - basePoints[lowerIndex].y) * localT;

            let mountainOffset = 0;

            if (t < 0.1) {
                mountainOffset = Math.sin(t * Math.PI * 20) * 15 * (1 - t * 8);
            }
            else if (t >= 0.08 && t < 0.25) {
                const valleyT = (t - 0.08) / (0.25 - 0.08);
                mountainOffset = -Math.sin(valleyT * Math.PI) * 20 + Math.cos(valleyT * Math.PI * 6) * 12;
            }
            else if (t >= 0.25 && t < 0.75) {
                mountainOffset = Math.sin(t * Math.PI * 8) * 10 + Math.cos(t * Math.PI * 12) * 6;
            }
            else if (t >= 0.75) {
                const endT = (t - 0.75) / 0.25;
                mountainOffset = Math.sin(endT * Math.PI * 8) * 18 + Math.pow(endT, 2) * 25;
            }

            const y = baseY + mountainOffset;
            mountainPoints.push({ x, y });
        }

        let path = `M ${mountainPoints[0].x},${mountainPoints[0].y}`;

        for (let i = 1; i < mountainPoints.length; i++) {
            const prev = mountainPoints[i - 1];
            const curr = mountainPoints[i];
            const next = mountainPoints[i + 1];

            if (next && i < mountainPoints.length - 2) {
                const cpX1 = prev.x + (curr.x - prev.x) * 0.3;
                const cpY1 = prev.y + (curr.y - prev.y) * 0.2;
                const cpX2 = curr.x - (next.x - curr.x) * 0.3;
                const cpY2 = curr.y - (next.y - curr.y) * 0.2;

                path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${curr.x},${curr.y}`;
            } else {
                path += ` L ${curr.x},${curr.y}`;
            }
        }

        return path;
    };

    // Sample data that creates the dramatic mountain shape you requested
    const dramaticData = [
        { month: 'Jan', customers: 480, products: 320, loyalty: 280 },
        { month: 'Feb', customers: 180, products: 120, loyalty: 80 },
        { month: 'Mar', customers: 160, products: 100, loyalty: 60 },
        { month: 'Apr', customers: 220, products: 140, loyalty: 90 },
        { month: 'May', customers: 260, products: 180, loyalty: 120 },
        { month: 'Jun', customers: 240, products: 160, loyalty: 100 },
        { month: 'Jul', customers: 280, products: 190, loyalty: 130 },
        { month: 'Aug', customers: 270, products: 180, loyalty: 120 },
        { month: 'Sep', customers: 300, products: 200, loyalty: 140 },
        { month: 'Oct', customers: 350, products: 240, loyalty: 180 },
        { month: 'Nov', customers: 420, products: 300, loyalty: 260 },
        { month: 'Dec', customers: 450, products: 320, loyalty: 400 }
    ];

    const chartData = data || dramaticData;

    const defaultContainerStyle = {
        height: `${height}px`,
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        borderRadius: '37px'
    };

    return (
        <div
            className="bg-white border rounded-3xl relative w-full overflow-hidden"
            style={{ ...defaultContainerStyle, ...containerStyle }}
        >
            <svg
                width="100%"
                height={height}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="absolute inset-0"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Grid Lines */}
                {showGrid && [0, 1, 2, 3, 4, 5].map((i) => {
                    const y = chartArea.top + (i / 5) * chartArea.height;
                    return (
                        <line
                            key={i}
                            x1={chartArea.left}
                            y1={y}
                            x2={chartArea.left + chartArea.width}
                            y2={y}
                            stroke="#E2E8F0"
                            strokeDasharray="2,2"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Y-axis labels */}
                {showYAxisLabels && [500, 400, 300, 200, 100, 0].map((value, i) => {
                    const y = chartArea.top + (i / 5) * chartArea.height;
                    return (
                        <text
                            key={i}
                            x={chartArea.left - 10}
                            y={y + 4}
                            fill="#636363"
                            fontSize="12"
                            fontFamily="Poppins, sans-serif"
                            fontWeight="500"
                            textAnchor="end"
                            dominantBaseline="middle"
                        >
                            {value}
                        </text>
                    );
                })}

                {/* Area Charts - Bottom to Top */}

                {/* Gray Area (Background) - Total Customers */}
                <path
                    d={createDramaticMountainPath(chartData, 'customers')}
                    fill="url(#grayGradient)"
                />

                {/* Black/Dark Area (Middle) - Total Products */}
                <path
                    d={createDramaticMountainPath(chartData, 'products')}
                    fill="url(#blackGradient)"
                />

                {/* Green Area (Top) - Loyalty Programs */}
                <path
                    d={createDramaticMountainPath(chartData, 'loyalty')}
                    fill="url(#greenGradient)"
                />

                {/* Area borders */}
                <path
                    d={createDramaticMountainLinePath(chartData, 'customers')}
                    fill="none"
                    stroke="#B6B6B6"
                    strokeWidth="1.5"
                />

                <path
                    d={createDramaticMountainLinePath(chartData, 'products')}
                    fill="none"
                    stroke="#666666"
                    strokeWidth="1.5"
                />

                <path
                    d={createDramaticMountainLinePath(chartData, 'loyalty')}
                    fill="none"
                    stroke="#41CC40"
                    strokeWidth="1.5"
                />

                {/* X-axis labels */}
                {showXAxisLabels && chartData.map((item, i) => {
                    const x = chartArea.left + (i / (chartData.length - 1)) * chartArea.width;
                    return (
                        <text
                            key={i}
                            x={x}
                            y={chartArea.top + chartArea.height + 25}
                            fill="#636363"
                            fontSize="12"
                            fontFamily="Poppins, sans-serif"
                            fontWeight="500"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {item.month}
                        </text>
                    );
                })}

                {/* Gradient Definitions */}
                <defs>
                    <linearGradient id="grayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0.88%" stopColor="#B6B6B6" stopOpacity="1" />
                        <stop offset="32.16%" stopColor="rgba(182, 182, 182, 0.576923)" />
                        <stop offset="77%" stopColor="rgba(182, 182, 182, 0)" />
                    </linearGradient>

                    <linearGradient id="blackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0.24%" stopColor="rgba(0, 0, 0, 0.6)" />
                        <stop offset="67.63%" stopColor="rgba(0, 0, 0, 0.354808)" />
                        <stop offset="117.05%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>

                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(65, 204, 64, 0.61)" />
                        <stop offset="78.42%" stopColor="rgba(65, 204, 64, 0.34899)" />
                        <stop offset="117.34%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default AreaChart;