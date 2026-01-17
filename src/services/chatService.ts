import { Conversation, Message } from '../types/chat.types';
import { delay } from './api';

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: '1',
        participant: {
            id: '2',
            name: 'Sarah Miller',
            avatar: 'https://i.pravatar.cc/150?u=sarah',
            isOnline: true
        },
        lastMessage: {
            content: 'Sure! Let\'s schedule the session for tomorrow.',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            isRead: false
        },
        unreadCount: 1
    },
    {
        id: '2',
        participant: {
            id: '3',
            name: 'Mike Ross',
            avatar: 'https://i.pravatar.cc/150?u=mike',
            isOnline: false
        },
        lastMessage: {
            content: 'Thanks for the help with Python!',
            timestamp: new Date(Date.now() - 86400000), // Yesterday
            isRead: true
        },
        unreadCount: 0
    }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    '1': [
        {
            id: '1',
            senderId: '1', // Current user
            content: 'Hi Sarah, are you available for a React mentoring session?',
            timestamp: new Date(Date.now() - 7200000),
            isRead: true
        },
        {
            id: '2',
            senderId: '2', // Sarah
            content: 'Hello! Yes, I have some free slots this week.',
            timestamp: new Date(Date.now() - 7100000),
            isRead: true
        },
        {
            id: '3',
            senderId: '1',
            content: 'Great, how about tomorrow at 2 PM?',
            timestamp: new Date(Date.now() - 3700000),
            isRead: true
        },
        {
            id: '4',
            senderId: '2',
            content: 'Sure! Let\'s schedule the session for tomorrow.',
            timestamp: new Date(Date.now() - 3600000),
            isRead: false
        }
    ],
    '2': [
        {
            id: '1',
            senderId: '1',
            content: 'How is your Python learning going?',
            timestamp: new Date(Date.now() - 90000000),
            isRead: true
        },
        {
            id: '2',
            senderId: '3',
            content: 'It goest really well. I understood the basics now.',
            timestamp: new Date(Date.now() - 89000000),
            isRead: true
        },
        {
            id: '3',
            senderId: '3',
            content: 'Thanks for the help with Python!',
            timestamp: new Date(Date.now() - 86400000),
            isRead: true
        }
    ]
};

export const chatService = {
    getConversations: async (): Promise<Conversation[]> => {
        await delay(600);
        return MOCK_CONVERSATIONS;
    },

    getMessages: async (conversationId: string): Promise<Message[]> => {
        await delay(400);
        return MOCK_MESSAGES[conversationId] || [];
    },

    sendMessage: async (_conversationId: string, content: string): Promise<Message> => {
        await delay(300);
        return {
            id: Date.now().toString(),
            senderId: '1', // Mock current user ID
            content,
            timestamp: new Date(),
            isRead: false
        };
    }
};
