import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from "./components/Sidebar";
import Navbar from './components/Navbar';
import Login from "./components/Login";
import 'react-toastify/dist/ReactToastify.css';


// Lazy loading components
const AddUser = lazy(() => import('./pages/AddUser'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Workers = lazy(() => import('./pages/Workers'));
const WorkerByDetail = lazy(() => import('./pages/WorkerByDetail'));
const Sales = lazy(() => import('./pages/Sales'));
const SellerSaleDashboard = lazy(() => import('./pages/SellerSaleDashboard'));
const SaleDetails = lazy(() => import('./pages/SaleDetails'));
const Invoice = lazy(()=>import('./pages/invoice'))
const Inventory = lazy(() => import('./pages/Inventory'));
const Invoicebysellername = lazy(()=>import('./pages/Invoicebysellername'))

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      fetch(`/checksession`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
      })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to check session'))
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Error checking session:', error);
        localStorage.removeItem('jwt');  // Clear JWT as the session is no longer valid
        setUser(null);  // Clear user state
        navigate('/login');
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
      <>
      <ToastContainer />
      {user ? (
        <>
        <div className="flex">
          <Sidebar sidebarToggle={sidebarToggle} user={user} />
          <div className={`${sidebarToggle ? '' : 'ml-64'} w-full `}>
            <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} user={user} handleLogout={handleLogout} />
            </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/AddUser" element={<AddUser user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/workers" element={<Workers user={user} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workers/:username/:userid" element={<WorkerByDetail />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path='/sellersaledashboard' element={<SellerSaleDashboard />} />
                <Route path="/sale/:saleid" element={<SaleDetails Details />} />
                <Route path='/invoice/:username' element={<Invoicebysellername />}/>
              </Routes>
            </Suspense>
            </>
         
        ) : (
          <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLoginSuccess={(userData, jwtToken) => {
            setUser(userData);
            localStorage.setItem('jwt', jwtToken);
            localStorage.setItem('user', JSON.stringify(userData));
          }} />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/profile" element={<Profile  user={user}/>} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/workers/:username/:userid" element={<WorkerByDetail/>} />

          {/* Add other routes here */}
        </Routes>
      )}
      </>
   
  );
}

export default App;
