import { create } from 'zustand';
import { AuthState } from '../types/auth.types';
import { authService } from '../services/authService';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const user = await authService.login(email, password);
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    register: async (data) => {
        set({ isLoading: true });
        try {
            const user = await authService.register(data);
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
        authService.logout();
    },

    updateProfile: async (data) => {
        set({ isLoading: true });
        try {
            const updatedUser = await authService.updateProfile(data);
            set((state) => ({
                user: state.user ? { ...state.user, ...updatedUser } : null,
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    }
}));
