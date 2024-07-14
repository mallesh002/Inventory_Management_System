import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import AddProductModal from './AddProductModal';
import RemoveItemModal from './RemoveItemModal';
import UpdateItemModal from './UpdateItemModal';
import AddUserModal from './AddUserModal';
import RemoveUserModal from './RemoveUserModal';

function Navigation({ onRefresh }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddProduct = (product) => {
    fetch('http://localhost:8081/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Product added successfully');
        setIsAddModalOpen(false);
        onRefresh();
      } else {
        alert('Error adding product: ' + data.error);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred');
    });
  };

  const handleRemoveProduct = (productId, setErrorMessage) => {
    fetch('http://localhost:8081/remove-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Product removed successfully');
        setIsRemoveModalOpen(false);
        onRefresh();
      } else {
        setErrorMessage(data.message || 'Error removing product');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      setErrorMessage('An error occurred');
    });
  };

  const handleUpdateProduct = ({ productId, quantity, price }) => {
    fetch('http://localhost:8081/update-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity, price }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Product updated successfully');
        setIsUpdateModalOpen(false);
        onRefresh();
      } else {
        alert('Error updating product: ' + data.error);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred');
    });
  };

  const handleAddUser = (user) => {
    fetch('http://localhost:8081/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('User added successfully');
        setIsAddUserModalOpen(false);
        onRefresh(); // Trigger a refresh
      } else {
        alert('Error adding user: ' + data.error);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred');
    });
  };

  const handleRemoveUser = (identifier) => {
    fetch('http://localhost:8081/remove-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('User removed successfully');
        setIsRemoveUserModalOpen(false);
        onRefresh(); // Trigger a refresh
      } else {
        alert('Error removing user: ' + data.error);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred');
    });
  };

  return (
    <>
      <nav className="navigation">
        <ul>
          <li><Link to="/dashboard">Admin Dashboard</Link></li>
          
          
          <li><button onClick={() => setIsAddModalOpen(true)}>Add New Item</button></li>
          <li><button onClick={() => setIsRemoveModalOpen(true)}>Remove Item</button></li>
          <li><button onClick={() => setIsUpdateModalOpen(true)}>Update Item</button></li>
          <li><Link to="/user-list">View Users</Link></li> {/* New link to view users */}
          <li><button onClick={() => setIsAddUserModalOpen(true)}>Add User</button></li>
          <li><button onClick={() => setIsRemoveUserModalOpen(true)}>Remove User</button></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
            
          
          <li><Link to="/dashboard">Home</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddProduct={handleAddProduct} 
      />
      <RemoveItemModal 
        isOpen={isRemoveModalOpen} 
        onClose={() => setIsRemoveModalOpen(false)} 
        onRemoveProduct={handleRemoveProduct} 
      />
      <UpdateItemModal 
        isOpen={isUpdateModalOpen} 
        onClose={() => setIsUpdateModalOpen(false)} 
        onUpdateProduct={handleUpdateProduct} 
      />
      <AddUserModal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)} 
        onAddUser={handleAddUser} 
      />
      <RemoveUserModal 
        isOpen={isRemoveUserModalOpen} 
        onClose={() => setIsRemoveUserModalOpen(false)} 
        onRemoveUser={handleRemoveUser} 
      />
    </>
  );
}

export default Navigation;
