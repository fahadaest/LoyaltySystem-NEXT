import React from 'react';

const AreaChart = ({ width = "100%", height = 375 }) => {
    // Data points for the curves - adjusted to match the visual patterns
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Green area data (bottom layer)
    const greenData = [120, 140, 100, 160, 180, 200, 170, 190, 220, 140, 160, 400];

    // Blue area data (middle layer)
    const blueData = [200, 220, 180, 250, 300, 350, 280, 320, 340, 200, 240, 420];

    // Gray area data (top layer)
    const grayData = [480, 220, 200, 260, 380, 460, 400, 350, 360, 300, 400, 440];

    // Black area data (topmost layer)
    const blackData = [500, 250, 230, 290, 420, 480, 430, 380, 390, 330, 430, 460];

    // Create ultra-smooth SVG path using advanced curve interpolation
    const createSmoothPath = (data, maxHeight = 500) => {
        const chartWidth = 1352;
        const chartHeight = 300;
        const padding = 50;

        const xStep = (chartWidth - 2 * padding) / (data.length - 1);
        const yScale = (chartHeight - 2 * padding) / maxHeight;

        // Convert data to points
        const points = data.map((value, index) => ({
            x: padding + index * xStep,
            y: chartHeight - padding - (value * yScale)
        }));

        // Calculate control points for smooth curves
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

                // Calculate the slope through the current point
                const dx1 = curr.x - prev.x;
                const dy1 = curr.y - prev.y;
                const dx2 = next.x - curr.x;
                const dy2 = next.y - curr.y;

                // Average slope for smoother curves
                const slope = (dy1 / dx1 + dy2 / dx2) * 0.5;

                // Control point distance (adjust for smoothness)
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
                // First curve segment
                const cp1x = prevPoint.x + (currPoint.x - prevPoint.x) * 0.25;
                const cp1y = prevPoint.y;
                const cp2x = currControl.cp1 ? currControl.cp1.x : currPoint.x - (currPoint.x - prevPoint.x) * 0.25;
                const cp2y = currControl.cp1 ? currControl.cp1.y : currPoint.y;

                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            } else if (i === points.length - 1) {
                // Last curve segment
                const cp1x = prevControl.cp2 ? prevControl.cp2.x : prevPoint.x + (currPoint.x - prevPoint.x) * 0.25;
                const cp1y = prevControl.cp2 ? prevControl.cp2.y : prevPoint.y;
                const cp2x = currPoint.x - (currPoint.x - prevPoint.x) * 0.25;
                const cp2y = currPoint.y;

                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            } else {
                // Middle curve segments
                const cp1x = prevControl.cp2 ? prevControl.cp2.x : prevPoint.x + (currPoint.x - prevPoint.x) * 0.3;
                const cp1y = prevControl.cp2 ? prevControl.cp2.y : prevPoint.y;
                const cp2x = currControl.cp1 ? currControl.cp1.x : currPoint.x - (currPoint.x - prevPoint.x) * 0.3;
                const cp2y = currControl.cp1 ? currControl.cp1.y : currPoint.y;

                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currPoint.x} ${currPoint.y}`;
            }
        }

        // Close the path to create area
        const lastPoint = points[points.length - 1];
        path += ` L ${lastPoint.x} ${chartHeight - padding}`;
        path += ` L ${points[0].x} ${chartHeight - padding}`;
        path += ' Z';

        return path;
    };

    // Create grid lines
    const gridLines = [];
    for (let i = 0; i <= 5; i++) {
        const y = 50 + (i * 50);
        gridLines.push(
            <line
                key={i}
                x1="50"
                y1={y}
                x2="1400"
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="5,5"
            />
        );
    }

    return (
        <div
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
                viewBox="0 0 1453 375"
                style={{ position: 'absolute', top: 0, left: 0 }}
            >
                {/* Grid lines */}
                {gridLines}

                {/* Y-axis labels */}
                <text x="25" y="320" fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">0</text>
                <text x="20" y="270" fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">100</text>
                <text x="20" y="220" fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">200</text>
                <text x="20" y="170" fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">300</text>
                <text x="20" y="120" fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">400</text>
                <text x="20" y="70" fontSize="10" fontFamily="Poppins" fontWeight="600" fill="#636363">500</text>

                {/* Black area (topmost) */}
                <path
                    d={createSmoothPath(blackData)}
                    fill="url(#blackGradient)"
                    opacity="0.6"
                />

                {/* Gray area */}
                <path
                    d={createSmoothPath(grayData)}
                    fill="url(#grayGradient)"
                />

                {/* Blue area */}
                <path
                    d={createSmoothPath(blueData)}
                    fill="url(#blueGradient)"
                    stroke="rgba(0, 0, 0, 0.58)"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                />

                {/* Green area (bottom) */}
                <path
                    d={createSmoothPath(greenData)}
                    fill="url(#greenGradient)"
                    stroke="#41CC40"
                    strokeWidth="1"
                />

                {/* Gray line */}
                <path
                    d={createSmoothPath(grayData)}
                    fill="none"
                    stroke="#B6B6B6"
                    strokeWidth="1"
                />

                {/* Gradients */}
                <defs>
                    <linearGradient id="blackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 0, 0, 0.6)" />
                        <stop offset="67%" stopColor="rgba(0, 0, 0, 0.35)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>

                    <linearGradient id="grayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#B6B6B6" />
                        <stop offset="32%" stopColor="rgba(182, 182, 182, 0.58)" />
                        <stop offset="77%" stopColor="rgba(182, 182, 182, 0)" />
                    </linearGradient>

                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(68, 88, 200, 0.6)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>

                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(65, 204, 64, 0.61)" />
                        <stop offset="78%" stopColor="rgba(65, 204, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                </defs>

                {/* X-axis labels */}
                {months.map((month, index) => (
                    <text
                        key={month}
                        x={50 + (index * ((1352 - 100) / (months.length - 1)))}
                        y="350"
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