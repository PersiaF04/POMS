import React from 'react';

function CitiButton({ children, onClick, type = 'button' }) {
  return (
    <button type={type} className="citi-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default CitiButton;