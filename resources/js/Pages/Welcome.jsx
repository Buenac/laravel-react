import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Weather Forecast App" />
            <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
                {/* Animated Background Elements */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-20 left-10 text-white/20 text-9xl"
                >
                    ☁️
                </motion.div>
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-40 right-20 text-white/20 text-8xl"
                >
                    ☁️
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-32 right-1/4 text-white/30 text-7xl"
                >
                    ☀️
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute bottom-20 left-1/3 text-white/20 text-6xl"
                >
                    🌤️
                </motion.div>

                {/* Navigation */}
                <header className="relative z-10 px-6 py-8">
                    <nav className="max-w-7xl mx-auto flex justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-5xl">🌦️</span>
                            <span className="text-white font-bold text-2xl">WeatherApp</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex gap-4"
                        >
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/30"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                        >
                            Your Personal
                            <br />
                            <span className="text-yellow-300">Weather Companion</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
                        >
                            Get accurate 10-day weather forecasts, save your favorite days, and stay prepared for any weather condition.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                                    >
                                        Go to Dashboard
                                    </motion.button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('register')}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                                        >
                                            Get Started Free
                                        </motion.button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                                        >
                                            Sign In
                                        </motion.button>
                                    </Link>
                                </>
                            )}
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
                        >
                            {/* Feature 1 */}
                            <motion.div
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                    className="text-6xl mb-4"
                                >
                                    📅
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    10-Day Forecast
                                </h3>
                                <p className="text-white/80">
                                    Plan ahead with detailed weather predictions for the next 10 days
                                </p>
                            </motion.div>

                            {/* Feature 2 */}
                            <motion.div
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="text-6xl mb-4"
                                >
                                    ⭐
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Save Favorites
                                </h3>
                                <p className="text-white/80">
                                    Bookmark special weather days and add personal notes
                                </p>
                            </motion.div>

                            {/* Feature 3 */}
                            <motion.div
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="text-6xl mb-4"
                                >
                                    🌡️
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Detailed Data
                                </h3>
                                <p className="text-white/80">
                                    Get comprehensive weather metrics including temperature, humidity, and more
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 py-8 px-6 text-center text-white/60">
                    <p>Built with Laravel & React • Powered by OpenWeatherMap</p>
                </footer>
            </div>
        </>
    );
}
