import Sidebar from "./components/Sidebar";
import AddUser from "./pages/AddUser";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
function App() {
  const [sidebarToggle,setbarToggle]=useState(false)
  return (
    <>
     <div className="flex">
     <ToastContainer />
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className={`${sidebarToggle ? "" :" ml-64 "}w-full`}>
      <Navbar sidebarToggle={sidebarToggle} setbarToggle={setbarToggle}/>
      </div>
      </div>
     
      <Routes  >
        <Route path="/AddUser" element={<AddUser/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Inventory" element={<Inventory/>}/>
      </Routes>
    
    
    </>
  );
}

export default App;
