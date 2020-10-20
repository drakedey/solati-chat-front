import React from 'react';

import ChatRoom from './container/chatroom';
import {UserProvider} from './providers/User';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ChatRoom />
      </UserProvider>
    </div>
  );
}

export default App;
