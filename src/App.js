// import logo from './logo.svg';
// import './App.css';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';

// function App() {
//   return (
//     <>
//     <Navbar/>
//     <Login/>
//     <Register/>
//     </>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
