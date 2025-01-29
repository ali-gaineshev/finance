import {Bounce, toast, ToastOptions} from 'react-toastify';

/**
 * Triggers a toast notification.
 */
const alert = (message: string, alertType: 'success' | 'error' | 'info' | 'warning') => {
    const params: ToastOptions<unknown> = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

    switch (alertType) {
        case 'success':
            toast.success(message, params);
            break;
        case 'error':
            toast.error(message, params);
            break;
        case 'info':
            toast.info(message, params);
            break;
        case 'warning':
            toast.warning(message, params);
            break;
        default:
            toast(message, params);
            break;
    }
};

export default alert;
