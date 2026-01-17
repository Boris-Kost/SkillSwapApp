import { useEffect, useRef } from 'react';
import { useNotificationStore } from '../../../store/notificationStore';
import { NotificationItem } from './NotificationItem';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Bell } from 'lucide-react';

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps) => {
    const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-80 md:w-96 z-50">
            <Card className="p-0 shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAllAsRead()}
                            className="text-xs h-8"
                        >
                            Mark all read
                        </Button>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto bg-white">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onRead={markAsRead}
                            />
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p>No notifications yet</p>
                        </div>
                    )}
                </div>

                <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                        View All History
                    </Button>
                </div>
            </Card>
        </div>
    );
};
