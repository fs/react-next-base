import React, { createContext } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface INotifierContext {
  message?: string;
  type?: keyof typeof toast; // 'success' | 'error' | 'info' | 'warning' | 'dark';
  setError?: (message: string) => void;
  setInfo?: (message: string) => void;
  setSuccess?: (message: string) => void;
  clearMessage?: () => void;
}

const NotifierContext = createContext<INotifierContext>({});

export default NotifierContext;
