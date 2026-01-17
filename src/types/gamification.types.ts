export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
    isUnlocked: boolean;
}

export interface Level {
    currentLevel: number;
    currentXP: number;
    nextLevelXP: number;
    progressPercentage: number;
}

export interface LeaderboardEntry {
    id: string;
    userId: string;
    name: string;
    avatar?: string;
    level: number;
    rank: number;
    rating: number;
}
