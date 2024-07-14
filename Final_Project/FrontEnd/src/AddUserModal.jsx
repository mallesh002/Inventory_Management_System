import React, { useState, useEffect } from 'react';
import './AddUserModal.css';

function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roleid, setRoleid] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ username, password, email, roleid });
    setUsername('');
    setPassword('');
    setEmail('');
    setRoleid('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New User</h2>
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
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select value={roleid} onChange={(e) => setRoleid(e.target.value)} required>
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role.roleid} value={role.roleid}>
                  {role.rolename}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add User</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
