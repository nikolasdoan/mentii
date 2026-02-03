import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MOCK_MENTORS } from '@/data/mentors';
import { MentorCard } from '@/components/MentorCard';
import { CheckCircle, Search, Shield, Zap } from 'lucide-react';

export default function Home() {
  const featuredMentors = MOCK_MENTORS.filter(m => m.rating >= 4.9).slice(0, 4);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Over 300+ Active Mentors Online
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Master any skill with <span className="text-blue-600">expert mentors</span>.
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with industry leaders, language experts, and virtuosos.
            Swipe, compare, and book your first session in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-lg shadow-blue-200">
                Find a Mentor
              </Button>
            </Link>
            <Link href="/become-a-mentor">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg">
                Become a Mentor
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Verified Experts
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              Instant Chat
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Mentors</h2>
              <p className="text-gray-500 mt-2">Top rated experts ready to help you.</p>
            </div>
            <Link href="/search">
              <Button variant="ghost" className="text-blue-600">View All →</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
