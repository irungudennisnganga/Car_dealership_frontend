import Sidebar from "./components/Sidebar";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import {Routes,Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [sidebarToggle,setbarToggle]=useState(false)
  return (
    <>
     <div className="flex">
     <ToastContainer />
      <Sidebar sidebarToggle={sidebarToggle} />
      <Dashboard sidebarToggle={sidebarToggle} setbarToggle={setbarToggle}/>
      </div>
     
      <Routes  >
        <Route path="/AddUser" element={<AddUser/>}/>
      </Routes>
    
    
    </>
  );
}

export default App;
