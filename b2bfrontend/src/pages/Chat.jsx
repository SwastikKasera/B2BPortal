import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { LuSendHorizonal } from 'react-icons/lu';
import Cookies from 'js-cookie';
import axios from 'axios';

const socket = io('http://localhost:4000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [loadedMsgs, setLoadedMsgs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const params = useParams();
  const authToken = Cookies.get('auth');
  console.log("authToken", authToken, typeof authToken);
  const { senderId, recieverId } = params;
  const chatId = `${senderId}${recieverId}`;
  const [user, setUserId] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!authToken){
      navigate('/login')
    }else{
      setUserId(jwtDecode(authToken).companyId)
    }
  },[authToken])
  useEffect(() => {
    const fetchOneChat = async () => {
      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_API}/fetchOneChat`,
          {
            senderId,
            recieverId,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setLoadedMsgs(resp?.data?.chat?.chats || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOneChat();
  }, [senderId, recieverId, authToken]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      console.log("===", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    socket.on('connect', () => {
      console.log(socket.id);
    });
    socket.emit('joinChat', chatId);
    return () => {
      socket.off('receiveMessage');
    };
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const isSender = senderId === user;
      const senderOrReceiverId = isSender ? recieverId : senderId;

      socket.emit('sendMessage', {
        chatId,
        senderId: isSender ? senderId : recieverId,
        recieverId: senderOrReceiverId,
        message,
      });

      setMessage('');
    }
  };

  const senderStyles = 'bg-blue-500 text-white p-2 rounded-s-lg rounded-tr-lg min-w-fit max-w-4/6';
  const receiverStyles = 'bg-white text-black p-2 rounded-s-lg rounded-tr-lg min-w-fit max-w-4/6';

  return (
    <div className="flex min-h-full justify-center items-center">
      <div className="w-1/2 h-full bg-neutral-100 flex flex-col gap-4 justify-between items-center p-4">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          loadedMsgs.map((msg, index) => (
            <div key={index} className={`flex w-full ${msg.senderId === user ? 'justify-end' : 'justify-start'}`}>
              <p className={msg.senderId === user ? senderStyles : receiverStyles}>{msg.chat}</p>
            </div>
          ))
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex w-full ${msg.senderId === user ? 'justify-end' : 'justify-start'}`}>
            <p className={msg.senderId === user ? senderStyles : receiverStyles}>{msg.text}</p>
          </div>
        ))}

        <div className="w-full bg-blue-200 flex gap-2 justify-center items-center">
          <input
            className="p-2 rounded-lg outline-none w-1/2"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-blue-500 rounded-full p-4" onClick={handleSendMessage}>
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
