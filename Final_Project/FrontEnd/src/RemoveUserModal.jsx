import React, { useState } from 'react';
import './RemoveUserModal.css';

function RemoveUserModal({ isOpen, onClose, onRemoveUser }) {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRemoveUser(username, setMessage);
    setUsername('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Remove User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit">Remove User</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default RemoveUserModal;
