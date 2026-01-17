import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Coins, PlusCircle, ArrowUpRight } from 'lucide-react';

interface WalletCardProps {
    balance: number;
}

export const WalletCard = ({ balance }: WalletCardProps) => {
    return (
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 border-none">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Coins className="h-8 w-8 text-yellow-300" />
                </div>
                <Button size="sm" variant="secondary" className="bg-white/10 text-white border-none hover:bg-white/20">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    History
                </Button>
            </div>

            <div className="space-y-1">
                <p className="text-blue-100 font-medium">Total Balance</p>
                <h2 className="text-4xl font-bold">{balance} Tokens</h2>
            </div>

            <div className="mt-8">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Top Up Tokens
                </Button>
            </div>
        </Card>
    );
};
