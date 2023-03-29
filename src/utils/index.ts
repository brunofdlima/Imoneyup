import { toast, TypeOptions, ToastPosition } from 'react-toastify';

export const showToast = (type: TypeOptions, message: string, position?: ToastPosition) => {
  toast(message, {
    type: type,
    position: position || 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'light',
  });
};
