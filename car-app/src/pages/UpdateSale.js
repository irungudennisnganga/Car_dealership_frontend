import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

const UpdateSale = ({ saleid }) => {
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [invoice, setInvoice] = useState(null); // Change to null to handle no match case
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleNavigate = (status, invoiceId) => {
    navigate(`/update_invoice/${invoiceId}/${status}/${saleid}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // PUT request to update sale status
      const response = await fetch(`/api/sale/${saleid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      toast.success("Sale Updated successfully");
      setMessage('Sale status updated successfully');

      // GET request to fetch invoices
      const invoiceResponse = await fetch(`/api/invoices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      if (!invoiceResponse.ok) {
        if (invoiceResponse.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Network response was not ok');
      }

      const invoiceResult = await invoiceResponse.json();
      console.log('Fetched invoice data:', invoiceResult);

      // Loop through the invoiceResult to find the matching invoice
      let matchingInvoice = null;
      for (let i = 0; i < invoiceResult.length; i++) {
        // console.log(`Checking invoice with sale_id ${invoiceResult[i].sale_id} against ${saleid}`);
        if (invoiceResult[i].sale_id == saleid) { // Use == to allow type coercion
          matchingInvoice = invoiceResult[i];
          break;
        }
      }

      if (matchingInvoice) {
        setInvoice(matchingInvoice);
        handleNavigate(status, matchingInvoice.id); // Assuming invoice has id field
      } else {
        throw new Error('No matching invoice found for the given sale ID.');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <Toaster />
      <h2 className="text-2xl font-semibold text-center mb-4">Update Sale Status</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Sale Status:</label>
          <select 
            id="status" 
            value={status} 
            onChange={handleStatusChange} 
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-blue-400 text-blue-400 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Status
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

// Define prop types
UpdateSale.propTypes = {
  saleid: PropTypes.string.isRequired,
};

// Wrap the component to use useParams
const UpdateSaleWrapper = () => {
  const { saleid } = useParams();
  return <UpdateSale saleid={saleid} />;
};

export default UpdateSaleWrapper;
