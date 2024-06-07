import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import logo from '../images/autocar.jpg'; 
import { CirclesWithBar } from 'react-loader-spinner';
import AccordionItem from '../components/AccordionItem';
import CreateReceipt from './CreateReceipt';

const Receipt = ({ user, customers }) => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { receiptId } = useParams();
    const navigate =useNavigate()

    useEffect(() => {
        fetch(`/receipt`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setReceipts(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [receiptId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    outerCircleColor="#4fa94d"
                    innerCircleColor="#4fa94d"
                    barColor="#4fa94d"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        ); // Display a loading message or spinner until the data is fetched
    }
    const handeleClick = (receipt) =>{
        console.log(receipt)
        navigate(`/receipt/${receipt.id}`)
    }
    if (error) {
        return <div>Error: {error}</div>; // Display an error message if the data fetch fails
    }

    return (
        <div className='m-52  mt-9   '>
            
            <table className='bg-cyan300 p-4 '>
                <thead className='p-8'>
                    <tr>
                        <th className="w-1/4 text-left py-2">Customer Name</th>
                        <th className="w-1/4 text-left py-2">Amount Paid</th>
                        <th className="w-1/4 text-left py-2">Total Amount</th>
                        <th className="w-1/4 text-left py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((receipt) => (
                        <tr 
                        onClick={() => handeleClick(receipt)}
                            key={receipt.id} 
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <td className="border-transparent text-left py-2">{receipt.customer.Names}</td>
                            <td className="border-transparent text-left py-2">{receipt.amount_paid}</td>
                            <td className="border-transparent text-left py-2">{receipt.invoice.total_amount}</td>
                            <td className="border-transparent text-left py-2">{receipt.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Receipt;
