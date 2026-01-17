import { User } from '../types/user.types';
import { RegisterData } from '../types/auth.types';
import { delay } from './api';

const mockUser: User = {
    id: '1',
    email: 'alex@example.com',
    firstName: 'Alex',
    lastName: 'Johnson',
    rating: 4.8,
    level: 5,
    tokens: 120,
    skillsTeach: [
        { id: '1', name: 'React', category: 'Development', level: 'expert' },
        { id: '2', name: 'TypeScript', category: 'Development', level: 'intermediate' }
    ],
    skillsLearn: [
        { id: '3', name: 'UI Design', category: 'Design', level: 'beginner' }
    ],
    createdAt: new Date(),
    isOnline: true,
    university: 'MIT',
    bio: 'Passionate developer love to share knowledge.'
};

export const authService = {
    login: async (email: string, _password: string): Promise<User> => {
        await delay(1000);
        if (email === 'error@example.com') {
            throw new Error('Invalid credentials');
        }
        return mockUser;
    },

    register: async (data: RegisterData): Promise<User> => {
        await delay(1500);
        return {
            ...mockUser,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            university: data.university
        };
    },

    logout: async (): Promise<void> => {
        await delay(500);
    },

    updateProfile: async (data: Partial<User>): Promise<User> => {
        await delay(1000);
        return { ...mockUser, ...data };
    }
};
