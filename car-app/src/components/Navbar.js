import React from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle ,FaArrowLeft} from 'react-icons/fa';
import { Link, useNavigate} from 'react-router-dom';

const Navbar = ({ sidebarToggle, setbarToggle ,user}) => {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); 
  };

  const userName = user ? user.first_name : "Guest";
  const userRole = user ? user.role : "";
  
  return (
    <>
      <nav className="bg-Cyan50 px-4 py-3 flex justify-between">
        <div className='flex items-center text-xl'>
          <FaBars className='text-white me-4 cursor-pointer' onClick={() => setbarToggle(!sidebarToggle)} />
          <span className='text-black font-semibold'>AutoCar</span>
        </div>
        <div className='flex items-center gap-x-5'>
          <div className='relative md:w-65'>
            <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
              <button className='p-1 focus:outline-none text-white md:text-black'>
                <FaSearch />
              </button>
            </span>
            <input type='text' className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block' />
          </div>
          <div className='text-white'>
            <FaBell className='w-6 h-6' />
          </div>
          <div className='relative'>
            <button className='text-white group'>
              <Link to="/profile"><FaUserCircle className='w-6 h-6 mt-1' /></Link>
            </button>
          </div>
          <div>
            <ul>
              <li><h4>{userName}</h4></li>
              <li><h5>{userRole}</h5></li>
            </ul>
          </div>
        </div>
      </nav>
      

    
    <FaArrowLeft className='w-7 h-7 mt-2 pt-1' onClick={goBack} />
            
    </>
  )
}

export default Navbar;
