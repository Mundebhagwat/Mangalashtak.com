import React, { useState } from 'react';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useChat } from '../compnent/ChatContext'; // Update the path as needed
import ChatWindow from '../compnent/ChatWindow'; // Update the path as needed

const ProfileChatButton = ({ userId, userName, buttonProps }) => {
  const [showChat, setShowChat] = useState(false);
  const { createChat } = useChat();
  
  const handleStartChat = async () => {
    await createChat(userId, userName);
    setShowChat(true);
  };

  return (
    <>
      <Button
        onClick={handleStartChat}
        {...buttonProps}
      >
        Message
      </Button>
      
      <Dialog 
        open={showChat} 
        onClose={() => setShowChat(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            position: 'fixed',
            bottom: 20,
            right: 20,
            m: 0,
            height: 'auto',
            maxHeight: '80vh',
            width: { xs: '90vw', sm: 400 },
          }
        }}
      >
        <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
          <ChatWindow 
            otherUserId={userId} 
            otherUserName={userName}
            onClose={() => setShowChat(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileChatButton;