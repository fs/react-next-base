import React from 'react';

const ErrorMessage = ({ children }) => (
  <div>{Array.isArray(children) ? children.map((error, index) => <p key={index}>{error}</p>) : <p>{children}</p>}</div>
);

export default ErrorMessage;
