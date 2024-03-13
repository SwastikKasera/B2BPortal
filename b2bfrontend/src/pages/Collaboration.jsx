import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { IoSearchOutline } from "react-icons/io5";
import AdsCard from '../components/AdsCard';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Collaboration = () => {
  const [advertisement, setAdvertisement] = useState([])
  const authToken = Cookies.get('auth')
  const navigate = useNavigate()
  const [companyId, setCcompanyId] = useState()
  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }else{
      setCcompanyId(jwtDecode(authToken)?.companyId)
    }
  }, [authToken]);
  
  useEffect(()=>{
    const fetchData = async ()=>{
      if(companyId){
      const resp = await axios.post(`${process.env.REACT_APP_API}/ads/category`, {companyId, category:'collaboration'},{
        headers:{
          Authorization: `Bearer ${authToken}`
        }
      })
      setAdvertisement(resp?.data?.promotionalAds)
    }
  }
    fetchData()
  },[companyId])
  return (
    <>
        <Navbar/>
        <div className='bg-neutral-100 p-4 flex justify-center items-center'>
          <input type="text" placeholder='Search advertisments' className='h-14 w-2/5 pl-4 rounded-s-lg px-2 outline-none' />
          <button className='bg-blue-500 h-14 w-14 flex justify-center items-center rounded-e-xl px-2 text-2xl font-bold'><IoSearchOutline color='white' /></button>
        </div>
        <div className='flex flex-col justify-center items-center gap-3 mt-3'>
          {advertisement.length === 0 ? <h2>No Ads Found</h2> :advertisement.map((ad)=>(
            <AdsCard key={ad._id} recieverId={ad.companyId} title={ad?.title} desc={ad.description} category={ad.category} date={ad.createdAt} companyName={"Nexperia Technology"}/>
          ))}
        </div>
    </>
  )
}

export default Collaboration