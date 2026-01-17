import { Message } from '../../../types/chat.types';
import { format } from 'date-fns';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
    return (
        <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isOwn
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`text-[10px] mt-1 text-right ${isOwn ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {format(message.timestamp, 'HH:mm')}
                </div>
            </div>
        </div>
    );
};
