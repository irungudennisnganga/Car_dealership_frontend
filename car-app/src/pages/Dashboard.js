import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = ({sidebarToggle,setbarToggle}) => {
  return (
    <div className={`${sidebarToggle ? "" :" ml-64 "}w-full`}>
      <Navbar  sidebarToggle={sidebarToggle} setbarToggle={setbarToggle}/>
    </div>
  )
}

export default Dashboard
