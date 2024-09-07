import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from"../pages/ProductDetails";
import { Routes, Route , Link} from "react-router-dom";


const UserProduct = () => {
  const [products, setProducts] = useState([]);

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


  const handleAdd = () => {
    
  }

  return (
    <>
    <div className="container">
      <div className="row">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((pro, index) => (
            <div key={index} className="col-md-4 mb-3"> {/* Each card takes up 1/3rd of the row */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={pro.image || "default-image-url"}
                  className="card-img-top"
                  alt={pro.productname}
                />
                <div className="card-body">
                  <h5 className="card-title">Name - {pro.productname}</h5>
                  <p className="card-text">
                    Price: {pro.price}
                  </p>
                  <p className="card-text">
                    Quantity: {pro.quantity}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Description: {pro.description || "No description available"}
                  </li>
                  <li className="list-group-item">
                    {/* Category: {pro.category.categoryname || "Uncategorized"} */}
                  </li>
                </ul>
                <div onClick={() => handleAdd()} className="card-body d-flex justify-content-between">
                  <a to="ProductDetails"><a  href="#" className="btn btn-outline-info" >
                    {/* style={{ width: "45%", height:"20%" }} */}
                    Add
                  </a></a>
                  <a href="#" className="btn btn-outline-info">
                  {/* style={{ width: "45%" }} */}
                    View Details
                  </a>
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