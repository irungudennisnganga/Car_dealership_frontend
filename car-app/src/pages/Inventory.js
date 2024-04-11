import React from 'react';


const Inventory = () => {
  const menuItem = [
    {
      
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
    {
      
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
    
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
    
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
    
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
  ];
  


  return (
    <div className="flex flex-wrap bg-slate200 rounded-lg  shadow-md  mt-8 m-auto relative w-[1000px] h-[500px]">
      {/* Card */}

      {menuItem.map(({ image }, index) => {
        return (
          <div key={index} className="rounded-xl relative w-full md:w-1/3 px-2  bg-white shadow-md gap-4">
            {/* Overlay */}
            <div className="rounded-xl relative w-full md:w-1/3 px-2  bg-white shadow-md grid-cols-10 gap-4">
            </div>
            <img
              className="max-h-[160px]  md:max-h-[200px] w-full object-cover rounded-xl"
              src={image}
              alt="/"
            />
          </div>
        );
      })}
    </div>
  );
};



  export default Invetory;