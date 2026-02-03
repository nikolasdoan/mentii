'use client';

import { useState, useMemo } from 'react';
import { MOCK_MENTORS } from '@/data/mentors';
import { MentorCard } from '@/components/MentorCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ComparePanel } from '@/components/ComparePanel';
import { Mentor } from '@/types';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        topic: '',
        language: '',
        country: '',
        maxPrice: 500,
        sortBy: 'recommended',
    });

    const [compareList, setCompareList] = useState<Mentor[]>([]);

    // Derived data for dropdowns
    const uniqueTags = useMemo(() => Array.from(new Set(MOCK_MENTORS.flatMap(m => m.tags))).sort(), []);
    const uniqueLanguages = useMemo(() => Array.from(new Set(MOCK_MENTORS.flatMap(m => m.languages))).sort(), []);
    const uniqueCountries = useMemo(() => Array.from(new Set(MOCK_MENTORS.map(m => m.country))).sort(), []);

    // Filter Logic
    const filteredMentors = useMemo(() => {
        let result = MOCK_MENTORS;

        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.name.toLowerCase().includes(lowerQ) ||
                m.headline.toLowerCase().includes(lowerQ) ||
                m.tags.some(t => t.toLowerCase().includes(lowerQ))
            );
        }

        if (filters.topic) {
            result = result.filter(m => m.tags.includes(filters.topic));
        }

        if (filters.country) {
            result = result.filter(m => m.country === filters.country);
        }

        if (filters.language) {
            result = result.filter(m => m.languages.includes(filters.language));
        }

        if (filters.maxPrice < 500) {
            result = result.filter(m => m.priceStart <= filters.maxPrice);
        }

        // Sorting
        return result.sort((a, b) => {
            switch (filters.sortBy) {
                case 'price_asc': return a.priceStart - b.priceStart;
                case 'price_desc': return b.priceStart - a.priceStart;
                case 'rating': return b.rating - a.rating;
                case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); // Crude boolean sort
                default: return 0; // Default order
            }
        });
    }, [searchQuery, filters]);

    const toggleCompare = (mentor: Mentor) => {
        if (compareList.find(m => m.id === mentor.id)) {
            setCompareList(prev => prev.filter(m => m.id !== mentor.id));
        } else {
            if (compareList.length >= 3) {
                alert("You can compare up to 3 mentors at a time.");
                return;
            }
            setCompareList(prev => [...prev, mentor]);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Find your perfect mentor</h1>
                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
                    <div className="relative w-full max-w-2xl shrink-0">
                        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search by name, skill, or company..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['English', 'IELTS', 'SAT', 'K12 Exam'].map((tag) => {
                            const isActive = searchQuery === tag;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setSearchQuery(isActive ? '' : tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border ${isActive
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    uniqueTags={uniqueTags}
                    uniqueLanguages={uniqueLanguages}
                    uniqueCountries={uniqueCountries}
                />

                <div className="flex-1">
                    <div className="mb-4 text-sm text-gray-500">
                        Showing {filteredMentors.length} mentors
                    </div>

                    {filteredMentors.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredMentors.map(mentor => (
                                <MentorCard
                                    key={mentor.id}
                                    mentor={mentor}
                                    onCompareToggle={toggleCompare}
                                    isSelectedForCompare={!!compareList.find(m => m.id === mentor.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
                            <p className="text-gray-500">No mentors found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            <ComparePanel
                mentors={compareList}
                onRemove={(id) => setCompareList(prev => prev.filter(m => m.id !== id))}
                onClear={() => setCompareList([])}
            />
        </main>
    );
}
