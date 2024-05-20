import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'
const AddSale = ({ sellerId, token, customer }) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
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
    }, [sellerId, token, customer]);

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
                        setFormData({
                            status: "",
                            history: "",
                            discount: "",
                            sale_date: "",
                            customer_id: "",
                            inventory_id: "",
                            promotions: "",
                        });
                        setSelectedStatus('');
                        setSelectedCustomer('');
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
        console.log("Selected customer ID:", customerId); // Add this line for debugging
    };

    const handleAmountChange = (event) => {
        const price = event.target.value;
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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={selectedStatus} onChange={handleStatusChange}>
                        <option value="">Select...</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    {selectedStatus && <p>Selected Status: {selectedStatus}</p>}
                </div>
                <label>
                    Customer:
                    <select id="customers" value={selectedCustomer} onChange={handleCustomerChange}>
                        <option value="">Select...</option>
                        {customers.map((x) => (
                            // correct this to take customers id not names
                            <option key={x.id} value={x.id}>{x.first_name} {x.last_name}</option>
                        ))}
                    </select>
                    {selectedCustomer && <p>Selected Customer ID: {selectedCustomer}</p>}
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={formData.discount}
                        onChange={handleAmountChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={formData.sale_date}
                        onChange={handleDateChange}
                    />
                </label>
                <label>
                    Promotions:
                    <input
                        type="text"
                        value={formData.promotions}
                        onChange={handlePromotionsChange}
                    />
                </label>
                <label>
                    Vehicle Name:
                    <select id="vehicles" value={formData.inventory_id} onChange={handleVehicleChange}>
                        <option value="">Select...</option>
                        {inventory.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Sale</button>
            </form>
        </div>
    );
};

AddSale.propTypes = {
    sellerId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    customer: PropTypes.array.isRequired
};

export default AddSale;
