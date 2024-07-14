import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Categories from './Categories';
import AddNewItem from './AddNewItem';
import Reports from './Reports';
import Settings from './Settings';
import Navigation from './Navigation';
import UserLandingPage from './UserLandingPage';
import Inventory from './Inventory';
import Purchases from './Purchases';
import UserList from './UserList'; // Import the new component
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [role, setRole] = useState(null);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  return (
    <Router>
      <Main handleRefresh={handleRefresh} refreshTrigger={refreshTrigger} handleLogin={handleLogin} role={role} />
    </Router>
  );
}

function Main({ handleRefresh, refreshTrigger, handleLogin, role }) {
  const location = useLocation();

  return (
    <div className="app-container">
      {location.pathname !== '/' && role === 'Admin' && <Navigation onRefresh={handleRefresh} />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={role === 'Admin' ? <Dashboard refreshTrigger={refreshTrigger} /> : <Navigate to="/user-landing-page" />} />
          <Route path="/user-landing-page/*" element={<UserLandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-new-item" element={<AddNewItem />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/user-list" element={<UserList refreshTrigger={refreshTrigger} />} /> {/* Pass refreshTrigger to UserList */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
