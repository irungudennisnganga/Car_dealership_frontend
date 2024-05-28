import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CirclesWithBar } from 'react-loader-spinner';

const Customers = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    if (user.role === 'seller' || user.role === 'super admin' || user.role === 'admin') {
      fetch('/customers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setCustomers(data);
          setLoading(true);
        })
        .catch(error => {
          console.error('Error fetching customers data:', error);
        });
    }
  }, [user.role]);

  if (!loading) {
    return (
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
    );
  }

  return (
    <div className="bg-cyan-50 m-44 mt-10 relative w-[1300px]  mr-[150px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Name</th>
            <th className="w-[250px] text-left py-2">Email</th>
            <th className="w-1/4 text-left py-2">Phone Number</th>
            <th className="w-1/4 text-left py-2">Address</th>
          </tr>
        </thead>
        <tbody style={{ marginTop: '1rem' }}>
          {customers.map(customer => (
            <tr
              key={customer.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedCustomerId(selectedCustomerId === customer.id ? null : customer.id)}
            >
              <td className="w-1/4 border-transparent text-left py-2">{customer.first_name} {customer.last_name}</td>
              <td className="w-[250px] border-transparent text-left py-2">{customer.email}</td>
              <td className="w-1/4 border-transparent text-left py-2">{customer.phone_number}</td>
              <td className="w-1/4 border-transparent text-left py-2 relative">
                {customer.address}
                <div className="customer-image">
                  {selectedCustomerId === customer.id && (
                    <img
                      src={customer.image}
                      alt={customer.first_name}
                      className="absolute top-[100%] left-[50%] transform -translate-x-1/2 -translate-y-full w-20 h-20"
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Customers.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Customers;
