import React, { useRef, useState } from 'react';
import imageplaceholder from '../images/imageplaceholder.jpg';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
// import { XlviLoader } from 'react-awesome-loaders';
import { CirclesWithBar } from 'react-loader-spinner'

const AddCustomer = ({ user }) => {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    contact: '',
    email: '',
    address: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContactChange = (phoneNumber) => {
    setFormData({
      ...formData,
      contact: phoneNumber,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch('/api/customer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: formDataToSend,
    })
      
      .then(response => {
        if (!response.ok) {
          Swal.fire({
            title: 'Error!',
            text: 'Customer Not Added Successfully! Please Try Again',
            icon: 'error',
            confirmButtonText: 'Cool',
          });
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          }
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          toast.success(data.message, {
            position: 'top-right',
            autoClose: 2000,
            onClose: () => {
              setFormData({
                last_name: '',
                first_name: '',
                contact: '',
                email: '',
                address: '',
                image: null,
              });
            },
          });
          setLoading(true);
        } else {
          toast.error(data.error, {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };

  return (
    <div className="m-80 bg-slate200 rounded-lg overflow-hidden mt-10 relative w-[700px] h-[340px] mr-[200px]">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            name="first_name"
            type="text"
            className="form-input mt-1 block ml-2 flex-none w-64"
            placeholder="John"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            name="last_name"
            type="text"
            className="form-input mt-1 block ml-2 flex-none w-64"
            placeholder="Doe"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="contact">Contact</label>
          <PhoneInput
            id="contact"
            name="contact"
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
            name="email"
            type="email"
            className="form-input mt-1 block ml-4 flex-none w-72"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="text-gray-700 flex-shrink-0" htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            className="form-input mt-1 block ml-4 flex-none w-72"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleInputChange}
          />
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

      {loading && (
        <div className="flex items-center justify-center h-screen">
          (<CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    outerCircleColor="#4fa94d"
                    innerCircleColor="#4fa94d"
                    barColor="#4fa94d"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    />)
        </div>
      )}

      <button className="bg-cyan300 rounded-md hover:shadow hover:bg-cyan400 text-white font-bold py-2 px-4 block mx-auto mt- mb-6 4 my-2.5" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

AddCustomer.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddCustomer;
