import React, { useState, useEffect } from 'react';
import { NavbarNotLoginComponent } from './NavbarNotLoginComponent';
import { NavbarComponent } from './NavbarComponent';
import secureLocalStorage from "react-secure-storage";

// Function to store login state
const storeLoginState = (state) => {
  secureLocalStorage.setItem('isLoggedIn', state);
};

// Function to get login state
const getLoginState = () => {
  return secureLocalStorage.getItem('isLoggedIn') === 'true';
};

const ParentComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getLoginState);

  useEffect(() => {
    const storedLoginState = getLoginState();
    console.log('Retrieved login state on mount:', storedLoginState);
    setIsLoggedIn(storedLoginState);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    storeLoginState('true');
    console.log('Login successful, updated login state:', true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    storeLoginState('false');
    console.log('Logout successful, updated login state:', false);
  };

  return (
    <>
      {isLoggedIn ? (
        <NavbarComponent onLogout={handleLogout} />
      ) : (
        <NavbarNotLoginComponent onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default ParentComponent;
