import React, { useState } from 'react';
import PopUp from './PopUp'; 
import AccordionItem from '../components/AccordionItem';
import  AddInventory from './AddInventory'

const Inventory = ({inventory, user}) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    

   

    const handleOpenPopup = (image) => {
        setSelectedImage(image);
        console.log(image)
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedImage(null);
        setOpenPopup(false);
    };

    return (
        <div className='m-72 mt-9'>
            {
                user.role === 'admin' || user.role === 'super admin' ? <AccordionItem title='add inventory'>
                <AddInventory/>
            </AccordionItem>:null
            }
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
            {inventory.map(item => (
                <div key={item.id} className='bg-green-600 cursor-pointer ' onClick={() => handleOpenPopup(item.image)}>
                    <img
                        src={item.image}
                        alt={item.make}
                        
                        className="w-full h-96 mt-1 mb-4 object-cover"
                    />
                    <h4 className='font-bold text-blue-800'>{item.make}  --  {item.model}</h4>
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

export default Inventory;
