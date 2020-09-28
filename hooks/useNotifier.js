import { useContext } from 'react';
import NotifierContext from 'contexts/NotifierContext';

const useNotifier = () => {
  const { message, type, setError, setInfo, setSuccess, clearMessage } = useContext(NotifierContext);
  return { message, type, setError, setInfo, setSuccess, clearMessage };
};

export default useNotifier;
