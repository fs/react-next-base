import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNotifier } from 'contexts/NotifierContext';

const Notifier = () => {
  const { message, type, clearMessage } = useNotifier();

  useEffect(() => {
    if (message && type && clearMessage) {
      if (type === 'default') {
        toast(message);
      } else {
        toast[type](message);
      }
      clearMessage();
    }
  }, [message, type, clearMessage]);

  return (
    <div data-cy="notifier">
      <ToastContainer position="top-center" autoClose={5000} closeOnClick hideProgressBar />
    </div>
  );
};

export default Notifier;
