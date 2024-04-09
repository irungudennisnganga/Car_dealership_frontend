import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login';

// Lazy loading components
const AddUser = lazy(() => import('./pages/AddUser'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Workers = lazy(() => import('./pages/Workers'));
const WorkerByDetail = lazy(() => import('./pages/WorkerByDetail'));

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      fetch(`/checksession`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to check session');
        }
      })
      .then(userData => {
        setUser(userData);
        navigate(window.location.pathname);
      })
      .catch(error => {
        console.error('Error checking session:', error);
      });
    };

    checkSession();
  }, [navigate]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <>
      <div className="flex">
        <ToastContainer />
        {loggedIn && <Sidebar />}
        <div className={`${loggedIn ? 'ml-64' : ''} w-full`}>
          {loggedIn && <Navbar />}
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workers/:username/:userid" element={<WorkerByDetail />} />
        </Routes>
      </Suspense>

      <Routes>
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
