import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useNotifier from 'hooks/useNotifier';

const Notifier = () => {
  const { message, type, clearMessage } = useNotifier();

  useEffect(() => {
    if (message && type) {
      toast[type](message);
      clearMessage();
    }
  }, [message, type, clearMessage]);

  return <ToastContainer position="top-center" autoClose={5000} closeOnClick hideProgressBar />;
};

export default Notifier;
