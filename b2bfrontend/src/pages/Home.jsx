import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { IoSearchOutline } from "react-icons/io5";
import AdsCard from '../components/AdsCard';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';

const Home = () => {
  const [advertisement, setAdvertisement] = useState([])
  const [searchText, setSearchText] = useState({
    keyword:''
  })
  const authToken = Cookies.get('auth')
  const [user, setUser] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }else{
      setUser(jwtDecode(authToken).companyId)
    }
  }, [authToken]);
  useEffect(()=>{
    const fetchData = async ()=>{
      if(user){
        const resp = await axios.post(`${process.env.REACT_APP_API}/ads`, {companyId:user},{
          headers:{
            Authorization: `Bearer ${authToken}`
          }
        })
        setAdvertisement(resp?.data)
      }
    }
    fetchData()
  },[user])

  const searchChange = (e)=>{
    setSearchText({keyword: e.target.value})
  }

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API}/ads/search`,
        { keyword: searchText?.keyword }, 
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      if (resp?.status === 200) {
        // Update the state with the search results
        setAdvertisement(resp?.data);
        console.log("resp", resp?.data);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  
  return (
    <>
        <Navbar/>
        <div className='bg-neutral-100 p-4 flex justify-center items-center'>
          <input type="text" onChange={searchChange} name='search' placeholder='Search advertisments' className='h-14 w-2/5 pl-4 rounded-s-lg px-2 outline-none' />
          <button onClick={handleSearch} className='bg-blue-500 h-14 w-14 flex justify-center items-center rounded-e-xl px-2 text-2xl font-bold'><IoSearchOutline color='white' /></button>
        </div>
        <div className='flex flex-col justify-center items-center gap-3 mt-3'>
          {advertisement.map((ad)=>(
            <AdsCard key={ad._id} recieverId={ad.companyId} title={ad?.title} desc={ad.description} category={ad.category} date={ad.createdAt} companyName={"Nexperia Technology"}/>
          ))}
        </div>
    </>
  )
}

export default Home