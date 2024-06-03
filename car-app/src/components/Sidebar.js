import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/autocar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserPlus, faUsers, faBoxOpen, faFileInvoice, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ sidebarToggle , user}) => {
  return (
    <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-Cyan50 fixed h-full overscroll-auto`}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold px-4 py-2'>
        <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faTachometerAlt} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/" className='p-2'>
            Dashboard
          </Link>
        </li>
        {user.role === 'admin' && (
                    <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
                        <FontAwesomeIcon icon={faUsers} className='inline-block w-6 h-6 mr-2 -mt-2' />
                        <Link to="/workers" className='p-2'>
                            Sellers
                        </Link>
                    </li>
                )}
        {user.role === 'super admin' && (
                    <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
                        <FontAwesomeIcon icon={faUsers} className='inline-block w-6 h-6 mr-2 -mt-2' />
                        <Link to="/workers" className='p-2'>
                            Employees
                        </Link>
                    </li>
                )}
        
        <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faBoxOpen} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/inventory" className='p-2'>
            Inventory
          </Link>
        </li>
        {user.role==='super admin'&&(
        <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faUserPlus} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/adduser" className='p-2'>
            Add Employee
          </Link>
        </li>)}
        {user.role==='admin' && (
          <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faUserPlus} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/adduser" className='p-2'>
            Add Seller
          </Link>
        </li>
        )}
        {user.role==='seller' && (
          <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faUserPlus} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/AddCustomer" className='p-2'>
            Add Customer
          </Link>
        </li>
        )}
        {(user.role==='seller' || user.role==='super admin' || user.role==='admin') && (
          <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faUsers} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/customers" className='p-2'>
            Added Customer
          </Link>
        </li>
        )}
        <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faFileInvoice} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/invoice" className='p-2'>
            Invoice
          </Link>
        </li>
        <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faChartLine} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/sales" className='p-2'>
            Sales
          </Link>
        </li>
        
        <li className='bg-cyan300 py-2 p-4 rounded-md hover:shadow hover:bg-cyan400 my-2.5'>
          <FontAwesomeIcon icon={faReceipt} className='inline-block w-6 h-6 mr-2 -mt-2' />
          <Link to="/receipt" className='p-2'>
            Receipt
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
