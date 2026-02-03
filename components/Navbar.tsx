'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Layout, MessageSquare, User, Zap } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/components/ui/Button';

export function Navbar() {
    const { currentUserType, setUserType, requests, resetDemo } = useStore();
    const pathname = usePathname();
    const router = useRouter();

    const isMentor = currentUserType === 'mentor';

    const handleSwitchMode = () => {
        const newType = isMentor ? 'mentee' : 'mentor';
        setUserType(newType);
        if (newType === 'mentor') {
            router.push('/become-a-mentor');
        } else {
            router.push('/search');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
                        <Zap className="h-6 w-6" />
                        <span>Mentii</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link
                            href="/search"
                            className={cn("transition-colors hover:text-blue-600", pathname === '/search' && "text-blue-600")}
                        >
                            Browse Mentors
                        </Link>
                        {isMentor && (
                            <Link
                                href="/dashboard/mentor"
                                className={cn("transition-colors hover:text-blue-600", pathname?.startsWith('/dashboard') && "text-blue-600")}
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSwitchMode}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 border px-2 py-1 rounded"
                    >
                        Switch to {isMentor ? 'Mentee' : 'Mentor'} View
                    </button>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="relative">
                            <MessageSquare className="h-5 w-5" />
                        </Button>

                        {!isMentor ? (
                            <Link href="/auth/login">
                                <Button variant="primary" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" size="sm" className="gap-2">
                                <User className="h-4 w-4" />
                                Profile
                            </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => {
                            if (confirm('Reset Demo State?')) {
                                resetDemo();
                                window.location.reload();
                            }
                        }} title="Reset Demo">
                            ↺
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
