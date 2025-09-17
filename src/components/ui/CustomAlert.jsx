"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '@/store/slices/alertSlice';

const CustomAlert = () => {
    const dispatch = useDispatch();
    const { type, message, isVisible } = useSelector((state) => state.alert);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible && message) {
            setShow(true);
        } else {
            // Delay hiding to allow slide-out animation
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, message]);

    const alertStyles = {
        success: {
            background: 'rgba(65, 204, 64, 0.22)',
            border: '2px solid #41CC40',
            color: '#000000'
        },
        error: {
            background: 'rgba(239, 68, 68, 0.22)',
            border: '2px solid #EF4444',
            color: '#000000'
        },
        warning: {
            background: 'rgba(245, 158, 11, 0.22)',
            border: '2px solid #F59E0B',
            color: '#000000'
        }
    };

    const handleClose = () => {
        dispatch(hideAlert());
    };

    if (!show) return null;

    return (
        <div
            className={`fixed left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300 ease-in-out cursor-pointer ${isVisible
                    ? 'top-10 translate-y-0 opacity-100'
                    : '-top-20 -translate-y-full opacity-0'
                }`}
            onClick={handleClose}
            style={{
                minWidth: '200px',
                maxWidth: '400px',
                minHeight: '40px',
                padding: '8px 20px',
                ...alertStyles[type],
                borderRadius: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                wordWrap: 'break-word',
                textAlign: 'center'
            }}
        >
            <span
                style={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '140%',
                    whiteSpace: 'pre-wrap'
                }}
            >
                {message}
            </span>
        </div>
    );
};

export default CustomAlert;