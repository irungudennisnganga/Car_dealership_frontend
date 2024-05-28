import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';

const SaleDetails = () => {
  const { saleid } = useParams();
  const [sale, setSales] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch data from the server
    const fetchData = () => {
      fetch(`/seller/${saleid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSales(data);
        // setError(''); // clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch sale details.');
      });
    };

    fetchData();
  
  }, [saleid]); // Only re-run the effect if saleid changes
console.log(sale)
 
  return (
    <div className="bg-cyan-50 m-32 mt-10 relative w-[1300px] h-[450px] mr-[50px] overflow-y-auto">
      {error && <p>{error}</p>}
      <div className="flex gap-6">
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <div className='h-[200px] w-[300px] rounded-[5px] cursor-pointer relative'>
            <img src={sale?.inventory_id.image} alt={sale?.inventory_id.name} className='w-full h-full object-cover'/>
            <div><span className='font-semibold'>Vehicle sold:</span>{sale?.inventory_id.name}</div>
            <div><span className='font-semibold'>sold to:</span> {sale?.customer.Names}</div>
            <div><span className='font-semibold'>customer Email:</span> {sale?.customer.email}</div>
          </div>          
        </div>
      </div>
      <div style={{ position: 'relative', top: '10px', right: '-350px' }}>
        <h5 className='font-black'>more about the sale</h5>
        <div><span className='font-semibold'>seller name: </span>{sale?.seller.Names} <Link to={`/workers/${sale?.seller.Names}/${sale?.seller.id}`} className='text-blue-800'>more about seller</Link></div>
        <ul>
          <li><span className='font-semibold'>commission:</span> {sale?.commision}</li>
          <li><span className='font-semibold'>status:</span> {sale?.status}</li>
          <li><span className='font-semibold'>history: </span>{sale?.history}</li>
          <li><span className='font-semibold'>discount:</span> {sale?.discount}</li>
          <li><span className='font-semibold'>promotion:</span> {sale?.promotions}</li>
          <li><span className='font-semibold'>sale date:</span> {sale?.sale_date}</li>
        </ul>
      </div>
    </div>
  );
};

export default SaleDetails;
