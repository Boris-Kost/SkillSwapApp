import { useEffect } from 'react';
import { useChatStore } from '../../store/chatStore';
import { ChatList } from '../../components/features/chat/ChatList';
import { ChatWindow } from '../../components/features/chat/ChatWindow';

export const ChatPage = () => {
    const {
        conversations,
        activeConversationId,
        messages,
        fetchConversations,
        selectConversation,
        sendMessage
    } = useChatStore();

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]);

    const activeConversation = conversations.find(c => c.id === activeConversationId) || null;
    const activeMessages = activeConversationId ? (messages[activeConversationId] || []) : [];

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-gray-100 overflow-hidden rounded-xl border border-gray-200 shadow-sm mx-auto max-w-6xl my-4">
            <ChatList
                conversations={conversations}
                activeId={activeConversationId}
                onSelect={selectConversation}
            />
            <ChatWindow
                conversation={activeConversation}
                messages={activeMessages}
                onSend={sendMessage}
            />
        </div>
    );
};
