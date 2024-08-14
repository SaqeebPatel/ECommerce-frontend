// import React from 'react';
// import './login.css'; 

// const Register = () => {
//     return (
//         <div className="container login-container">
//             <div className="login-box">
//                 <h2 className="text-center">Register</h2>
//                 <form>
//                     <div className="form-group">
//                         <label htmlFor="username">Username:</label>
//                         <input type="text" className="form-control" id="username" placeholder="Enter username" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input type="email" className="form-control" id="email" placeholder="Enter email" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password:</label>
//                         <input type="password" className="form-control" id="password" placeholder="Enter password" />
//                     </div>
//                     <button type="submit" className="btn btn-primary btn-block">Register</button>
//                     <button type="button" className="btn btn-secondary btn-block">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Register;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform registration logic here
    navigate('/home'); // Redirect to home page on successful registration
  }

  return (
    <div className="container login-container">
      <div className="login-box">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => navigate('/login')}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
