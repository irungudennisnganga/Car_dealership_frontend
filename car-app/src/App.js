import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Lazy loading components
const AddUser = lazy(() => import('./pages/AddUser'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Workers = lazy(() => import('./pages/Workers'));

function App() {
  const [sidebarToggle, setbarToggle] = useState(false);

  return (
    <>
      <div className="flex">
        <ToastContainer />
        <Sidebar sidebarToggle={sidebarToggle} />
        <div className={`${sidebarToggle ? '' : 'ml-64'} w-full`}>
          <Navbar sidebarToggle={sidebarToggle} setbarToggle={setbarToggle} />
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* Add other routes here */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
