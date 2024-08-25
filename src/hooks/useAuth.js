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

  // const login = async (userData) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/login', userData);
  //     const { token } = response.data.token;
  //     setToken(token); // Store the token
  //     console.log("*******Token",token)
  //     setSuccess(response.data.success);
  //     console.log("********Success",response.data.success);
  //     toast.success('Logged in successfully');
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       toast.error('Incorrect email or password'); // Handle 401 Unauthorized error
  //     } else if (error.response && error.response.status === 404) {
  //       toast.error('User is not registered'); // Handle 404 Not Found error
        
  //     } else {
  //       toast.error(error.response?.data?.message || 'Login failed'); // Handle other errors
  //     }
  //     return false
  //   }
  // };

  async function login(userData) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData
      );
      const { access: token, success } = response.data;
      setToken(token);
      console.log(token);
      setSuccess(success);
      console.log(success);
      localStorage.setItem("token", token);
      toast.success("Logged in successfully");
      return success;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid Email or Password");
      } else if (error.response && error.response.status === 404) {
        toast.error("User is not registered");
      } else {
        toast.error("Login failed. Please try again.");
      }
      return false;
    }
  }


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
