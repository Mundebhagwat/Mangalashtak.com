// ChatPage.js - Main chat page that shows chat list and active conversation
import React, { useState } from 'react';
import {ChatProvider}  from '../compnent/ChatContext';
import {ChatList} from '../compnent/ChatList';
import ChatWindow from '../compnent/ChatWindow';
import '../../css/ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  
  return (
    <ChatProvider>
      <div className="chat-page">
        <div className="chat-container">
          <div className="chat-sidebar">
            <ChatList onSelectChat={setSelectedChat} />
          </div>
          <div className="chat-main">
            {selectedChat ? (
              <ChatWindow 
                otherUserId={selectedChat.otherUserId}
                otherUserName={selectedChat.otherUserName}
                onClose={() => setSelectedChat(null)}
              />
            ) : (
              <div className="no-chat-selected">
                <p>Select a conversation or start a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default ChatPage;