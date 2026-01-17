import { AnalyticsData } from '../types/analytics.types';
import { delay } from './api';

const MOCK_ANALYTICS: AnalyticsData = {
    stats: {
        totalEarnings: 340,
        hoursTaught: 12.5,
        sessionsCompleted: 15,
        studentRating: 4.8
    },
    earningsHistory: [
        { label: 'Mon', value: 20 },
        { label: 'Tue', value: 45 },
        { label: 'Wed', value: 30 },
        { label: 'Thu', value: 60 },
        { label: 'Fri', value: 40 },
        { label: 'Sat', value: 85 },
        { label: 'Sun', value: 60 }
    ],
    sessionsBySkill: [
        { label: 'React', value: 8, tooltip: '8 Sessions' },
        { label: 'TypeScript', value: 4, tooltip: '4 Sessions' },
        { label: 'CSS', value: 3, tooltip: '3 Sessions' }
    ]
};

export const analyticsService = {
    getAnalyticsData: async (): Promise<AnalyticsData> => {
        await delay(600);
        return MOCK_ANALYTICS;
    }
};
