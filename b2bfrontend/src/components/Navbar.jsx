import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
        <nav className='bg-neutral-100 w-full flex justify-between items-center p-3'>
            <div className='w-1/6'>
                <img className='rounded-full' src={logo} width={60} height={60} alt="" />
            </div>
            <div className='w-4/6 flex justify-center items-center gap-6'>
                <Link>Home</Link>
                <Link to={`/ads/promotional`}>Promotional</Link>
                <Link to={`/ads/collaboration`}>Collaborations</Link>
            </div>
            <div className='flex w-1/6 gap-4'>
                <Link to={`/login`} className='bg-transparent border-2 border-blue-500 sm:px-6 px-4 py-2 rounded-lg text-primary cursor-pointer font-semibold'>Login</Link>
                <Link to={`/register`} className='bg-blue-500 border-2 border-blue-500 sm:px-6 px-4 py-2 rounded-lg text-black cursor-pointer font-semibold'>Signup</Link>
            </div>
        </nav>
    </>
  )
}

export default Navbar