'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { MOCK_MENTORS } from '@/data/mentors';
import { MentorCard } from '@/components/MentorCard';
import { Button } from '@/components/ui/Button';
import { X, Heart, RefreshCw, Zap } from 'lucide-react';

export default function ExplorePage() {
    const [cards, setCards] = useState(MOCK_MENTORS);
    const [result, setResult] = useState<'like' | 'pass' | null>(null);

    const activeCard = cards[cards.length - 1];

    const removeCard = (id: string, action: 'like' | 'pass') => {
        setResult(action);
        setTimeout(() => {
            setCards((prev) => prev.filter((c) => c.id !== id));
            setResult(null);
        }, 200);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative">

                <div className="text-center mb-8 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-blue-100 text-blue-600 text-sm font-medium mb-2 backdrop-blur-sm">
                        <Zap className="h-4 w-4 fill-current" />
                        <span>Discover Mentors</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find your match, learn new things</h1>
                </div>

                <div className="relative w-full max-w-sm h-[600px] perspective-1000">
                    <AnimatePresence>
                        {cards.length > 0 ? (
                            cards.map((mentor, index) => {
                                const isFront = index === cards.length - 1;
                                return (
                                    <SwipeableCard
                                        key={mentor.id}
                                        mentor={mentor}
                                        isFront={isFront}
                                        onSwipe={(dir) => removeCard(mentor.id, dir === 'right' ? 'like' : 'pass')}
                                    />
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl border p-8 text-center"
                            >
                                <div className="h-20 w-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                    <RefreshCw className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">That's everyone!</h3>
                                <p className="text-gray-500 mb-8">You've seen all available mentors for now. Check back later for new profiles.</p>
                                <Button onClick={() => setCards(MOCK_MENTORS)} size="lg">
                                    Start Over
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                {cards.length > 0 && (
                    <div className="flex items-center gap-6 mt-8 z-10">
                        <button
                            className="h-16 w-16 bg-white rounded-full shadow-lg border border-red-100 text-red-500 hover:bg-red-50 hover:scale-110 transition-all flex items-center justify-center"
                            onClick={() => removeCard(activeCard.id, 'pass')}
                        >
                            <X className="h-8 w-8" />
                        </button>
                        <button
                            className="h-16 w-16 bg-white rounded-full shadow-lg border border-green-100 text-green-500 hover:bg-green-50 hover:scale-110 transition-all flex items-center justify-center"
                            onClick={() => removeCard(activeCard.id, 'like')}
                        >
                            <Heart className="h-8 w-8 fill-current" />
                        </button>
                    </div>
                )}

            </div>
        </main>
    );
}

function SwipeableCard({ mentor, isFront, onSwipe }: { mentor: any, isFront: boolean, onSwipe: (dir: 'left' | 'right') => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const likeOpacity = useTransform(x, [10, 150], [0, 1]);
    const nopeOpacity = useTransform(x, [-10, -150], [0, 1]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    if (!isFront) {
        return (
            <div className="absolute inset-0 scale-95 opacity-50 top-4">
                <div className="w-full h-full bg-white rounded-3xl shadow-xl border overflow-hidden pointer-events-none select-none relative">
                    {/* Placeholder content for background cards to improve performance */}
                    <div className="h-32 bg-gray-200" />
                    <div className="p-6 space-y-4">
                        <div className="h-6 w-3/4 bg-gray-100 rounded" />
                        <div className="h-4 w-1/2 bg-gray-100 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            style={{ x, rotate, opacity, position: 'absolute', inset: 0, zIndex: 50 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing' }}
            className="cursor-grab touch-none"
        >
            <div className="w-full h-full bg-white rounded-3xl shadow-2xl border overflow-hidden relative">
                {/* Swipe Indicators */}
                <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-20 border-4 border-green-500 rounded-lg px-4 py-1 -rotate-12 bg-white/20 backdrop-blur-sm">
                    <span className="text-4xl font-bold text-green-500 uppercase tracking-widest">Like</span>
                </motion.div>
                <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-20 border-4 border-red-500 rounded-lg px-4 py-1 rotate-12 bg-white/20 backdrop-blur-sm">
                    <span className="text-4xl font-bold text-red-500 uppercase tracking-widest">Nope</span>
                </motion.div>

                {/* Card Content using existing MentorCard but tailored for full size */}
                <div className="h-full flex flex-col">
                    <div className="h-2/5 bg-gradient-to-b from-blue-50 to-white relative p-6 flex flex-col items-center justify-center text-center border-b border-gray-100">
                        <div className="relative mb-4">
                            <img src={mentor.avatar} alt={mentor.name} className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover bg-white" />
                            {mentor.isVerified && (
                                <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full ring-4 ring-white">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                        <p className="text-blue-600 font-medium">{mentor.headline.split('|')[0]}</p>
                    </div>

                    <div className="flex-1 p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-4">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-yellow-500 text-lg">★ {mentor.rating}</span>
                                <span>({mentor.reviewCount})</span>
                            </div>
                            <div>
                                {mentor.credentials[0]?.institution}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {mentor.tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 line-clamp-3 leading-relaxed">
                                {mentor.headline} • specializing in {mentor.tags.join(', ')}.
                                I can help you achieve your goals with personalized sessions depending on your needs.
                            </p>
                        </div>

                        <div className="mt-auto pt-4 border-t flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-gray-900">${mentor.priceStart}</span>
                                <span className="text-gray-500">/hr</span>
                            </div>
                            <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                                <Zap className="h-4 w-4" /> Very Responsive
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
