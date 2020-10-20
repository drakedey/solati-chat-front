import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';

import './styles.css';

import { UserContext } from '../../providers/User';

import ChatMessageUnit from '../../components/chatMessageUnit';
import ChatInput from '../../components/chatInput';
import ChatHeader from '../../components/chatHeader';
import AuthenticationModal from '../../components/authenticationModal';

const ENDPOINT = 'http://127.0.0.1:5000';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { data } = useContext(UserContext);

  useEffect(() => {
    setMessages([]);
    if (Boolean(data.token)) {
      const socket = socketIOClient(ENDPOINT);
      socket.on('REQUEST_MESSAGE_RESPONSE', handleMessageReceived);
      setSocket(socket);
    } else if (socket && !Boolean(data.token)) {
      socket.close();
    }
  }, [data.token]);

  const handleMessageReceived = (data) => {
    const message = `Para COP ${data.conversionData.value}, la conversion es: USD ${data.conversionData.conversion}`;
    setMessages((prevMessages) => [
      ...prevMessages,
      { message, from: 'server' },
    ]);
  };

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
      <div className="chat_header">
        <ChatHeader />
      </div>
      <div className="chat_messages">{mapMessageUnits()}</div>
      <div className="chat_input">
        <ChatInput onMessageSent={handleMessageSent} />
      </div>
      <AuthenticationModal />
    </div>
  );
};

export default ChatRoom;
