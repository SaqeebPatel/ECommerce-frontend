import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
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

  return (
    <div>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((pro, index) => (
          <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0 align-items-center"> {/* Vertical centering applied here */}
              <div className="col-md-4">
                <img
                  src={pro.image || "default-image-url"}
                  className="img-fluid rounded-start"
                  alt={pro.productname}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Name - {pro.productname}</h5>
                  <h5 className="card-title">Price - {pro.price}</h5>
                  <h5 className="card-title">Quantity - {pro.quantity}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated {new Date(pro.updatedAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
