import React, { useContext, createContext, useState, useMemo, useCallback, ReactNode } from 'react';
import ErrorDecorator from 'decorators/ErrorDecorator';
import { toast, TypeOptions } from 'react-toastify';

type NotifierContext = {
  message?: string;
  type?: TypeOptions;
  setError?: (message: string) => void;
  setInfo?: (message: string) => void;
  setSuccess?: (message: string) => void;
  clearMessage?: () => void;
};

const NotifierContext = createContext<NotifierContext | null>(null);

export const useNotifier = () => {
  const value = useContext(NotifierContext);

  if (value === null) {
    throw new Error('useNotifier cannot be used outside of NotifierProvider');
  }

  return value;
};

type NotifierProviderProps = {
  children: ReactNode;
};

export const NotifierProvider = ({ children }: NotifierProviderProps) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<TypeOptions | undefined>(undefined);

  const setError = useCallback(
    (errorMessage) => {
      const [parsedMessage] = new ErrorDecorator(errorMessage).getMessages();
      setMessage(parsedMessage);
      setType(toast.TYPE.ERROR);
    },
    [setMessage, setType],
  );

  const setInfo = useCallback(
    (infoMessage) => {
      setMessage(infoMessage);
      setType(toast.TYPE.INFO);
    },
    [setMessage, setType],
  );

  const setSuccess = useCallback(
    (successMessage) => {
      setMessage(successMessage);
      setType(toast.TYPE.SUCCESS);
    },
    [setMessage, setType],
  );

  const clearMessage = useCallback(() => {
    setMessage('');
    setType(undefined);
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
