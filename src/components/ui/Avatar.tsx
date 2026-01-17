import React from 'react';
import { cn } from '../../utils/cn';
import { User } from 'lucide-react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fallback?: string;
    status?: 'online' | 'offline' | 'busy';
}

export const Avatar = ({ className, size = 'md', src, alt, fallback, status, ...props }: AvatarProps) => {
    const sizes = {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-14 w-14',
        xl: 'h-20 w-20',
    };

    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-slate-400',
        busy: 'bg-red-500',
    };

    return (
        <div className="relative inline-block">
            <div
                className={cn(
                    'relative overflow-hidden rounded-full bg-slate-100',
                    sizes[size],
                    className
                )}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt || 'Avatar'}
                        className="h-full w-full object-cover"
                        {...props}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        {fallback ? (
                            <span className="font-semibold text-slate-600 uppercase">{fallback}</span>
                        ) : (
                            <User className="h-1/2 w-1/2" />
                        )}
                    </div>
                )}
            </div>
            {status && (
                <span
                    className={cn(
                        'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
                        status === 'online' ? 'h-2.5 w-2.5' : 'h-3 w-3', // Adjust size slightly
                        statusColors[status]
                    )}
                />
            )}
        </div>
    );
};
