import React from 'react'
import logo from '../images/autoshop.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserPlus, faUsers, faBoxOpen, faFileInvoice, faReceipt, faChartBar } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className='w-64 bg-gray-800 fixed h-full '>
        <div >
            <img src={logo}alt = "logo"/>
        </div>
        <hr/>
        <ul className='mt-3 text-white font-bold px-4 py-2'>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                
      <FontAwesomeIcon icon={faTachometerAlt} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                  Dashboard  
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            <FontAwesomeIcon icon={faUsers} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                  Seller 
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            <FontAwesomeIcon icon={faBoxOpen} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                  Inventory
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            <FontAwesomeIcon icon={faUserPlus} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                  Add Seller
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            <FontAwesomeIcon icon={faFileInvoice} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                  Invoice 
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            <FontAwesomeIcon icon={faChartBar} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                 Report 
                </a>
            </li>
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            <FontAwesomeIcon icon={faReceipt} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="">
                  Receipt
                </a>
            </li>
        </ul> 
      
    </div>
  )
}

export default Sidebar
