import React, { useState, useEffect } from 'react';
import PopUp from './PopUp'; 

const Inventory = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetch('/inventory', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setInventory(data); 
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }, []); 

    const handleOpenPopup = (image) => {
        setSelectedImage(image);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
        setOpenPopup(false);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {inventory.map(item => (
                <div key={item.id}>
                    <img
                        src={item.image}
                        alt={item.make}
                        onClick={() => handleOpenPopup(item.image)}
                        className="cursor-pointer"
                    />
                </div>
            ))}

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

export default Inventory;
