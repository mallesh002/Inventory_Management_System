import React, { useEffect, useState } from 'react';
import './UserList.css';

function UserList({ refreshTrigger }) {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = () => {
    fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.data);
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setErrorMessage('Error fetching users');
      });
  };

  return (
    <div className="user-list-container">
      <h2>All Users</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roleid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
