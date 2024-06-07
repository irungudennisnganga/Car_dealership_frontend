import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Popup.css'
const PopUp = ({ openPopup, closePopup, inventory }) => {
  const handleLosePopUp = (e) => {
    if (e.target.id === 'ModelContainer') {
      closePopup();
    }
  };

  if (!openPopup || !inventory) return null;

  return (
    <div
      id='ModelContainer'
      onClick={handleLosePopUp}
      className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
      <div className='relative p-4 bg-cyan400 w-10/12 md:w-3/4 lg:w-2/3 max-h-[90%] overflow-y-auto shadow-lg rounded-lg'>
        {/* First row */}
        <div className="grid grid-cols-1 ">
          <Carousel showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true}>
            {inventory.gallery.map((image, index) => (
              <div key={index}>
                <img className="h-96  object-cover " src={image} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* First column */}
          <div className="md:col-span-1">
            <div className="px-4">
              <h2 className="font-semibold text-xl mb-3">{inventory.make}</h2>
              <p className="text-gray-600 mb-2">Price: {inventory.price} {inventory.currency}</p>
              <p className="text-gray-600 mb-2">Model: {inventory.model}</p>
              <p className="text-gray-600 mb-2">Year: {inventory.year}</p>
              <p className="text-gray-600 mb-2">VIN: {inventory.VIN}</p>
              <p className="text-gray-600 mb-2">Color: {inventory.color}</p>
              <p className="text-gray-600 mb-2">Mileage: {inventory.mileage}</p>
              <p className="text-gray-600 mb-2">Body Style: {inventory.body_style}</p>
              <p className="text-gray-600 mb-2">Transmission: {inventory.transmission}</p>
            </div>
          </div>
          {/* Second column */}
          <div className="md:col-span-1">
            <div className="px-4">
              <p className="text-gray-600 mb-2">Fuel Type: {inventory.fuel_type}</p>
              <p className="text-gray-600 mb-2">Engine Size: {inventory.engine_size}</p>
              <p className="text-gray-600 mb-2">Drive Type: {inventory.drive_type}</p>
              <p className="text-gray-600 mb-2">Trim Level: {inventory.trim_level}</p>
              <p className="text-gray-600 mb-2">Condition: {inventory.condition}</p>
              <p className="text-gray-600 mb-2">Availability: {inventory.availability}</p>
              <p className="text-gray-600 mb-2">Cylinder: {inventory.cylinder}</p>
              <p className="text-gray-600 mb-2">Doors: {inventory.doors}</p>
              <p className="text-gray-600 mb-2">Stock Number: {inventory.stock_number}</p>
              <p className="text-gray-600 mb-2">Purchase Cost: {inventory.purchase_cost}</p>
              <p className="text-gray-600 mb-2">Features: {inventory.features}</p>
            </div>
          </div>
        </div>
       
        {/* Close button */}
        <div className="flex justify-center mt-5">
          {/* remeber to correct this stylings  */}
          <button onClick={closePopup} className="close hover:bg-blue-800 font-bold  py-2 px-4 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
