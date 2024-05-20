import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PopUp from './PopUp'; 
import AccordionItem from '../components/AccordionItem';
import AddInventory from './AddInventory';

const Inventory = ({ inventory, user }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // console.log('User in Inventory component:', user);
  }, [user]);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  const handleOpenPopup = (image) => {
    setSelectedImage(image);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
    setOpenPopup(false);
  };

  return (
    <div className='m-32 mt-9'>
      {(user.role === 'admin' || user.role === 'super admin') && (
        <AccordionItem title='Add Inventory'>
          <AddInventory />
        </AccordionItem>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventory.map(item => (
          <div key={item.id} className='bg-green-600 cursor-pointer' onClick={() => handleOpenPopup(item.image)}>
            <img
              src={item.image}
              alt={item.make}
              className="w-full h-96 mt-1 mb-4 object-cover"
            />
            <h4 className='font-bold text-blue-800'>{item.make} -- {item.model}</h4>
          </div>
        ))}
      </div>

      {openPopup && (
        <PopUp
          openPopup={openPopup}
          closePopup={handleClosePopup}
          inventory={inventory.find(item => item.image === selectedImage)} 
        />
      )}
    </div>
  );
};

Inventory.propTypes = {
  inventory: PropTypes.array.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

export default Inventory;
