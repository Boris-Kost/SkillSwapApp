import { useEffect } from 'react';
import { useSessionStore } from '../../store/sessionStore';
import { SessionCard } from '../../components/features/sessions/SessionCard';
import { Button } from '../../components/ui/Button';
import { Loader2 } from 'lucide-react';

export const SessionsPage = () => {
    const { sessions, isLoading, fetchSessions, cancelSession } = useSessionStore();

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const upcomingSessions = sessions.filter(s => new Date(s.scheduledAt) > new Date());
    const pastSessions = sessions.filter(s => new Date(s.scheduledAt) <= new Date());

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
                    <p className="text-gray-600 mt-1">Manage your learning and teaching schedule</p>
                </div>
                <Button>Book New Session</Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Upcoming ({upcomingSessions.length})
                        </h2>
                        {upcomingSessions.length > 0 ? (
                            upcomingSessions.map(session => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    onCancel={cancelSession}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500">No upcoming sessions</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Past History ({pastSessions.length})
                        </h2>
                        {pastSessions.map(session => (
                            <SessionCard
                                key={session.id}
                                session={session}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
