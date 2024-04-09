import Sidebar from "./components/Sidebar";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

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
        {loggedIn && <Sidebar sidebarToggle={sidebarToggle} />}
        {loggedIn && <Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />}
      </div>

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
