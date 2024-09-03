
// import React, { useState } from "react";
// import useAuth from "../hooks/userAuth";

// export default function Categories() {
//   const [category, setCategory] = useState([]);

//   useAuth(setCategory, "http://localhost:5000/api/categories/getcategory");

//   return (
//     <div className="container mt-5">
//       <h1 style={{ marginLeft: "500px" }}>Category</h1>
//       <div className="row justify-content-center">
//         {category.map((cat) => (
//           <div key={cat._id} className="col-md-4">
//             <div className="card mb-4">
//               <div className="card-body text-center">
//                 <h5 className="card-title">{cat.categoryname}</h5>
//                 <p className="card-text">
//                   With supporting text below as a natural lead-in to additional
//                   content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Go somewhere
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/userAuth";
import { toast } from "react-toastify";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch categories
  useAuth(setCategories, "http://localhost:5000/api/categories/getcategory");

  // Delete category function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/deletecategory/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully");
    } catch (err) {
      setError("Failed to delete category.");
      toast.error("Failed to delete category.");
    }
  };

  // Open edit modal with category details
  const handleEdit = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  // Update category function
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/categories/updatecategory/${editCategory._id}`,
        editCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.map((cat) => (cat._id === editCategory._id ? editCategory : cat)));
      setShowEditModal(false);
      toast.success('Category updated successfully');
    } catch (err) {
      setError("Failed to update category.");
      toast.error(err.response?.data?.message || 'Failed to update category');
    }
  };

  return (
    <div className="container mt-5">
      <h1 style={{ marginLeft: "500px" }}>Category</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.categoryname}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cat._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="categoryName">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoryName"
                      value={editCategory?.categoryname || ""}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          categoryname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
