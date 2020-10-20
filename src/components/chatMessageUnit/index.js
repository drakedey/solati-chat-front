import React from 'react';

import './styles.css'

const ChatMessageUnit = ({ message, from }) => {
  return (
    <div className={ `chat_container ${from === 'client' ? 'client_message' : 'server_message'}` }>
      {message}
    </div>
  )
}

export default ChatMessageUnit;
