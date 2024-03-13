import './App.css';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Promotional from './pages/Promotional';
import Collaboration from './pages/Collaboration';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/ads/promotional' element={<Promotional />} />
        <Route path='/ads/collaboration' element={<Collaboration />} />
        <Route path='/chat/:senderId/:recieverId' element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
