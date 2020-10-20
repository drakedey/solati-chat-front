import React, { createContext, useState } from 'react';

const UserContext = createContext();

const initialState = { token: localStorage.getItem('token'), data: localStorage.getItem('data') };

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (token) => {
    localStorage.setItem('token', token)
  }

}
