import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddSales from './AddSales'; // Assuming you have an AddSales component
import { useNavigate } from 'react-router-dom';
import AccordionItem from '../components/AccordionItem';
import { CirclesWithBar } from 'react-loader-spinner'

const Sales = ({ user, customers }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function navigatetosale(saleid) {
    navigate(`/sale/${saleid}`);
  }

  useEffect(() => {
    let endpoint = '';

    if (user.role === 'seller') {
      endpoint = '/sales';
    } else if (user.role === 'admin' || user.role === 'super admin') {
      endpoint = '/sellers';
    }

    fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Sort the sales by date from latest to oldest
      const sortedSales = data.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
      setSales(sortedSales);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, [user.role]);

  const handleAddSale = (newSale) => {
    // When adding a new sale, also ensure it's added in the right order
    const updatedSales = [...sales, newSale];
    updatedSales.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
    setSales(updatedSales);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-cyan-50 m-12 mt-10 relative w-[1500px] h-auto mr-[30px] overflow-y-auto">
      {user ? (
        <div>
          {user.role === 'seller' && (
            <AccordionItem title="Add Sale">
              <AddSales onAddSale={handleAddSale} customer={customers} />
            </AccordionItem>
          )}
          <table className="table-auto w-full table-fixed border-collapse ml-2">
            <thead>
              <tr>
                {user.role !== 'seller' && <th className="w-1/4 text-left py-2">Seller Name</th>}
                <th className="w-1/4 text-left py-2">Customer Name</th>
                <th className="w-1/4 text-left py-2">Commission</th>
                <th className="w-1/4 text-left py-2">Status</th>
                <th className="w-1/4 text-left py-2">Sale Date</th>
                <th className="w-1/4 text-left py-2">Vehicle Name</th>
                
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr 
                  key={sale.id} 
                  onClick={user.role !== 'seller' ? () => navigatetosale(sale.id) : null} 
                  className={`cursor-${user.role !== 'seller' ? 'pointer' : 'default'} hover:bg-gray-100 border`}
                >
                  {user.role !== 'seller' && <td className="border-transparent text-left py-2">{sale.seller.Names}</td>}
                  <td className="border-transparent text-left py-2">{sale.customer.Names}</td>
                  <td className="border-transparent text-left py-2">{sale.commision}</td>
                  <td className="border-transparent text-left py-2">{sale.status}</td>
                  <td className="border-transparent text-left py-2">{new Date(sale.sale_date).toLocaleDateString()}</td>
                  <td className="border-transparent text-left py-2">{sale.inventory_id.name}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>null</h2>
      )}
    </div>
  );
};

Sales.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  customers: PropTypes.array.isRequired, // Adding the PropTypes for customers
};

export default Sales;
