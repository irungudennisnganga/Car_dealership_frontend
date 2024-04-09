import React from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarToggle, setbarToggle, user }) => {
  const navigate = useNavigate();

  // Simplified navigation functions
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  // User information
  const userName = user ? user.first_name : "Guest";
  const userRole = user ? user.role : "";

  return (
    <>
      <nav className="bg-cyan-50 px-4 py-3 flex justify-between items-center">
        <div className='flex items-center text-xl'>
          {/* Improved accessibility with aria-label */}
          <FaBars className='text-white mr-4 cursor-pointer' onClick={() => setbarToggle(!sidebarToggle)} aria-label="Toggle sidebar" />
          <span className='text-black font-semibold'>AutoCar</span>
        </div>
        <div className='flex items-center gap-x-5'>
          <div className='relative md:w-64'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <button className='p-1 focus:outline-none text-white md:text-black' aria-label="Search">
                <FaSearch />
              </button>
            </span>
            {/* Visible input on larger screens */}
            <input type='text' className='w-full px-4 py-1 pl-10 rounded shadow outline-none md:block hidden' placeholder="Search..." />
          </div>
          <div className='text-white'>
            <FaBell className='w-6 h-6' aria-label="Notifications" />
          </div>
          <div className='relative'>
            <Link to="/profile" aria-label="User Profile">
              <FaUserCircle className='w-6 h-6 text-white mt-1' />
            </Link>
          </div>
          <div>
            <ul>
              <li><h4>{userName}</h4></li>
              <li><h5>{userRole}</h5></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Navigation buttons */}
      <div className=" my-2">
        <button onClick={goBack} aria-label="Go back">
          <FaArrowLeft className='w-7 h-7' />
        </button>
        <button onClick={goForward} className="ml-2" aria-label="Go forward">
          <FaArrowRight className='w-7 h-7' />
        </button>
      </div>
    </>
  );
};

export default Navbar;
