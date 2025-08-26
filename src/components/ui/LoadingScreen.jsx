'use client';

import { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingScreen = ({ message = "Loading..." }) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === '...') return '';
                return prev + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                {/* Logo with Circular Progress */}
                <Box
                    sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem'
                    }}
                >
                    {/* Circular Progress */}
                    <CircularProgress
                        size={120}
                        thickness={2}
                        sx={{
                            color: '#FFFFFF',
                            position: 'absolute'
                        }}
                    />

                    {/* Logo Container */}
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: '#1f2937',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}
                    >
                        <img
                            src="/img/logo.svg"
                            alt="Logo"
                            className="w-16 h-16 object-contain"
                        />
                    </Box>
                </Box>

                {/* Loading Text */}
                <p className="text-white font-medium text-lg font-poppins ml-6">
                    {message}
                    <span className="inline-block w-8 text-left">{dots}</span>
                </p>

                {/* Additional Info */}
                <p className="text-white text-sm mt-2 font-poppins">
                    Please wait while we set things up for you
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;