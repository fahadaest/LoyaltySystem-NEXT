"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreAuthState } from '@/store/slices/authSlice';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Restore auth state on app load
        dispatch(restoreAuthState());
    }, [dispatch]);

    return children;
};

export default AuthProvider;