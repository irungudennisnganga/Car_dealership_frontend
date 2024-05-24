import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ user, inventory }) => {
  const [users, setUsers] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('jwt'); // Assuming the JWT token is stored in localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(usersResponse.data);

        const inventoriesResponse = await axios.get('/inventory', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInventories(inventoriesResponse.data);

        const salesResponse = await axios.get('/sales', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSales(salesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]); // Include token as a dependency to re-fetch data if token changes

  return (
    <div className="dashboard">
      <h1 className="text-2xl mb-4 text-green-700">Dashboard</h1>
      <div className="flex justify-evenly">
       
        <div className="chart ml-4 mr-4">
          <h2 className="text-xl mb-2">Inventories</h2>
          <PieChart width={500} height={500} className='text-white'>
            <Pie
              data={inventories}
              dataKey="price"
              nameKey="make"
              
              
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {inventories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="chart  m-auto">
          <h2 className="text-xl mb-2 mt-0">Sales</h2>
          <BarChart width={600} height={300} data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commision" fill="#8884d8" />
            <Bar dataKey="discount" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
