import { Button } from '@/components/ui/Button';

interface FilterSidebarProps {
    filters: {
        topic: string;
        language: string;
        country: string;
        maxPrice: number;
        sortBy: string;
    };
    setFilters: (filters: any) => void;
    uniqueTags: string[];
    uniqueLanguages: string[];
    uniqueCountries: string[];
}

export function FilterSidebar({ filters, setFilters, uniqueTags, uniqueLanguages, uniqueCountries }: FilterSidebarProps) {

    const handleChange = (key: string, value: any) => {
        setFilters((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-full md:w-64 space-y-6 shrink-0">
            <div>
                <h3 className="font-semibold mb-3">Topic / Skill</h3>
                <select
                    className="w-full border rounded-md p-2 bg-white"
                    value={filters.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                >
                    <option value="">All Topics</option>
                    {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Country</h3>
                <select
                    className="w-full border rounded-md p-2 bg-white"
                    value={filters.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                >
                    <option value="">All Countries</option>
                    {uniqueCountries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Language</h3>
                <select
                    className="w-full border rounded-md p-2 bg-white"
                    value={filters.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                >
                    <option value="">All Languages</option>
                    {uniqueLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            <div>
                <h3 className="font-semibold mb-3 flex justify-between">
                    <span>Max Price</span>
                    <span className="text-gray-500 font-normal">${filters.maxPrice}/hr</span>
                </h3>
                <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={filters.maxPrice}
                    onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$10</span>
                    <span>$500+</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Sort By</h3>
                <div className="space-y-2">
                    {[
                        { label: 'Recommended', value: 'recommended' },
                        { label: 'Price: Low to High', value: 'price_asc' },
                        { label: 'Price: High to Low', value: 'price_desc' },
                        { label: 'Highest Rated', value: 'rating' },
                        { label: 'Newest', value: 'newest' },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sortBy"
                                value={option.value}
                                checked={filters.sortBy === option.value}
                                onChange={(e) => handleChange('sortBy', e.target.value)}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full text-gray-500 hover:text-red-500"
                    onClick={() => setFilters({ topic: '', language: '', country: '', maxPrice: 500, sortBy: 'recommended' })}
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}
