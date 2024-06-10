import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';

const Invoice = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  useEffect(() => {
    let endpoint = '';
    if (user.role === 'admin' || user.role === 'super admin') {
      endpoint = '/api/general';
    } else if (user.role === 'seller') {
      endpoint = '/api/invoices';
    }

    if (endpoint) {
      fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 429) {
              throw new Error('Too many requests. Please try again later.');
            }
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setInvoices(sortedData);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch data:", error);
          setError(error.message); // Set error message
          setLoading(false);
        });
    }
  }, [user.role]);

  if (loading) {
    return (
      <div className="loader">
        <CirclesWithBar
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
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message text-center mt-8">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="no-sales-message text-center mt-8">
        <p className="text-xl text-red-500">You currently have no Invoices.</p>
        <p className="text-lg">Create a sale to access the Invoice.</p>
      </div>
    );
  }

  const navigateToDetail = (invoice, role) => {
    if (role === 'admin' || role === 'super admin') {
      const firstName = invoice.seller_name.split(' ')[0]; // Extract first name
      const id = invoice.seller_id;
      navigate(`/invoice/${firstName}/${id}`);
    } else {
      navigate(`/invoices/${invoice.id}`);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  }

  return (
    <div className="bg-cyan-50 m-44 mt-10 relative w-[1300px] h-auto mr-[50px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Customer Name' : 'Seller First Name'}</th>
            <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Vehicle Name' : 'Total Customers'}</th>
            {user.role === 'seller' && <th className="w-1/4 text-left py-2">Balance</th>}
            <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Total Amount' : 'Total Sales'}</th>
            {user.role === 'seller' && <th className="w-1/4 text-left py-2">Installments</th>}
            {user.role === 'seller' && <th className="w-1/4 text-left py-2">Date</th>}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr
              key={invoice.id || index} // Use index as fallback key if invoice.id is not available
              onClick={() => navigateToDetail(invoice, user.role)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.customer_name.name : invoice.seller_name}</td>
              <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.vehicle_details.make : invoice.total_customers}</td>
              {user.role === 'seller' && <td className="border-transparent text-left py-2">{invoice.balance}</td>}
              <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.total_amount : invoice.total_sales}</td>
              {user.role === 'seller' && <td className="border-transparent text-left py-2">{invoice.installments}</td>}
              {user.role === 'seller' && <td className="border-transparent text-left py-2">{formatDate(invoice.created_at)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
