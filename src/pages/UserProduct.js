import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../hooks/CartContext"; // adjust path accordingly
import { Routes, Route, Link } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails"; // adjust path accordingly

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const { addToCart,showMoreInfo } = useContext(CartContext); // Use the addToCart function from the context

  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/getAllProduct",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch product information", err);
      }
    }
    fetchProducts();
  }, []);

  // Handle adding to cart
  const handleAdd = (product) => {
    addToCart(product); // Add product to cart using the CartContext
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((pro, index) => (
              <div key={index} className="col-md-4 mb-3">
                {/* Each card takes up 1/3rd of the row */}
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={pro.image || "default-image-url"}
                    className="card-img-top"
                    alt={pro.productname}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name - {pro.productname}</h5>
                    <p className="card-text">Price: {pro.price}</p>
                    {/* <p className="card-text">Price: {pro.product.categoryname}</p> */}
                   
                  </div>
                 
                  <div className="card-body d-flex justify-content-between">
                    <button
                      onClick={() => handleAdd(pro)}
                      className="btn btn-outline-info"
                    >
                      Add
                    </button>
                    <button to="ProductDetails" className="btn btn-outline-info"
                    onClick={() => showMoreInfo(pro)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="ProductDetails" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default UserProduct;
