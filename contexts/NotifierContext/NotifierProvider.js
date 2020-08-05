import React, { useState, useMemo } from 'react';
import { withApolloClient } from 'lib/withApolloClient';
import ErrorDecorator from 'decorators/ErrorDecorator';
import NotifierContext from './NotifierContext';
import Type from '../../config/types/notifier.types';

const NotifierProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  let notifierMessage = message;

  if (type === Type.error) {
    [notifierMessage] = new ErrorDecorator(message).getMessages();
  }

  const setError = errorMessage => {
    setMessage(errorMessage);
    setType(Type.error);
  };

  const setInfo = infoMessage => {
    setMessage(infoMessage);
    setType(Type.info);
  };

  const setSuccess = successMessage => {
    setMessage(successMessage);
    setType(Type.success);
  };

  const clearMessage = () => {
    setMessage('');
    setType('');
  };

  const context = useMemo(
    () => ({
      message: notifierMessage || '',
      type,
      setError,
      setInfo,
      setSuccess,
      clearMessage,
    }),
    [message, type, setError, setInfo, setSuccess, clearMessage],
  );

  return <NotifierContext.Provider value={context}>{children}</NotifierContext.Provider>;
};

export default withApolloClient(NotifierProvider);
