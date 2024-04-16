import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Workers = ({user}) => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate()

  function navigatetouser(username, userid) {
    navigate(`/workers/${username}/${userid}`);
  }

  useEffect(() => {
    fetch('users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include your JWT token for authentication if required
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setWorkers(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div className="bg-cardbackground m-auto mt-10 relative w-[900px] h-[500px] mr-[150px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Name</th>
            <th className="w-[250px] text-left py-2">Email</th>
            <th className="w-1/4 text-left py-2">Contact</th>
            {user.role==='super admin' && <th className="w-1/4 text-left py-2">Role</th>}
            <th className="w-1/4 text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody  style={{ marginTop: '1rem' }}>
          {workers?.map(worker => (
            <tr key={worker.id}  onClick={()=>navigatetouser(worker.first_name,worker.id)} >
              <td className="w-1/4 border-transparent text-left py-2">{worker.first_name} {worker.last_name}</td>
              <td className="w-[250px] border-transparent text-left py-2">{worker.email}</td>
              <td className="w-1/4 border-transparent text-left py-2">{worker.contact}</td>
              {user.role==='super admin' && <td className="w-1/4 border-transparent text-left py-2">{worker.role}</td>}
              {/* Add actions buttons here */}
              <td className="w-1/4 border-transparent text-left py-2">
                {/* Add buttons for actions like edit, delete, etc. */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workers;
