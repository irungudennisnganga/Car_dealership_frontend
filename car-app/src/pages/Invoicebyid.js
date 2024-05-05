import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../images/autocar.jpg';

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
        return <div>Loading...</div>; // Display a loading message or spinner until the data is fetched
    }

    return (
        <div className="max-w-4xl mx-auto my-10 bg-white shadow-md overflow-hidden mt-10 mr-[50px]">
            <div className="p-5 bg-blue-100 flex justify-between items-center">
                <div>
                    <img src={logo} alt="Business Logo" className="h-16" />
                    <h1 className="text-lg font-bold">Business Name</h1>
                    <address className="not-italic">
                        Office Address<br/>
                        By-pass,Kiambu road,<br/>
                        Kiambu county,Kenya<br/>
                        (+254) 123 456 7890
                    </address>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600">INVOICE</h2>
                    <p className="text-sm">Date: {invoice.date_of_purchase}</p>
                    <p className="text-sm">To: {invoice.customer_name.name}</p>
                    <p className="text-sm">Address: {invoice.customer_name.address}</p>
                </div>
            </div>

            <div className="p-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Item Description</th>
                            <th scope="col" className="px-6 py-3">Total cost </th>
                            <th scope="col" className="px-6 py-3">Amount paid</th>
                            <th scope="col" className="px-6 py-3">Balance</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                       
                            <tr key={invoice.id} className="bg-white border-b">
                              <td className="px-6 py-4">{invoice.vehicle.make}  {invoice.vehicle.year}</td>
                              <td className="px-6 py-4">{invoice.total_amount}</td>
                                <td className="px-6 py-4">${invoice.amount_paid.toFixed(2)}</td>
                                <td className="px-6 py-4">{invoice.balance}</td>
                                {/* <td className="px-6 py-4">${(invoice.total_amount* invoice.quantity).toFixed(2)}</td> */}
                            </tr>
                       
                    </tbody>
                </table>
                <div className="text-right mt-4">
                    {/* <p>Subtotal: ${invoice.subtotal.toFixed(2)}</p> */}
                    <p>Tax (15%): ${invoice.tax.toFixed(2)}</p>
                    {/* <p>Discount (5%): -${invoice?.discount.toFixed(2)}</p>
                    <p className="text-lg font-bold">Total Due: ${invoice?.total_due.toFixed(2)}</p> */}
                </div>
            </div>

            <div className="bg-blue-100 p-4 text-sm text-gray-600">
                <p>Thank you for your business</p>
                <p>Questions? Email us at support@businessname.com</p>
            </div>
        </div>
    );
}

export default Invoicebyid;
