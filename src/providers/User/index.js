import React, { createContext, useState } from 'react';

const UserContext = createContext();

const initialState = { token: localStorage.getItem('token'), data: JSON.parse(localStorage.getItem('data')) };

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('data', JSON.stringify({ username: data.username }));
    setUser({ token: data.token, data: { username: data.username } });
  }

  const logout = () => {
    localStorage.clear()
    setUser(initialState);
  }

  return (
    <UserContext.Provider value={{ data: user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider }
