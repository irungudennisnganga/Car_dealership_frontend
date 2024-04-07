import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WorkerByDetail = () => {
  const [worker, setworker] = useState(null);
  const { userid } = useParams();
  console.log(userid)

  useEffect(() => {
    fetch(`/user/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include your JWT token for authentication if required
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMjMzMjk1NSwianRpIjoiOTNmMWNjMzktY2Q4Yi00ZThkLWFhYzQtZGU1NGRmYTMxYjFmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzEyMzMyOTU1LCJjc3JmIjoiOGU4OTkzZTMtMTY0Ni00YWJlLWI4OWEtODJlMmE1MzE0ZjllIiwiZXhwIjoxNzEyMzYxNzU1fQ.3obO6ZLegGlPbmV1zEqbNg6ft3auRwM5fobbAbGJjzw"}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setworker(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [userid]); // Include userid in dependency array to trigger fetch on userid change
console.log(worker)
  return (
    <div className="bg-cardbackground m-auto mt-10 relative w-[600px] h-[300px]">
      {worker && (
        <div className="flex gap-6">
          <div className="w-[300px]">
            <div className='pl-2'>
              <img alt="Worker Image" src={worker.image} className='w-[100px] h-[100px] object-cover m-3 ' />
            </div>
            <div className="flex flex-col pl-2">
              <div className="grid gap-1.5 mt-4 text-sm text-gray-500 dark:text-gray-400 flex-1 p-2">
                <p className="font-medium"><span className='font-semibold'>Name:</span> {`${worker.first_name} ${worker.last_name}`}</p>
                <p><span className='font-semibold'>Email:</span> {worker.email}</p>
                <p><span className='font-semibold'>Contact:</span> {worker.contact}</p>
                <p><span className='font-semibold'>Role:</span> {worker.role}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 m-3">
            <div>
              <div>Summary</div>
            </div>
            <div className="grid gap-2">
              <p className="text-base "><span className='font-semibold'>Total sales :</span> {worker.sales.length}</p>
              <p className="text-base "><span className='font-semibold'>Commission :</span> {worker.sales.reduce((acc, sale) => acc + sale.commision, 0)}</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default WorkerByDetail;
