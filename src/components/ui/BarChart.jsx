import React from 'react';

const BarChart = ({
    data = [],
    width = "100%",
    height = 350,
    maxValue = 18,
    showGrid = true,
    showXAxisLabels = true,
    showYAxisLabels = true,
    containerStyle = {},
    barWidth = 20,
    barSpacing = 5
}) => {
    // Fixed dimensions for proper rendering
    const svgWidth = 1200;
    const svgHeight = height;
    const chartArea = {
        left: 60,
        top: 40,
        width: svgWidth - 120,
        height: svgHeight - 100
    };

    // Calculate bar positions
    const totalBars = data.reduce((acc, day) => acc + day.bars.length, 0);
    const totalSpacing = (data.length - 1) * 40 + totalBars * barSpacing; // Day spacing + bar spacing
    const availableWidth = chartArea.width - totalSpacing;
    const actualBarWidth = Math.min(barWidth, availableWidth / totalBars);

    let currentX = chartArea.left;

    const defaultContainerStyle = {
        height: `${height}px`,
        background: '#FFFFFF',
        border: '1px solid #E2E2E2',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        borderRadius: '30px'
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
                {showGrid && [0, 1, 2, 3, 4, 5, 6].map((i) => {
                    const y = chartArea.top + (i / 6) * chartArea.height;
                    return (
                        <line
                            key={i}
                            x1={chartArea.left}
                            y1={y}
                            x2={chartArea.left + chartArea.width}
                            y2={y}
                            stroke="#E2E2E2"
                            strokeDasharray="2,2"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Y-axis labels */}
                {showYAxisLabels && [18, 15, 12, 9, 6, 3, 0].map((value, i) => {
                    const y = chartArea.top + (i / 6) * chartArea.height;
                    return (
                        <text
                            key={i}
                            x={chartArea.left - 15}
                            y={y + 5}
                            fill="#636363"
                            fontSize="10"
                            fontFamily="Poppins, sans-serif"
                            fontWeight="600"
                            textAnchor="end"
                            dominantBaseline="middle"
                        >
                            {value}
                        </text>
                    );
                })}

                {/* Bars */}
                {data.map((day, dayIndex) => {
                    const dayBars = day.bars.map((bar, barIndex) => {
                        const barHeight = (bar.value / maxValue) * chartArea.height;
                        const barY = chartArea.top + chartArea.height - barHeight;
                        const barX = currentX;

                        currentX += actualBarWidth + barSpacing;

                        return (
                            <rect
                                key={`${dayIndex}-${barIndex}`}
                                x={barX}
                                y={barY}
                                width={actualBarWidth}
                                height={barHeight}
                                fill={bar.color}
                                rx="15"
                                ry="15"
                            />
                        );
                    });

                    // Add spacing between days
                    currentX += 40 - barSpacing;

                    return dayBars;
                })}

                {/* X-axis labels */}
                {showXAxisLabels && (() => {
                    let labelX = chartArea.left;
                    return data.map((day, dayIndex) => {
                        const dayWidth = day.bars.length * (actualBarWidth + barSpacing) - barSpacing;
                        const centerX = labelX + dayWidth / 2;
                        labelX += dayWidth + 40; // Move to next day position

                        return (
                            <text
                                key={dayIndex}
                                x={centerX}
                                y={chartArea.top + chartArea.height + 25}
                                fill="#636363"
                                fontSize="10"
                                fontFamily="Poppins, sans-serif"
                                fontWeight="600"
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {day.label}
                            </text>
                        );
                    });
                })()}
            </svg>
        </div>
    );
};

export default BarChart;