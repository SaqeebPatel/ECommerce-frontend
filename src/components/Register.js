import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import './login.css';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState('commonUser');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ role, name, email, password, mobileNumber });
      toast.success('Registration successful!'); // Show success toast
      navigate('/login'); // Redirect to login page on successful registration
    } catch (error) {
      toast.error('Registration failed. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="container Register-container">
      <div className="login-box">
       
        <form  className="Registerfrom"onSubmit={handleRegister}>
        <h2 className="text-center">Register</h2>
          <div className="form-group">
            <label>Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="commonUser">Common User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Register
          </button>
          <button
            type="button"
           
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer /> {/* To display notifications */}
    </div>
  );
};

export default Register;




// return (
//   <div className={`container ${!isSignIn ? 'right-panel-active' : ''}`} id="container">
//     <div className="form-container sign-up-container">
//       <form action="#">
//         <h1>Create Account</h1>
//         <div className="social-container">
//           <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//           <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//           <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//         <span>or use your email for registration</span>
//         <input type="text" placeholder="Name" />
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//     <div className="form-container sign-in-container">
//       <form action="#">
//         <h1>Sign In</h1>
//         <div className="social-container">
//           <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//           <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//           <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//         <span>or use your account</span>
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <a href="#">Forgot your password?</a>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//     <div className="overlay-container">
//       <div className="overlay">
//         <div className="overlay-panel overlay-left">
//           <h1>Welcome Back!</h1>
//           <p>To keep connected with us please login with your personal info</p>
//           <button className="ghost" onClick={handleSignInClick}>Sign In</button>
//         </div>
//         <div className="overlay-panel overlay-right">
//           <h1>Hello, Friend!</h1>
//           <p>Enter your personal details and start journey with us</p>
//           <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// };