import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let successToastId = null;
let errorToastId = null;

const notifySuccess = (message) => {
  if (successToastId !== null) {
    toast.dismiss(successToastId);
  }
  successToastId = toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    style: { textAlign: 'left' } // Align text to the left
  });
};

const notifyError = (message) => {
  if (errorToastId !== null) {
    toast.dismiss(errorToastId);
  }
  errorToastId = toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    style: { textAlign: 'left' } // Align text to the left
  });
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000} // Auto close the toast after 5 seconds
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
    />
  );
};

export { notifySuccess, notifyError }; // Export the functions here
export default Toast;
