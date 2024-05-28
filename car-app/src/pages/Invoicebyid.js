import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../images/autocar.jpg'; 
import { CirclesWithBar } from 'react-loader-spinner'

const Invoicebyid = () => {
    const [invoice, setInvoice] = useState(null);
    const { invoiceid } = useParams();

    useEffect(() => {
        fetch(`/invoice/${invoiceid}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setInvoice(data);
        })
        .catch(error => {
            console.error("Failed to fetch invoice data:", error);
        });
    }, [invoiceid]);

    if (!invoice) {
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
    </div>// Display a loading message or spinner until the data is fetched
    }

    return (
        <div className="invoice-container max-w-4xl mx-auto my-10 bg-white shadow-md overflow-hidden mt-10 pl-7">
            <div className="p-5 bg-blue-100 flex justify-between items-center">
                <div>
                    <img src={logo} alt="Business Logo" className="h-16" />
                    <h1 className="text-lg font-bold">Business Name</h1>
                    <address className="not-italic">
                        Office Address<br/>
                        By-pass, Kiambu road,<br/>
                        Kiambu county, Kenya<br/>
                        (+254) 123 456 7890
                    </address>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600">INVOICE</h2>
                    <p className="text-sm">Date: {invoice.date_of_purchase}</p>
                    <p className="text-sm">To: {invoice.customer_name.name}</p>
                    <p className="text-sm">Address: {invoice.customer_name.address}</p>
                    <p className="text-sm">Email: {invoice.customer_name.email}</p>
                </div>
            </div>

            <div className="p-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Car Description</th>
                            <th scope="col" className="px-6 py-3">Total cost </th>
                            <th scope="col" className="px-6 py-3">Amount paid</th>
                            <th scope="col" className="px-6 py-3">Balance</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr key={invoice.id} className="bg-white border-b">
                            <td className="px-6 py-4">{invoice.vehicle.make}  {invoice.vehicle.model}    {invoice.vehicle.year}</td>
                            <td className="px-6 py-4">{invoice.total_amount}</td>
                            <td className="px-6 py-4">{invoice.amount_paid.toFixed(2)}</td>
                            <td className="px-6 py-4">{invoice.balance}</td>
                            <td className="px-6 py-4">{invoice.amount_paid.toFixed(2)}</td>
                            
                        </tr>
                    </tbody>
                </table>
                <div className="text-right mt-4">
                    <p>Tax (15%): ${invoice.tax.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-blue-100 p-4 text-sm text-gray-600">
                <p>Thank you for your business</p>
                <p>Questions? Email us at support@businessname.com</p>
            </div>
            <div className="text-center my-4">
                <button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Print Invoice
                </button>
            </div>
        </div>
    );
}

export default Invoicebyid;
