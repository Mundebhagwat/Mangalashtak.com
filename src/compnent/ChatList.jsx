import React from 'react';
import { useChat } from '../compnent/ChatContext';
import AuthContext from "../context/AuthContext";
import { useContext } from 'react';
import '../../css/ChatList.css';

export const ChatList = () => {
  const { chats, activeChat, setActiveChat, loading } = useChat();
  const { currentUser } = useContext(AuthContext); // ✅ Correct usage

  if (loading) {
    return <div className="chat-list-loading">Loading your conversations...</div>;
  }
  
  if (chats.length === 0) {
    return <div className="no-chats">No conversations yet</div>;
  }
  
  return (
    <div className="chat-list">
      <h3>Your Conversations</h3>
      {chats.map(chat => {
        // 🔥 Fix: Use `_id` instead of `uid`
        const otherParticipantId = chat.participants.find(id => id !== currentUser._id);
        const otherParticipantName = chat.participantNames?.[otherParticipantId] || 'User';
        
        return (
          <div 
            key={chat.id}
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => setActiveChat(chat.id)}
          >
            <div className="chat-item-avatar">
              {otherParticipantName.charAt(0).toUpperCase()}
            </div>
            <div className="chat-item-details">
              <h4>{otherParticipantName}</h4>
              <p>{chat.lastMessage || 'Start a conversation'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

