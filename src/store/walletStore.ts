import { create } from 'zustand';
import { Transaction } from '../types/token.types';
import { walletService } from '../services/walletService';

interface WalletState {
    balance: number;
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
    fetchWalletData: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
    balance: 0,
    transactions: [],
    isLoading: false,
    error: null,

    fetchWalletData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [balance, transactions] = await Promise.all([
                walletService.getBalance(),
                walletService.getTransactions()
            ]);
            set({ balance, transactions, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch wallet data' });
        }
    }
}));
