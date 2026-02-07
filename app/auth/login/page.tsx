'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import { Zap, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { isValidEduEmail, cn } from '@/lib/utils';
import { toast } from 'sonner';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUserType } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // OTP State
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const role = searchParams.get('role');

    const handleLogin = (provider: string) => {
        setError('');

        if (provider === 'email') {
            if (!email) {
                setError('Please enter your email address.');
                return;
            }
            if (!isValidEduEmail(email)) {
                setError('Please use a valid education email (.edu, .ac, etc).');
                return;
            }

            // Start OTP Flow
            setIsLoading(true);
            setTimeout(() => {
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                setGeneratedOtp(code);
                setStep('otp');
                setIsLoading(false);

                // Show toast with code for demo
                toast.success(`Verification code sent to ${email}`, {
                    description: `Your code is: ${code} (Demo mode)`,
                    duration: 10000,
                });
            }, 800);
            return;
        }

        setIsLoading(true);
        // Fake delay
        setTimeout(() => {
            if (role === 'mentor') {
                setUserType('mentor');
                router.push('/dashboard/mentor');
            } else {
                router.push('/search');
            }
        }, 800);
    };

    const verifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (otp !== generatedOtp && otp !== '123456') { // Allow 123456 as master code
            setError('Invalid code. Please try again.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            if (role === 'mentor') {
                setUserType('mentor');
                router.push('/dashboard/mentor');
            } else {
                router.push('/search');
            }
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
                            <span className="bg-white px-2 text-gray-500">Or continue with education email</span>
                        </div>
                    </div>

                    {step === 'email' ? (
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin('email'); }}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Education Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cn(
                                        "mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1",
                                        error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    )}
                                    placeholder="you@university.edu"
                                />
                                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                            </div>
                            <Button type="submit" className="w-full h-12" disabled={isLoading}>
                                {isLoading ? 'Sending code...' : 'Continue with Email'}
                            </Button>
                        </form>
                    ) : (
                        <form className="space-y-4" onSubmit={verifyOtp}>
                            <button
                                type="button"
                                onClick={() => { setStep('email'); setError(''); }}
                                className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-2"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" /> Change email
                            </button>

                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Verification Code</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="otp"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                        className={cn(
                                            "block w-full rounded-md border text-center text-2xl tracking-widest px-3 py-3 shadow-sm focus:outline-none focus:ring-1",
                                            error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        )}
                                        placeholder="000000"
                                    />
                                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                                    <p className="mt-2 text-xs text-gray-500 text-center">
                                        We sent a code to <span className="font-medium text-gray-900">{email}</span>
                                    </p>
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
