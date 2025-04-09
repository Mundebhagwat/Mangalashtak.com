import React, { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from '../pages/firebase';
import { collection, query, where, onSnapshot, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import {  getDoc, doc } from 'firebase/firestore';
import AuthContext from '../context/AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all chats where the current user is a participant
    useEffect(() => {
        if (!currentUser || !currentUser._id) return;

        const chatsRef = collection(firestore, 'chats');
        const userChatsQuery = query(
            chatsRef,
            where('participants', 'array-contains', currentUser._id)
        );

        const unsubscribe = onSnapshot(userChatsQuery, (snapshot) => {
            const chatList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setChats(chatList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    // Fetch messages for active chat
    useEffect(() => {
        if (!activeChat) {
            setMessages([]);
            return;
        }

        const messagesRef = collection(firestore, 'chats', activeChat, 'messages');
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messageList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messageList);
        });

        return () => unsubscribe();
    }, [activeChat]);

    // // Function to send a message
    // const sendMessage = async (text) => {
    //     if (!activeChat || !text.trim() || !currentUser) {
    //         console.error("❌ Error: Missing activeChat, text, or currentUser", {
    //             activeChat,
    //             text,
    //             currentUser,
    //         });
    //         return;
    //     }

    //     // Construct the message data
    //     const messageData = {
    //         text,
    //         senderId: currentUser._id || "Unknown_ID",
    //         senderName: currentUser.fullName || "Unknown",
    //         createdAt: serverTimestamp(),
    //     };

    //     try {
    //         const messagesRef = collection(firestore, 'chats', activeChat, 'messages');
    //         await addDoc(messagesRef, messageData);
    //     } catch (error) {
    //         console.error("❌ Error sending message:", error.message, error);
    //     }
    // };


    // Updated function to send a message with notification
const sendMessage = async (text) => {
    if (!activeChat || !text.trim() || !currentUser) {
        console.error("❌ Error: Missing activeChat, text, or currentUser", {
            activeChat,
            text,
            currentUser,
        });
        return;
    }

    // Construct the message data
    const messageData = {
        text,
        senderId: currentUser._id || "Unknown_ID",
        senderName: currentUser.fullName || "Unknown",
        createdAt: serverTimestamp(),
    };

    try {
        // First send the message as before
        const messagesRef = collection(firestore, 'chats', activeChat, 'messages');
        const messageDocRef = await addDoc(messagesRef, messageData);
        
        // Then create a notification
        // You need to get recipient information first
        const chatDoc = await getDoc(doc(firestore, 'chats', activeChat));
        if (chatDoc.exists()) {
            const chatData = chatDoc.data();
            // Find the recipient (the other user in the chat)
            const recipientId = chatData.participants.find(id => id !== currentUser._id);
            
            if (recipientId) {
                // Create notification data
                const notificationData = {
                    type: 'message',
                    senderId: currentUser._id || "Unknown_ID",
                    senderName: currentUser.fullName || "Unknown",
                    senderPhotoURL: currentUser.photoURL || null,
                    recipientId: recipientId,
                    content: text.length > 50 ? text.substring(0, 50) + '...' : text,
                    chatId: activeChat,
                    messageId: messageDocRef.id,
                    read: false,
                    timestamp: serverTimestamp(),
                };
                
                // Add notification to Firestore
                const notificationsRef = collection(firestore, 'notifications');
                await addDoc(notificationsRef, notificationData);
            }
        }
        
        return messageDocRef.id;
    } catch (error) {
        console.error("❌ Error sending message with notification:", error.message, error);
    }
};



    // Function to create a new chat with another user
    const createChat = async (otherUserId, otherUserName) => {
        if (!currentUser || !currentUser._id || !otherUserId) {
            return { success: false, chatId: null, error: "Missing user information" };
        }

        // Check if chat already exists
        const existingChat = chats.find(chat =>
            chat.participants?.includes(otherUserId) && chat.participants.length === 2
        );

        if (existingChat) {
            setActiveChat(existingChat.id);
            return { success: true, chatId: existingChat.id };
        }

        // Create new chat
        try {
            const chatsRef = collection(firestore, 'chats');
            const newChatRef = await addDoc(chatsRef, {
                participants: [currentUser._id, otherUserId],
                participantNames: {
                    [currentUser._id]: currentUser.fullName,
                    [otherUserId]: otherUserName
                },
                createdAt: serverTimestamp(),
                lastMessage: null,
                lastMessageTime: serverTimestamp()
            });

            setActiveChat(newChatRef.id);
            return { success: true, chatId: newChatRef.id };
        } catch (error) {
            console.error('Error creating chat:', error);
            return { success: false, chatId: null, error };
        }
    };

    const value = {
        chats,
        messages,
        activeChat,
        loading,
        setActiveChat,
        sendMessage,
        createChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);