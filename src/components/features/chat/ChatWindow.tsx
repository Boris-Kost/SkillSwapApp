import { useState, useEffect, useRef } from 'react';
import { Message, Conversation } from '../../../types/chat.types';
import { MessageBubble } from './MessageBubble';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatWindowProps {
    conversation: Conversation | null;
    messages: Message[];
    onSend: (content: string) => void;
}

export const ChatWindow = ({ conversation, messages, onSend }: ChatWindowProps) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            onSend(newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
                <p>Select a conversation to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar src={conversation.participant.avatar} fallback={conversation.participant.name[0]} />
                    <div>
                        <h3 className="font-bold text-gray-900">{conversation.participant.name}</h3>
                        {conversation.participant.isOnline && (
                            <span className="text-xs text-green-600 font-medium">Online</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 text-gray-400">
                    <Button variant="ghost" size="sm" icon={<Phone className="h-4 w-4" />} className="hidden md:flex" />
                    <Button variant="ghost" size="sm" icon={<Video className="h-4 w-4" />} className="hidden md:flex" />
                    <Button variant="ghost" size="sm" icon={<MoreVertical className="h-4 w-4" />} />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isOwn={msg.senderId === '1'} // Mock check
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-sm"
                    />
                    <Button
                        onClick={handleSend}
                        variant="primary"
                        size="sm"
                        className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
