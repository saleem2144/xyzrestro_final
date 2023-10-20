import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({isAuthenticated: false});

  const login = (userData) => {
    setUser({ ...user, isAuthenticated: true, ...userData });
  };

  const logout = () => {
    setUser({isAuthenticated: false });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
