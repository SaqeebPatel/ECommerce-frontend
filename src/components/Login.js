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

// export default Login;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.css';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, success, token } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isToastShown, setIsToastShown] = React.useState(false); // Flag to prevent double toast

  React.useEffect(() => {
    if (success && token && !isToastShown) { // Check if the toast has already been shown
      localStorage.setItem('token', token);
      toast.success('Login successful!', { position: "top-right" });
      setIsToastShown(true); // Set the flag to true after showing the toast
      navigate('/home');
    }
  }, [success, token, navigate, isToastShown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsToastShown(false); // Reset the flag before attempting login
      await login({ email, password });
    } catch (error) {
      toast.error('Invalid email or password.', { position: "top-right" });
    }
  };

  return (
    <div className="container login-container">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </form>
      </div>
      
    </div>
  );
};
// return (
  
//   <div className="login-container">
//     <div className="background">
//       <div className="shape"></div>
//       <div className="shape"></div>
//     </div>
//     <form onSubmit={handleLogin}> 
//       <h3>Login Here</h3>

//       <label htmlFor="username">Email</label>
//       <input type="text" placeholder="Email " id="username"  onChange={(e) => setEmail(e.target.value)}/>

//       <label htmlFor="password">Password</label>
//       <input type="password" placeholder="Password" id="password"onChange={(e) => setPassword(e.target.value)} />

//       <button type="submit">Log In</button>
//       <button type="submit"onClick={() => navigate('/register')}>Register</button>
      
//     </form>
//   </div>
// );
// };

export default Login;
