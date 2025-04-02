import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../compnent/ChatContext';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import '../../css/ChatWindow.css';

const ChatWindow = ({ otherUserId, otherUserName, onClose }) => {
    const { createChat, activeChat, messages, sendMessage } = useChat();
    const { currentUser } = useContext(AuthContext); // Fix: use user instead of currentUser if that's how your AuthContext is structured
    const [newMessage, setNewMessage] = useState('');
    const [isInitializing, setIsInitializing] = useState(true);
    const [chatId, setChatId] = useState(null);
    const messagesEndRef = useRef(null);

    // console.log("ChatWindow rendered with:", { 
    //     otherUserId, 
    //     otherUserName, 
    //     activeChat,
    //     messagesCount: messages?.length,
    //     currentUser: currentUser?._id
    // });

    // // Initialize chat when component mounts
    // useEffect(() => {
    //     const initChat = async () => {
    //         // console.log("Initializing chat with:", otherUserId, otherUserName);
    //         if (otherUserId && currentUser) {
    //             try {
    //                 setIsInitializing(true);
    //                 const createdChatId = await createChat(otherUserId, otherUserName);
    //                 // console.log("Chat created/found with ID:", createdChatId);
    //                 setChatId(createdChatId);
    //             } catch (error) {
    //                 console.error("Error initializing chat:", error);
    //             } finally {
    //                 setIsInitializing(false);
    //             }
    //         }
    //     };

    //     initChat();
    // }, [otherUserId, otherUserName, currentUser, createChat]); // Fixed dependency array


  // Inside your ChatWindow component, modify the useEffect for initialization:

useEffect(() => {
    const initChat = async () => {
        if (otherUserId && currentUser) {
            try {
                setIsInitializing(true);
                const createdChatId = await createChat(otherUserId, otherUserName);
                setChatId(createdChatId);
                
                // Add a small delay to ensure state updates properly
                setTimeout(() => {
                    setIsInitializing(false);
                }, 500);
            } catch (error) {
                console.error("Error initializing chat:", error);
                setIsInitializing(false);
            }
        } else {
            // Make sure we're not stuck in initializing if there's missing data
            setIsInitializing(false);
        }
    };

    initChat();
}, [otherUserId, otherUserName, currentUser, createChat]);




    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            // console.log("Attempting to send message:", newMessage);
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    // Show loading state during initialization
    if (isInitializing) {
        return <div className="chat-loading">Initializing chat...</div>;
    }

// Replace this check
if (!isInitializing && (!activeChat || !chatId)) {
    return <div className="chat-error">
        <p>Couldn't load the chat. Please try again.</p>
        <button onClick={onClose}>Close</button>
    </div>;
}

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>{otherUserName}</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="no-messages">No messages yet. Start the conversation!</div>
                ) : (
                    messages.map(message => {
                        // console.log("Rendering message:", message);
                        return (
                            <div
                                key={message.id}
                                className={`message ${message.senderId === currentUser._id ? 'sent' : 'received'}`}
                            >
                                <div className="message-bubble">
                                    <p>{message.text}</p>
                                    <span className="message-time">
                                        {message.createdAt?.seconds 
                                            ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                            : 'Sending...'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;

