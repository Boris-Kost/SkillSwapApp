import { create } from 'zustand';
import { Achievement, Level, LeaderboardEntry } from '../types/gamification.types';
import { gamificationService } from '../services/gamificationService';

interface GamificationState {
    level: Level | null;
    achievements: Achievement[];
    leaderboard: LeaderboardEntry[];
    isLoading: boolean;
    error: string | null;
    fetchGamificationData: () => Promise<void>;
}

export const useGamificationStore = create<GamificationState>((set) => ({
    level: null,
    achievements: [],
    leaderboard: [],
    isLoading: false,
    error: null,

    fetchGamificationData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [level, achievements, leaderboard] = await Promise.all([
                gamificationService.getLevelData(),
                gamificationService.getAchievements(),
                gamificationService.getLeaderboard()
            ]);
            set({ level, achievements, leaderboard, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch gamification data' });
        }
    }
}));
