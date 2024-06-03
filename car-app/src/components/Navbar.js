import React, { useState,useEffect } from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';


const Navbar = ({ sidebarToggle, setSidebarToggle, user, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // this useEffect resets the search results everytime the path changes
  useEffect(() =>{
    setSearchResults([])
  },[location])

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  const userName = user ? user.first_name : "Guest";
  const userRole = user ? user.role : "";

  const handleSearch = () => {
    fetch(`/search?query=${searchQuery}&currentPath=${location.pathname}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      // console.log(response)
      return response.json();
      
    })
    .then(data => {
      // here we set the data searched  from our backend
      setSearchResults(data)
     
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
    });
  };
  // console.log(searchResults)
  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;
  // console.log(location)
  return (
    <>
      <nav className="bg-cyan-50 px-4 py-3 flex justify-between items-center fixed top-0 w-[87%] mx-auto rounded shadow z-10">
        <div className='flex items-center text-xl'>
          <FaBars className='text-white mr-4 cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)} aria-label="Toggle sidebar" />
          <span className='text-black font-semibold'>AutoCar</span>
        </div>
        <div className='flex items-center gap-x-5'>
          <div className='relative md:w-64'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <button className='p-1 focus:outline-none text-white md:text-black' aria-label="Search">
                <FaSearch />
              </button>
            </span>
            <input type='text' className='w-full px-4 py-1 pl-10 rounded shadow outline-none md:block hidden' value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} onClick={handleSearch} placeholder="Search..." />
          </div>
          <div className='text-white'>
            <FaBell className='w-6 h-6' aria-label="Notifications" />
          </div>
          <div className='relative'>
            <Link to="/profile" aria-label="User Profile">
              <FaUserCircle className={`w-6 h-6 mt-1 ${isActive('/profile') ? 'text-blue-500' : 'text-white'}`} />
            </Link>
          </div>
          <div className='hidden sm:block'>
            <ul>
              <li className='font-bold text-blue-800'><h4>{userName}</h4></li>
              <li className='font-bold text-blue-800'><h5>{userRole}</h5></li>
            </ul>
          </div>
          <button className='font-bold text-red-600 hover:bg-cyan400 hover:text-blue-800 p-1 rounded-md' onClick={handleLogout}>log out</button>
        </div>
      </nav>

      <div className="my-2 mt-20 px-4">
        <button onClick={goBack} aria-label="Go back">
          <FaArrowLeft className='w-7 h-7' />
        </button>
        <button onClick={goForward} className="ml-2" aria-label="Go forward">
          <FaArrowRight className='w-7 h-7' />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-4">
       {searchResults.length > 0  ? <SearchResults location={location} data={searchResults} />:null}
      </div>
    </>
  );
};

export default Navbar;
