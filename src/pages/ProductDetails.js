import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/getProduct/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product details", err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "50rem", margin: "auto" }}>
        <img
          src={product.image || "default-image-url"}
          className="card-img-top"
          alt={product.productname}
        />
        <div className="card-body">
          <h5 className="card-title">Name - {product.productname}</h5>
          <p className="card-text">Price: {product.price}</p>
          <p className="card-text">Quantity: {product.quantity}</p>
          <p className="card-text">
            Description: {product.description || "No description available"}
          </p>
          <p className="card-text">
            Category: {product.category.categoryname || "Uncategorized"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
