import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

const AllChats = () => {
    const cookies = Cookies
    const authToken = cookies.get('auth')
    const [userId, setUserId] = useState()
    useEffect(()=>{
      if(!authToken){
        navigate('/login')
      }else{
        setUserId(jwtDecode(authToken).companyId)
      }
    },[authToken])
    const [allChats, setAllChats] = useState()
    useEffect(()=>{
      if(userId){
        const fetchChats = async ()=>{
            const response = await axios.get(`${process.env.REACT_APP_API}/getAllChats`, {userId}, {
                headers:{
                Authorization: `Bearer ${authToken}`
                }
            })
            console.log("resp chats", response);
        }
      }
        fetchChats()
    },[userId, authToken])
  return (
    <div>AllChats</div>
  )
}

export default AllChats