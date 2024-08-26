import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // const decodedUser = jwtDecode(token); // Extract the user from the token
      // setUser(decodedUser); // Update the user state
    } else {
      localStorage.removeItem('token');
      setUser(null); // Clear the user state when token is removed
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      toast.success(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      const { token, success } = response.data; 
      setToken(token); 
      setSuccess(success); 
      console.log("*******Token", token);
      console.log("********Success", success);
      toast.success('Logged in successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Incorrect email or password'); 
      } else if (error.response && error.response.status === 404) {
        toast.error('User is not registered'); 
      } else {
        toast.error(error.response?.data?.message || 'Login failed'); 
      }
      return false;
    }
  };
  




  const logout = () => {
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
  };

  return {
    user,
    token,
    success,
    register,
    login,
    logout,
  };
};

export default useAuth;
