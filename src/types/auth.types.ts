import { User } from './user.types';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university?: string;
}
