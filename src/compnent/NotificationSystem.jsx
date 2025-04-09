import React, { useState } from 'react';
import { Container, Typography, Box, Chip, Button, Divider, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, X, ChevronLeft, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext'; // Import the hook

const NotificationSystem = () => {
  const [filter, setFilter] = useState('all'); // all, unread, read
  const navigate = useNavigate();
  
  // Get data from context
  const { notifications, markNotificationAsRead, navigateToProfile, removeNotification } = useNotifications();
  
  // Use useMemo for filtered notifications
  const filteredNotifications = React.useMemo(() => {
    let result = [...notifications];
    
    // Apply filter
    if (filter === 'unread') {
      result = result.filter(notification => !notification.read);
    } else if (filter === 'read') {
      result = result.filter(notification => notification.read);
    }
    
    return result;
  }, [notifications, filter]);

  // Format time for display
  const formatTime = (date) => {
    const now = new Date();
    const messageDate = date instanceof Date ? date : new Date(date);
    const diffInHours = Math.floor((now - messageDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));
      return diffInMinutes <= 0 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Navigate first
    navigateToProfile(notification.senderId);

    // Delay removal/closing to avoid interrupting the navigation
    setTimeout(() => {
      markNotificationAsRead(notification.id);
    }, 200); // Just enough delay to allow navigation to work
  };

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Rest of your component remains the same
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with back button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            onClick={handleGoBack}
            sx={{ 
              mr: 2, 
              backgroundColor: 'rgba(0,0,0,0.05)', 
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } 
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h4" fontWeight="bold" sx={{ 
            background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Bell size={32} className="mr-2" style={{ marginRight: '12px', stroke: '#3a7bd5' }} />
            Notifications Center
          </Typography>
        </Box>

        {/* Filter Bar - Search bar removed */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mb: 3,
          gap: 2
        }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
            <Chip 
              icon={<Bell size={16} />} 
              label="All" 
              onClick={() => setFilter('all')}
              color={filter === 'all' ? 'primary' : 'default'}
              sx={{ 
                fontWeight: filter === 'all' ? 'bold' : 'normal',
                '&.MuiChip-colorPrimary': {
                  background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                }
              }}
            />
            <Chip 
              icon={<AlertTriangle size={16} />} 
              label="Unread" 
              onClick={() => setFilter('unread')}
              color={filter === 'unread' ? 'primary' : 'default'}
              sx={{ 
                fontWeight: filter === 'unread' ? 'bold' : 'normal',
                '&.MuiChip-colorPrimary': {
                  background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                }
              }}
            />
            <Chip 
              icon={<CheckCircle size={16} />} 
              label="Read" 
              onClick={() => setFilter('read')}
              color={filter === 'read' ? 'primary' : 'default'}
              sx={{ 
                fontWeight: filter === 'read' ? 'bold' : 'normal',
                '&.MuiChip-colorPrimary': {
                  background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                }
              }}
            />
          </Box>
        </Box>

        {/* Notification Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 3,
          bgcolor: 'rgba(0,0,0,0.02)',
          p: 2,
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Notifications
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {notifications.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Unread
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#3a7bd5' }}>
              {notifications.filter(n => !n.read).length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button 
              startIcon={<CheckCircle size={16} />}
              onClick={handleMarkAllAsRead}
              disabled={notifications.filter(n => !n.read).length === 0}
              sx={{ 
                background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                color: 'white',
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(58, 123, 213, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(58, 123, 213, 0.4)',
                },
                '&:disabled': {
                  background: '#e0e0e0',
                  color: '#a0a0a0'
                }
              }}
            >
              Mark All as Read
            </Button>
          </Box>
        </Box>

        {/* Notifications List */}
        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: 4, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      display: 'flex',
                      alignItems: 'flex-start',
                      borderLeft: notification.read ? 'none' : '4px solid #3a7bd5',
                      bgcolor: notification.read ? 'transparent' : 'rgba(58, 123, 213, 0.04)',
                      position: 'relative',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.02)'
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {/* User Profile Image */}
                    <Box sx={{ mr: 2, position: 'relative' }}>
                      {notification.senderPhotoURL ? (
                        <Box sx={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: '50%',
                          overflow: 'hidden',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          border: '2px solid white'
                        }}>
                          <img 
                            src={notification.senderPhotoURL} 
                            alt={notification.senderName || 'User'} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(58, 123, 213, 0.3)',
                          border: '2px solid white'
                        }}>
                          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {(notification.senderName || 'U').charAt(0).toUpperCase()}
                          </Typography>
                        </Box>
                      )}
                      {!notification.read && (
                        <Box sx={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          right: 0, 
                          width: 14, 
                          height: 14, 
                          borderRadius: '50%', 
                          bgcolor: '#ff4757',
                          border: '2px solid white',
                          animation: 'pulse 2s infinite'
                        }} />
                      )}
                    </Box>

                    {/* Notification Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                          {notification.senderName || 'User'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            size="small"
                            icon={<Clock size={12} />}
                            label={formatTime(notification.timestamp)}
                            sx={{ 
                              height: 24, 
                              fontSize: '0.75rem',
                              bgcolor: 'rgba(0,0,0,0.05)',
                              '& .MuiChip-icon': { fontSize: '0.75rem' }
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: 0.5, 
                          color: notification.read ? 'text.secondary' : 'text.primary',
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: notification.read ? 'normal' : 500
                        }}
                      >
                        {notification.type === 'message' && (
                          <MessageSquare size={16} style={{ marginRight: 8, flexShrink: 0 }} />
                        )}
                        {notification.content || 'New notification'}
                      </Typography>
                      
                      {/* Modified: Reply button now redirects to profile */}
                      {notification.type === 'message' && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToProfile(notification.senderId);
                          }}
                          sx={{ 
                            mt: 1.5, 
                            borderRadius: 20,
                            textTransform: 'none',
                            borderColor: '#3a7bd5',
                            color: '#3a7bd5',
                            '&:hover': {
                              borderColor: '#3a7bd5',
                              bgcolor: 'rgba(58, 123, 213, 0.04)',
                            }
                          }}
                        >
                          Profile
                        </Button>
                      )}
                    </Box>

                    {/* Dismiss button */}
                    <IconButton 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      sx={{ ml: 1, bgcolor: 'rgba(0,0,0,0.03)', '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' } }}
                    >
                      <X size={16} />
                    </IconButton>
                  </Box>
                  {index < filteredNotifications.length - 1 && <Divider />}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3 }}>
                  <Bell size={64} style={{ color: '#d1d1d1', marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary', fontWeight: 'medium' }}>
                    No notifications found
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    {filter !== 'all' 
                      ? `You don't have any ${filter} notifications at the moment` 
                      : "You're all caught up! We'll notify you when something happens"}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* CSS for animations */}
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(255, 71, 87, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
          }
        `}</style>
      </motion.div>
    </Container>
  );
};

// Ensure this component has access to the missing MessageSquare icon
const MessageSquare = ({ size, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default NotificationSystem;