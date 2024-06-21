import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';

const Navbar = ({ sidebarToggle, setSidebarToggle, user, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setSearchResults([]);
  }, [location]);

  useEffect(() => {
    fetchNotifications();
  }, [unreadCount, location]);

  const fetchNotifications = () => {
    fetch('/api/notification', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        return response.json();
      })
      .then(data => {
        const role = user.role;
        const filteredNotifications = data.filter(notification => {
          if (role === 'admin') {
            return !notification.admin_read;
          } else if (role === 'super admin') {
            return !notification.super_admin_read;
          } else if (role === 'seller') {
            return !notification.seller_read;
          }
          return false;
        });

        setNotifications(filteredNotifications);
        setUnreadCount(filteredNotifications.length);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  const handleSearch = () => {
    fetch(`/api/search?query=${searchQuery}&currentPath=${location.pathname}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const markAsRead = (id) => {
    fetch(`/api/notification/${id}/read`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to mark notification as read');
        }
        return response.json();
      })
      .then(() => {
        setNotifications(notifications.map(notification =>
          notification.id === id ? { ...notification, read: 'True' } : notification
        ));
        setUnreadCount(unreadCount - 1);
      })
      .catch(error => {
        console.error('Error marking notification as read:', error);
      });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  const userName = user ? user.first_name : "Guest";
  const userRole = user ? user.role : "";

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`bg-cyan-50 px-4 py-3  flex items-center fixed top-0 transition-all duration-300  ${sidebarToggle ? ' w-[100%]' : 'pl-0 w-[87%]'} rounded shadow z-10`}>
        <div className='flex items-center'>
          <FaBars className='text-black ml-2 mr-4 cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)} aria-label="Toggle sidebar" />
          <span className='text-black font-semibold'>AutoCar</span>
        </div>
        <div className='flex flex-grow justify-end items-center gap-x-5'>
          <div className='relative md:w-64'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <button className='p-1 focus:outline-none text-black' aria-label="Search">
                <FaSearch />
              </button>
            </span>
            <input
              type='text'
              className='w-full px-4 py-1 pl-10 rounded shadow outline-none md:block hidden'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={handleSearch}
              placeholder="Search..."
            />
          </div>
          <div className='relative'>
            <FaBell className='w-6 h-6 cursor-pointer' aria-label="Notifications" onClick={toggleNotifications} />
            {unreadCount > 0 && (
              <span className='absolute -top-2 -right-3 inline-block w-5 h-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center'>
                {unreadCount}
              </span>
            )}
            {showNotifications && (
              <div className='absolute right-0 mt-2 w-96 max-h-80 bg-white shadow-lg rounded-lg overflow-y-auto z-20 bg-green-500'>
                <div className='p-4'>
                  <div className='flex justify-between items-center'>
                    <h4 className='font-semibold'>Notifications</h4>
                    <FaTimes className='cursor-pointer' onClick={closeNotifications} />
                  </div>
                  <ul>
                    {notifications.map(notification => (
                      <li key={notification.id} className={`p-2 cursor-pointer ${notification.read ? 'bg-gray-200' : 'bg-white'}`} onClick={() => markAsRead(notification.id)}>
                        {notification.message} || {notification.time_stamp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className='relative'>
            <Link to="/profile" aria-label="User Profile">
              <FaUserCircle className={`w-6 h-6 mt-1 ${isActive('/profile') ? 'text-blue-500' : 'text-black'}`} />
            </Link>
          </div>
          <div className='hidden sm:block'>
            <ul>
              <li className='font-bold text-blue-800'><h4>{userName}</h4></li>
              <li className='font-bold text-blue-800'><h5>{userRole}</h5></li>
            </ul>
          </div>
          <button className='font-bold text-red-600 hover:bg-cyan-400 hover:text-blue-800 p-1 rounded-md' onClick={handleLogout}>Log out</button>
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
        {searchResults.length > 0 && <SearchResults location={location} data={searchResults} />}
      </div>
    </>
  );
};

export default Navbar;
