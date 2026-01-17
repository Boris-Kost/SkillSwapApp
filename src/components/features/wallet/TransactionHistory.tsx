import { Transaction } from '../../../types/token.types';
import { Card } from '../../ui/Card';
import { Avatar } from '../../ui/Avatar';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionHistoryProps {
    transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
    return (
        <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">Recent Transactions</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${tx.type === 'earned' ? 'bg-green-100 text-green-600' :
                                tx.type === 'spent' ? 'bg-orange-100 text-orange-600' :
                                    'bg-blue-100 text-blue-600'
                                }`}>
                                {tx.type === 'earned' && <ArrowDownLeft className="h-5 w-5" />}
                                {tx.type === 'spent' && <ArrowUpRight className="h-5 w-5" />}
                                {(tx.type === 'purchased' || tx.type === 'refunded') && <ShoppingBag className="h-5 w-5" />}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{tx.description}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-500">{format(tx.date, 'MMM d, yyyy')}</span>
                                    {tx.relatedUser && (
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <span>•</span>
                                            <Avatar src={tx.relatedUser.avatar} fallback={tx.relatedUser.name[0]} size="sm" className="h-4 w-4 text-[10px]" />
                                            <span>{tx.relatedUser.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <span className={`font-bold ${tx.type === 'earned' ? 'text-green-600' :
                            tx.type === 'purchased' ? 'text-blue-600' :
                                'text-gray-900'
                            }`}>
                            {tx.type === 'earned' || tx.type === 'purchased' ? '+' : '-'}{tx.amount}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
