'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronRight, ChevronLeft, RefreshCw, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mappings based on DiceBear Avataaars v7 Schema
// Colors must be hex codes (without #)

const SKIN_COLORS = {
    'Pale': 'f8d25c',
    'Light': 'ffdbb4',
    'Tanned': 'edb98a',
    'Brown': 'd08b5b',
    'Dark Brown': 'ae5d29',
    'Black': '614335'
};

const HAIR_COLORS = {
    'Auburn': 'a55728',
    'Black': '2c1b18',
    'Blonde': 'b58143',
    'Brown': '724133',
    'Pastel Pink': 'f59797',
    'Platinum': 'ecdcbf',
    'Red': 'c93305',
    'Silver Gray': 'e8e1e1'
};

const OPTIONS = {
    top: [
        // 'longHair', 'shortHair', 'eyepatch' removed as they are invalid in v7
        'shortFlat', 'shortRound', 'shortWaved', 'longButNotTooLong',
        'hat', 'hijab', 'turban',
        'winterHat1', 'winterHat02', 'winterHat03',
        'bob', 'bun', 'curly', 'curvy', 'dreads', 'frida', 'fro', 'froBand',
        'shavedSides', 'straight01', 'straight02'
    ],
    accessories: [
        'none', 'kurt', 'prescription01', 'prescription02', 'round',
        'sunglasses', 'wayfarers', 'eyepatch' // eyepatch moved here
    ],
    hairColor: Object.keys(HAIR_COLORS),
    facialHair: [
        'none', 'beardLight', 'beardMajestic', 'beardMedium', 'moustacheFancy',
        'moustacheMagnum'
    ],
    clothing: [
        'blazerAndShirt', 'blazerAndSweater', 'collarAndSweater', 'graphicShirt',
        'hoodie', 'overall', 'shirtCrewNeck', 'shirtScoopNeck', 'shirtVNeck'
    ],
    skinColor: Object.keys(SKIN_COLORS),
    eyes: [
        'default', 'happy', 'wink', 'hearts', 'side', 'squint', 'surprised', 'winkWacky', 'eyeRoll'
    ],
    mouth: [
        'default', 'smile', 'serious', 'tongue', 'twinkle', 'concerned', 'grimace', 'sad', 'screamOpen'
    ]
};

interface AvatarBuilderProps {
    initialAvatarUrl?: string;
    onSave: (url: string) => void;
}

export function AvatarBuilder({ initialAvatarUrl, onSave }: AvatarBuilderProps) {
    // Fix hydration mismatch: Use fixed seed initially, randomize on client mount if no initial url
    const [seed, setSeed] = useState('felix');
    const [isClient, setIsClient] = useState(false);

    const [config, setConfig] = useState({
        top: 'shortFlat', // changed default to a valid v7 option
        accessories: 'none',
        hairColor: 'Brown',
        facialHair: 'none',
        clothing: 'hoodie',
        skinColor: 'Light',
        eyes: 'default',
        mouth: 'default'
    });

    // Handle client-side initialization
    useEffect(() => {
        setIsClient(true);
        if (!initialAvatarUrl) {
            setSeed(Math.random().toString(36).substring(7));
        }
    }, [initialAvatarUrl]);

    // Parse initial URL if provided to set initial state (simplified parsing)
    useEffect(() => {
        if (initialAvatarUrl && initialAvatarUrl.includes('dicebear')) {
            try {
                const url = new URL(initialAvatarUrl);
                const params = new URLSearchParams(url.search);
                const newConfig = { ...config };

                if (params.get('seed')) setSeed(params.get('seed')!);

                // Reverse lookup for colors
                const findColorName = (map: Record<string, string>, hex: string) =>
                    Object.keys(map).find(key => map[key] === hex) || hex;

                Object.keys(config).forEach(key => {
                    let value = params.get(key);
                    if (value) {
                        if (key === 'skinColor') value = findColorName(SKIN_COLORS, value);
                        if (key === 'hairColor') value = findColorName(HAIR_COLORS, value);

                        // Check validity loosely
                        // @ts-ignore
                        if (OPTIONS[key] && OPTIONS[key].includes(value)) {
                            // @ts-ignore
                            newConfig[key as keyof typeof config] = value;
                        }
                    }
                });

                setConfig(newConfig);
            } catch (e) {
                console.error("Failed to parse avatar URL", e);
            }
        }
    }, []);

    const getAvatarUrl = () => {
        const baseUrl = 'https://api.dicebear.com/7.x/avataaars/svg';

        // Map display names back to API values
        const finalConfig: any = {
            ...config,
            // @ts-ignore
            skinColor: SKIN_COLORS[config.skinColor] || config.skinColor,
            // @ts-ignore
            hairColor: HAIR_COLORS[config.hairColor] || config.hairColor,
        };

        // Filter out 'none' values so we don't send them to the API
        // The API treats missing keys as "off" or default, whereas sending "none" causes 400 error
        if (finalConfig.accessories === 'none') {
            delete finalConfig.accessories;
            finalConfig.accessoriesProbability = 0;
        } else {
            finalConfig.accessoriesProbability = 100;
        }
        if (finalConfig.facialHair === 'none') {
            delete finalConfig.facialHair;
            finalConfig.facialHairProbability = 0; // Ensure it's off
        } else {
            finalConfig.facialHairProbability = 100; // Ensure it's on if selected
        }

        const params = new URLSearchParams();
        params.append('seed', seed);

        Object.keys(finalConfig).forEach(key => {
            params.append(key, finalConfig[key]);
        });

        return `${baseUrl}?${params.toString()}`;
    };

    const randomize = () => {
        setSeed(Math.random().toString(36).substring(7));
        const newConfig = { ...config };
        Object.keys(OPTIONS).forEach(key => {
            const options = OPTIONS[key as keyof typeof OPTIONS];
            // @ts-ignore
            newConfig[key] = options[Math.floor(Math.random() * options.length)];
        });

        // User request: Facial hair should be 'none' by default when randomizing
        newConfig.facialHair = 'none';

        setConfig(newConfig);
    };

    const handleChange = (key: keyof typeof config, value: string) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    // Auto-save whenever config changes
    useEffect(() => {
        onSave(getAvatarUrl());
    }, [config, seed]);

    const activeUrl = getAvatarUrl();

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Preview */}
                <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                    <div className="relative w-48 h-48 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 shadow-inner">
                        <img
                            src={activeUrl}
                            alt="Avatar Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={randomize}
                        className="flex items-center gap-2"
                        type="button"
                    >
                        <Shuffle className="h-4 w-4" /> Randomize
                    </Button>
                </div>

                {/* Controls */}
                <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(OPTIONS).map(([key, values]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').trim().replace('top', 'Hairstyle');
                        return (
                            <div key={key} className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 capitalize">
                                    {label}
                                </label>
                                <select
                                    value={config[key as keyof typeof config]}
                                    onChange={(e) => handleChange(key as keyof typeof config, e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                >
                                    {values.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.replace(/([A-Z])/g, ' $1').trim()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
