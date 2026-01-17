import { Notification } from '../../../types/notification.types';
import { Bell, MessageSquare, Calendar, Trophy, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
    notification: Notification;
    onRead: (id: string) => void;
}

const ICONS = {
    'message': MessageSquare,
    'session_invite': Calendar,
    'session_update': Calendar,
    'achievement': Trophy,
    'system': Info
};

const COLORS = {
    'message': 'text-blue-500 bg-blue-50',
    'session_invite': 'text-purple-500 bg-purple-50',
    'session_update': 'text-orange-500 bg-orange-50',
    'achievement': 'text-yellow-500 bg-yellow-50',
    'system': 'text-gray-500 bg-gray-50'
};

export const NotificationItem = ({ notification, onRead }: NotificationItemProps) => {
    const Icon = ICONS[notification.type] || Bell;
    const colorClass = COLORS[notification.type] || 'text-gray-500 bg-gray-50';

    return (
        <div
            onClick={() => !notification.isRead && onRead(notification.id)}
            className={`p-4 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 ${!notification.isRead ? 'bg-blue-50/30' : ''
                }`}
        >
            <div className={`p-2 rounded-full h-fit flex-shrink-0 ${colorClass}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm ${!notification.isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notification.title}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
            </div>
            {!notification.isRead && (
                <div className="flex-shrink-0 self-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full" />
                </div>
            )}
        </div>
    );
};
