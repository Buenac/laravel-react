import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Favorites({ favorites }) {
    const [editingId, setEditingId] = useState(null);
    const [editNote, setEditNote] = useState('');

    const handleUpdate = (id) => {
        router.patch(`/weather-favorites/${id}`, {
            note: editNote,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingId(null);
                setEditNote('');
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this favorite?')) {
            router.delete(`/weather-favorites/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const startEdit = (favorite) => {
        setEditingId(favorite.id);
        setEditNote(favorite.note || '');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Weather Favorites
                </h2>
            }
        >
            <Head title="Weather Favorites" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Saved Weather Days</h3>

                            {favorites.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center py-8 text-gray-500"
                                >
                                    <p>No favorites saved yet.</p>
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="/weather"
                                        className="mt-4 inline-block text-indigo-600 hover:text-indigo-900"
                                    >
                                        Browse Weather Forecast
                                    </motion.a>
                                </motion.div>
                            ) : (
                                <AnimatePresence>
                                    <div className="space-y-4">
                                        {favorites.map((favorite, index) => (
                                            <motion.div
                                                key={favorite.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300"
                                            >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg text-gray-900">
                                                        {favorite.date}
                                                    </h4>
                                                    {editingId === favorite.id ? (
                                                        <div className="mt-2">
                                                            <textarea
                                                                value={editNote}
                                                                onChange={(e) => setEditNote(e.target.value)}
                                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                                rows="3"
                                                            />
                                                            <div className="mt-2 flex gap-2">
                                                                <button
                                                                    onClick={() => handleUpdate(favorite.id)}
                                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingId(null);
                                                                        setEditNote('');
                                                                    }}
                                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="mt-2 text-gray-600">
                                                            {favorite.note || 'No note added'}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Saved on {new Date(favorite.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                {editingId !== favorite.id && (
                                                    <div className="flex gap-2 ml-4">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => startEdit(favorite)}
                                                            className="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                                                        >
                                                            Edit
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleDelete(favorite.id)}
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                        >
                                                            Delete
                                                        </motion.button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-6"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            href="/weather"
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                        >
                            Back to Forecast
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
