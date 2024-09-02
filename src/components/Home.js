
// export default Home;
import React from 'react';
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {user ? (
          user.role === "admin" ? (
            <div className="Admin">
              {/* Admin Content */}
            </div>
          ) : (
            <>
            <div className="user"></div>
            </>
            // <div className="carousel-wrapper">
            //   <div
            //     id="carouselExampleIndicators"
            //     className="carousel slide custom-carousel"
            //     data-bs-ride="carousel"
            //   >
            //     <div className="carousel-indicators">
            //       <button
            //         type="button"
            //         data-bs-target="#carouselExampleIndicators"
            //         data-bs-slide-to="0"
            //         className="active"
            //         aria-current="true"
            //         aria-label="Slide 1"
            //       ></button>
            //       <button
            //         type="button"
            //         data-bs-target="#carouselExampleIndicators"
            //         data-bs-slide-to="1"
            //         aria-label="Slide 2"
            //       ></button>
            //       <button
            //         type="button"
            //         data-bs-target="#carouselExampleIndicators"
            //         data-bs-slide-to="2"
            //         aria-label="Slide 3"
            //       ></button>
            //     </div>
            //     <div className="carousel-inner">
            //       <div className="carousel-item active">
            //         <img
            //           src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            //           className="d-block w-100"
            //           alt="Slide 1"
            //         />
            //       </div>
            //       <div className="carousel-item">
            //         <img
            //           src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            //           className="d-block w-100"
            //           alt="Slide 2"
            //         />
            //       </div>
            //       <div className="carousel-item">
            //         <img
            //           src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            //           className="d-block w-100"
            //           alt="Slide 3"
            //         />
            //       </div>
            //     </div>
            //     <button
            //       className="carousel-control-prev"
            //       type="button"
            //       data-bs-target="#carouselExampleIndicators"
            //       data-bs-slide="prev"
            //     >
            //       <span
            //         className="carousel-control-prev-icon"
            //         aria-hidden="true"
            //       ></span>
            //       <span className="visually-hidden">Previous</span>
            //     </button>
            //     <button
            //       className="carousel-control-next"
            //       type="button"
            //       data-bs-target="#carouselExampleIndicators"
            //       data-bs-slide="next"
            //     >
            //       <span
            //         className="carousel-control-next-icon"
            //         aria-hidden="true"
            //       ></span>
            //       <span className="visually-hidden">Next</span>
            //     </button>
            //   </div>
            // </div>
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
