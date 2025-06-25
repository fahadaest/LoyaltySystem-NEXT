import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertSeverity = 'success' | 'error' | 'info' | 'loading';

interface AlertState {
    open: boolean;
    message: string;
    severity: AlertSeverity;
    duration: number;
}

const initialState: AlertState = {
    open: false,
    message: '',
    severity: 'success',
    duration: 2000,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ message: string; severity: AlertSeverity; duration?: number }>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.duration = action.payload.duration || 2000;
        },
        closeAlert: (state) => {
            state.open = false;
            state.message = '';
            state.severity = 'success';
            state.duration = 2000;
        },
    },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;