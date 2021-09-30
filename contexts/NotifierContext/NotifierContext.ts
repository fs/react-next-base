import { createContext } from 'react';
import { TypeOptions } from 'react-toastify';

interface INotifierContext {
  message?: string;
  type?: TypeOptions;
  setError?: (message: unknown | string) => void;
  setInfo?: (message: string) => void;
  setSuccess?: (message: string) => void;
  clearMessage?: () => void;
}

const NotifierContext = createContext<INotifierContext>({});

export default NotifierContext;
