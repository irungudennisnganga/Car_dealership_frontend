import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
function App() {
  const [sidebarToggle,setbarToggle]=useState(false)
  return (
    <div className="flex">
     
      <Sidebar sidebarToggle={sidebarToggle} />
      <Dashboard sidebarToggle={sidebarToggle} setbarToggle={setbarToggle}/>
    
    </div>
  );
}

export default App;
