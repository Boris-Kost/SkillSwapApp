import { Card } from '../../ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        positive: boolean;
    };
    colorClass?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, colorClass = 'text-blue-600 bg-blue-50' }: StatCardProps) => {
    return (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={trend.positive ? 'text-green-600' : 'text-red-600'}>
                        {trend.positive ? '+' : ''}{trend.value}
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                </div>
            )}
        </Card>
    );
};
