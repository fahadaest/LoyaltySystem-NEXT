import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: '',
    message: '',
    isVisible: false,
    duration: 3000
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
            state.duration = action.payload.duration || 3000;
            state.isVisible = true;
        },
        hideAlert: (state) => {
            state.isVisible = false;
            state.message = '';
        }
    }
});

export const { showAlert, hideAlert } = alertSlice.actions;

// Action creators
export const showSuccess = (message, duration = 3000) => (dispatch) => {
    dispatch(showAlert({ type: 'success', message, duration }));
    setTimeout(() => dispatch(hideAlert()), duration);
};

export const showError = (message, duration = 4000) => (dispatch) => {
    dispatch(showAlert({ type: 'error', message, duration }));
    setTimeout(() => dispatch(hideAlert()), duration);
};

export const showWarning = (message, duration = 3500) => (dispatch) => {
    dispatch(showAlert({ type: 'warning', message, duration }));
    setTimeout(() => dispatch(hideAlert()), duration);
};

export default alertSlice.reducer;