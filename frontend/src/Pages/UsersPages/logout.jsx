import React, { useState, useEffect } from 'react';
import { useAuth } from './../../../ContextApi/contextapi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const { logout, user } = useAuth();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true); // Track initial loading state
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user === null) {
      // Wait for the user state to update before making a decision
      const checkUser = setTimeout(() => {
        setLoading(false); // Stop loading when we confirm user is null
        navigate('/login'); // Redirect to login page
      }, 2000); // Give some time for the user state to update

      return () => clearTimeout(checkUser);
    } else {
      setLoading(false); // Stop loading if user is found
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true }); 
      setStatus(true);

      setTimeout(() => {
        logout();
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className='w-full h-screen bg-gray-900 p-4 flex items-center justify-center'>
        <p className='text-white text-xl'>Checking authentication...</p>
      </div>
    );
  }

  return user ? (
    <div className='w-full h-screen bg-gray-900 p-4 flex items-center justify-center'>
      <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
      {status && <p className='text-white ml-4'>Logging out...</p>} {/* Display "Logging out..." message */}
    </div>
  ) : (
    <div className='w-full h-screen bg-gray-900 p-4 flex items-center justify-center'>
      <p className='text-red-500 text-xl'>Not logged in. Redirecting to login page...</p>
    </div>
  );
}

export default Logout;