import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../images/autocar.jpg'; // Ensure the path is correct for your logo
import { CirclesWithBar } from 'react-loader-spinner'
import AccordionItem from '../components/AccordionItem';
import CreateReceipt from './CreateReceipt';

const Receipt = ({ user,customers }) => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { receiptId } = useParams();

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
        return<div className="flex items-center justify-center h-screen">
                
                (<CirclesWithBar
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
                    />)
    </div> // Display a loading message or spinner until the data is fetched
    }

    if (error) {
        return <div>Error: {error}</div>; // Display an error message if the data fetch fails
    }

    return (
        <div className='m-32 mt-9'>
            {/* <div className='m-32 mt-9'> */}
      {(user.role === 'seller') && (
        <AccordionItem title='Create New Receipt'>
          <CreateReceipt  />
        </AccordionItem>
      )}

            {receipts.map((receipt) => (
                <div key={receipt.id} className="invoice-container max-w-4xl mx-auto my-10 bg-white shadow-md overflow-hidden mt-10 pl-7">
                    <div className="p-5 bg-blue-100 flex justify-between items-center">
                        <div>
                            <img src={logo} alt="Business Logo" className="h-16" />
                            <h1 className="text-lg font-bold">Business Name</h1>
                            <address className="not-italic">
                                Office Address<br />
                                By-pass, Kiambu road,<br />
                                Kiambu county, Kenya<br />
                                (+254) 123 456 7890
                            </address>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-blue-600">RECEIPT</h2>
                            <p className="text-sm">Date: {receipt.created_at}</p>
                            <p className="text-sm">Customer: {receipt.customer.Names}</p>
                            <p className="text-sm">Customer Email: {receipt.customer.email}</p>
                            <p className="text-sm">Seller: {receipt.user.names}</p>
                            <p className="text-sm">Seller Email: {receipt.user.email}</p>
                        </div>
                    </div>

                    <div className="p-5">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    {/* <th scope="col" className="px-6 py-3">Item Description</th> */}
                                    <th scope="col" className="px-6 py-3">Total cost</th>
                                    <th scope="col" className="px-6 py-3">Amount paid</th>
                                    <th scope="col" className="px-6 py-3">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr key={receipt.id} className="bg-white border-b">
                                    {/* <td className="px-6 py-4">{receipt.invoice.total_amount}</td> */}
                                    <td className="px-6 py-4">{receipt.invoice.total_amount}</td>
                                    <td className="px-6 py-4">{receipt.amount_paid.toFixed(2)}</td>
                                    <td className="px-6 py-4">{receipt.invoice.balance}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-right mt-4">
                            <p>Tax (15%): ${(receipt.invoice.total_amount * 0.15).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="bg-blue-100 p-4 text-sm text-gray-600">
                        <p>Thank you for your business</p>
                        <p>Questions? Email us at support@businessname.com</p>
                    </div>
                    <div className="text-center my-4">
                        <button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Print Receipt
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Receipt;
