import { ChartDataPoint } from '../../../types/analytics.types';
import { Card } from '../../ui/Card';

interface SimpleBarChartProps {
    title: string;
    data: ChartDataPoint[];
    height?: number;
    color?: string;
}

export const SimpleBarChart = ({ title, data, height = 200, color = 'bg-blue-500' }: SimpleBarChartProps) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <Card>
            <h3 className="font-bold text-gray-900 mb-6">{title}</h3>
            <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
                {data.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {point.tooltip || point.value}
                        </div>

                        {/* Bar */}
                        <div
                            className={`w-full max-w-[40px] rounded-t-sm ${color} transition-all duration-500 hover:opacity-80`}
                            style={{ height: `${(point.value / maxValue) * 100}%` }}
                        />

                        {/* Label */}
                        <span className="text-xs text-gray-500 font-medium truncate w-full text-center">
                            {point.label}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
