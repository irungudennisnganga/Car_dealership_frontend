import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Customers = ({ user }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (user.role === 'seller' || user.role === 'super admin' ||user.role === 'admin') {
      fetch('/customers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setCustomers(data);
        })
        .catch(error => {
          console.error('Error fetching customers data:', error);
        });
    }
  }, [user.role]);

  return (
    <div className="bg-cyan-50 m-72 mt-10 relative w-[900px] h-[500px] mr-[150px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Name</th>
            <th className="w-[250px] text-left py-2">Email</th>
            <th className="w-1/4 text-left py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody style={{ marginTop: '1rem' }}>
          {customers.map(customer => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="w-1/4 border-transparent text-left py-2">{customer.first_name} {customer.last_name}</td>
              <td className="w-[250px] border-transparent text-left py-2">{customer.email}</td>
              <td className="w-1/4 border-transparent text-left py-2">{customer.phone_number}</td>
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
