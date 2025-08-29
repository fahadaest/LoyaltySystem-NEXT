import React from 'react';

const Table = ({
    headers = [],
    data = [],
    containerStyle = {},
    headerStyle = {},
    rowStyle = {},
    cellStyle = {}
}) => {
    const defaultContainerStyle = {
        background: '#FFFFFF',
        border: '1px solid #E2E2E2',
        borderRadius: '30px'
    };

    const defaultHeaderStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '150%',
        color: '#636363'
    };

    const defaultCellStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '150%',
        color: '#000000'
    };

    const renderCellContent = (item, header) => {
        if (header.render && typeof header.render === 'function') {
            return header.render(item);
        }

        if (header.key) {
            return item[header.key];
        }

        return '';
    };

    return (
        <div
            className="bg-white border rounded-3xl relative w-full overflow-hidden"
            style={{ ...defaultContainerStyle, ...containerStyle }}
        >
            {/* Table Header */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
                {headers.map((header, index) => (
                    <div
                        key={index}
                        className={header.className || 'flex-1'}
                        style={header.align ? { textAlign: header.align } : {}}
                    >
                        <h3
                            className="font-semibold text-gray-500"
                            style={{ ...defaultHeaderStyle, ...headerStyle, ...header.style }}
                        >
                            {header.label}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center px-6 py-4"
                        style={{ ...rowStyle }}
                    >
                        {headers.map((header, headerIndex) => (
                            <div
                                key={headerIndex}
                                className={header.className || 'flex-1'}
                                style={header.align ? { textAlign: header.align } : {}}
                            >
                                <div style={{ ...defaultCellStyle, ...cellStyle, ...header.cellStyle }}>
                                    {renderCellContent(item, header)}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;