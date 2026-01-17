import { Notification } from '../types/notification.types';
import { delay } from './api';

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'session_invite',
        title: 'New Session Request',
        message: 'Sarah Miller wants to book a session: React Basics',
        createdAt: new Date(Date.now() - 300000), // 5 mins ago
        isRead: false,
        data: { sessionId: '1' }
    },
    {
        id: '2',
        type: 'achievement',
        title: 'Badge Unlocked!',
        message: 'You earned the "First Steps" badge.',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: false,
        data: { achievementId: '1' }
    },
    {
        id: '3',
        type: 'message',
        title: 'New Message',
        message: 'Mike Ross sent you a message.',
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true,
        data: { conversationId: '2' }
    }
];

export const notificationService = {
    getNotifications: async (): Promise<Notification[]> => {
        await delay(400);
        return MOCK_NOTIFICATIONS;
    },

    markAsRead: async (id: string): Promise<void> => {
        await delay(200);
        console.log(`Notification ${id} marked as read`);
    },

    markAllAsRead: async (): Promise<void> => {
        await delay(300);
        console.log('All notifications marked as read');
    }
};
