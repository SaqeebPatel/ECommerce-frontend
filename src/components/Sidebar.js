// import React from "react";
// import "./Sidebar.css"; 

// const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <button  className="btn btn-outline-danger mt-5">
//         Profile
//       </button>
//       <button onClick={handleLogout} className="btn btn-outline-danger mt-5">
//         Logout
//       </button>
      
//     </div>
//   );
// };import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ visible, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens)
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      <div className="align-items-center ">
              <img 
                src="https://previews.123rf.com/images/mamun25g/mamun25g2007/mamun25g200700784/151666606-sp-s-p-letter-logo-design-initial-letter-sp-linked-circle-uppercase-monogram-logo-red-and-blue-s-p.jpg" 
                alt="Profile" 
               width="250px" 
                height="150px" 
                onClick={toggleSidebar}
                
              />
            </div>
      <ul>
        <li  class=" mt-1"onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
      </ul>
      <li onClick={toggleSidebar} className="btn btn-outline-dark">Close</li>
    </div>
  );
};

export default Sidebar;

