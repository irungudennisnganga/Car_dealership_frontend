import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/autocar.jpg';
import Swal from 'sweetalert2';
// import { XlviLoader } from "react-awesome-loaders";
import { CirclesWithBar } from 'react-loader-spinner'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Start with false, loader is shown when set to true
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when request starts
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Wrong Credentials! Please try again',
                    icon: 'error',
                    confirmButtonText: 'Cancel'
                });
                throw new Error('Login failed');
            }
            const data = await response.json();
            localStorage.setItem('jwt', data.access_token);
            setLoading(false); // Set loading to false before navigating
            Swal.fire({
                title: 'Success!',
                text: 'Welcome🎉, Login successful',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
            setLoading(false); // Set loading to false in case of error
        }
    };

    if (loading) { // Show loader when loading is true
        return (
            <div className="flex items-center justify-center h-screen">
                <h3 className="block mb-3">Wait For The Verification To Be Completed......</h3><br /> <br />
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

                </div>
        );
    }

    return (
        <section className="h-screen flex flex-col px-2 py-2 m-auto w-full md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-blue-900">
            <div className="md:w-1/3 max-w-lg">
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
                        <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4">
                            Forgot Password?
                        </Link>
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
