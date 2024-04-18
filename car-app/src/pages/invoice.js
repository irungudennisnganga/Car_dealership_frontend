import React, { useState, useEffect } from 'react';

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    fetch('/general', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Example of sorting by date if "date" is a field in your data
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoice(sortedData);
      })
      .catch(error => {
        console.error("Failed to fetch sales data:", error);
        // Optional: update UI here to show error message
      });
  }, []);

  const navigatetosale = (id) => {
    // Navigation logic or redirection
    console.log('Navigate to:', id);
  };

  return (
    <div className="bg-cardbackground m-auto mt-10 relative w-[1000px] h-auto mr-[50px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Seller Name</th>
            <th className="w-1/4 text-left py-2">Total Customers</th>
            <th className="w-1/4 text-left py-2">Total Sales</th>
            <th className="w-1/4 text-left py-2">Vehicles Sold</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map(sale => (
            <tr key={sale.id} onClick={() => navigatetosale(sale.id)} className="cursor-pointer hover:bg-gray-100">
              <td className="border-transparent text-left py-2">{sale.seller_name}</td>
              <td className="border-transparent text-left py-2">{sale.total_customers}</td>
              <td className="border-transparent text-left py-2">{sale.total_sales}</td>
              <td className="border-transparent text-left py-2">{sale.total_inventory_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
