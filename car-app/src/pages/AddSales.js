import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { CirclesWithBar } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

const AddSale = ({  token, customer }) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        status: "",
        history: "",
        discount: "",
        discountPercentage: 0,
        sale_date: "",
        customer_id: "",
        inventory_id: "",
        promotions: "",
        commissionPercentage: 0,
    });

    const navigateToCreate = (invoiceId,id, customer,sale_id) => {
        navigate(`/create-invoice/${invoiceId}/${id}/${customer}/${sale_id}`);
      };
    //   console.log(formData)
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/inventory', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();
                setInventory(data);
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
        setCustomers(customer);
    }, [ token, customer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/sales', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
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
                        setSelectedStatus('');
                        setSelectedCustomer('');
                       const id=formData.inventory_id
                       const customer =formData.customer_id
                        // console.log(id)
                        const saleId = data.sale_id; 
                        navigateToCreate("new",id,customer,saleId)
                        setFormData({
                            status: "",
                            history: "",
                            discount: "",
                            sale_date: "",
                            customer_id: "",
                            inventory_id: "",
                            promotions: "",
                        });
                        
                    }
                });
            } else {
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 2000
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setFormData({
            ...formData,
            status: e.target.value
        });
    };

    const handleCustomerChange = (e) => {
        const customerId = e.target.value;
        setSelectedCustomer(customerId);
        setFormData({
            ...formData,
            customer_id: customerId
        });
        // console.log("Selected customer ID:", customerId); // Add this line for debugging
    };

    const handleAmountChange = (event) => {
        // const price = event.target.value;
        const discount = 200;
        
        setFormData({
            ...formData,
            discount,
        });
    };

    const handleDateChange = (event) => {
        setFormData({
            ...formData,
            sale_date: event.target.value
        });
    };

    const handlePromotionsChange = (event) => {
        setFormData({
            ...formData,
            promotions: event.target.value
        });
    };

    const handleVehicleChange = (event) => {
        setFormData({
            ...formData,
            inventory_id: event.target.value
        });
    };

    if (loading) {
        return (
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
        );
    }

    return (
        <div className="p-4 bg-slate200">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="status" className="block">Status:</label>
                        <select id="status" value={selectedStatus} onChange={handleStatusChange} className="border p-2 rounded-md w-full">
                            <option value="">Select...</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        {selectedStatus && <p>Selected Status: {selectedStatus}</p>}
                    </div>
                    <div>
                        <label htmlFor="customers" className="block">Customer:</label>
                        <select id="customers" value={selectedCustomer} onChange={handleCustomerChange} className="border p-2 rounded-md w-full">
                            <option value="">Select...</option>
                            {customers.map((x) => (
                                <option key={x.id} value={x.id} required>{x.first_name} {x.last_name}</option>
                            ))}
                        </select>
                        {selectedCustomer && <p>Selected Customer ID: {selectedCustomer}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="amount" className="block">Discount:</label>
                        <input
                            type="number"
                            value={formData.discount}
                            onChange={handleAmountChange}
                            className="border p-2 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block">Date:</label>
                        <input
                            type="date"
                            value={formData.sale_date}
                            onChange={handleDateChange}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="promotions" className="block">Promotions:</label>
                    <input
                        type="text"
                        value={formData.promotions}
                        onChange={handlePromotionsChange}
                        className="border p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vehicles" className="block">Vehicle Name:</label>
                    <select id="vehicles" value={formData.inventory_id} onChange={handleVehicleChange} className="border p-2 rounded-md w-full">
                        <option value="">Select...</option>
                        {inventory.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id} required>{vehicle.make} {vehicle.model}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md close hover:bg-blue-600">Add Sale</button>
            </form>
        </div>
    );
};
AddSale.propTypes = {
    // sellerId: PropTypes.string.isRequired,
    // token: PropTypes.string.isRequired,
    customer: PropTypes.array.isRequired
};

export default AddSale;
