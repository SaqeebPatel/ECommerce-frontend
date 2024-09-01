
// export default Sidebar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import AddCategory from "../pages/AddCategories";
import AddProduct from "../pages/AddProduct";
import Categories from "../pages/Categories"; 
import Product from "../pages/Product";

const Sidebar = ({ visible, toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {user ? (
        user.role === "admin" ? (
          <div className="Admin">
            <div className={`sidebar ${visible ? "visible" : ""}`}>
              <div className="align-items-center">
                <img
                  src="https://previews.123rf.com/images/mamun25g/mamun25g2007/mamun25g200700784/151666606-sp-s-p-letter-logo-design-initial-letter-sp-linked-circle-uppercase-monogram-logo-red-and-blue-s-p.jpg"
                  alt="Profile"
                  width="250px"
                  height="150px"
                  onClick={toggleSidebar}
                />
              </div>
              <hr />
              <li className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="product">Products</Link>
              </li>
              <hr />
              <li className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="AddProduct">Add-Product</Link>
              </li>
              <hr />
              <li className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="categories">Categories</Link>
              </li>
              <hr />
              <li>
                <Link to="AddCategory" className="mt-1" style={{ cursor: "pointer" }}>
                  Add-Categories
                </Link>
              </li>
              <hr />
              <li className="m-1" style={{ cursor: "pointer" }} onClick={toggleSidebar}>
                Close
              </li>
              <hr />
              <li className="mt-1" onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </li>
              <hr />
            </div>
          </div>
        // ........................user............................................
        ) : (
          <div className="user">
            <div className={`sidebar ${visible ? "visible" : ""}`}>
              <div className="align-items-center">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/2166589397/display_1500/stock-vector-sp-artistic-letter-logo-design-with-creative-serif-font-in-black-and-white-colors-vector-2166589397.jpg"
                  alt="Profile"
                  width="250px"
                  height="150px"
                  onClick={toggleSidebar}
                />
              </div>
                <hr/>
              <li className="mt-1" style={{ cursor: "pointer" }}>
                Profile-user
              </li><hr/>
              <li className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="product">Products</Link>
              </li><hr/>
              <li className="mt-1" style={{ cursor: "pointer" }}>
                Cart
              </li><hr/>
              <li className="mt-1" style={{ cursor: "pointer" }}>
                <Link to="categories">Categories</Link>
              </li><hr/>
              <li className="m-1" style={{ cursor: "pointer" }} onClick={toggleSidebar}>
                Close
              </li><hr/>
              <ul>
                <li className="mt-1" onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </li><hr/>
              </ul>
            </div>
          </div>
        )
      ) : (
        <h1>Loading...</h1>
      )}
      <div className="main-content">
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="categories" element={<Categories />} />
          <Route path="AddProduct" element={<AddProduct />} />
        </Routes>
      </div>
    </>
  );
};

export default Sidebar;
