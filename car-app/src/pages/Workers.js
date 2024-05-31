import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Workers = ({ user }) => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  function navigateToUser(username, userid) {
    navigate(`/workers/${username}/${userid}`);
  }

  useEffect(() => {
    if (user.role === 'admin' || user.role === 'super admin') {
      fetch('/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setWorkers(data);
        })
        .catch(error => {
          console.error('Error fetching workers data:', error);
        });
    }
  }, [user.role]);

  return (
    <div className="bg-cyan-50 m-56 mt-10 relative w-[1100px]  mr-[150px] overflow-y-auto">
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
          {workers.map(worker => (
            <tr
              key={worker.id}
              onClick={ () => navigateToUser(worker.first_name, worker.id)}
              className={`cursor-pointer hover:bg-gray-100 ${user.role === 'seller' ? 'cursor-not-allowed' : ''}`}
            >
              <td className="w-1/4 border-transparent text-left py-2">{worker.first_name} {worker.last_name}</td>
              <td className="w-[250px] border-transparent text-left py-2">{worker.email}</td>
              <td className="w-1/4 border-transparent text-left py-2">{worker.contact}</td>
              {user.role === 'super admin' && <td className="w-1/4 border-transparent text-left py-2">{worker.role}</td>}
              {(user.role === 'super admin' || user.role === 'admin') && <td className="w-1/4 border-transparent text-left py-2">{worker.status}</td>}
              {(user.role === 'super admin' || user.role === 'admin') && <td className="w-1/4 border-transparent text-left py-2">{/* Add buttons for actions like edit, delete, etc. */}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Workers.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Workers;
