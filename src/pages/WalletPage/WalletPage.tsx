import { useEffect } from 'react';
import { useWalletStore } from '../../store/walletStore';
import { WalletCard } from '../../components/features/wallet/WalletCard';
import { TransactionHistory } from '../../components/features/wallet/TransactionHistory';
import { Loader2 } from 'lucide-react';

export const WalletPage = () => {
    const { balance, transactions, isLoading, fetchWalletData } = useWalletStore();

    useEffect(() => {
        fetchWalletData();
    }, [fetchWalletData]);

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
                <p className="text-gray-600 mt-1">Manage your skill tokens and transactions</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <WalletCard balance={balance} />
                </div>
                <div className="md:col-span-2">
                    <TransactionHistory transactions={transactions} />
                </div>
            </div>
        </div>
    );
};
