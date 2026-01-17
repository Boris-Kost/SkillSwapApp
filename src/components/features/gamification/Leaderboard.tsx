import { LeaderboardEntry } from '../../../types/gamification.types';
import { Card } from '../../ui/Card';
import { Avatar } from '../../ui/Avatar';
import { Trophy, Medal, Crown } from 'lucide-react';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

export const Leaderboard = ({ entries }: LeaderboardProps) => {
    return (
        <Card>
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <h3 className="font-bold text-gray-900">Top Mentors</h3>
            </div>
            <div className="space-y-4">
                {entries.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-3">
                        <div className="w-6 font-bold text-gray-400 text-center">
                            {entry.rank === 1 && <Crown className="h-5 w-5 text-yellow-500 mx-auto" />}
                            {entry.rank === 2 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
                            {entry.rank === 3 && <Medal className="h-5 w-5 text-amber-600 mx-auto" />}
                            {entry.rank > 3 && <span>{entry.rank}</span>}
                        </div>
                        <Avatar src={entry.avatar} fallback={entry.name[0]} size="sm" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {entry.name}
                                {entry.userId === '1' && <span className="ml-1 text-xs text-gray-500">(You)</span>}
                            </p>
                            <p className="text-xs text-gray-500">Lvl {entry.level}</p>
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                            {entry.rating.toFixed(1)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
