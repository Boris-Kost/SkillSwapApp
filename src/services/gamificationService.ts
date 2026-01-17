import { Achievement, Level, LeaderboardEntry } from '../types/gamification.types';
import { delay } from './api';

const MOCK_LEVEL: Level = {
    currentLevel: 5,
    currentXP: 1250,
    nextLevelXP: 2000,
    progressPercentage: 62.5
};

const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: '1',
        name: 'First Steps',
        description: 'Complete your first session',
        icon: 'footprints',
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 10000000)
    },
    {
        id: '2',
        name: 'Mentor Master',
        description: 'Teach 10 sessions',
        icon: 'school',
        isUnlocked: false
    },
    {
        id: '3',
        name: 'Knowledge Seeker',
        description: 'Learn 5 new skills',
        icon: 'book-open',
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 5000000)
    }
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { id: '1', userId: '2', name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', level: 12, rank: 1, rating: 4.9 },
    { id: '2', userId: '1', name: 'Alex Johnson', level: 5, rank: 2, rating: 4.8 }, // Current user
    { id: '3', userId: '3', name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=mike', level: 3, rank: 3, rating: 4.5 }
];

export const gamificationService = {
    getLevelData: async (): Promise<Level> => {
        await delay(500);
        return MOCK_LEVEL;
    },

    getAchievements: async (): Promise<Achievement[]> => {
        await delay(600);
        return MOCK_ACHIEVEMENTS;
    },

    getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
        await delay(700);
        return MOCK_LEADERBOARD;
    }
};
