import React, { useState, useMemo, useCallback } from 'react';
import { withApolloClient } from 'lib/withApolloClient';
import ErrorDecorator from 'decorators/ErrorDecorator';
import TYPES from 'config/types/notifierTypes';
import NotifierContext from './NotifierContext';

const NotifierProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const setError = useCallback(
    (errorMessage) => {
      const [parsedMessage] = new ErrorDecorator(errorMessage).getMessages();
      setMessage(parsedMessage);
      setType(TYPES.error);
    },
    [setMessage, setType],
  );

  const setInfo = useCallback(
    (infoMessage) => {
      setMessage(infoMessage);
      setType(TYPES.info);
    },
    [setMessage, setType],
  );

  const setSuccess = useCallback(
    (successMessage) => {
      setMessage(successMessage);
      setType(TYPES.success);
    },
    [setMessage, setType],
  );

  const clearMessage = useCallback(() => {
    setMessage('');
    setType('');
  }, [setMessage, setType]);

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
