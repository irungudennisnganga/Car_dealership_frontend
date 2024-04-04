import React from 'react'
import logo from '../images/autocar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserPlus, faUsers, faBoxOpen, faFileInvoice, faReceipt, faChartBar, faComment } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({sidebarToggle}) => {
  return (
    <div className={`${sidebarToggle ? " hidden " :" block "} w-64 bg-Cyan50 fixed h-full overscroll-auto `}>
        <div >
            <img src={logo}alt = "logo"/>
        </div>
        <hr/>
        <ul className='mt-3 text-white font-bold px-4 py-2'>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
                
            <FontAwesomeIcon icon={faTachometerAlt} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
                  Dashboard  
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faUsers} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="/workers" className='p-2'>
                  Seller 
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faBoxOpen} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="/Inventory" className='p-2'>
                  Inventory
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faUserPlus} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="/AddUser" className='p-2'>
                  Add Seller
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faFileInvoice} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="/profile" className='p-2'>
                  Invoice 
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faChartBar} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
                 Report 
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faReceipt} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
                  Receipt
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faComment}className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
                 Notification
                </a>
            </li>
        </ul> 
      
    </div>
  )
}

export default Sidebar
