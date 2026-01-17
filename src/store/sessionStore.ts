import { create } from 'zustand';
import { Session } from '../types/session.types';
import { sessionService } from '../services/sessionService';

interface SessionState {
    sessions: Session[];
    isLoading: boolean;
    error: string | null;
    fetchSessions: () => Promise<void>;
    cancelSession: (id: string) => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
    sessions: [],
    isLoading: false,
    error: null,

    fetchSessions: async () => {
        set({ isLoading: true, error: null });
        try {
            const sessions = await sessionService.getSessions();
            set({ sessions, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch sessions' });
        }
    },

    cancelSession: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await sessionService.cancelSession(id);
            set((state) => ({
                sessions: state.sessions.map(s =>
                    s.id === id ? { ...s, status: 'cancelled' } : s
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to cancel session' });
        }
    }
}));
