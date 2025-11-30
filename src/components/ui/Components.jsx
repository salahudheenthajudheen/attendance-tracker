import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, onClick }) => {
    return (
        <div
            className={twMerge("card p-4", className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export const Button = ({ children, variant = 'primary', className, ...props }) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        ghost: 'btn-ghost'
    };

    return (
        <button
            className={twMerge("btn", variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export const ProgressBar = ({ value, max = 100, colorClass = "bg-blue-600", className }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={twMerge("h-2.5 w-full rounded-full bg-slate-200", className)}>
            <div
                className={twMerge("h-2.5 rounded-full transition-all duration-500", colorClass)}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};
