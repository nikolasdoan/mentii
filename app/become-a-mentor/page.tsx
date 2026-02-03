import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle, DollarSign, Globe, Users, Zap } from 'lucide-react';
import { MOCK_MENTORS } from '@/data/mentors';

export default function MentorLandingPage() {
    const topEarnings = "$1,200 - $5,000";

    return (
        <main className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-purple-50 to-white pt-24 pb-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        Growing 40% Month over Month
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                        Share your expertise. <br />
                        <span className="text-purple-600">Get matched with thousands.</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Turn your experience into income. Mentii connects you with motivated learners worldwide who are ready to book your time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/auth/login?role=mentor">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200">
                                Start Mentoring
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            Set Your Own Rates
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-purple-600" />
                            Global Reach
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            Instant Payouts
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats/Social Proof */}
            <section className="py-20 bg-white border-y">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-gray-900 mb-2">50,000+</div>
                            <div className="text-gray-500">Active Mentees</div>
                        </div>
                        <div className="p-6 border-x-0 md:border-x">
                            <div className="text-4xl font-bold text-gray-900 mb-2">$2M+</div>
                            <div className="text-gray-500">Paid to Mentors</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
                            <div className="text-gray-500">Countries Represented</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How Mentii Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center relative">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
                            <h3 className="text-xl font-bold mb-3">Create Profile</h3>
                            <p className="text-gray-600">List your skills, set your hourly rate, and add your availability.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center relative">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
                            <h3 className="text-xl font-bold mb-3">Get Requests</h3>
                            <p className="text-gray-600">Mentees find you through our smart matching. Approve requests that fit.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center relative">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
                            <h3 className="text-xl font-bold mb-3">Earn Money</h3>
                            <p className="text-gray-600">Chat, book sessions, and get paid securely. Keep 90% of your earnings.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Join Top Mentors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MOCK_MENTORS.slice(0, 3).map(mentor => (
                            <div key={mentor.id} className="border p-6 rounded-xl bg-gray-50">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={mentor.avatar} alt={mentor.name} className="h-12 w-12 rounded-full" />
                                    <div>
                                        <div className="font-bold text-gray-900">{mentor.name}</div>
                                        <div className="text-sm text-gray-500">{mentor.headline}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"Mentii has completely transformed how I finding clients. I'm fully booked two weeks in advance!"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-purple-900 py-20">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to inspire the next generation?</h2>
                    <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of mentors who are making a difference and earning a side income.
                    </p>
                    <Link href="/auth/login?role=mentor">
                        <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 h-14 px-8 text-lg font-bold">
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
