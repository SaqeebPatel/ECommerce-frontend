// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal, Button } from "react-bootstrap";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [updatedProduct, setUpdatedProduct] = useState({
//     productname: "",
//     price: "",
//     quantity: "",
//   });

//   useEffect(() => {
//     async function fetchProducts() {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/products/getAllProduct",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Failed to fetch product information", err);
//       }
//     }
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/products/productdelete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts((prevProducts) => prevProducts.filter((pro) => pro._id !== id));
//     } catch (err) {
//       console.error("Failed to delete product", err);
//     }
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setUpdatedProduct({
//       productname: product.productname,
//       price: product.price,
//       quantity: product.quantity,
//     });
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       await axios.put(
//         `http://localhost:5000/api/products/productput/${selectedProduct._id}`,
//         updatedProduct,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProducts((prevProducts) =>
//         prevProducts.map((pro) =>
//           pro._id === selectedProduct._id ? { ...pro, ...updatedProduct } : pro
//         )
//       );
//       setShowModal(false);
//     } catch (err) {
//       console.error("Failed to update product", err);
//     }
//   };

//   const handleChange = (e) => {
//     setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((pro) => (
//             <div key={pro._id} className="col-md-4 mb-3">
//               <div className="card" style={{ maxWidth: "540px" }}>
//                 <div className="row g-0 align-items-center">
//                   <div className="col-md-4">
//                     <img
//                       src={pro.image || "default-image-url"}
//                       className="img-fluid rounded-start"
//                       alt={pro.productname}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="card-title">Name - {pro.productname}</h5>
//                       <h5 className="card-title">Price - {pro.price}</h5>
//                       <h5 className="card-title">Quantity - {pro.quantity}</h5>
//                       <p className="card-text">
//                         <small className="text-muted">
//                           Last updated {new Date(pro.updatedAt).toLocaleDateString()}
//                         </small>
//                         <div className="d-flex gap-2 mt-2">
//                           <Button
//                             onClick={() => handleEdit(pro)}
//                             variant="info"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             onClick={() => handleDelete(pro._id)}
//                             variant="danger"
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         dialogClassName="modal-90w"
//         className="custom-modal"
//       >
//         <form>
//           <div className="modal-body">
//             <div className="form-group">
//               <label htmlFor="productname">Product Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="productname"
//                 name="productname"
//                 value={updatedProduct.productname}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="price">Price</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="price"
//                 name="price"
//                 value={updatedProduct.price}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="quantity">Quantity</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="quantity"
//                 name="quantity"
//                 value={updatedProduct.quantity}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleUpdate}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </form>
//       </Modal>

//       <style jsx>{`
//         .custom-modal .modal-dialog {
//           max-width: 600px; /* Adjust based on your needs */
//           margin: 1.75rem auto; /* Center the modal horizontally and vertically */
//         }

//         .custom-modal .modal-content {
//           border-radius: 8px; /* Optional: add rounded corners */
//         }
//       `}</style>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductModify() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    productname: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/getAllProduct",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products.");
        console.error(
          "Error fetching products:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      productname: product.productname,
      price: product.price,
      quantity: product.quantity,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }
      console.log(token);
      if (!id) {
        toast.error("Invalid product ID.");
        return;
      }
      await axios.delete(
        `http://localhost:5000/api/products/deleteProduct/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    console.log(selectedProduct.id);
    try {
      await axios.put(
        `http://localhost:5000/api/products/updateProduct/${selectedProduct.id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      setError(null);
      setShowModal(false);
      toast.success("Product updated successfully!");
    } catch (err) {
      setError("Error updating product.");
      console.error(
        "Error updating product:",
        err.response ? err.response.data : err.message
      );
      toast.error("Error updating product.");
    }
  };

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "unset" }}>Products</h1>
      <hr />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: "blue" }}>Product Name</th>
            <th style={{ color: "blue" }}>Image</th>
            <th style={{ color: "blue" }}>Created At</th>
            <th style={{ color: "blue" }}>Quantity</th>
            <th style={{ color: "blue" }}>Price</th>
            <th style={{ color: "blue" }}>Available</th>
            <th style={{ color: "blue" }}>Update</th>
            <th style={{ color: "blue" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={{ color: "black" }}>{product.productname}</td>
              <td>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.productname}
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
              </td>
              <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.available ? "In Stock" : "Out of Stock"}</td>
              <td>
                <FaEdit
                  style={{
                    cursor: "pointer",
                    color: "orange",
                    marginRight: "10px",
                  }}
                  onClick={() => handleUpdateClick(product)}
                />
              </td>
              <td>
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        dialogClassName="modal-90w"
        className="custom-modal"
      >
        <form>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="productname">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productname"
                name="productname"
                value={updatedProduct.productname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={updatedProduct.quantity}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default ProductModify;
