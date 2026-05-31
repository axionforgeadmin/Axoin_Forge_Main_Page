import React from 'react';

export default function Button({ variant = 'primary', children, onClick, type = 'button', className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
