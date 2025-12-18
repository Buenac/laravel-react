import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function Dashboard() {
    const { isDark } = useTheme();
    const weatherStats = [
        {
            icon: '🌡️',
            title: 'Today\'s High',
            value: '24°C',
            description: 'Mostly sunny',
            gradient: 'from-orange-400 to-red-500',
        },
        {
            icon: '💨',
            title: 'Wind Speed',
            value: '15 km/h',
            description: 'Light breeze',
            gradient: 'from-cyan-400 to-blue-500',
        },
        {
            icon: '💧',
            title: 'Humidity',
            value: '65%',
            description: 'Comfortable',
            gradient: 'from-blue-400 to-indigo-500',
        },
        {
            icon: '☁️',
            title: 'Cloud Cover',
            value: '30%',
            description: 'Partly cloudy',
            gradient: 'from-gray-400 to-slate-500',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className={`text-xl font-semibold leading-tight transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                }`}>
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className={`absolute inset-0 transition-colors duration-500 ${
                    isDark 
                        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
                        : 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600'
                }`}>
                    {/* Animated gradient orbs */}
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 100, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -80, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                    />

                    {/* Floating weather particles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.sin(i) * 20, 0],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                            }}
                            className="absolute text-4xl text-white/40"
                            style={{
                                left: `${10 + i * 12}%`,
                                top: `${20 + (i % 3) * 25}%`,
                            }}
                        >
                            {['☁️', '🌤️', '⛅', '☀️', '🌥️', '💨', '🌈', '⭐'][i]}
                        </motion.div>
                    ))}
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white overflow-hidden relative">
                            {/* Animated background circles */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [360, 180, 0],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full"
                            />

                            <div className="relative z-10">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl font-bold mb-2"
                                >
                                    Welcome back! ☀️
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-blue-100 text-lg"
                                >
                                    Check out today's weather forecast and manage your favorite days
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Weather Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        {weatherStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
                            >
                                <motion.div
                                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-16 -mt-16`}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: index * 0.2,
                                    }}
                                />
                                <div className="relative z-10">
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.3,
                                        }}
                                        className="text-4xl mb-3"
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                                        {stat.title}
                                    </h3>
                                    <p className="text-3xl font-bold text-gray-800 mb-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-500 text-sm">{stat.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* 10-Day Forecast Card */}
                        <Link href={route('weather.index')}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <motion.div
                                        animate={{
                                            y: [0, -5, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                        className="text-5xl"
                                    >
                                        🌤️
                                    </motion.div>
                                    <motion.div
                                        className="text-blue-500 group-hover:text-blue-600 transition-colors"
                                        animate={{
                                            x: [0, 5, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    10-Day Forecast
                                </h3>
                                <p className="text-gray-600">
                                    View detailed weather predictions for the next 10 days
                                </p>
                            </motion.div>
                        </Link>

                        {/* Favorites Card */}
                        <Link href={route('weather-favorites.index')}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                        className="text-5xl"
                                    >
                                        ⭐
                                    </motion.div>
                                    <motion.div
                                        className="text-indigo-500 group-hover:text-indigo-600 transition-colors"
                                        animate={{
                                            x: [0, 5, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    My Favorites
                                </h3>
                                <p className="text-gray-600">
                                    Manage your saved weather days and add notes
                                </p>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Weather Tip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-8"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                            <div className="flex items-start">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    className="text-3xl mr-4"
                                >
                                    💡
                                </motion.div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                        Weather Tip of the Day
                                    </h4>
                                    <p className="text-gray-600">
                                        Perfect weather for outdoor activities today! Don't forget your
                                        sunscreen and stay hydrated.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
