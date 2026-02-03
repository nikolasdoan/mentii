'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Zap } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (provider: string) => {
        setIsLoading(true);
        // Fake delay
        setTimeout(() => {
            router.push('/search');
        }, 800);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your Mentii account
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <Button
                        variant="outline"
                        className="w-full h-12 relative"
                        onClick={() => handleLogin('google')}
                        disabled={isLoading}
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 absolute left-4" alt="Google" />
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full h-12 relative"
                        onClick={() => handleLogin('github')}
                        disabled={isLoading}
                    >
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="h-5 w-5 absolute left-4" alt="Github" />
                        Continue with GitHub
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin('email'); }}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
