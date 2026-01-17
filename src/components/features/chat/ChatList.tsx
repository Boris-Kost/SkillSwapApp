import { Conversation } from '../../../types/chat.types';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';
import { format } from 'date-fns';

interface ChatListProps {
    conversations: Conversation[];
    activeId: string | null;
    onSelect: (id: string) => void;
}

export const ChatList = ({ conversations, activeId, onSelect }: ChatListProps) => {
    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200 w-80">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeId === conv.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                            }`}
                        onClick={() => onSelect(conv.id)}
                    >
                        <div className="relative">
                            <Avatar src={conv.participant.avatar} fallback={conv.participant.name[0]} />
                            {conv.participant.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-gray-900 truncate">{conv.participant.name}</span>
                                {conv.lastMessage && (
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                        {format(conv.lastMessage.timestamp, 'HH:mm')}
                                    </span>
                                )}
                            </div>
                            {conv.lastMessage && (
                                <p className={`text-sm truncate ${!conv.lastMessage.isRead ? 'font-bold text-gray-900' : 'text-gray-500'
                                    }`}>
                                    {conv.lastMessage.content}
                                </p>
                            )}
                        </div>
                        {conv.unreadCount > 0 && (
                            <Badge variant="primary" size="sm" className="rounded-full px-2">
                                {conv.unreadCount}
                            </Badge>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
