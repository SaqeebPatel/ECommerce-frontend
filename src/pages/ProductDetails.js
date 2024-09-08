import React, { useContext } from "react";
import { CartContext } from "../hooks/CartContext"; // Adjust path accordingly

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext); // Get cart and removeFromCart from the context

  return (
    <div
      className="cat-container mt-5r"
      // style={{ height: "100vh", marginTop: "10%" }} // This makes the container take the full height of the viewport
    >
      <div className="card mb-3" >
       
        {cart.length === 0 ? (
          <>
          
          {/* <p>No items in the cart</p> */}
          </>
        ) : (
          <ul style={{ paddingLeft: 0, margin: 0 }}>
            {cart.map((product, index) => (
              <li
                key={index}
                style={{
                  listStyleType: "none",
                  marginBottom: "20px", // Adjust the gap here
                }}
              >
                <div className="d-flex gap-2">
                  <div className="col-md-6" style={{ marginTop: "10%" }}>
                    <img
                      className="img-fluid"
                      src={product.image}
                      alt="Product"
                      width={700}
                    />
                  </div>
                  <div className="col-md-6" style={{ marginTop: "10%" }}>
                    <h5>Name : {product.productname}</h5>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Available: {product.available ? "In Stock" : "Out of Stock"}</p>
                    <div className="d-flex gap-2" style={{ maxWidth: "80%"}}>
                      <button
                        className="btn btn-info btn-custom-small"
                        onClick={() => removeFromCart(product._id)}
                      >
                        More info
                      </button>
                      <button
                        className="btn btn-success btn-custom-medium"
                        onClick={() => removeFromCart(product._id)}
                      >
                        Buy Now
                      </button>
                      <button
                        className="btn btn-outline-danger btn-custom-large"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                     
                    </div>
                    
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
