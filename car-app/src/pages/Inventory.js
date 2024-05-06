import React, { useState, useEffect } from 'react';
import PopUp from './PopUp'; 
import AccordionItem from '../components/AccordionItem';
import  AddInventory from './AddInventory'

const Inventory = ({inventory}) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    

   

    const handleOpenPopup = (image) => {
        setSelectedImage(image);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
        setOpenPopup(false);
    };

    return (
        <>
        <AccordionItem title='add inventory'>
            <AddInventory/>
        </AccordionItem>
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
        </>
    );
};

export default Inventory;
