import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import './styles.css';

import ChatMessageUnit from '../../components/chatMessageUnit';
import ChatInput from '../../components/chatInput';

const ENDPOINT = 'http://127.0.0.1:5000';

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { message: 'asdfasfasfasdf', from: 'server' },
    { message: 'asdfasfasfasdf', from: 'client' },
  ]);
  const [socket, setSocket] = useState(null);

  const handleMessageReceived = (data) => {
    const message = `Para COP ${data.conversionData.value}, la conversion es: USD ${data.conversionData.conversion}`;
    setMessages((prevMessages) => [
      ...prevMessages,
      { message, from: 'server' },
    ]);
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('REQUEST_MESSAGE_RESPONSE', handleMessageReceived);

    setSocket(socket);
  }, []);

  const mapMessageUnits = () =>
    messages.map((message, idx) => <ChatMessageUnit key={idx} {...message} />);

  const handleMessageSent = (message) => {
    socket.emit('REQUEST_MESSAGE', { currency: 'COP', value: message });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message, from: 'client' },
    ]);
  };

  return (
    <div className="main">
      <div className="chat_messages">{mapMessageUnits()}</div>
      <div className="chat_input">
        <ChatInput onMessageSent={handleMessageSent} />
      </div>
    </div>
  );
};

export default ChatRoom;
