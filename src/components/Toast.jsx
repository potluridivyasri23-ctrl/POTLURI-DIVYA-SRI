import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast glass-card">
        <i className="ri-notification-badge-line color-accent"></i>
        <span>{message}</span>
      </div>
    </div>
  );
}
