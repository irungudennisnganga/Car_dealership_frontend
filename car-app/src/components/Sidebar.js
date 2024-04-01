import React from 'react'
import logo from '../images/autocar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserPlus, faUsers, faBoxOpen, faFileInvoice, faReceipt, faChartBar } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className='w-64 bg-Cyan50 fixed h-full '>
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
                <a href="" className='p-2'>
                  Seller 
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faBoxOpen} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
                  Inventory
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faUserPlus} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
                  Add Seller
                </a>
            </li>
            <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow  hover:bg-cyan400 my-2.5'>
            <FontAwesomeIcon icon={faFileInvoice} className='inline-block w-6 h-6 mr-2 -mt-2'/>
                <a href="" className='p-2'>
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
        </ul> 
      
    </div>
  )
}

export default Sidebar