import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start rounded-xl mx-2 my-1 py-3 px-4 ${
                active
                    ? 'bg-blue-500/20 backdrop-blur-md text-blue-700 border border-blue-500/30 shadow-lg scale-105'
                    : 'bg-white/30 backdrop-blur-sm text-gray-700 border border-white/20 hover:bg-white/50 hover:scale-105 hover:shadow-md'
            } text-base font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className}`}
        >
            {children}
        </Link>
    );
}
