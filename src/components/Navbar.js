
// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Sidebar from './Sidebar';
import useAuth from '../hooks/useAuth'; // Adjust the path if necessary

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from useAuth hook
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex align-items-center ms-3">
              <img 
                src="https://previews.123rf.com/images/mamun25g/mamun25g2007/mamun25g200700784/151666606-sp-s-p-letter-logo-design-initial-letter-sp-linked-circle-uppercase-monogram-logo-red-and-blue-s-p.jpg" 
                alt="Profile" 
                className="rounded-circle" 
                width="40" 
                height="40" 
                onClick={toggleSidebar}
                style={{ cursor: 'pointer' }}
              />
              
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  List
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
             
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </> </ul>
                <p className="nav-link active " style={{marginLeft:"60px"}} aria-current="page" href="#">
                  {user ? ` ${user.name}` : 'Welcome'}
                </p>
          </div>
        </div>
      </nav>
      <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
