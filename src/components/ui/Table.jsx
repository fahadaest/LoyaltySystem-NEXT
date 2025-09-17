import React from 'react';
import Button from '@/components/buttons/Button';

const Table = (props) => {
    const {
        headers = [],
        data = [],
        containerStyle = {},
        headerStyle = {},
        rowStyle = {},
        cellStyle = {},
        headerFontSize = '16px',
        bodyFontSize = '14px',
        paginationInfo = 'page 1 of 1',
        footerButtons = [],
        showFooter = true
    } = props;

    const defaultContainerStyle = {
        background: '#FFFFFF',
        border: '1px solid #E2E2E2',
        borderRadius: '30px'
    };

    const defaultHeaderStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: headerFontSize,
        fontWeight: '600',
        lineHeight: '150%',
        color: '#636363'
    };

    const defaultCellStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: bodyFontSize,
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
        <div className='bg-[#FCFCFC] flex flex-col p-5 border rounded-[2.3rem] relative w-full h-full min-h-0'>

            {/* inner table - now with flex-1 to take remaining space and min-h-0 to allow shrinking */}
            <div className="bg-white border rounded-[2.3rem] relative w-full flex flex-col flex-1 min-h-0 overflow-hidden" style={{ ...defaultContainerStyle, ...containerStyle }}>
                {/* Table Header - fixed */}
                <div className="flex items-center px-6 py-4 border-b border-gray-200 flex-shrink-0 w-full min-w-full">
                    {headers.map((header, index) => (
                        <div
                            key={index}
                            className={header.className || 'flex-1'}
                            style={{
                                textAlign: header.align || 'left',
                                minWidth: 0, // Allow flex items to shrink
                                ...header.containerStyle
                            }}
                        >
                            <h3
                                className="font-semibold text-gray-500 truncate"
                                style={{ ...defaultHeaderStyle, ...headerStyle, ...header.style }}
                            >
                                {header.label}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Table Body - scrollable and takes remaining space */}
                <div className="divide-y divide-gray-200 flex-1 overflow-y-auto w-full min-w-full min-h-0">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center px-6 py-4 flex-shrink-0 w-full min-w-full"
                            style={{ ...rowStyle }}
                        >
                            {headers.map((header, headerIndex) => (
                                <div
                                    key={headerIndex}
                                    className={header.className || 'flex-1'}
                                    style={{
                                        textAlign: header.align || 'left',
                                        minWidth: 0, // Allow flex items to shrink
                                        ...header.containerStyle
                                    }}
                                >
                                    <div
                                        className="truncate"
                                        style={{ ...defaultCellStyle, ...cellStyle, ...header.cellStyle }}
                                    >
                                        {renderCellContent(item, header)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* table footer buttons - fixed at bottom */}
            {showFooter && (
                <div className='flex items-center justify-between mt-4 px-6 flex-shrink-0'>
                    <div className='text-[0.6rem] text-gray-600'>
                        {paginationInfo}
                    </div>
                    <div className='flex items-center gap-3'>
                        {footerButtons.map((buttonProps, index) => (
                            <Button
                                key={index}
                                {...buttonProps}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;