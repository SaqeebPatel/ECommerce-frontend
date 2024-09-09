import React, { createContext, useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

// Create CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Load cart data from local storage if user is logged in
    if (token) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart data to local storage only if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) =>product._id!== id));
  };

  const showMoreInfo = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const buyNow = (product) => {
    setBuyNowProduct(product);
    setQuantity(1); // Reset quantity to 1 on each new product buy now
    setTotalPrice(product.price); // Initial total price with quantity 1
    setShowBuyNowModal(true);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    const total = (buyNowProduct?.price || 0) * newQuantity; // Update total price based on quantity
    setTotalPrice(total);
  };

  const handleContinue = () => {
    if (buyNowProduct) {
      console.log(`Product Name: ${buyNowProduct.productname}`);
      console.log(`Total Price: ${totalPrice}`);

      // Open print dialog without replacing the entire body content
      const printContent = document.getElementById("printSection").innerHTML;
      const newWindow = window.open("", "", "width=600,height=400");
      newWindow.document.write(`<html><head><title>Print</title></head><body>${printContent}</body></html>`);
      newWindow.document.close();
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowBuyNowModal(false);
    setSelectedProduct(null);
    setBuyNowProduct(null);
    setQuantity(1);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, showMoreInfo, buyNow }}>
      {children}

      {/* Modal for showing product info */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.productname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="img-fluid"
              src={selectedProduct.image}
              alt={selectedProduct.productname}
              width="100%"
            />
            <p>{selectedProduct.description}</p>
            <p>Price: {selectedProduct.price}</p>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Available: {selectedProduct.available ? "In Stock" : "Out of Stock"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => buyNow(selectedProduct)}>
              Buy Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for Buy Now */}
      {buyNowProduct && (
        <Modal show={showBuyNowModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Buy Now</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="img-fluid"
              src={buyNowProduct.image}
              alt={buyNowProduct.productname}
              width="100%"
            />
            <p>Price: {buyNowProduct.price}</p>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </Form.Group>
            <p>Total Price: {totalPrice}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleContinue}>
              Continue
            </Button>
            {/* Hidden section for printing */}
            <div id="printSection" style={{ display: "none" }}>
              <h2>{buyNowProduct.productname}</h2>
              <p>description: {buyNowProduct.description}</p>
              <p>Price: {buyNowProduct.price}</p>
              <p>Total Price: {totalPrice}</p>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </CartContext.Provider>
  );
};
