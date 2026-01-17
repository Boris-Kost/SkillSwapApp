import { create } from 'zustand';
import { Notification } from '../types/notification.types';
import { notificationService } from '../services/notificationService';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    error: string | null;
    fetchNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const notifications = await notificationService.getNotifications();
            const unreadCount = notifications.filter(n => !n.isRead).length;
            set({ notifications, unreadCount, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch notifications' });
        }
    },

    markAsRead: async (id) => {
        // Optimistic update
        const { notifications } = get();
        const updatedNotifications = notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        );
        const unreadCount = updatedNotifications.filter(n => !n.isRead).length;

        set({ notifications: updatedNotifications, unreadCount });

        try {
            await notificationService.markAsRead(id);
        } catch (error) {
            // Revert on failure (omitted for simplicity in mock)
            console.error('Failed to mark notification as read');
        }
    },

    markAllAsRead: async () => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));

        set({ notifications: updatedNotifications, unreadCount: 0 });

        try {
            await notificationService.markAllAsRead();
        } catch (error) {
            console.error('Failed to mark all as read');
        }
    }
}));
