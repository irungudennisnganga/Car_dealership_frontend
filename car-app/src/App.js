import React, { lazy, Suspense, useState,useEffect } from 'react';
import { Route, Routes,useNavigate  } from 'react-router-dom';
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
const WorkerByDetail = lazy(() => import('./pages/WorkerByDetail'));

function App() {
  const [sidebarToggle, setbarToggle] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    localStorage.setItem("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMjUxNTYzMiwianRpIjoiODBhN2ZkNDctOWNhYS00ZWFiLWI0MDktNjRjNmE5ZGVkMzljIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzEyNTE1NjMyLCJjc3JmIjoiNmEwMDRiYTMtMTExZi00MTE1LWFjMjktZjUwMzY0NDg5M2M4IiwiZXhwIjoxNzEyNTQ0NDMyfQ.anYx0OzxZtJau2KKiC7i3UOUKNVLdZ32g8YujmhzouU")
  })

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

    // if (accessToken) {
      checkSession();
    // }
  }, [navigate]);
  

  return (
    <>
      <div className="flex">
        <ToastContainer />
        <Sidebar sidebarToggle={sidebarToggle} />
        <div className={`${sidebarToggle ? '' : 'ml-64'} w-full`}>
          <Navbar sidebarToggle={sidebarToggle} setbarToggle={setbarToggle} user={user}/>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/profile" element={<Profile  user={user}/>} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/workers/:username/:userid" element={<WorkerByDetail/>} />

          {/* Add other routes here */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
