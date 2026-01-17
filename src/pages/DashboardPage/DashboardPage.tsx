import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSessionStore } from '../../store/sessionStore';
import { useGamificationStore } from '../../store/gamificationStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LevelProgress } from '../../components/features/gamification/LevelProgress';
import { Leaderboard } from '../../components/features/gamification/Leaderboard';
import { Calendar, TrendingUp, Users, ArrowRight } from 'lucide-react';

export const DashboardPage = () => {
    const { user } = useAuthStore();
    const { sessions, fetchSessions } = useSessionStore();
    const { level, leaderboard, fetchGamificationData } = useGamificationStore();

    useEffect(() => {
        fetchSessions();
        fetchGamificationData();
    }, [fetchSessions, fetchGamificationData]);

    const upcomingSessions = sessions.filter(s => new Date(s.scheduledAt) > new Date()).slice(0, 2);

    if (!user) return null;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Hello, {user.firstName}! 👋</h1>
                    <p className="text-gray-600 mt-1">Ready to learn something new today?</p>
                </div>
                <div className="flex gap-3">
                    <Card className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2">
                        <span className="text-2xl font-bold">{user.tokens}</span>
                        <span className="text-blue-100 text-sm">Tokens</span>
                    </Card>
                    <Card className="bg-purple-600 text-white px-6 py-2 flex items-center gap-2">
                        <span className="text-2xl font-bold">Lvl {user.level}</span>
                        <span className="text-purple-100 text-sm">Expert</span>
                    </Card>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-8">

                    {/* Gamification Progress */}
                    {level && <LevelProgress level={level} />}

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card hoverable className="p-6 border-l-4 border-blue-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                                    <Users className="h-6 w-6" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Find a Mentor</h3>
                            <p className="text-gray-500 text-sm">Browse 500+ skills and find the perfect teacher.</p>
                        </Card>

                        <Card hoverable className="p-6 border-l-4 border-purple-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Schedule Session</h3>
                            <p className="text-gray-500 text-sm">Manage your upcoming teaching sessions.</p>
                        </Card>

                        <Card hoverable className="p-6 border-l-4 border-green-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-green-50 p-3 rounded-lg text-green-600">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Track Progress</h3>
                            <p className="text-gray-500 text-sm">View your learning stats and achievements.</p>
                        </Card>
                    </div>

                    {/* Upcoming Sessions */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                        {upcomingSessions.length > 0 ? (
                            upcomingSessions.map(session => (
                                <Card key={session.id} className="flex gap-4 items-center">
                                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg text-center min-w-[3.5rem]">
                                        <div className="text-xs font-bold uppercase">Today</div>
                                        <div className="text-lg font-bold">14:00</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-900 bg-transparent">{session.id}</h4>
                                            <Badge variant="warning">Upcoming</Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            with {session.teacher.id === user.id ? 'Student' : 'Mentor'}
                                        </p>
                                    </div>
                                    <Button size="sm" variant="outline">Join</Button>
                                </Card>
                            ))
                        ) : (
                            <Card className="p-8 text-center text-gray-500 bg-gray-50 border-dashed">
                                <p>No upcoming sessions.</p>
                                <Button variant="primary" size="sm" className="mt-4">Book a Session</Button>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-8">
                    {/* Leaderboard */}
                    <Leaderboard entries={leaderboard} />

                    {/* Recommended for You */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Recommended</h2>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <Card key={i} hoverable className="flex items-center gap-4 p-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">Frontend Masterclass</h4>
                                        <div className="text-xs text-gray-500">Beginner • 2 Tokens/hr</div>
                                    </div>
                                    <Button size="sm" variant="secondary">View</Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
