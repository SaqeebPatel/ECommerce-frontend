
import React, { useState } from "react";
import useAuth from "../hooks/userAuth";

export default function Categories() {
  const [category, setCategory] = useState([]);

  useAuth(setCategory, "http://localhost:5000/api/categories/getcategory");

  return (
    <div className="container mt-5">
      <h1 style={{ marginLeft: "500px" }}>Category</h1>
      <div className="row justify-content-center">
        {category.map((cat) => (
          <div key={cat._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <h5 className="card-title">{cat.categoryname}</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
