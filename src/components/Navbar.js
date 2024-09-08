// export default Navbar;
import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom"; // Import Link for routing
import Sidebar from "./Sidebar";
import useAuth from "../hooks/useAuth"; // Adjust the path if necessary
import { IoMdPerson } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import Cart from "../pages/ProductDetails";
import { CartProvider } from "../hooks/CartContext";


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
            <GiHamburgerMenu onClick={toggleSidebar} />
              {/* <img
                src="https://previews.123rf.com/images/mamun25g/mamun25g2007/mamun25g200700784/151666606-sp-s-p-letter-logo-design-initial-letter-sp-linked-circle-uppercase-monogram-logo-red-and-blue-s-p.jpg"
                alt="Profile"
                className="rounded-circle"
                width="40"
                height="40"
                
                style={{ cursor: "pointer" }}
              /> */}
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item"></li>
              
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>{" "}
            </ul>
            <div
              className="d-flex align-items-center"
              style={{ marginLeft: "60px" }}
            >
              <IoMdPerson style={{ fontSize: "22px", marginRight: "8px" }} />
              <h2 className="nav-link active" aria-current="page">
                {user ? ` ${user.name}` : "Welcome"}
              </h2>
              <Link to="ProductDetails">
              <FaCartShopping
                style={{ fontSize: "22px", marginLeft: "16px", marginRight: "16px" }}
              />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <div>
      <CartProvider>
      <Routes>
            
            <Route path="ProductDetails" element={<Cart />} />
          </Routes>
          </CartProvider>
      </div>
    </div>
  );
};
export default Navbar;