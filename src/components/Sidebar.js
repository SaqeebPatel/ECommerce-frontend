import React, { useEffect, useRef } from "react";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../hooks/useAuth";
import AddCategory from "../pages/AddCategories";
import AddProduct from "../pages/AddProduct";
import Categories from "../pages/Categories";
import Product from "../pages/Product";
import Cart from "../pages/ProductDetails";
import UserProduct from "../pages/UserProduct";
import UserCategories from "../pages/UserCategories";
import UserCarousel from "../components/UserCarousel";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { CartProvider } from "../hooks/CartContext";

const Sidebar = ({ visible, toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef(null); // To reference the sidebar element

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close sidebar if clicked outside
      }
    };

    // Add event listener when sidebar is visible
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, toggleSidebar]);

  return (
    <>
      {user ? (
        user.role === "admin" ? (
          <div className="Admin">
            <div
              ref={sidebarRef} // Sidebar reference
              className={`sidebar ${visible ? "visible" : ""}`}
            >
              <div className="aagn-items-center">
                <img
                  src="https://previews.123rf.com/images/mamun25g/mamun25g2007/mamun25g200700784/151666606-sp-s-p-letter-logo-design-initial-letter-sp-anked-circle-uppercase-monogram-logo-red-and-blue-s-p.jpg"
                  alt="Profile"
                  width="250px"
                  height="150px"
                  onClick={toggleSidebar}
                />
              </div>
              <hr />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="Product">Products</Link>
              </a>
              <hr />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="AddProduct">Add-Product</Link>
              </a>
              <hr />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="categories">Categories</Link>
              </a>
              <hr />
              <a>
                <Link
                  to="AddCategory"
                  className="mt-1"
                  style={{ cursor: "pointer" }}
                >
                  Add-Categories
                </Link>
              </a>
              <hr />
              <a
                className="m-1"
                style={{ cursor: "pointer" }}
                onClick={toggleSidebar}
              >
                Close
              </a>
              <hr />
              <a
                className="mt-1"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
              <hr />
            </div>
          </div>
        ) : (
          <div className="user">
            <div
              ref={sidebarRef} // Sidebar reference
              className={`sidebar ${visible ? "visible" : ""}`}
            >
              <div className="aagn-items-center">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/2166589397/display_1500/stock-vector-sp-artistic-letter-logo-design-with-creative-serif-font-in-black-and-white-colors-vector-2166589397.jpg"
                  alt="Profile"
                  width="250px"
                  height="150px"
                  onClick={toggleSidebar}
                />
              </div>
              <hr />
              <IoMdPerson style={{ fontSize: "22px", marginRight: "8px" }} />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                Profile-user
              </a>
              <hr />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="UserProduct">Products</Link>
              </a>
              <hr />
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaCartShopping
                  style={{ fontSize: "22px", marginRight: "8px" }}
                />
                <Link to="ProductDetails">Cart</Link>
              </div>
              <hr />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="UserCategories">Categories</Link>
              </a>
              <hr />
              <a
                className="m-1"
                style={{ cursor: "pointer" }}
                onClick={toggleSidebar}
              >
                Close
              </a>
              <hr />
              <ul>
                <a
                  className="mt-1"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
                <hr />
              </ul>
            </div>
          </div>
        )
      ) : (
        <h1>Loading...</h1>
      )}
      <div className="main-content">
        <CartProvider> {/* Wrap the Routes with CartProvider */}
          <Routes>
            <Route path="/" element={<UserCarousel />} />
            <Route path="Product" element={<Product />} />
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="categories" element={<Categories />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="UserProduct" element={<UserProduct />} />
            <Route path="UserCategories" element={<UserCategories />} />
            <Route path="ProductDetails" element={<Cart />} />
          </Routes>
        </CartProvider>
      </div>
    </>
  );
};

export default Sidebar;
