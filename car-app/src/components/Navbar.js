import React,{useState} from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PopUp from '../pages/PopUp'; 

const Navbar = ({ sidebarToggle, setbarToggle, user ,handleLogout}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Simplified navigation functions
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);
  // const [openPopup, setOpenPopup] = useState(false);
  //   const [selectedImage, setSelectedImage] = useState(null);
  //   const [inventory, setInventory] = useState([]);

  // User information
  const userName = user ? user.first_name : "Guest";
  const userRole = user ? user.role : "";

  const handleSearch = () => {
    fetch(`/inventory`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return response.json();
    })
    .then(data => {
      if(searchQuery){
        const filteredData = data.filter(item => {
          // Assuming item.name is the property you want to search against
          return item.make.toLowerCase().includes(searchQuery.toLowerCase());
        });

        setSearchResults(filteredData);
      }
      
    
      
      // console.log(data); // Check if the response contains the expected search results
       // Update searchResults state with the fetched data
    })
    
    .catch(error => {
      console.error('Error fetching search results:', error);
    });
  };
//   const handleOpenPopup = (image) => {
//     setSelectedImage(image);
//     setOpenPopup(true);
// };

// const handleClosePopup = () => {
//     setSelectedImage(null);
//     setOpenPopup(false);
// };
  // console.log(searchResults);

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
            <input type='text' className='w-full px-4 py-1 pl-10 rounded shadow outline-none md:block hidden' value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} onClick={handleSearch} placeholder="Search..." />
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
      <button onClick={handleLogout}>log out</button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {searchResults.map(item => (
                <div  className=' border-solid border-2 border-blue-500' key={item.id}>
                    <img
                        src={item.image}
                        alt={item.make}
                        // onClick={() => handleOpenPopup(item.image)}
                        className="cursor-pointer"
                    />
                    <h4>{item.make}</h4>
                    <h4>{item.model}</h4>
                </div>
            ))}

            {/* {openPopup && (
                <PopUp
                    openPopup={openPopup}
                    closePopup={handleClosePopup}
                    inventory={inventory.find(item => item.image === selectedImage)} 
                />
            )} */}
        </div>
    </>
  );
};

export default Navbar;
