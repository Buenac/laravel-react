import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
            {/* Animated clouds background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-10 left-10 w-32 h-16 bg-white/20 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-32 right-20 w-40 h-20 bg-white/15 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 left-1/4 w-36 h-18 bg-white/25 rounded-full blur-xl"
                />

                {/* Floating weather icons */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 text-6xl opacity-10"
                >
                    ☀️
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 left-1/4 text-5xl opacity-10"
                >
                    ⛅
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <Link href="/">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-8xl drop-shadow-2xl"
                    >
                        🌦️
                    </motion.div>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative z-10 mt-6 w-full overflow-hidden bg-white/95 backdrop-blur-lg px-6 py-8 shadow-2xl sm:max-w-md sm:rounded-2xl border border-white/20"
            >
                {children}
            </motion.div>

            {/* Weather info footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative z-10 mt-6 text-center text-white/80 text-sm"
            >
                <p>🌤️ Your Personal Weather Companion</p>
            </motion.div>
        </div>
    );
}

