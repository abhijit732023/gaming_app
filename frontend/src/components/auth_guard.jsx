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
      <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4 animate-bounce">
            {warning || 'Checking authentication...'}
          </h1>
          <p className="text-gray-300 text-lg">
            Redirecting you to the login page in a moment...
          </p>
        </div>
        <div className="mt-8">
          <div className="w-16 h-16 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return children; // Render the protected page if user is authenticated
};

export default AuthGuard;