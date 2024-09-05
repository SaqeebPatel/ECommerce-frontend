
import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/userAuth";
import { toast } from "react-toastify";
import './Categories.css'; // Import the CSS file

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
      await axios.delete(`http://localhost:5000/api/categories/deletecategory/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the JWT token in localStorage
        },
      });
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized: You do not have permission to delete this category.");
      } else {
        setError("Failed to delete category.");
        toast.error("Failed to delete category.");
      }
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
    <div className="cat-container mt-5">
      <h1 className="text-center">Category</h1>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat._id} className="category-item">
            <span>{cat.categoryname}</span>
            <div className="category-actions">
              <button
                className="btn btn-primary btn-sm"
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
            </div>
          </li>
        ))}
      </ul>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="modal show d-block modal-backdrop">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
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
      )}
    </div>
  );
}
