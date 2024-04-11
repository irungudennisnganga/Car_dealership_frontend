import React, { useState, useEffect } from 'react';

import Sales from './Sales';
import AddSales from './AddSales';

const SellerSaleDashboard = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch('/api/sales')
            .then(response => response.json())
            .then(data => {
                setSales(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleAddSale = (saleData) => {
        fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleData)
        })
            .then(response => response.json())
            .then(data => {
                setSales([...sales, data]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            
            <AddSales AddSales={handleAddSale} />
            <table className="table-auto w-full table-fixed border-collapse ml-4">
                <thead>
                    <tr>
                        <th className="w-1/4 text-left py-2">Total Amount</th>
                        <th className="w-1/4 text-left py-2"> Commissions </th>
                        <th className="w-1/4 text-left py-2"> Status </th>
                        <th className="w-1/4 text-left py-2"> Discount </th>
                        <th className="w-1/4 text-left py-2"> Customer</th>
                        <th className="w-1/4 text-left py-2"> Date of Sale</th>

                        <th className="w-1/4 text-left py-2">Vehicle Name</th>
                    </tr>
                </thead>
            </table>
            
        </div>
    );
};

export default SellerSaleDashboard;
