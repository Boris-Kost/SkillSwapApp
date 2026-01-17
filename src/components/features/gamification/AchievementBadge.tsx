import { Achievement } from '../../../types/gamification.types';
import { Footprints, School, BookOpen, Trophy, Lock } from 'lucide-react';

interface AchievementBadgeProps {
    achievement: Achievement;
    size?: 'sm' | 'md' | 'lg';
}

const ICONS: Record<string, any> = {
    'footprints': Footprints,
    'school': School,
    'book-open': BookOpen,
    'trophy': Trophy
};

export const AchievementBadge = ({ achievement, size = 'md' }: AchievementBadgeProps) => {
    const Icon = ICONS[achievement.icon] || Trophy;
    const sizeClasses = {
        sm: 'w-8 h-8 p-1.5',
        md: 'w-12 h-12 p-2.5',
        lg: 'w-16 h-16 p-4'
    };

    return (
        <div className={`
            relative rounded-full flex items-center justify-center
            ${achievement.isUnlocked
                ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 shadow-sm border border-yellow-300'
                : 'bg-gray-100 text-gray-400 border border-gray-200'}
            ${sizeClasses[size]}
        `}
            title={achievement.description}
        >
            {achievement.isUnlocked ? (
                <Icon className="w-full h-full" />
            ) : (
                <Lock className="w-1/2 h-1/2" />
            )}
        </div>
    );
};
