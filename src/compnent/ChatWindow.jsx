import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../compnent/ChatContext';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import '../../css/ChatWindow.css';

const ChatWindow = ({ otherUserId, otherUserName, onClose }) => {
    const { createChat, activeChat, messages, sendMessage } = useChat();
    const { currentUser } = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState('');
    const [isInitializing, setIsInitializing] = useState(true);
    const [chatId, setChatId] = useState(null);
    const messagesEndRef = useRef(null);

    // // Initialize chat when component mounts
    // useEffect(() => {
    //     const initChat = async () => {
    //         if (otherUserId && currentUser) {
    //             try {
    //                 setIsInitializing(true);
    //                 const result = await createChat(otherUserId, otherUserName);
                    
    //                 if (result.success) {
    //                     setChatId(result.chatId);
    //                     // Wait a bit to ensure all state updates have propagated
    //                     setTimeout(() => {
    //                         setIsInitializing(false);
    //                     }, 500);
    //                 } else {
    //                     console.error("Failed to create chat:", result.error);
    //                     setIsInitializing(false);
    //                 }
    //             } catch (error) {
    //                 console.error("Error initializing chat:", error);
    //                 setIsInitializing(false);
    //             }
    //         } else {
    //             setIsInitializing(false);
    //         }
    //     };

    //     initChat();
    // }, [otherUserId, otherUserName, currentUser, createChat]);


    // In ChatWindow.jsx, modify the initialization useEffect:

// First, add a ref to track if initialization has been done
const initDoneRef = useRef(false);

useEffect(() => {
    const initChat = async () => {
        // Only run initialization if it hasn't been done already
        if (!initDoneRef.current && otherUserId && currentUser) {
            try {
                setIsInitializing(true);
                const result = await createChat(otherUserId, otherUserName);
                
                if (result.success) {
                    setChatId(result.chatId);
                    // Short timeout to ensure state updates
                    setTimeout(() => {
                        setIsInitializing(false);
                        // Mark initialization as done
                        initDoneRef.current = true;
                    }, 500);
                } else {
                    console.error("Failed to create chat:", result.error);
                    setIsInitializing(false);
                }
            } catch (error) {
                console.error("Error initializing chat:", error);
                setIsInitializing(false);
            }
        } else if (initDoneRef.current) {
            // If already initialized, just make sure we're not in loading state
            setIsInitializing(false);
        }
    };

    initChat();
    
    // Return cleanup function to reset the ref when component unmounts
    return () => {
        initDoneRef.current = false;
    };
}, [otherUserId, otherUserName, currentUser]); // Remove createChat from dependencies


    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    // Show loading state during initialization
    if (isInitializing) {
        return <div className="chat-loading">Initializing chat...please reload page if chat not appear</div>;
    }

    // Show error if no chat could be created
    if (!chatId || !activeChat) {
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
