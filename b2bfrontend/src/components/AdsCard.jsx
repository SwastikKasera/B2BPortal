import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const AdsCard = ({title, desc, companyName, category, date, recieverId}) => {
  const cookies = Cookies
  const authToken = cookies.get('auth')
  const senderId = jwtDecode(authToken)?.companyId
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    return date.toLocaleString('en-IN', options);
  };
  const formattedDate = formatDate(date);
  return (
    <>
      <div className="w-2/4 flex gap-3 border-2 rounded-xl p-4">
        <img src={logo} alt="" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-black text-2xl">{title}</h2>
          <h4 className="text-blue-500">{companyName}</h4>
          <p className="text-neutral-600">
            {desc}
          </p>
          <div className="bg-gray-300 w-fit p-1 rounded-md">{category}</div>
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-400">Posted on {formattedDate}</p>
            <Link to={`/chat/${senderId}/${recieverId}`} className="bg-blue-500 border-2 border-blue-500 sm:px-6 px-4 py-2 rounded-lg text-white cursor-pointer font-semibold">Chat Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdsCard;
