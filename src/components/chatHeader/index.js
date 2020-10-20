import React, { useState, useContext } from 'react';
import { BiLogOut } from 'react-icons/all';

import { UserContext } from '../../providers/User';

import './styles.css';

const ChatHeader = () => {
  const { data, logout } = useContext(UserContext);

  const handleLogout = () => logout()

  return (
    <div className="header_container">
      <div className="header_menu">
        <div className="header_span">
          <span>Conversor de pesos a dolares</span>
        </div>
        {Boolean(data.token) && (
          <div className="user">
            <span>{data.data.username}</span>
            <div className="logout_icon" onClick={handleLogout}>
              <BiLogOut  />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
