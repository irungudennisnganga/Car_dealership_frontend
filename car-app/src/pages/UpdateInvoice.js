import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

const UpdateInvoice = () => {
  const [amountPaid, setAmountPaid] = useState('');
  const [message, setMessage] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [customerid, setCustomerId] = useState(null);
  const [inventory, setInventory] = useState(null);
  const navigate = useNavigate();

  const { invoiceid, status, saleid } = useParams(); // Assume `invoiceId` is passed in the route parameters

  const navigateToReceipt = () => {
    navigate(`/receipt/${customerid}/${invoiceid}/${amountPaid}`);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      const jwt = localStorage.getItem('jwt');
      try {
        const response = await fetch(`/api/invoice/${invoiceid}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        });

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          }
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setInvoice(result);
        setCustomerId(result.customer_name.id)
        setCustomer(result.customer_name.name); // Assuming customer name is required
        setAmountPaid(result.amount_paid); // Pre-fill the amount paid
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [invoiceid]);

  const handleAmountChange = (event) => {
    setAmountPaid(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');

    try {
      const response = await fetch(`/api/updateinvoice/${invoiceid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ amount_paid: amountPaid }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Network response was not ok');
      }

      await response.json();
      navigateToReceipt();
      toast.success('Invoice updated successfully');
      setMessage('Invoice updated successfully');
    } catch (error) {
      console.error('Error updating invoice:', error);
      setMessage('Failed to update invoice');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-semibold text-center">Update Invoice</h2>

        {invoice ? (
          <div className="mb-4">
            <p className="text-gray-700"><strong>Customer Name:</strong> {invoice.customer_name.name}</p>
            <p className="text-gray-700"><strong>Amount Due:</strong> {invoice.balance}</p>
            <p className="text-gray-700"><strong>Status:</strong> {status}</p>
            <p className="text-gray-700"><strong>Total Expected:</strong> {invoice.total_amount}</p>
            <p className="text-gray-700"><strong>Invoice Date:</strong> {new Date(invoice.date_of_purchase).toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="text-center mb-4">Loading invoice details...</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">
              Paying Balance
            </label>
            <input
              type="number"
              id="amountPaid"
              value={amountPaid}
              onChange={handleAmountChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Amount
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

UpdateInvoice.propTypes = {
  // invoiceid: PropTypes.string.isRequired,
};

export default UpdateInvoice;
