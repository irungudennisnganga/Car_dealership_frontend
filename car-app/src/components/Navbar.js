import React from 'react'
import {FaBars ,FaSearch} from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav classname="bg-gray-800 px-4 py-3 flex justify-between">
        <div className='flex items-center text-xl'>   
            <FaBars className='text-white me-4 cursor-pointer'/>  
            <span className='text-blue font-semibold'>AutoShop</span>
        </div>
        <div className='flex items-center gap-x-5'>
            <div className='relative md:w-65'>
                <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
                    <button classname='p-1 focus:outline-none text-white md:text-black'>
                        <FaSearch/>
                    </button>
                </span>
                <input type='text'  classname='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block  '/>
            </div>

        </div>
      
    </nav>
  )
}

export default Navbar
