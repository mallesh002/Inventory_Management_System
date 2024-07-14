import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserInventory from './UserInventory';
import BuyProduct from './BuyProduct';
import './UserLandingPage.css';

function UserLandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="user-landing-page">
      <nav className="user-navigation">
        <ul>
          <li><Link to="view-profile">View Profile</Link></li>
          <li><Link to="inventory">Inventory</Link></li>
          <li><Link to="buy">Buy</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
      <div className="user-content">
        <Routes>
          <Route path="view-profile" element={<UserProfile />} />
          <Route path="inventory" element={<UserInventory />} />
          <Route path="buy" element={<BuyProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserLandingPage;
