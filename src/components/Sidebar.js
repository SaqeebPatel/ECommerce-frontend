import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import AddCategory from "../pages/AddCategories";
import AddProduct from "../pages/AddProduct";
import Categories from "../pages/Categories";
import Product from "../pages/Product";
import AddtoCart from "../pages/AddtoCart";
import UserProduct from "../pages/UserProduct";
import UserCategories from "../pages/UserCategories";
import UserCarousel from "../components/UserCarousel";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

const Sidebar = ({ visible, toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {user ? (
        user.role === "admin" ? (
          <div className="Admin">
            <div className={`sidebar ${visible ? "visible" : ""}`}>
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
                <Link to="product">Products</Link>
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
                <Link to="AddCategory" className="mt-1" style={{ cursor: "pointer" }}>
                  Add-Categories
                </Link>
              </a>
              <hr />
              <a className="m-1" style={{ cursor: "pointer" }} onClick={toggleSidebar}>
                Close
              </a>
              <hr />
              <a className="mt-1" onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </a>
              <hr />
            </div>
          </div>
        ) : (
          <div className="user">
            <div className={`sidebar ${visible ? "visible" : ""}`}>
              <div className="aagn-items-center">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/2166589397/display_1500/stock-vector-sp-artistic-letter-logo-design-with-creative-serif-font-in-black-and-white-colors-vector-2166589397.jpg"
                  alt="Profile"
                  width="250px"
                  height="150px"
                  onClick={toggleSidebar}
                />
              </div>
              <hr/>
              <IoMdPerson style={{ fontSize: "22px", marginRight: "8px" }} />
              <a className="mt-1" style={{ cursor: "pointer" }}>
                Profile-user
              </a>
              <hr/>
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="UserProduct">Products</Link>
              </a>
              <hr/>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaCartShopping style={{ fontSize: "22px", marginRight: "8px" }} />
                <Link to="AddtoCart">Cart</Link>
              </div>
              <hr/>
              <a className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="UserCategories">Categories</Link>
              </a>
              <hr/>
              <a className="m-1" style={{ cursor: "pointer" }} onClick={toggleSidebar}>
                Close
              </a>
              <hr/>
              <ul>
                <a className="mt-1" onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </a>
                <hr/>
              </ul>
            </div>
          </div>
        )
      ) : (
        <h1>Loading...</h1>
      )}
      <div className="main-content">
        <Routes>
          <Route path="/" element={< UserCarousel/>} />
          <Route path="product" element={<Product />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="categories" element={<Categories />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="AddtoCart" element={<AddtoCart />} />
          <Route path="UserProduct" element={<UserProduct />} />
          <Route path="UserCategories" element={<UserCategories />} />
        </Routes>
      </div>
    </>
  );
};

export default Sidebar;
