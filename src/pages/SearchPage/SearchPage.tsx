import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Search, Star, MapPin } from 'lucide-react';

const MOCK_SKILLS = [
    { id: '1', name: 'React', category: 'Development', level: 'Expert', user: { name: 'Alex Johnson', rating: 4.8, reviews: 24 } },
    { id: '2', name: 'UX Design', category: 'Design', level: 'Intermediate', user: { name: 'Sarah Miller', rating: 4.9, reviews: 18 } },
    { id: '3', name: 'Python', category: 'Development', level: 'Beginner', user: { name: 'Mike Ross', rating: 4.5, reviews: 12 } },
    { id: '4', name: 'Digital Marketing', category: 'Marketing', level: 'Expert', user: { name: 'Emily Chen', rating: 5.0, reviews: 30 } },
    { id: '5', name: 'Piano', category: 'Music', level: 'Intermediate', user: { name: 'David Kim', rating: 4.7, reviews: 15 } },
    { id: '6', name: 'Spanish', category: 'Language', level: 'Native', user: { name: 'Maria Garcia', rating: 4.9, reviews: 45 } },
];

export const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredSkills = MOCK_SKILLS.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Find Skills</h1>
                    <p className="text-gray-600 mt-1">Discover expert mentors in any field</p>
                </div>
            </div>

            {/* Search and Filters */}
            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by skill or mentor name..."
                            icon={<Search className="h-4 w-4" />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Development', 'Design', 'Marketing', 'Music', 'Language'].map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map(skill => (
                    <Card key={skill.id} hoverable className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar fallback={skill.user.name[0]} />
                                <div>
                                    <h3 className="font-bold text-gray-900">{skill.user.name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        <span>{skill.user.rating} ({skill.user.reviews})</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant="primary">{skill.level}</Badge>
                        </div>

                        <div className="mb-4 flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{skill.name}</h4>
                            <p className="text-sm text-gray-600">Teaches {skill.category}</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>Online</span>
                            </div>
                            <Button size="sm" variant="secondary">Request Session</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredSkills.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No skills found matching your search.</p>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All');
                        }}
                        className="mt-2"
                    >
                        Clear filters
                    </Button>
                </div>
            )}
        </div>
    );
};
