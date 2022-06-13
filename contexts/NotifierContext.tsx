import { useContext, createContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { toast, TypeOptions } from 'react-toastify';
import parseApolloError from 'lib/apollo/parseApolloError';

type NotifierContext = {
  message: string;
  type: TypeOptions;
  setError: (error: unknown) => void;
  setInfo: (message: string) => void;
  setSuccess: (message: string) => void;
  clearMessage: () => void;
};

const NotifierContext = createContext<NotifierContext>({} as NotifierContext);

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
  const [type, setType] = useState<TypeOptions>('default');

  const setError = useCallback(
    (error) => {
      const { message: errorMessage } = parseApolloError(error);
      setMessage(errorMessage);
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
    setType('default');
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
