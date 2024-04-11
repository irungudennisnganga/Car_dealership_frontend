import React, {useState} from 'react'


const AddSales = ({ }) => {
    const [saleData, setSaleData]=useState({
        carId:'',
        customerName:'',
        salePrice:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSaleData({
            ...saleData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddSale(saleData);
        setSaleData({
            carId: '',
            buyerName: '',
            salePrice: ''
        });
    };
   
  return (
    <form onSubmit={handleSubmit}>
            {/* Form inputs */}
            <button type="submit">Add Sale</button>
    </form>
  )
}

export default AddSales