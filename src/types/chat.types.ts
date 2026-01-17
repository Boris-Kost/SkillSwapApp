export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
}

export interface Conversation {
    id: string;
    participant: {
        id: string;
        name: string;
        avatar?: string;
        isOnline: boolean;
    };
    lastMessage?: {
        content: string;
        timestamp: Date;
        isRead: boolean;
    };
    unreadCount: number;
}
