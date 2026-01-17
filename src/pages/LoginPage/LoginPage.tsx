import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Mail, Lock } from 'lucide-react';

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');

    const onSubmit = async (data: any) => {
        try {
            setAuthError('');
            await login(data.email, data.password);
            navigate('/dashboard');
        } catch (error: any) {
            setAuthError(error.message || 'Failed to login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md" padding="lg" variant="elevated">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to continue learning</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        icon={<Mail className="h-4 w-4" />}
                        className={errors.email ? 'border-red-500' : ''}
                        {...register('email', { required: 'Email is required' })}
                        error={errors.email?.message as string}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        icon={<Lock className="h-4 w-4" />}
                        className={errors.password ? 'border-red-500' : ''}
                        {...register('password', { required: 'Password is required' })}
                        error={errors.password?.message as string}
                    />

                    {authError && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
                            {authError}
                        </div>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                    >
                        Sign In
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};
