import React, { useRef, useState ,useEffect} from 'react';
import imageplaceholder from '../images/imageplaceholder.jpg';
import PhoneInput from 'react-phone-number-input'; // Importing PhoneInput from the right module
import 'react-phone-number-input/style.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = ({user}) => {
    const inputRef = useRef(null);
    const [formData, setFormData] = useState({
        lastname: '',
        firstname:'',
        contact:'',
        email:'',
        role:'',
        image: null
    });

    useEffect(() => {
        if(user.role === 'super admin') {
            // If user is super admin, they can choose, but no default is set
            setFormData(prevFormData => ({
                ...prevFormData,
                role: '' // No default role; they must choose
            }));
        } else if(user.role === 'admin') {
            // If user is admin, default role for new users is 'seller'
            setFormData(prevFormData => ({
                ...prevFormData,
                role: 'seller'
            }));
        }
        // Add dependency on user.role to rerun if it changes
    }, [user.role]);


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

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        fetch('/signup', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: formDataToSend
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.message
            ?   
                toast.success(data.message,
                    {
                        position: "top-right",
                        autoClose:2000,
                        onClose: ()=>
                        {
                            // updateEmployeeData(data.employee_data)
                            setFormData({
                                lastname: '',
                                firstname:'',
                                contact:'',
                                email:'',
                                image: null
                                    });
                                
                        }
                    })
            :
                toast.error(data.error,
                    {
                        position: "top-right",
                        autoClose: 2000
                    })
                })
            //  {

        //     setMessage(`Product added successfully`);
        //     setFormData({
        //         name: '',
        //         description: '',
        //         price: '',
        //         quantity_available: '',
        //         category: '',
        //         image: null
        //     });
        // })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            // Handle error here
        });
    };
    

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

    const handleRoleChange = (event) => {
        setFormData({
            ...formData,
            role: event.target.value
        });
    };

    return (
        <div className="m-80 bg-slate200 rounded-lg overflow-hidden  mt-10 relative w-[700px] h-[300px]  mr-[200px]">
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
                <div className="flex items-center">
                <label className="text-gray-700 flex-shrink-0" htmlFor="roleSelect">Role</label>
                <select
                    id="roleSelect"
                    className="form-select mt-1 block ml-4 flex-none w-72"
                    value={formData.role}
                    onChange={handleRoleChange}
                >
                    <option value="">Select a role</option>
                    {/* Conditionally render options based on user role */}
                    {user.role === 'super admin' && <option value="admin">Admin</option>}
                    <option value="seller">Seller</option>
                </select>
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

            <button className="bg-cyan300 rounded-md hover:shadow  hover:bg-cyan400 text-white font-bold py-2 px-4  block mx-auto mt-4 my-2.5" onClick={handleSubmit}>Submit</button>

            
        </div>
    )
}

export default AddUser;
