
// export default Register;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();
  const [role, setRole] = useState('commonUser');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    register({ role,name, email, password, mobileNumber });

    
    navigate('/home'); // Redirect to home page on successful registration
  }

  return (
    <div className="container login-container">
      <div className="login-box">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
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
            <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password"  onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => navigate('/login')}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
