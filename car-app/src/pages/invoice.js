import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Invoice = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let endpoint = '';
    if (user.role === 'admin' || user.role === 'super admin') {
      endpoint = '/general';
    } else if (user.role === 'seller') {
      endpoint = '/invoices';
    }

    if (endpoint) {
      fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoices(sortedData);
      })
      .catch(error => {
        console.error("Failed to fetch data:", error);
      });
    }
  }, [user.role]);  // Depend on user.role to refetch when it changes

  const navigateToDetail = (invoice, role) => {
    if (role === 'admin' || role === 'super admin') {
      const firstName = invoice.seller_name.split(' ')[0]; // Extract first name
      navigate(`/invoice/${firstName}`);
    } else {
      navigate(`/invoices/${invoice.id}`);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  }

  return (
    <div className="bg-cardbackground m-auto mt-10 relative w-[1000px] h-auto mr-[50px] overflow-y-auto">
      {invoices.length > 0 && (
        <table className="table-auto w-full table-fixed border-collapse ml-4">
          <thead>
            <tr>
              <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Customer Name' : 'Seller First Name'}</th>
              <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Vehicle Name' : 'Total Customers'}</th>
              {user.role === 'seller' && <th className="w-1/4 text-left py-2">Balance</th>}
              <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Total Amount' : 'Total Sales'}</th>
              {user.role === 'seller' && <th className="w-1/4 text-left py-2">Installments</th>}
              <th className="w-1/4 text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} onClick={() => navigateToDetail(invoice, user.role)} className="cursor-pointer hover:bg-gray-100">
                <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.customer_name.name : invoice.seller_name}</td>
                <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.vehicle_details.make : invoice.total_customers}</td>
                {user.role === 'seller' && <td className="border-transparent text-left py-2">{invoice.balance}</td>}
                <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.total_amount : invoice.total_sales}</td>
                {user.role === 'seller' && <td className="border-transparent text-left py-2">{invoice.installments}</td>}
                <td className="border-transparent text-left py-2">{formatDate(user.role === 'seller' ? invoice.created_at : invoice.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoice;
