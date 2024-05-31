import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import PopUp from '../pages/PopUp';

const SearchResults = ({ data }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenPopup = (image) => {
    setSelectedImage(image);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
    setOpenPopup(false);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) {
      fetch(`/checksession`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      })
        .then(response => response.ok ? response.json() : Promise.reject('Failed to check session'))
        .then(userData => {
          setUser(userData);
          if (location.pathname === '/login') {
            navigate('/', { replace: true });
          }
        })
        .catch(error => {
          console.error('Error checking session:', error);
          localStorage.removeItem('jwt');
          setUser(null);
        });
    }
  }, [navigate, user, location.pathname]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const navigateToDetail = (invoice, role) => {
    if (role === 'admin' || role === 'super admin') {
      const firstName = invoice.seller_name.split(' ')[0];
      navigate(`/invoice/${firstName}`);
    } else {
      navigate(`/invoices/${invoice.id}`);
    }
  };

  function navigateToUser(username, userid) {
    navigate(`/workers/${username}/${userid}`);
  }

  const navigateToInvoiceById = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const renderContent = () => {
    if (data.length === 0) {
      return <h2>No data available</h2>;
    }

    switch (location.pathname) {
      case '/customers':
        return (
          <div className="bg-cyan-50 m-44 mt-10 relative w-[1300px] mr-[150px] overflow-y-auto">
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
                {data.map(customer => (
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
                      {selectedCustomerId === customer.id && (
                        <img
                          src={customer.image}
                          alt={customer.first_name}
                          className="absolute top-[100%] left-[50%] transform -translate-x-1/2 -translate-y-full w-20 h-20"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case '/workers':
        return (
          <div className="bg-cyan-50 m-56 mt-10 relative w-[1100px] mr-[150px] overflow-y-auto">
            <table className="table-auto w-full table-fixed border-collapse ml-4">
              <thead>
                <tr>
                  <th className="w-1/4 text-left py-2">Name</th>
                  <th className="w-[250px] text-left py-2">Email</th>
                  <th className="w-1/4 text-left py-2">Contact</th>
                  {user.role === 'super admin' && <th className="w-1/4 text-left py-2">Role</th>}
                  {(user.role === 'super admin' || user.role === 'admin') && <th className="w-1/4 text-left py-2">Status</th>}
                </tr>
              </thead>
              <tbody style={{ marginTop: '1rem' }}>
                {data.map(worker => (
                  <tr
                    key={worker.id}
                    onClick={() => navigateToUser(worker.first_name, worker.id)}
                    className={`cursor-pointer hover:bg-gray-100 ${user.role === 'seller' ? 'cursor-not-allowed' : ''}`}
                  >
                    <td className="w-1/4 border-transparent text-left py-2">{worker.first_name} {worker.last_name}</td>
                    <td className="w-[250px] border-transparent text-left py-2">{worker.email}</td>
                    <td className="w-1/4 border-transparent text-left py-2">{worker.contact}</td>
                    {user.role === 'super admin' && <td className="w-1/4 border-transparent text-left py-2">{worker.role}</td>}
                    {(user.role === 'super admin' || user.role === 'admin') && <td className="w-1/4 border-transparent text-left py-2">{worker.status}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case '/inventory':
        return (
          <div className="m-32 mt-9 w-[1400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map(item => (
                <div key={item.id} className='bg-green-600 cursor-pointer' onClick={() => handleOpenPopup(item.image)}>
                  <img
                    src={item.image}
                    alt={item.make}
                    className="w-full h-96 mt-1 mb-4 object-cover"
                  />
                  <h4 className='font-bold text-blue-800'>{item.make} -- {item.model}</h4>
                </div>
              ))}
            </div>
            {openPopup && (
              <PopUp
                openPopup={openPopup}
                closePopup={handleClosePopup}
                inventory={data.find(item => item.image === selectedImage)}
              />
            )}
          </div>
        );
      case '/invoice':
        return (
          <div className="bg-cyan-50 m-44 mt-10 relative w-[1300px] h-auto mr-[50px] overflow-y-auto">
            {data.length > 0 && (
              <table className="table-auto w-full table-fixed border-collapse ml-4">
                <thead>
                  <tr>
                    <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Customer Name' : 'Seller Names'}</th>
                    {user.role === 'seller' && <th className="w-1/4 text-left py-2">Balance</th>}
                    <th className="w-1/4 text-left py-2">{user.role === 'seller' ? 'Total Amount' : 'Total Sales'}</th>
                    {user.role === 'seller' && <th className="w-1/4 text-left py-2">Installments</th>}
                    {user.role === 'seller' && <th className="w-1/4 text-left py-2">Date</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.map(invoice => (
                    <tr 
                      key={invoice.id} 
                      onClick={() => navigateToDetail(invoice, user.role)} 
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="border-transparent text-left py-2">{user.role === 'seller' ? `${invoice.customer.first_name} ${invoice.customer.last_name}` : `${invoice.seller_name}`}</td>
                      {user.role === 'seller' && <td className="border-transparent text-left py-2">{invoice.balance}</td>}
                      <td className="border-transparent text-left py-2">{user.role === 'seller' ? invoice.total_amount : invoice.total_sales}</td>
                      {user.role === 'seller' && <td className="border-transparent text-left py-2">{invoice.installments}</td>}
                      {user.role === 'seller' && <td className="border-transparent text-left py-2">{formatDate(invoice.created_at)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        if ((user.role === 'super admin' || user.role === 'admin') && location.pathname.startsWith('/invoice/')) {
          return (
            <div>
              {data.length > 0 && (
                <div className="bg-cyan-50 m-32 mt-10 relative w-[1300px] h-auto mr-[50px] overflow-y-auto">
                  <table className="w-full table-fixed border-collapse ml-4">
                    <thead>
                      <tr>
                        <th className="w-1/4 text-left py-2">Customer Name</th>
                        <th className="w-1/4 text-left py-2">Balance</th>
                        <th className="w-1/4 text-left py-2">Total Amount</th>
                        <th className="w-1/4 text-left py-2">Installments</th>
                        <th className="w-1/4 text-left py-2">Invoice Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(inv => (
                        <tr key={inv.id} onClick={() => navigateToInvoiceById(inv.id)} className="cursor-pointer hover:bg-gray-100">
                          <td className="border-transparent text-left py-2">{inv.customer.first_name} {inv.customer.last_name}</td>
                          <td className="border-transparent text-left py-2">{inv.balance}</td>
                          <td className="border-transparent text-left py-2">{inv.total_amount}</td>
                          <td className="border-transparent text-left py-2">{inv.installments}</td>
                          <td className="border-transparent text-left py-2">{formatDate(inv.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        }
        return <h2>Unknown path</h2>;
    }
  };

  return <div>{renderContent()}</div>;
};

SearchResults.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.array.isRequired,
};

export default SearchResults;
