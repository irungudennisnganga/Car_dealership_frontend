import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useParams,useNavigate } from 'react-router-dom';

const CreateReceipt = () => {
  const { customer,invoice,amount } = useParams();
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    customer_id: '',
    invoice_id: '',
    amount_paid: '',
    commission: '',
  });
// console.log(customer,invoice,amount)
  
  
  const [error, setError] = useState('');
  



  const handleChange = (e) => {
    formData.customer_id=customer
    formData.invoice_id=invoice
    formData.amount_paid=amount
  };
handleChange()
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create receipt',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
              
        //   throw new Error('');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful receipt creation
        Swal.fire({
            title: 'Success!',
            text: 'Receipt Created Successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          navigate(`/receipt/${data.receipt_id}`)
        // console.log('Receipt created:', data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
// console.log(formData)
  return (
    <div className="bg-cyan-50 m-72 mt-10 relative w-[700px] p-4">
      <h2 className="text-xl font-bold mb-4">Create Receipt</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded  close">
          Create Receipt
        </button>
      </form>
    </div>
  );
};



export default CreateReceipt;
