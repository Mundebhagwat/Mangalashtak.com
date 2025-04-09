import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../pages/firebase";
import { useAuth } from "../context/AuthContext";

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { currentUser, loading } = useAuth();

  // Memoize user ID to avoid effect re-running unnecessarily
  const userId = useMemo(() => currentUser?._id, [currentUser]);

  // Fetch notifications
  useEffect(() => {
    if (loading || !userId) {
      setNotifications([]); // Optional: clear when user logs out
      return;
    }

    const notificationsRef = collection(firestore, "notifications");
    const q = query(
      notificationsRef,
      where("recipientId", "==", userId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      }));
      setNotifications(notificationData);
    });

    return () => unsubscribe();
  }, [userId, loading]);

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const notificationRef = doc(firestore, "notifications", notificationId);
      await updateDoc(notificationRef, {
        read: true,
      });
    } catch (error) {
      console.error("❌ Error marking notification as read:", error);
    }
  };

  // Navigation handlers
  const navigateToChat = (userId) => {
    window.location.href = `/chat/${userId}`;
  };

  const navigateToProfile = (userId) => {
    window.location.href = `/profile/${userId}`;
  };

  // Remove a notification
  const removeNotification = async (id) => {
    if (!userId || !id) return;
    try {
      const notificationDocRef = doc(firestore, "notifications", id);
      await deleteDoc(notificationDocRef);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("❌ Firestore delete error:", error);
    }
  };

  // Don’t render children until auth finishes loading
  if (loading) return null;

  const value = {
    notifications,
    markNotificationAsRead,
    navigateToChat,
    navigateToProfile,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
