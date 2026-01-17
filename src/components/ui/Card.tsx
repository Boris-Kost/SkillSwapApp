import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'elevated' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', padding = 'md', hoverable = false, ...props }, ref) => {
        const variants = {
            default: 'bg-white',
            bordered: 'bg-white border border-slate-200',
            elevated: 'bg-white shadow-lg',
            glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
        };

        const paddings = {
            none: 'p-0',
            sm: 'p-3',
            md: 'p-5',
            lg: 'p-8',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl transition-all duration-200',
                    variants[variant],
                    paddings[padding],
                    hoverable && 'hover:shadow-md hover:-translate-y-1 cursor-pointer',
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';
