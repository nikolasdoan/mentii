'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Zap, LayoutDashboard, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

export function MobileNav() {
    const pathname = usePathname();
    const { currentUserType } = useStore();

    if (pathname === '/onboarding' || pathname.startsWith('/auth')) return null;

    const navItems = [
        {
            label: 'Home',
            href: '/',
            icon: Home,
            show: true
        },
        {
            label: 'Search',
            href: '/search',
            icon: Search,
            show: currentUserType === 'mentee'
        },
        {
            label: 'Explore', // The swipe interface
            href: '/explore',
            icon: Zap,
            show: currentUserType === 'mentee'
        },
        {
            label: 'Dashboard',
            href: currentUserType === 'mentor' ? '/dashboard/mentor' : '/dashboard/mentee',
            icon: LayoutDashboard,
            show: true
        },
        {
            label: currentUserType === 'mentor' ? 'Profile' : 'Me',
            href: currentUserType === 'mentor' ? '/dashboard/mentor/profile' : '/dashboard/mentee/profile',
            icon: User,
            show: true
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden pb-safe">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                {navItems.filter(item => item.show).slice(0, 5).map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group transition-colors",
                                isActive ? "text-blue-600" : "text-gray-500"
                            )}
                        >
                            <Icon className={cn("w-6 h-6 mb-1", isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900")} />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
