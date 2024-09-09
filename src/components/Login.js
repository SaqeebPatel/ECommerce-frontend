// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.css';
// import useAuth from '../hooks/useAuth';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, success, token } = useAuth(); // Assuming `token` is also provided by useAuth
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   React.useEffect(() => {
//     if (success && token) { // Ensure both success and token are available
//       localStorage.setItem('token', token); // Store token in localStorage
//       console.log('token',token)
     
//       navigate('/navbar');
//        // Navigate to the home page
//       toast.success('Login success');
//     }
//   }, [success, token, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login({ email, password }); // Perform login
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="container login-container">
//       <div className="login-box">
//         <h2 className="text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary btn-block">
//             Login
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary btn-block"
//             onClick={() => navigate('/register')}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './login.css';
// import useAuth from '../hooks/useAuth';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, success, token } = useAuth(); 
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   React.useEffect(() => {
//     if (success && token) { 
//       localStorage.setItem('token', token); 
//       console.log('token', token);
//       toast.success('Login successful!', { position: "top-right" });
//       navigate('/navbar'); 
//     }
//   }, [success, token, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login({ email, password }); 
//     } catch (error) {
//       toast.error('Invalid email or password.', { position: "top-right" });
//     }
//   };

//   return (
//     <div className="container login-container">
//       <div className="login-box">
//         <h2 className="text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary btn-block">
//             Login
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary btn-block"
//             onClick={() => navigate('/register')}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import './login.css';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, success, token } = useAuth();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);

  // State for registration
  const [role, setRole] = useState('commonUser');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');

  // State to toggle between sign-in and sign-up
  const [isSignUp, setIsSignUp] = useState(false);

  React.useEffect(() => {
    if (success && token && !isToastShown) {
      localStorage.setItem('token', token);
      toast.success('Login successful!', { position: "top-right" });
      setIsToastShown(true);
      navigate('/home');
    }
  }, [success, token, isToastShown, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsToastShown(false);
      await login({ email, password });
    } catch (error) {
      toast.error('Invalid email or password.', { position: "top-right" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to register with:", { role, name, email, password, mobileNumber });
  
      // Reset isToastShown to ensure a fresh check
      setIsToastShown(false);
  
      // Attempt to register the user
      await register({ role, name, email, password, mobileNumber });
  
      // Check if registration is successful
      if (!isToastShown) {
        toast.success('Registration successful!', { position: "top-right" });
        setIsToastShown(true);
        // Delay navigation to allow toast message to be visible
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      }
    } catch (error) {
      // Handle errors with a toast message
      if (!isToastShown) {
        toast.error('Registration failed. Please try again.', { position: "top-right" });
        setIsToastShown(true);
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container login-page" id="container">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            {/* <span>or use your email for registration</span> */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Ensure ToastContainer is included */}
    </div>
  );
};

export default Login;
