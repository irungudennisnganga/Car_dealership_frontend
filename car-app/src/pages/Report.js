import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Report = ({report}) => {


    return (
        <div className='mt-6 mb-auto object-center'>
            <h2 className="text-xl mb-2">Company-Profit and Expenses</h2>
            
            {/* {error && <div style={{ color: 'red' }}>Error: {error.message}</div>} */}
            
            <ResponsiveContainer width="90%" height={400}>
                <LineChart
                    width={600}
                    height={400}
                    data={report}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sale_date" />
                    <YAxis dataKey="company_profit" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="company_profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        
        </div>
    );
}

export default Report;
