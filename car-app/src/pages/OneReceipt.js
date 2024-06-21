import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../images/autocar.jpg';
import { CirclesWithBar } from 'react-loader-spinner';

function OneReceipt() {
    const { id } = useParams();
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/receipts/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(response => {
            if (!response.ok) {
              if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
              }
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        .then(data => {
            setSale(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div className="flex items-center h-screen justify-center flex-grow">
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
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!sale) {
        return <div>No receipt found.</div>;
    }

    return (
        <div>
            <div key={sale.id} className="invoice-container max-w-4xl mx-auto my-10 bg-white shadow-md overflow-hidden mt-10 pl-7">
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
                        <p className="text-sm">Date: {sale.created_at}</p>
                        <p className="text-sm">Customer: {sale.customer.Names}</p>
                        <p className="text-sm">Customer Email: {sale.customer.email}</p>
                        <p className="text-sm">Seller: {sale.user.names}</p>
                        <p className="text-sm">Seller Email: {sale.user.email}</p>
                    </div>
                </div>

                <div className="p-5">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Total cost</th>
                                <th scope="col" className="px-6 py-3">Amount paid</th>
                                <th scope="col" className="px-6 py-3">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4">{sale.invoice.total_amount}</td>
                                <td className="px-6 py-4">{sale.amount_paid.toFixed(2)}</td>
                                <td className="px-6 py-4">{sale.invoice.balance}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <p>Tax (15%): ${(sale.invoice.total_amount * 0.15).toFixed(2)}</p>
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
        </div>
    );
}

export default OneReceipt;
