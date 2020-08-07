import React from 'react';

const ErrorMessage = ({ children, testId }) => (
  <div data-testid={testId}>
    {Array.isArray(children) ? children.map((error, index) => <p key={index}>{error}</p>) : <p>{children}</p>}
  </div>
);

export default ErrorMessage;
