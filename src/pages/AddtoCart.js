// import React from 'react'

// const AddtoCart = () => {
//   return (
//     <div>
//       <h1>Add to Cart</h1>
//     </div>
//   )
// }

// export default AddtoCart
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddtoCart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');

  return (
    <div className="container">
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <div className="row">
        <div className="col-md-6" style={{ marginTop: '5%' }}>
          <img
            className="img-fluid"
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product"
            width={700}
          />
        </div>
        <div className="col-md-6" style={{ marginTop: '10%' }}>
          <h5>prodName</h5>
          <p>proddes</p>
          <h4>color</h4>
          <h3>price</h3>
          <button
            className="btn btn-primary"
            // onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <div className="mt-4">
            <Link to="storage" className="btn btn-link">
              Storage
            </Link>
            <Link
              to="color"
              className="btn btn-link"
              style={{ marginLeft: '20px' }}
            >
              Color
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="storage" element={<Storage />} />
        <Route path="color" element={<Color />} />
      </Routes>
    </div>
  );
};

function Storage() {
  return (
    <div
      className="container"
      style={{
        border: '1px solid black',
        width: '200px',
        margin: 'auto',
        padding: '10px',
        marginTop: '20px',
      }}
    >
      <ul className="list-group">
        <li className="list-group-item">6GB RAM /180 GB</li>
        <li className="list-group-item">8GB RAM /256 GB</li>
        <li className="list-group-item">12GB RAM / 1 T</li>
      </ul>
    </div>
  );
}

function Color() {
  return (
    <div
      className="container"
      style={{
        border: '1px solid black',
        width: '200px',
        margin: 'auto',
        padding: '10px',
        marginTop: '20px',
      }}
    >
      <ul className="list-group">
        <li className="list-group-item">Red</li>
        <li className="list-group-item">Blue</li>
        <li className="list-group-item">Green</li>
      </ul>
    </div>
  );
}

export default AddtoCart;
