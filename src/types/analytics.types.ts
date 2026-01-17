export interface AnalyticsStats {
    totalEarnings: number;
    hoursTaught: number;
    sessionsCompleted: number;
    studentRating: number;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    tooltip?: string;
}

export interface AnalyticsData {
    stats: AnalyticsStats;
    earningsHistory: ChartDataPoint[];
    sessionsBySkill: ChartDataPoint[];
}
