import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useError from 'hooks/useError';

const ErrorNotifier = () => {
  const { error, setError } = useError();

  // Show notifier and clear error before next form submitting
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError('');
    }
  }, [error, setError]);

  return <ToastContainer position="top-center" autoClose={5000} closeOnClick hideProgressBar />;
};

export default ErrorNotifier;
