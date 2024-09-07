

import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import useAuth from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';





import './App.css';

function App() {

  return (
   

    <Router>
      {/* <Navbar /> */}
    
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/navbar" element={<Navbar/>} />
        
      </Routes>
      {/* <ToastContainer /> */}
    </Router>

    
  );
}

export default App;


