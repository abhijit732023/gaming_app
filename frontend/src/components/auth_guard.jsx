import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../FilesPaths/allpath';

const AuthGuard = ({ children }) => {
  const { user } = useAuth(); // Get user from authentication context
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(''); // State to manage warning message
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      setWarning('Please log in first.');
      const timer = setTimeout(() => {
        navigate('/login'); // Redirect to login if user is not found
      }, 3000); // Redirect after 3 seconds
      
      return () => clearTimeout(timer); // Clean up timeout
    } else {
      setLoading(false); // Stop loading when user is found
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className='w-full h-screen bg-gray-900 flex items-center justify-center'>
        <p className='text-white text-xl'>{warning || 'Checking authentication...'}</p>
      </div>
    );
  }

  return children; // Render the protected page if user is authenticated
};

export default AuthGuard;