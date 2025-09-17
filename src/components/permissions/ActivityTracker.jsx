"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, selectIsAuthenticated } from '@/store/slices/authSlice';

const ActivityTracker = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) return;

        const activities = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click'
        ];

        let timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            // Refresh token on activity
            dispatch(refreshToken());

            // Set timer to refresh token every 30 minutes of activity
            timeout = setTimeout(() => {
                if (isAuthenticated) {
                    dispatch(refreshToken());
                }
            }, 30 * 60 * 1000); // 30 minutes
        };

        // Add event listeners
        activities.forEach(activity => {
            document.addEventListener(activity, resetTimer, true);
        });

        // Initial timer setup
        resetTimer();

        // Cleanup
        return () => {
            clearTimeout(timeout);
            activities.forEach(activity => {
                document.removeEventListener(activity, resetTimer, true);
            });
        };
    }, [dispatch, isAuthenticated]);

    return children;
};

export default ActivityTracker;