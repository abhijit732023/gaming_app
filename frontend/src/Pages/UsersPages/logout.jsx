import React, { useState } from 'react';
import { useAuth } from './../../../ContextApi/contextapi';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false); // State for "Logging out..." message

  const handleLogout = () => {
    setLoggingOut(true); // Set loggingOut to true to display the message
    setTimeout(() => {
      logout(); // Call the logout function
      navigate('/login'); // Navigate to the login page
    }, 3000); // Wait for 3 seconds before navigating
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {loggingOut && <p>Logging out...</p>} {/* Display "Logging out..." message */}
    </div>
  );
}

export default Logout;