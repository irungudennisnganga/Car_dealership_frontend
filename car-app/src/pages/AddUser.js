import React, { useRef, useState } from 'react';
import imageplaceholder from '../images/imageplaceholder.jpg';
import PhoneInput from 'react-phone-number-input'; // Importing PhoneInput from the right module
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const inputRef = useRef(null);
    const [formData, setFormData] = useState({
        lastname: '',
        firstname:'',
        contact:'',
        email:'',
        image: null
    });

    const handleImageClick = () =>{
        inputRef.current.click();
    }

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        setFormData({
            ...formData,
            image: file
        });
    }

    const handleLastnameChange = (event) => {
        setFormData({
            ...formData,
            lastname: event.target.value
        });
    }

    const handleFirstnamechange = (event) => {
        setFormData({
            ...formData,
            firstname: event.target.value
        });
    }

    const handleEmailChange = (event) => {
        setFormData({
            ...formData,
            email: event.target.value
        });
    }

    const handleSubmit = () => {
        
        
        
    }

    const handleContactChange = (phoneNumber) => {
        if (phoneNumber === undefined) {
            // This is triggered when the phone number is deleted
            // You can handle this case if needed
            return;
        }

        const cleanedPhoneNumber = phoneNumber
        setFormData({
            ...formData,
            contact: cleanedPhoneNumber
        });
    }

    return (
        <div className="m-80 bg-slate200 rounded-lg overflow-hidden m-auto mt-10 relative w-[700px] h-[300px]">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <label className="text-gray-700 flex-shrink-0" htmlFor="first-name">First Name</label>
                    <input
                        id="first-name"
                        type="text"
                        className="form-input mt-1 block ml-2 flex-none w-64  "
                        placeholder="John"
                        value={formData.firstname}
                        onChange={handleFirstnamechange}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="text-gray-700 flex-shrink-0" htmlFor="last-name">Last Name</label>
                    <input
                        id="last-name"
                        type="text"
                        className="form-input mt-1 block ml-2 flex-none w-64 "
                        placeholder="Doe"
                        value={formData.lastname}
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
                        limitMaxLength // Limit input to maximum length
                        maxLength={15}
                        value={formData.contact}
                        onChange={handleContactChange}
                        required
                    />
                </div>
                <div className="flex items-center">
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
            </div>

            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <div onClick={handleImageClick} className='h-[100px] w-[130px] rounded-[5px] cursor-pointer relative'>
                    <div>
                        {formData.image ? (
                            <img className='w-full h-full object-cover' src={URL.createObjectURL(formData.image)} alt="/"/>
                        ) : (
                            <img className='w-full h-full object-cover' src={imageplaceholder} alt="/" />
                        )}
                    </div>
                    <input type="file" ref={inputRef} onChange={handleImageChange} className='hidden'/>
                </div>
            </div>

            <button className="bg-cyan300 rounded-md hover:shadow  hover:bg-cyan400 my-2.5 text-white font-bold py-2 px-4  block mx-auto mt-4 my-2.5" onClick={handleSubmit}>Submit</button>

            
        </div>
    )
}

export default AddUser;
