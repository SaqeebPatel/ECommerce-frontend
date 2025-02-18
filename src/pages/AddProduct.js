import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import"../components/css/AddProduct.css";
function AddProduct() {
  const [productname, setProductname] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setdescription] = useState("");

  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("true");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/getcategory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("res data", response.data);
        if (response.data && response.data.category) {
          setCategories(response.data.category);
        } else {
          setError("No categories found.");
        }
      } catch (err) {
        console.error(
          "Error fetching categories:",
          err.response ? err.response.data : err.message
        );
        setError(
          "Error fetching categories. Please check the console for more details."
        );
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }
  
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("available", available);
    formData.append("quantity", quantity);
    formData.append("description", description);
  
    try {
      await axios.post("http://localhost:5000/api/products/createProduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Product added successfully!");
      setProductname("");
      setImage(null);
      setCategory("");
      setdescription("");
      setPrice("");
      setAvailable("true");
      setQuantity("");
      setError("");
    } catch (err) {
      console.error(
        "Error adding product:",
        err.response ? err.response.data : err.message
      );
      setError("Error adding product. Please try again.");
    }
  };
  
  return (
    <div >
    <Container>
     
      <Form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="String"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryname}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="productAvailable">
          <Form.Label>Available</Form.Label>
          <Form.Control
            as="select"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
    </Container>
    </div>
  );
}

export default AddProduct;