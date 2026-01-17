import { Session } from '../types/session.types';
import { delay } from './api';

const MOCK_SESSIONS: Session[] = [
    {
        id: '1',
        teacher: {
            id: '2',
            firstName: 'Sarah',
            lastName: 'Miller',
            email: 'sarah@example.com',
            rating: 4.9,
            level: 4,
            tokens: 200,
            skillsTeach: [],
            skillsLearn: [],
            createdAt: new Date(),
            isOnline: true
        },
        student: {
            id: '1',
            firstName: 'Alex',
            lastName: 'Johnson',
            email: 'alex@example.com',
            rating: 4.8,
            level: 5,
            tokens: 120,
            skillsTeach: [],
            skillsLearn: [],
            createdAt: new Date(),
            isOnline: true
        },
        skill: { id: '1', name: 'React Patterns', category: 'Development', level: 'expert' },
        scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
        duration: 60,
        status: 'confirmed',
        tokensAmount: 1,
        meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
        id: '2',
        teacher: {
            id: '3',
            firstName: 'Mike',
            lastName: 'Ross',
            email: 'mike@example.com',
            rating: 4.5,
            level: 3,
            tokens: 50,
            skillsTeach: [],
            skillsLearn: [],
            createdAt: new Date(),
            isOnline: false
        },
        student: { // Current user as student
            id: '1',
            firstName: 'Alex',
            lastName: 'Johnson',
            email: 'alex@example.com',
            rating: 4.8,
            level: 5,
            tokens: 120,
            skillsTeach: [],
            skillsLearn: [],
            createdAt: new Date(),
            isOnline: true
        },
        skill: { id: '3', name: 'Python Basics', category: 'Development', level: 'beginner' },
        scheduledAt: new Date(Date.now() - 86400000), // Yesterday
        duration: 45,
        status: 'completed',
        tokensAmount: 1
    }
];

export const sessionService = {
    getSessions: async (): Promise<Session[]> => {
        await delay(800);
        return MOCK_SESSIONS;
    },

    bookSession: async (sessionId: string): Promise<void> => {
        await delay(1000);
        console.log(`Booked session ${sessionId}`);
    },

    cancelSession: async (sessionId: string): Promise<void> => {
        await delay(1000);
        console.log(`Cancelled session ${sessionId}`);
    }
};
