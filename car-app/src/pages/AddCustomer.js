import React, { useRef, useState, useEffect } from 'react';
import imageplaceholder from '../images/imageplaceholder.jpg';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { XlviLoader } from "react-awesome-loaders";


const AddCustomer = ({ user }) => {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    contact: '',
    email: '',
    address:'',
    image: null
  });
  const [loading, setLoading] = useState(false);

 

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  const handleLastnameChange = (event) => {
    setFormData({
      ...formData,
      last_name: event.target.value
    });
  };

  const handleFirstnameChange = (event) => {
    setFormData({
      ...formData,
      first_name: event.target.value
    });
  };

  const handleEmailChange = (event) => {
    setFormData({
      ...formData,
      email: event.target.value
    });
  };

  const handleContactChange = (phoneNumber) => {
    setFormData({
      ...formData,
      contact: phoneNumber
    });
  };
  const handleAddressChange = (location) => {
    setFormData({
      ...formData,
      address: location
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch('/customers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: formDataToSend
    })
      .then(response => {
        if (!response.ok) {
          Swal.fire({
            title: 'Error!',
            text: 'Customer Not Added Successfully! Please Try Again',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
          throw new Error('Network response was not ok');
        }
       
        return response.json();
      })
      .then(data => {
        if (data.message) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            onClose: () => {
              setFormData({
                last_name: '',
                first_name: '',
                contact: '',
                email: '',
                address:'',
                image: null
              });
            }
          });
          setLoading(true)
        } else {
          toast.error(data.error, {
            position: "top-right",
            autoClose: 2000
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };

  // if(!loading){
  //   return <XlviLoader
  //   boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
  //   desktopSize={"128px"}
  //   mobileSize={"100px"}
  // />;
  // }

  return (
    <div className="m-80 bg-slate200 rounded-lg overflow-hidden mt-10 relative w-[700px] h-[300px] mr-[200px]">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            className="form-input mt-1 block ml-2 flex-none w-64"
            placeholder="John"
            value={formData.first_name}
            onChange={handleFirstnameChange}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            className="form-input mt-1 block ml-2 flex-none w-64"
            placeholder="Doe"
            value={formData.last_name}
            onChange={handleLastnameChange}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="contact">Contact</label>
          <PhoneInput
            id="contact"
            international
            className="form-input mt-1 block ml-2 flex-none w-64"
            defaultCountry="KE"
            limitMaxLength
            maxLength={15}
            value={formData.contact}
            onChange={handleContactChange}
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input mt-1 block ml-4 flex-none w-72"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleEmailChange}
          />

        </div>
        <div className="flex items-center">
          <label className="text-gray-700 flex-shrink-0" htmlFor="address">Address</label>
          <input
            id="address"
            type="address"
            className="form-input mt-1 block ml-4 flex-none w-72"
            placeholder="address"
            value={formData.address}
            onChange={handleAddressChange}
          />
          
        </div>
        <div className="flex items-center">
          
        </div>
      </div>

      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <div onClick={handleImageClick} className='h-[100px] w-[130px] rounded-[5px] cursor-pointer relative'>
          <div>
            {formData.image ? (
              <img className='w-full h-full object-cover' src={URL.createObjectURL(formData.image)} alt="Preview" />
            ) : (
              <img className='w-full h-full object-cover' src={imageplaceholder} alt="Placeholder" />
            )}
          </div>
          <input type="file" ref={inputRef} onChange={handleImageChange} className='hidden' />
        </div>
      </div>
            {loading ?<div className="flex items-center justify-center h-screen">
                
                <XlviLoader
                    boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
                    desktopSize={"128px"}
                    mobileSize={"100px"}
                    className={'object-center'}
                />
            </div>:null}
      <button className="bg-cyan300 rounded-md hover:shadow hover:bg-cyan400 text-white font-bold py-2 px-4 block mx-auto mt-4 my-2.5" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

AddCustomer.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddCustomer;
