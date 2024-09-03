import React from "react";
import { Modal, Button } from "react-bootstrap"; // Assuming you're using react-bootstrap

const CartModal = ({ visible, toggleCartModal, cartItems }) => {
  return (
    <Modal show={visible} onHide={toggleCartModal}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index}>
              <h5>{item.productname}</h5>
              <p>Price: {item.price}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleCartModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
