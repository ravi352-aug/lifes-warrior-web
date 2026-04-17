'use client';

import { useState, useEffect, useCallback } from 'react';
import { Notification } from '@/lib/utils/requestTypes';
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  deleteNotification,
} from '@/lib/utils/requestService';

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications on mount and when userId changes
  useEffect(() => {
    if (!userId) return;

    const loadNotifications = () => {
      const userNotifs = getUserNotifications(userId);
      setNotifications(userNotifs);
      setUnreadCount(getUnreadNotificationCount(userId));
    };

    loadNotifications();

    // Poll for new notifications every 3 seconds
    const interval = setInterval(loadNotifications, 3000);

    return () => clearInterval(interval);
  }, [userId]);

  const markAsRead = useCallback(
    (notificationId: string) => {
      markNotificationAsRead(notificationId);
      if (userId) {
        const userNotifs = getUserNotifications(userId);
        setNotifications(userNotifs);
        setUnreadCount(getUnreadNotificationCount(userId));
      }
    },
    [userId]
  );

  const remove = useCallback(
    (notificationId: string) => {
      deleteNotification(notificationId);
      if (userId) {
        const userNotifs = getUserNotifications(userId);
        setNotifications(userNotifs);
        setUnreadCount(getUnreadNotificationCount(userId));
      }
    },
    [userId]
  );

  const clearAll = useCallback(() => {
    notifications.forEach((n) => deleteNotification(n.id));
    setNotifications([]);
    setUnreadCount(0);
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    remove,
    clearAll,
  };
}
