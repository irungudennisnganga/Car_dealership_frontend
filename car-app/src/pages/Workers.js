import React, { useState, useEffect } from 'react';

const Workers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch('users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include your JWT token for authentication if required
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMjMwMzgzOSwianRpIjoiOTEzODdhN2EtYWU4ZS00NjdkLWEzMWQtMGY2MDlhYWJlZDA0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzEyMzAzODM5LCJjc3JmIjoiOWZjODI4OGItMjlkOS00YmU5LTk2NjctMTczYWEwZmY5YTZjIiwiZXhwIjoxNzEyMzMyNjM5fQ.Fo7iR36bFQ5KM5VPRdBG5vW_Vt1r6XOUj8pluZC6_uY"}`
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
    <div className="bg-cardbackground m-auto mt-10 relative w-[900px] h-[500px] mr-[100px] overflow-y-auto">
      <table className="table-auto w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Name</th>
            <th className="w-1/4 text-left py-2">Email</th>
            <th className="w-1/4 text-left py-2">Contact</th>
            <th className="w-1/4 text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody  style={{ marginTop: '1rem' }}>
          {workers.map(worker => (
            <tr key={worker.id}  >
              <td className="w-1/4 border-transparent text-left py-2">{worker.first_name} {worker.last_name}</td>
              <td className="w-1/4 border-transparent text-left py-2">{worker.email}</td>
              <td className="w-1/4 border-transparent text-left py-2">{worker.contact}</td>
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
