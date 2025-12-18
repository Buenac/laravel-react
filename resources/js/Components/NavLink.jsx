import { Link } from '@inertiajs/react';
import { useTheme } from '@/contexts/ThemeContext';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    const { isDark } = useTheme();

    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 text-sm font-medium leading-5 transition-all duration-300 ease-in-out focus:outline-none relative ' +
                (active
                    ? `${isDark ? 'text-white' : 'text-gray-800'} after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:rounded-full ${isDark ? 'after:bg-white' : 'after:bg-gray-800'}`
                    : `${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`) +
                className
            }
        >
            {children}
        </Link>
    );
}
