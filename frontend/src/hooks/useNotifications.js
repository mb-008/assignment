import { useState, useEffect, useCallback } from 'react';
import {notificationService} from "../services/Api"

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = useCallback(async (pageToFetch = 1) => {

    
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching notifications for page ${pageToFetch}`);
      const result = await notificationService.getNotifications(userId = '67f327b2495c2f1f6f0bd4f5', pageToFetch);
      
      if (pageToFetch === 1) {
        // Replace notifications for first page
        setNotifications(result.data);
      } else {
        // Append new notifications for subsequent pages
        setNotifications(prev => [...prev, ...result.data]);
      }
      
      // Update pagination state
      setHasMore(result.pagination.hasMore);
      setTotalPages(result.pagination.pages);
      console.log(`Has more: ${result.pagination.hasMore}, Total pages: ${result.pagination.pages}`);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [userId = "67f32758495c2f1f6f0bd4f3"]);

  // Initial load
  useEffect(() => {
    setPage(1);
    fetchNotifications(1);
  }, [userId = '67f327b2495c2f1f6f0bd4f5', fetchNotifications]);

  // Function to load more notifications
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    const nextPage = page + 1;
    console.log(`Loading more: page ${nextPage}`);
    setPage(nextPage);
    fetchNotifications(nextPage);
  }, [loading, hasMore, page, fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    hasMore,
    totalPages,
    currentPage: page,
    loadMore,
    refresh: () => {
      setPage(1);
      fetchNotifications(1);
    },
    markAsRead: async (notificationId) => {
      try {
        await notificationService.markAsRead(notificationId);
        setNotifications(prev => 
          prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
        );
      } catch (err) {
        console.error('Error marking notification as read:', err);
      }
    },
    markAllAsRead: async () => {
      try {
        await notificationService.markAllAsRead(userId ='67f327b2495c2f1f6f0bd4f5');
        setNotifications(prev => 
          prev.map(n => ({ ...n, read: true }))
        );
      } catch (err) {
        console.error('Error marking all notifications as read:', err);
      }
    }
  };
};

export default useNotifications;