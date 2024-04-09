import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../images/autocar.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            console.log('Login successful');
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-blue-900">
            <div className="md:w-1/3 max-w-lg ">
                <img src={logo} alt="logo" />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="text-center md:text-left">
                    <h2 className="mr-1 text-center text-bold mt-2 justify-center font-bold text-3xl">WELCOME TO AUTO CAR</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <a
                            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    {error && (
                        <div className="text-red-500">{error}</div>
                    )}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border 
                        border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bold">
                            Login in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
