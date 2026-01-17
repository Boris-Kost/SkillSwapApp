import { useEffect } from 'react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { StatCard } from '../../components/features/analytics/StatCard';
import { SimpleBarChart } from '../../components/features/analytics/SimpleBarChart';
import { DollarSign, Clock, BookOpen, Star } from 'lucide-react';

export const AnalyticsPage = () => {
    const { data, isLoading, fetchAnalytics } = useAnalyticsStore();

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    if (isLoading || !data) {
        return <div className="p-8 text-center">Loading analytics...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Earnings"
                    value={data.stats.totalEarnings}
                    icon={DollarSign}
                    colorClass="bg-green-50 text-green-600"
                    trend={{ value: '12%', positive: true }}
                />
                <StatCard
                    title="Hours Taught"
                    value={data.stats.hoursTaught}
                    icon={Clock}
                    colorClass="bg-blue-50 text-blue-600"
                />
                <StatCard
                    title="Sessions"
                    value={data.stats.sessionsCompleted}
                    icon={BookOpen}
                    colorClass="bg-purple-50 text-purple-600"
                    trend={{ value: '2', positive: true }}
                />
                <StatCard
                    title="Student Rating"
                    value={data.stats.studentRating}
                    icon={Star}
                    colorClass="bg-yellow-50 text-yellow-600"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                <SimpleBarChart
                    title="Earnings History (Last 7 Days)"
                    data={data.earningsHistory}
                    color="bg-green-500"
                />
                <SimpleBarChart
                    title="Sessions by Skill"
                    data={data.sessionsBySkill}
                    color="bg-purple-500"
                />
            </div>
        </div>
    );
};
