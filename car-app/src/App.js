import React, { lazy, Suspense, useState,useEffect } from 'react';
import { Route, Routes,useNavigate  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from "./components/Sidebar";
// import AddUser from "./pages/AddUser";
// import Dashboard from "./pages/Dashboard";
import {  Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from "./components/Login";
// import SellerSaleDashboard from './pages/SellerSaleDashboard';
// Lazy loading components
const AddUser = lazy(() => import('./pages/AddUser'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Workers = lazy(() => import('./pages/Workers'));
const WorkerByDetail = lazy(() => import('./pages/WorkerByDetail'));
const Sales = lazy(() => import('./pages/Sales'));
const SellerSaleDashboard = lazy(() => import('./pages/SellerSaleDashboard'));




function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  // useEffect(()=>{
  //   localStorage.setItem("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMjYwMTA0OSwianRpIjoiODcyZDUwODUtYTdiNy00Nzg4LTkxYzItOGNmMjZhMzkyNGNiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzEyNjAxMDQ5LCJjc3JmIjoiZWNjOTFmYTgtNWI1My00ZWNmLWIzN2YtNzNlNzRkZjZmMjE3IiwiZXhwIjoxNzEyNjI5ODQ5fQ.tHI6q-JZdC4OKbK2dkjOvB_UcI3Tmdc6sqzGdtT9Nvo")
  // })

  useEffect(() => {
    const checkSession = () => {
      fetch(`/checksession`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        // credentials: 'include'
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
  

  const loggedIn = localStorage.getItem('jwt') ? true : false;

  

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login'); // Ensure we redirect to login after logging out
  };

  return (
    
    <div className="flex">
    <ToastContainer />
    {loggedIn && (
      <>
        <Sidebar sidebarToggle={sidebarToggle} user={user} />
          <div className={`${sidebarToggle ? '' : 'ml-64'} w-full `}>
          <Navbar sidebarToggle={sidebarToggle} setbarToggle={setSidebarToggle} user={user} handleLogout={handleLogout}/>
        
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workers/:username/:userid" element={<WorkerByDetail />} />
              <Route path="/sales" element={<Sales />} />
              <Route path='/sellersaledashboard' element={<SellerSaleDashboard />} />
              
            </Routes>
          </Suspense>
        </div>
      </>
    )}

    {!loggedIn && (
      <Routes>
        <Route path="/login" element={<Login  />} />
      </Routes>
    )}
  </div>
);
}

export default App;
