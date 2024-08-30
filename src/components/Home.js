
// export default Home;
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth'; // Ensure the correct path to useAuth
import Navbar from './Navbar';

const Home = () => {
  const { user } = useAuth(); // Get user from useAuth hook
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {user ? (
          user.role === "admin" ? (
            <div className='Admin'>
              {/* <h1>Welcome admin {user.name}</h1> */}
              </div>
          ) : (
            <h1>Welcome User! {user.name}</h1>
          )
        ) : (
          <h1>Loading...</h1> // Show a loading state if the user is not yet available
        )}
      </div>
    </div>
  );
};

export default Home;

