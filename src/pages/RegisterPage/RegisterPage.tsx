import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Mail, Lock, User, GraduationCap } from 'lucide-react';

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUser, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');

    const onSubmit = async (data: any) => {
        try {
            setAuthError('');
            if (data.password !== data.confirmPassword) {
                setAuthError('Passwords do not match');
                return;
            }
            await registerUser({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                university: data.university
            });
            navigate('/dashboard');
        } catch (error: any) {
            setAuthError(error.message || 'Failed to register');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-10">
            <Card className="w-full max-w-md" padding="lg" variant="elevated">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join the learning community today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            placeholder="John"
                            icon={<User className="h-4 w-4" />}
                            className={errors.firstName ? 'border-red-500' : ''}
                            {...register('firstName', { required: 'Required' })}
                            error={errors.firstName?.message as string}
                        />
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            className={errors.lastName ? 'border-red-500' : ''}
                            {...register('lastName', { required: 'Required' })}
                            error={errors.lastName?.message as string}
                        />
                    </div>

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
                        label="University (Optional)"
                        placeholder="MIT"
                        icon={<GraduationCap className="h-4 w-4" />}
                        {...register('university')}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        icon={<Lock className="h-4 w-4" />}
                        className={errors.password ? 'border-red-500' : ''}
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                        error={errors.password?.message as string}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        icon={<Lock className="h-4 w-4" />}
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                        {...register('confirmPassword', { required: 'Confirm password' })}
                        error={errors.confirmPassword?.message as string}
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
                        className="mt-4"
                    >
                        Create Account
                    </Button>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Log in
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};
