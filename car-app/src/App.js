import Sidebar from "./components/Sidebar";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import {Routes,Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Workers from "./pages/Workers";
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
        <Route path="/workers" element={<Workers/>}/>
      </Routes>
    
    
    </>
  );
}

export default App;
