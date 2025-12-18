import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Background gradient that slides */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500"
                initial={false}
                animate={{
                    opacity: isDark ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700"
                initial={false}
                animate={{
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Sliding toggle */}
            <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                initial={false}
                animate={{
                    x: isDark ? 30 : 4,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {/* Sun icon */}
                <motion.svg
                    className="w-3 h-3 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        rotate: isDark ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                    />
                </motion.svg>

                {/* Moon icon */}
                <motion.svg
                    className="w-3 h-3 text-indigo-600 absolute"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        rotate: isDark ? 0 : -180,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </motion.svg>
            </motion.div>
        </motion.button>
    );
}
