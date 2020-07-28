import React, { useState, useMemo } from 'react';
import { withApolloClient } from 'lib/withApolloClient';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorContext from './ErrorContext';

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState('');

  const context = useMemo(
    () => ({
      error: error ? new ErrorDecorator(error).getMessages()[0] : '',
      setError,
    }),
    [error, setError],
  );

  return <ErrorContext.Provider value={context}>{children}</ErrorContext.Provider>;
};

export default withApolloClient(ErrorProvider);
