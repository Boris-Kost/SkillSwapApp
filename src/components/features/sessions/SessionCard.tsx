
import { Session } from '../../../types/session.types';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Avatar } from '../../ui/Avatar';
import { Clock, Video } from 'lucide-react';
import { format } from 'date-fns';

interface SessionCardProps {
    session: Session;
    onCancel?: (id: string) => void;
}

export const SessionCard = ({ session, onCancel }: SessionCardProps) => {
    const isUpcoming = new Date(session.scheduledAt) > new Date();
    const isTeacher = session.teacher.id === '1'; // Mock current user check

    return (
        <Card className="flex flex-col md:flex-row gap-6 p-6">
            <div className="flex-shrink-0">
                <div className="bg-blue-50 text-blue-600 rounded-2xl w-24 h-24 flex flex-col items-center justify-center border-2 border-blue-100">
                    <span className="text-sm font-bold uppercase">{format(session.scheduledAt, 'MMM')}</span>
                    <span className="text-3xl font-bold">{format(session.scheduledAt, 'd')}</span>
                    <span className="text-xs">{format(session.scheduledAt, 'HH:mm')}</span>
                </div>
            </div>

            <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{session.skill.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Badge variant={isTeacher ? 'primary' : 'neutral'}>
                                {isTeacher ? 'Teaching' : 'Learning'}
                            </Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" /> {session.duration} min
                            </span>
                        </div>
                    </div>
                    <Badge
                        variant={
                            session.status === 'confirmed' ? 'success' :
                                session.status === 'cancelled' ? 'error' : 'neutral'
                        }
                    >
                        {session.status}
                    </Badge>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Avatar
                            src={isTeacher ? session.student.avatar : session.teacher.avatar}
                            fallback={isTeacher ? session.student.firstName[0] : session.teacher.firstName[0]}
                        />
                        <div>
                            <div className="text-sm font-medium text-gray-900">
                                {isTeacher ? 'Student' : 'Mentor'}
                            </div>
                            <div className="text-sm text-gray-600">
                                {isTeacher
                                    ? `${session.student.firstName} ${session.student.lastName}`
                                    : `${session.teacher.firstName} ${session.teacher.lastName}`
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    {session.status === 'confirmed' && isUpcoming && (
                        <>
                            <Button size="sm" icon={<Video className="h-4 w-4" />}>
                                Join Meeting
                            </Button>
                            {onCancel && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:bg-red-50 border-red-200"
                                    onClick={() => onCancel(session.id)}
                                >
                                    Cancel
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};
