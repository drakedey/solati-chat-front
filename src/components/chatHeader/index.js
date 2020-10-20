import React, { useState } from 'react';

import './styles.css';
import { GiHamburgerMenu } from 'react-icons/all';

const ChatHeader = () => {
  const [dropDown, setDropdown] = useState(false);

  return (
    <div className="header_container">
      <div className="header_menu">
        <div className="header_span">
          <span>Conversor de pesos a dolares</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
