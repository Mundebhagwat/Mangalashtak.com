import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedNotificationBadge = ({ count = 0 }) => {
  const [animated, setAnimated] = useState(false);
  const [prevCount, setPrevCount] = useState(count);
  const navigate = useNavigate();

  // Trigger animation when count increases
  useEffect(() => {
    if (count > prevCount) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 2000);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  const handleClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <button 
        className={`relative p-2 rounded-full transition-all duration-300 hover:bg-white/10 focus:outline-none ${animated ? 'animate-wobble' : ''}`}
        aria-label="Notifications"
      >
        <Bell 
          className={`w-6 h-6 ${count > 0 ? 'text-white' : 'text-gray-300'} transition-all duration-300`} 
        />
      </button>
      
      {count > 0 && (
        <div className="notification-badge-container absolute -top-1 -right-1">
          <span className="flex h-5 w-5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative flex rounded-full h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white items-center justify-center font-bold shadow-glow">
              {count > 99 ? '99+' : count}
            </span>
          </span>
        </div>
      )}

      <style>{`
        @keyframes wobble {
          0% { transform: scale(1); }
          10% { transform: scale(1.1) rotate(-5deg); }
          20% { transform: scale(1.2) rotate(5deg); }
          30% { transform: scale(1.1) rotate(-3deg); }
          40% { transform: scale(1.1) rotate(2deg); }
          50% { transform: scale(1.1) rotate(0deg); }
          100% { transform: scale(1); }
        }
        
        .animate-wobble {
          animation: wobble 0.8s ease-in-out;
        }
        
        .shadow-glow {
          box-shadow: 0 0 10px rgba(255, 82, 82, 0.7);
        }
      `}</style>
    </div>
  );
};

export default EnhancedNotificationBadge;