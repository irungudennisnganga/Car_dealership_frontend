import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/general', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoice(sortedData);
      })
      .catch(error => {
        console.error("Failed to fetch sales data:", error);
      });
  }, []);

  const navigatetosale = (firstName) => {
    navigate(`/invoice/${firstName}`);
  };

  return (
    <div className="bg-cardbackground m-auto mt-10 relative w-[1000px] h-auto mr-[50px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Seller First Name</th>
            <th className="w-1/4 text-left py-2">Total Customers</th>
            <th className="w-1/4 text-left py-2">Total Sales</th>
            <th className="w-1/4 text-left py-2">Vehicles Sold</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map(sale => {
            const firstName = sale.seller_name.split(' ')[0]; // Extract first name
            return (
              <tr key={sale.id} onClick={() => navigatetosale(firstName)} className="cursor-pointer hover:bg-gray-100">
                <td className="border-transparent text-left py-2">{sale.seller_name}</td>
                <td className="border-transparent text-left py-2">{sale.total_customers}</td>
                <td className="border-transparent text-left py-2">{sale.total_sales}</td>
                <td className="border-transparent text-left py-2">{sale.total_inventory_sold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
