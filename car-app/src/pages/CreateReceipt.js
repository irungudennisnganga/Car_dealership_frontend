import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

const CreateReceipt = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    invoice_id: '',
    amount_paid: '',
    commission: '',
  });

  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/customers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchInvoices = async () => {
      try {
        const response = await fetch('/invoices', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        if (!response.ok) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch invoices',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        //   throw new Error('');
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingInvoices(false);
      }
    };

    fetchCustomers();
    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create receipt',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        //   throw new Error('');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful receipt creation
        Swal.fire({
            title: 'Success!',
            text: 'Receipt Created Successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        console.log('Receipt created:', data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
console.log(formData)
  return (
    <div className="bg-cyan-50 m-72 mt-10 relative w-[700px] p-4">
      <h2 className="text-xl font-bold mb-4">Create Receipt</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="customer_id" className="block mb-2">Customer</label>
          <select
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full border p-2"
            disabled={loading}
            required
          >
            <option value="">Select Customer</option>
            {loading ? (
              <option value="" disabled>Loading customers...</option>
            ) : (
              customers.map((x) => (
                <option key={x.id} value={x.id} required>{x.first_name} {x.last_name}</option>
              ))
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="invoice_id" className="block mb-2">Invoice</label>
          <select
            id="invoice_id"
            name="invoice_id"
            value={formData.invoice_id}
            onChange={handleChange}
            className="w-full border p-2"
            disabled={loadingInvoices}
            required
          >
            <option value="">Select Invoice</option>
            {loadingInvoices ? (
              <option value="" disabled>Loading invoices...</option>
            ) : (
              invoices.map((x) => (
                <option key={x.id} value={x.id} required>{x.seller_name.name} -- {x.customer_name.name} -- {x.vehicle_details.make} -- {x.vehicle_details.model} -- {x.vehicle_details.year}</option>
              ))
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount_paid" className="block mb-2">Amount Paid</label>
          <input
            type="number"
            id="amount_paid"
            name="amount_paid"
            value={formData.amount_paid}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="commission" className="block mb-2">Commission</label>
          <input
            type="number"
            id="commission"
            name="commission"
            value={formData.commission}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div> */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded  close">
          Create Receipt
        </button>
      </form>
    </div>
  );
};



export default CreateReceipt;
