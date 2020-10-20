import React, { useState } from 'react';

import './styles.css'

const ChatInput = ({ onMessageSent }) => {
  const [message, setMessage] = useState('')

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setMessage('');
    // TODO: add validation
    onMessageSent(message)
  }

  return (
    <div className="input_container">
      <form onSubmit={handleSubmit}>
        <input className="input" type="number" min={0} onChange={handleMessageChange} value={message} placeholder="Enter colombian pesos to be converted" />
      </form>
    </div>
  )
}

export default ChatInput;
