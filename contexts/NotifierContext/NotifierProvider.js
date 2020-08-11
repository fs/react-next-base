import React, { useState, useMemo } from 'react';
import { withApolloClient } from 'lib/withApolloClient';
import ErrorDecorator from 'decorators/ErrorDecorator';
import TYPES from 'config/types/notifierTypes';
import NotifierContext from './NotifierContext';

const NotifierProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const setError = errorMessage => {
    const [parsedMessage] = new ErrorDecorator(errorMessage).getMessages();
    setMessage(parsedMessage);
    setType(TYPES.error);
  };

  const setInfo = infoMessage => {
    setMessage(infoMessage);
    setType(TYPES.info);
  };

  const setSuccess = successMessage => {
    setMessage(successMessage);
    setType(TYPES.success);
  };

  const clearMessage = () => {
    setMessage('');
    setType('');
  };

  const context = useMemo(
    () => ({
      message,
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
