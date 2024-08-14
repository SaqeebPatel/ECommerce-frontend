// import React from 'react'
// import './login.css';

// const Login = () => {
//   return (
    
//     <div>
//        <div class="container login-container">
//         <div class="login-box">
//             <h2 class="text-center">Login</h2>
//             <form>
//                 <div class="form-group">
//                     <label for="email">Email:</label>
//                     <input type="email" class="form-control" id="email" placeholder="Enter email"></input>
//                 </div>
//                 <div class="form-group">
//                     <label for="password">Password:</label>
//                     <input type="password" class="form-control" id="password" placeholder="Enter password"></input>
//                 </div>
//                 <button type="submit" class="btn btn-primary btn-block">Login</button>
//                 <button type="button" class="btn btn-secondary btn-block">Register</button>
//             </form>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default Login
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    navigate('/home'); // Redirect to home page on successful login
  }

  return (
    <div className="container login-container">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => navigate('/register')}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
