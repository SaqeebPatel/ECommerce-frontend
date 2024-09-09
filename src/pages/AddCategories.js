import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import"../components/css/AddCategory.css";

const AddCategory = () => {
  const [categoryname, setcategoryname] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/categories/addcategory',
        { categoryname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Category added successfully!', {
        style: { whiteSpace: 'nowrap' }
      });

      setcategoryname(''); // Clear the input
      setError(null);
    } catch (err) {
      setError('Error adding category. Please try again.');
    }
  };

  const handleDismiss = () => {
    setError(null);
  };

  return (
    <div id="login-page" class="containeraddpros">
      <ToastContainer />
      <form className='AddCategory' onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 className="ml-2">Add Category</h2>
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryname}
            onChange={(e) => setcategoryname(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="close"
              onClick={handleDismiss}
              aria-label="Close"
              style={{ position: 'absolute', right: '10px', top: '5px' }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Add Category
        </button>
      </form>
    </div>
  );
};
{/* <div id="login-page" class="container">
  <form>
    <div class="row">
      <h4>Account</h4>
      <div class="input-group input-group-icon">
        <input type="text" placeholder="Full Name"/>
        <div class="input-icon">
          <i class="fa fa-user"></i>
        </div>
      </div>
    
    </div>
  
    
   
  </form>
</div> */}


  // )}
  



export default AddCategory;
