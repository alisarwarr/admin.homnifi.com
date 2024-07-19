//SWEETALERT2
import Swal from 'sweetalert2';
//REACT-TOASTIFY
import { toast } from 'react-toastify';

export const successAlert = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    timer: 2500,
    showCancelButton: false,
    timerProgressBar: true,
    confirmButtonText: 'Okay',
    confirmButtonColor: '#1D417C',
    imageWidth: 600,
    imageHeight: 600,
  });
};

export const errorAlert = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonText: 'Okay',
    confirmButtonColor: '#1B9FDA',
    imageWidth: 600,
    imageHeight: 600,
  });
};

export const successNotify = (message: string) => toast.success(message);
export const errorNotify = (message: string) =>
  toast.error(message, {
    toastId: 'error1',
  });
export const infoNotify = (message: string) => toast.info(message);
