'use client';

import { Mentor } from '@/types';
import { Button } from '@/components/ui/Button';
import { X, Check } from 'lucide-react';

interface ComparePanelProps {
    mentors: Mentor[];
    onRemove: (mentorId: string) => void;
    onClear: () => void;
}

export function ComparePanel({ mentors, onRemove, onClear }: ComparePanelProps) {
    if (mentors.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 transform transition-transform animate-in slide-in-from-bottom duration-300">
            <div className="container mx-auto max-w-6xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Compare Mentors ({mentors.length})</h3>
                    <Button variant="ghost" size="sm" onClick={onClear}>Clear All</Button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:overflow-visible">
                    {mentors.map(mentor => (
                        <div key={mentor.id} className="border rounded-lg p-3 relative bg-gray-50 flex gap-3 min-w-[280px] snap-center md:min-w-0">
                            <button
                                onClick={() => onRemove(mentor.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <img src={mentor.avatar} alt={mentor.name} className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />

                            <div className="text-sm">
                                <div className="font-medium truncate pr-6">{mentor.name}</div>
                                <div className="text-gray-500">${mentor.priceStart}/hr</div>
                                <div className="flex items-center gap-2 mt-1 text-xs">
                                    <span className="font-semibold text-yellow-600">★ {mentor.rating}</span>
                                    <span className="text-gray-400">|</span>
                                    <span>{mentor.responseRate}% Resp.</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {mentors.length === 2 && (
                        <div className="hidden lg:flex items-center justify-center border-dashed border-2 rounded-lg text-gray-400 text-sm p-4">
                            Add one more to compare
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
