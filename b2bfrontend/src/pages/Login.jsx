import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirect = ()=>{
    setTimeout(()=>{
      navigate('/')
    },2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = async ()=> axios.post(`${process.env.REACT_APP_API}/login`, formData,{
        headers:{
          'Content-Type': 'application/json',
        }
      });
      toast.promise(
        response(),
        {
          loading: 'Login...',
          success: (loginResp) => {
            if (loginResp.status === 200) {
              Cookies.set('auth', loginResp?.data?.token)
              redirect()
              return <b>Login success</b>;
            }
        },
          error: <b>Error in logging in user</b>,
        }
      );
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <div className="min-h-screen flex items-center bg-gray-200 justify-center w-full">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 w-1/4 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 ">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
