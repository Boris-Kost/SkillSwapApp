import { Transaction } from '../types/token.types';
import { delay } from './api';

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        type: 'earned',
        amount: 50,
        description: 'Taught React Patterns',
        date: new Date(Date.now() - 86400000), // Yesterday
        relatedUser: {
            id: '2',
            name: 'Sarah Miller',
            avatar: 'https://i.pravatar.cc/150?u=sarah'
        }
    },
    {
        id: '2',
        type: 'spent',
        amount: 30,
        description: 'Learned Python Basics',
        date: new Date(Date.now() - 172800000), // 2 days ago
        relatedUser: {
            id: '3',
            name: 'Mike Ross',
            avatar: 'https://i.pravatar.cc/150?u=mike'
        }
    },
    {
        id: '3',
        type: 'purchased',
        amount: 100,
        description: 'Bought Token Pack',
        date: new Date(Date.now() - 604800000), // 1 week ago
    }
];

export const walletService = {
    getBalance: async (): Promise<number> => {
        await delay(500);
        return 120; // Mock balance matching mock user
    },

    getTransactions: async (): Promise<Transaction[]> => {
        await delay(800);
        return MOCK_TRANSACTIONS;
    }
};
