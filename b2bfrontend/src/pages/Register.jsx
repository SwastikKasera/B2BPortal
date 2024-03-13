import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName:'',
    companySize:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const register = async ()=>{
        return axios.post(`${process.env.REACT_APP_API}/register`, formData, {
          headers:{
            'Content-Type': 'application/json',
          }
        });
      }
      // Handle the response or perform additional actions if needed
      toast.promise(
        register(),
        {
          loading: 'Registering...',
          success: (registerResp) => {
            if (registerResp.status === 200) {
              return <b>Done Please Login</b>;
            }
        },
          error: <b>Error in registering user</b>,
        }
      );
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Registration failed', error.response.data);
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
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your company name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <input
                type="number"
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your company size"
                required
              />
            </div>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
