import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate()

  function navigatetosale(saleid) {
    navigate(`/sale/${saleid}`);
  }

  useEffect(() => {
    fetch('/sellers', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
      },
    })
    .then(response => response.json())
    .then(data => {
      setSales(data); 
    })
    .catch(error => console.error("Failed to fetch sales data:", error));
  }, []);

  return (
    <div className="bg-cardbackground m-auto mt-10 relative w-[1000px] h-auto mr-[50px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Customer Name</th>
            <th className="w-1/4 text-left py-2">Seller Name</th>
            <th className="w-1/4 text-left py-2">Commission</th>
            <th className="w-1/4 text-left py-2">Status</th>
            <th className="w-1/4 text-left py-2">Sale Date</th>
            <th className="w-1/4 text-left py-2">Vehicle Name</th>
            
          </tr>
        </thead>
        <tbody style={{ marginTop: '1rem' }}>
          {sales.map(sale => (
            <tr key={sale.id} onClick={()=>navigatetosale(sale.id)}>
              <td className="border-transparent text-left py-2">{sale.customer.Names}</td>
              <td className="border-transparent text-left py-2">{sale.seller.Names}</td> 
              <td className="border-transparent text-left py-2">{sale.commision}</td>
              <td className="border-transparent text-left py-2">{sale.status}</td>
              <td className="border-transparent text-left py-2">{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td className="border-transparent text-left py-2">{sale.inventory_id.name}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
