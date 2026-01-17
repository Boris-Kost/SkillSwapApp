import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useGamificationStore } from '../../store/gamificationStore';
import { AchievementBadge } from '../../components/features/gamification/AchievementBadge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';

export const ProfilePage = () => {
    const { user } = useAuthStore();
    const { achievements, fetchGamificationData } = useGamificationStore();
    const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about'); // Simplified tabs for now

    useEffect(() => {
        fetchGamificationData();
    }, [fetchGamificationData]);

    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Card */}
            <Card variant="default" padding="none" className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <div className="px-6 pb-6 pt-0 relative">
                    <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-4">
                        <Avatar
                            src={user.avatar}
                            fallback={user.firstName[0]}
                            size="xl"
                            className="border-4 border-white"
                        />
                        <div className="flex-1 pt-12 md:pt-0">
                            <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                            <p className="text-gray-600">{user.university || 'Student'}</p>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <Button variant="outline">Edit Profile</Button>
                            <Button>Share Profile</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <h3 className="font-bold text-lg mb-4">Intro</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>Rating: <span className="font-bold text-gray-900">{user.rating}/5.0</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>Level {user.level} Contributor</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>New York, USA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-lg mb-4">Skills I Teach</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skillsTeach.map(skill => (
                                <Badge key={skill.id} variant="primary">{skill.name}</Badge>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-lg mb-4">Skills I Want</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skillsLearn.map(skill => (
                                <Badge key={skill.id} variant="neutral">{skill.name}</Badge>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex gap-4 border-b border-gray-200">
                        <Button
                            variant={activeTab === 'about' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('about')}
                        >
                            About
                        </Button>
                        <Button
                            variant={activeTab === 'reviews' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </Button>
                    </div>

                    <Card>
                        <h3 className="font-bold text-lg mb-3">About Me</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {user.bio || "No bio yet."}
                        </p>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-gray-900 mb-4">Achievements</h3>
                        <div className="flex flex-wrap gap-4">
                            {achievements.map((achievement) => (
                                <AchievementBadge key={achievement.id} achievement={achievement} />
                            ))}
                            {achievements.length === 0 && <span className="text-gray-500 text-sm">No achievements yet.</span>}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-lg mb-4">Recent Reviews</h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                                        <div>
                                            <div className="font-medium text-sm">Jane Cooper</div>
                                            <div className="text-xs text-gray-500">2 days ago</div>
                                        </div>
                                        <div className="ml-auto flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-3 w-3 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">Great session! Very patient and knowledgeable.</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
