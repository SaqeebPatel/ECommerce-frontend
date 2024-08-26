import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, success, token } = useAuth(); // Assuming `token` is also provided by useAuth
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (success && token) { // Ensure both success and token are available
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('token',token)
      navigate('/home'); // Navigate to the home page
      toast.success('Login success');
    }
  }, [success, token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // Perform login
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
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

export default Login;
