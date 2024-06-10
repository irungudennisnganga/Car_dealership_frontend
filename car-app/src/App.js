import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from 'react-loader-spinner'
import OneReceipt from './pages/OneReceipt';
import SellerReport from './pages/SellerReport';



// Lazy-loaded components
const AddCustomer = lazy(() => import('./pages/AddCustomer'));
const Customers = lazy(() => import('./pages/Customers'));
const CreateReceipt = lazy(() => import('./pages/CreateReceipt'));
const AddUser = lazy(() => import('./pages/AddUser'));
const Profile = lazy(() => import('./pages/Profile'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Workers = lazy(() => import('./pages/Workers'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const WorkerByDetail = lazy(() => import('./pages/WorkerByDetail'));
const Receipt = lazy(() => import('./pages/Receipt'));
const Sales = lazy(() => import('./pages/Sales'));
const Invoice = lazy(() => import('./pages/invoice'));
// const Report = lazy(() => import('./pages/Report'));
const SellerSaleDashboard = lazy(() => import('./pages/SellerSaleDashboard'));
const SaleDetails = lazy(() => import('./pages/SaleDetails'));
const Invoicebysellername = lazy(() => import('./pages/Invoicebysellername'));
const InvoicebyId = lazy(() => import('./pages/Invoicebyid'));
const NewInvoice = lazy(() => import('./pages/NewInvoice'));

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [inventory, setInventory] = useState([]);
  const [customer, setCustomer] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) {
      fetch(`/api/checksession`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to check session'))
      .then(userData => {
        setUser(userData);
        if (location.pathname === '/login') {
          navigate('/', { replace: true });
        }
      })
      .catch(error => {
        console.error('Error checking session:', error);
        localStorage.removeItem('jwt');
        setUser(null);
      });
    }
  }, [user, location.pathname, navigate]);

  useEffect(() => {
    fetch('/api/inventory', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setInventory(data); 
    })
    .catch(error => {
      console.error('Error fetching inventory:', error);
    });
  }, [user]); 

  useEffect(() => {
    fetch('/api/customer', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setCustomer(data); 
    })
    .catch(error => {
      console.error('Error fetching customers:', error);
    });
  }, [user]); 
// console.log(customer)
  
  useEffect(() => {
    // Save user to local storage on user change
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    // Use location state to redirect to login route after logout
    return <Navigate to="/login" replace />;
  };
// console.log(customer)
  return (
    <div  >
      <ToastContainer />
      {user ? (
        <div className="flex">
          <Sidebar sidebarToggle={sidebarToggle} user={user} />
          <div className={`${sidebarToggle ? '' : 'ml-64'} w-full`}>
            <Navbar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              user={user}
              handleLogout={handleLogout}
            />
            <Suspense className="flex items-center justify-center h-screen" fallback={(<CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    outerCircleColor="#4fa94d"
                    innerCircleColor="#4fa94d"
                    barColor="#4fa94d"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    />)}>
              <Routes>
                <Route path="/AddUser" element={<AddUser user={user} />} />
                <Route path="/AddCustomer" element={<AddCustomer user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/Inventory" element={<Inventory inventory={inventory} user={user} />} />
                <Route path="/workers" element={<Workers user={user} />} />
                <Route path="/customers" element={<Customers user={user} customers={customer} />} />
                <Route path="/dashboard" element={<Dashboard  />} />
                <Route path="/workers/:username/:userid" element={<WorkerByDetail />} />
                <Route path="/receipt" element={<Receipt user={user} customer={customer}  />} />
                <Route path="/receipt/:id" element={<OneReceipt />} />
                <Route path="/receipt/:customer/:invoice/:amount" element={<CreateReceipt user={user} customers={customer} />} />
                <Route path="/sales" element={<Sales user={user} customers={customer} />} />
                <Route path="/invoice" element={<Invoice user={user} />} />
                <Route path="/report" element={<SellerReport users={user} />} />
                <Route path="/sellersaledashboard" element={<SellerSaleDashboard />} />
                <Route path="/sale/:saleid" element={<SaleDetails />} />
                <Route path="/invoice/:username/:id" element={<Invoicebysellername />} />
                <Route path="/invoices/:invoiceid" element={<InvoicebyId />} />
                <Route path="/create-invoice/:new/:id/:customer/:sale/:date" element={<NewInvoice />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) : (
        // Route to login if user is not authenticated
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLoginSuccess={(userData, jwtToken) => {
            setUser(userData);
            localStorage.setItem('jwt', jwtToken);
            // Navigate to the dashboard after successful login
            navigate('/dashboard', { replace: true });
          }} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
