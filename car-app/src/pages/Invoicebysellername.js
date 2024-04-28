import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const Invoicebysellername = () => {
    const [invoice, setInvoice] = useState([]);
    const { username}=useParams()
   
  
    useEffect(() => {
      fetch(`/userinvoice/${username}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setInvoice(sortedData);
        })
        .catch(error => {
          console.error("Failed to fetch sales data:", error);
        });
    }, []);
  
  return (
    <div>
      
    </div>
  )
}

export default Invoicebysellername
