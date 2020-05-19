import React, { useCallback, useRef, useEffect } from 'react';

const Input = ({ value = '', onChange = null, autoFocus = false, ...props }) => {
  const ref = useRef(null);

  const handleChange = useCallback(
    event => {
      return onChange(event.target.value);
    },
    [onChange],
  );

  useEffect(() => {
    if (autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return <input ref={ref} type="text" value={value || ''} onChange={handleChange} {...props} />;
};

export default Input;
