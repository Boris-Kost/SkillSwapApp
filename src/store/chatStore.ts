import { create } from 'zustand';
import { Conversation, Message } from '../types/chat.types';
import { chatService } from '../services/chatService';

interface ChatState {
    conversations: Conversation[];
    activeConversationId: string | null;
    messages: Record<string, Message[]>; // conversationId -> messages
    isLoading: boolean;
    error: string | null;
    fetchConversations: () => Promise<void>;
    selectConversation: (id: string) => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
    conversations: [],
    activeConversationId: null,
    messages: {},
    isLoading: false,
    error: null,

    fetchConversations: async () => {
        set({ isLoading: true, error: null });
        try {
            const conversations = await chatService.getConversations();
            set({ conversations, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch conversations' });
        }
    },

    selectConversation: async (id) => {
        set({ activeConversationId: id });
        const { messages } = get();
        if (!messages[id]) {
            set({ isLoading: true });
            try {
                const fetchedMessages = await chatService.getMessages(id);
                set((state) => ({
                    messages: { ...state.messages, [id]: fetchedMessages },
                    isLoading: false
                }));
            } catch (error) {
                set({ isLoading: false, error: 'Failed to fetch messages' });
            }
        }
    },

    sendMessage: async (content) => {
        const { activeConversationId } = get();
        if (!activeConversationId) return;

        // Optimistic update
        const tempId = Date.now().toString();
        const optimisticMessage: Message = {
            id: tempId,
            senderId: '1', // Mock current user
            content,
            timestamp: new Date(),
            isRead: false
        };

        set((state) => ({
            messages: {
                ...state.messages,
                [activeConversationId]: [...(state.messages[activeConversationId] || []), optimisticMessage]
            }
        }));

        try {
            const sentMessage = await chatService.sendMessage(activeConversationId, content);
            // Replace optimistic message with real one
            set((state) => ({
                messages: {
                    ...state.messages,
                    [activeConversationId]: state.messages[activeConversationId].map(m =>
                        m.id === tempId ? sentMessage : m
                    )
                }
            }));
        } catch (error) {
            // Revert optimistic update (simplified handling for now)
            console.error('Failed to send message:', error);
        }
    }
}));
