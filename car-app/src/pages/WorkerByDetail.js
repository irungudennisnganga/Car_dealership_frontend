import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Updateworkerdetails from './updateworkerdetails';
import AccordionItem from '../components/AccordionItem';




const WorkerByDetail = () => {
  const [worker, setWorker] = useState(null);

  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setWorker(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [userid]);

  
console.log(worker)


  return (
    <>
    <div className="bg-cardbackground m-auto mt-10 relative w-[800px] h-auto">
      {worker && (
        <>
    <div className="mt-4">
              <AccordionItem title="Update Worker Details">
                <Updateworkerdetails worker={worker} />
              </AccordionItem>
            </div>
        <div className="flex gap-6">
          <div className="w-[300px]">
            <div className='pl-2'>            
              <img className='w-full h-full object-cover p-2' src={worker.image} alt={worker.first_name} />
            </div>
            <div className="flex flex-col pl-2">
              <div className="grid gap-1.5 mt-4 text-sm text-gray-500 dark:text-gray-400 flex-1 p-2">
                <p className="font-medium"><span className='font-semibold'>Name:</span> {`${worker.first_name || ''} ${worker.last_name || ''}`}</p>
                <p><span className='font-semibold'>Email:</span> {worker.email || ''}</p>
                <p><span className='font-semibold'>Contact:</span> {worker.contact || ''}</p>
                <p><span className='font-semibold'>Role:</span> {worker.role || ''}</p>
              </div>
            </div>
          </div>
          <div>
  {worker.role === 'seller' && <div>Summary</div>}
</div>
<div className="grid gap-2">
  {(worker.role === 'seller' ) && (
    <>
      <p className="text-base ">
        <span className='font-semibold'>Total sales :</span> {worker.sales ? worker.sales.length : 0}
      </p>
      <p className="text-base ">
        <span className='font-semibold'>Commission :</span> {worker.sales ? worker.sales.reduce((acc, sale) => acc + sale.commision, 0) : 0}
      </p>
    </>
  )}
</div>
        </div>
        </>
      )}
            
    </div>
    </>
  );
};

export default WorkerByDetail;
