import { create } from 'zustand';
import { AnalyticsData } from '../types/analytics.types';
import { analyticsService } from '../services/analyticsService';

interface AnalyticsState {
    data: AnalyticsData | null;
    isLoading: boolean;
    error: string | null;
    fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    data: null,
    isLoading: false,
    error: null,

    fetchAnalytics: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await analyticsService.getAnalyticsData();
            set({ data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch analytics data' });
        }
    }
}));
