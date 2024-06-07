import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import Report from './Report';
import { CirclesWithBar } from 'react-loader-spinner';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('jwt'); 
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/report', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setReports(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching report:', error);
      setLoading(false);
    });
  }, [token]);

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

  if (loading) {
    return (
      <div className="loader">
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
    );
  }

  return (
    <div className="dashboard mb-4">
      {/* <h1 className="text-2xl mb-4 text-green-700">Dashboard</h1> */}
      {sales.length > 0 ? (
        <>
          <div className="w-90%">
            <div className="chart m-auto mt-3">
              <h2 className="text-xl mb-2 mt-0">Commision And Report</h2>
              <BarChart width={1450} height={500} data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="commision" fill="#8884d8" />
                <Bar dataKey="discount" fill="#82ca9d" />
              </BarChart>
            </div>
            {/* <div className="chart ml-4 mr-4 mt-3">
              <h2 className="text-xl mb-2">Inventories</h2>
              <PieChart width={500} height={500}>
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
            </div> */}
          </div>
          <div className="chart m-auto mt-3">
            <Report report={reports} />
          </div>
        </>
      ) : (
        <div className="no-sales-message text-center mt-8">
          <p className="text-xl text-red-500">You currently have no sales data.</p>
          <p className="text-lg">Create a sale to access the dashboard and see your reports.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
