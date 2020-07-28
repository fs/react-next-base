import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useError from 'hooks/useError';

const ErrorNotifier = () => {
  const { error } = useError();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  }, [error]);

  return <ToastContainer position="top-center" autoClose={5000} closeOnClick hideProgressBar />;
};

export default ErrorNotifier;
