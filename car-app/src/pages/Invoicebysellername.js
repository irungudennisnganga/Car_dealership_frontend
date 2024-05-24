import React,{useState, useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const Invoicebysellername = () => {
    const [invoice, setInvoice] = useState([]);
  const { username } = useParams()
  const navigate = useNavigate()
   
  
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
    }, [username]);
  
  function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // JavaScript months are 0-indexed, so we need to add 1 to get the correct month
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

  
  
  const navigatetoinvoicebyid = (invoiceid) => {
    navigate(`/invoices/${invoiceid}`)
  }
  return (
   <div className="bg-cyan-50 m-72 mt-10 relative w-[1000px] h-auto mr-[50px] overflow-y-auto">
     
      
      <table className=" w-full table-fixed border-collapse ml-4">
        <thead>
          <tr>
            <th className="w-1/4 text-left py-2">Customer Name</th>
            <th className="w-1/4 text-left py-2">Vehicle Name</th>
            <th className="w-1/4 text-left py-2">Balance</th>
            <th className="w-1/4 text-left py-2">Total Amount</th>
            <th className="w-1/4 text-left py-2">Installments</th>
            <th className="w-1/4 text-left py-2">Invoice Date</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map(inv => (
            <tr key={inv.id} onClick={() => navigatetoinvoicebyid(inv.id)} className="cursor-pointer hover:bg-gray-100">
              <td className="border-transparent text-left py-2">{inv.customer_name.name}</td>
              <td className="border-transparent text-left py-2">{inv.vehicle_details.make}</td>
              <td className="border-transparent text-left py-2">{inv.balance}</td>
              <td className="border-transparent text-left py-2">{inv.total_amount}</td>
              <td className="border-transparent text-left py-2">{inv.installments}</td>
             <td className="border-transparent text-left py-2">{formatDate(inv.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
    
  )
}

export default Invoicebysellername
