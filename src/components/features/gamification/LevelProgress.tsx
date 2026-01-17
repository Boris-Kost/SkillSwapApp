import { Level } from '../../../types/gamification.types';
import { Card } from '../../ui/Card';
import { Zap } from 'lucide-react';

interface LevelProgressProps {
    level: Level;
}

export const LevelProgress = ({ level }: LevelProgressProps) => {
    return (
        <Card className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-none p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-300 fill-current" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-purple-100">Current Level</h3>
                    <p className="text-3xl font-bold">{level.currentLevel}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-purple-100">
                    <span>{level.currentXP} XP</span>
                    <span>{level.nextLevelXP} XP</span>
                </div>
                <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${level.progressPercentage}%` }}
                    />
                </div>
                <p className="text-xs text-purple-200 text-right mt-1">
                    {Math.round(level.nextLevelXP - level.currentXP)} XP to Level {level.currentLevel + 1}
                </p>
            </div>
        </Card>
    );
};
