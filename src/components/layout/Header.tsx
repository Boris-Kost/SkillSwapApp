import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, Coins, MessageSquare, Bell, BarChart2, ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { NotificationDropdown } from '../features/notifications/NotificationDropdown';

export const Header = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const { unreadCount, fetchNotifications } = useNotificationStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const navigate = useNavigate();

    // Initial fetch for unread count badge
    useState(() => {
        if (isAuthenticated) {
            fetchNotifications();
        }
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleWalletClick = () => {
        navigate('/wallet');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 transform transition-transform hover:scale-105">
                                <ArrowRightLeft className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                SkillSwap
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                                <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium">Find Skills</Link>
                                <Link to="/sessions" className="text-gray-600 hover:text-blue-600 font-medium">Sessions</Link>
                                <div className="h-6 w-px bg-gray-200 mx-2" />
                                <Link to="/messages" className="text-gray-500 hover:text-gray-700 relative">
                                    <MessageSquare className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
                                </Link>
                                <div className="relative">
                                    <button
                                        className="text-gray-500 hover:text-gray-700 relative outline-none"
                                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    >
                                        <Bell className="h-5 w-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
                                        )}
                                    </button>
                                    <NotificationDropdown
                                        isOpen={isNotificationsOpen}
                                        onClose={() => setIsNotificationsOpen(false)}
                                    />
                                </div>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2">
                                        <Avatar
                                            src={user?.avatar}
                                            fallback={user?.firstName?.[0]}
                                            size="sm"
                                        />
                                    </button>
                                    {/* Dropdown Menu (placeholder for UserMenu component) */}
                                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all transform origin-top-right z-50">
                                        <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <User className="h-4 w-4" /> Profile
                                        </button>
                                        <button onClick={() => navigate('/analytics')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <BarChart2 className="h-4 w-4" /> Analytics
                                        </button>
                                        <button onClick={() => navigate('/settings')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <Settings className="h-4 w-4" /> Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Log in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <div
                                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                                onClick={handleWalletClick}
                            >
                                <Coins className="h-4 w-4" />
                                <span className="font-bold text-sm">{user?.tokens}</span>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="space-y-1 px-4 py-3">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center space-x-3 mb-4 px-2">
                                    <Avatar src={user?.avatar} fallback={user?.firstName?.[0]} />
                                    <div>
                                        <div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
                                        <div className="text-sm text-gray-500">{user?.email}</div>
                                    </div>
                                </div>
                                <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Dashboard</Link>
                                <Link to="/search" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Find Skills</Link>
                                <Link to="/sessions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Sessions</Link>
                                <Link to="/messages" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Messages</Link>
                                <Link to="/wallet" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <span>Wallet</span>
                                        <Badge variant="primary" size="sm" className="ml-auto">
                                            {user?.tokens}
                                        </Badge>
                                    </div>
                                </Link>
                                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Profile</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/login">
                                    <Button variant="outline" fullWidth>Log in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button fullWidth>Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
