import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Clock, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HomePage = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-8 pt-10">
                <div className="space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                        Master New Skills by <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Sharing Your Knowledge
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join the peer-to-peer learning community where you can teach what you know and learn what you don't. No money involved, just knowledge exchange.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <Link to="/register">
                        <Button size="lg" className="rounded-full px-8">Start Learning Now</Button>
                    </Link>
                    <Link to="/search">
                        <Button variant="outline" size="lg" className="rounded-full px-8">Browse Skills</Button>
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                        <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                    <p className="text-gray-600">Connect with genuine learners and experts. Build your network while you learn.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Time Token System</h3>
                    <p className="text-gray-600">Earn tokens by teaching. Spend them to learn. 1 hour of teaching = 1 hour of learning.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                        <Award className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Gamified Growth</h3>
                    <p className="text-gray-600">Level up, earn badges, and track your progress as you master new skills.</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-600 rounded-3xl p-12 text-white text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-4xl font-bold mb-2">10k+</div>
                        <div className="text-blue-100">Active Users</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">500+</div>
                        <div className="text-blue-100">Skills Available</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">25k+</div>
                        <div className="text-blue-100">Sessions Completed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">4.9/5</div>
                        <div className="text-blue-100">Average Rating</div>
                    </div>
                </div>
            </section>
        </div>
    );
};
