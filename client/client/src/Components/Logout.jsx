import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the JWT token from storage
    localStorage.removeItem('token'); // or sessionStorage if you're using that

    // Optionally clear other user-related info
    localStorage.removeItem('user');

    // Redirect to login or landing page
    navigate('/');
  }, [navigate]);

  return null; // or a loader/spinner if you want
};

export default Logout;
