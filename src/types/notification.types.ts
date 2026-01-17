export type NotificationType = 'message' | 'session_invite' | 'session_update' | 'achievement' | 'system';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    createdAt: Date;
    isRead: boolean;
    data?: any; // For linking to specific resources (e.g., sessionId)
}
