import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/store';
import { closeAlert } from 'store/alertSlice';
import { Alert, Snackbar, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Success icon
import ErrorIcon from '@mui/icons-material/Error'; // Error icon
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Loading icon

const SnackbarWrapper = styled("div")`
  position: relative;
  z-index: 2000;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%; /* Start with 0% width */
    height: 4px; /* Adjust height to your preference */
    background-color: ${(props) => props.bgColor || "#01E17B"};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    animation: grow ${(props) => props.duration}ms linear forwards;
  }

  @keyframes grow {
    from {
      width: 0%; /* Start from the left */
    }
    to {
      width: 100%; /* Expand to the right */
    }
  }
`;

const CustomAlert: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const alertState = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        if (alertState.open) {
            const timer = setTimeout(() => {
                dispatch(closeAlert());
            }, alertState.duration);

            return () => clearTimeout(timer);
        }
    }, [alertState, dispatch]);

    let bgColor;
    let iconColor;
    let icon;
    switch (alertState.severity) {
        case "success":
            bgColor = "#36a18f";
            iconColor = "#4caf50";
            icon = <CheckCircleIcon style={{ color: iconColor }} />;
            break;
        case "loading":
            bgColor = "#FFAE1A";
            iconColor = "#ff9800";
            icon = <HourglassEmptyIcon style={{ color: iconColor }} />;
            break;
        case "error":
            bgColor = "#FE6A49";
            iconColor = "#f44336";
            icon = <ErrorIcon style={{ color: iconColor }} />;
            break;
        default:
            bgColor = "#173878";
            iconColor = "#1976d2";
            icon = <CheckCircleIcon style={{ color: iconColor }} />;
    }

    const severity: "success" | "info" | "warning" | "error" =
        alertState.severity === "loading" ? "info" : alertState.severity as "success" | "info" | "warning" | "error";

    return (
        <Snackbar
            open={alertState.open}
            autoHideDuration={alertState.duration}
            onClose={() => dispatch(closeAlert())}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            sx={{
                zIndex: 2000,
            }}
        >
            <SnackbarWrapper bgColor={bgColor} duration={alertState.duration}>
                <Alert
                    onClose={() => dispatch(closeAlert())}
                    severity={severity as "success" | "info" | "warning" | "error"}
                    icon={icon} // Setting the custom icon
                    className={`bg-${alertState.severity === 'success' ? 'brandGreen' : alertState.severity === 'error' ? 'brandRed' : 'brandYellow'} text-white`}
                >
                    {alertState.message}
                    {alertState.severity === 'loading' && <LinearProgress className="mt-2" />}
                </Alert>
            </SnackbarWrapper>
        </Snackbar>
    );
};

export default CustomAlert;
