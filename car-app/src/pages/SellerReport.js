import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CirclesWithBar } from 'react-loader-spinner';

const SellerReport = ({ users }) => {
  const [userData, setUserData] = useState({}); // Use a more descriptive name

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    fetch(`/api/user/${users.user_id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [users.user_id]);

  const getCompletedSales = () => {
    return userData.sales?.filter(sale => sale.status === 'Completed');
  };

  const getPendingSales = () => {
    return userData.sales?.filter(sale => sale.status === 'Pending');
  };

  const getRefundedSales = () => {
    return userData.sales?.filter(sale => sale.status === 'Refunded');
  };
  if(userData.length ===0){
    return (
        <div className="no-sales-message text-center mt-8">
          <p className="text-xl text-red-500">You currently have no Invoices.</p>
          <p className="text-lg">Create a sale to access the Invoice.</p>
        </div>
      );
}
  return (
    <div className='mt-6 mb-auto object-center'>
      {/* <h2 className='text-2xl mb-4 dashboard '>Reports</h2> */}
      {userData && userData.sales ? (
        <div className='bg-cyan-50 m-12 mt-10 relative w-[1500px] h-auto mr-[30px] overflow-y-auto'>
          <h3 className=' ml-auto mr-auto text-center font-bold'>Completed Sales</h3>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Sale Number</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Commission</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Sale Date</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Status</th>
                {/* Add more table headers as needed based on your data  */}
              </tr>
            </thead>
            <tbody>
              {getCompletedSales().map((sale, index) => (
                <tr key={sale.id}>
                  <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.commision}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.sale_date}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.status}</td>
                  {/* Add more table cells as needed based on your data  */}
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className=' mt-8 text-center font-bold'>Pending Sales</h3>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Sale Number</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Commission</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Sale Date</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Status</th>
                {/* Add more table headers as needed based on your data  */}
              </tr>
            </thead>
            <tbody>
              {getPendingSales().map((sale, index) => (
                <tr key={sale.id}>
                  <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.commision}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.sale_date}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.status}</td>
                  {/* Add more table cells as needed based on your data  */}
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className=' mt-8 text-center font-bold' >Refunded Sales</h3>
          <table className="table-auto w-full text-left ">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Sale Number</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Commission</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Sale Date</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">Status</th>
                {/* Add more table headers as needed based on your data  */}
              </tr>
            </thead>
            <tbody>
              {getRefundedSales().map((sale, index) => (
                <tr key={sale.id}>
                  <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.commision}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.sale_date}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{sale.status}</td>
                  {/* Add more table cells as needed based on your data  */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
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
      )}
    </div>
  );
};

SellerReport.propTypes = {
  users: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SellerReport;