'use client';

import { Calendar, Clock, Video, FileText, Download, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

// Mock Data
const UPCOMING_SESSIONS = [
    {
        id: 1,
        mentor: { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'Senior Software Engineer' },
        topic: 'System Design Interview Prep',
        date: 'Today, Feb 3',
        time: '4:00 PM - 5:00 PM',
        status: 'upcoming',
        link: '/video-call/1'
    },
    {
        id: 2,
        mentor: { name: 'Michael Chang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', role: 'Math Tutor' },
        topic: 'Calculus Review: Derivatives',
        date: 'Wed, Feb 5',
        time: '10:00 AM - 11:00 AM',
        status: 'scheduled',
        link: '#'
    },
    {
        id: 3,
        mentor: { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'Senior Software Engineer' },
        topic: 'Mock Interview: Algorithms',
        date: 'Fri, Feb 7',
        time: '2:00 PM - 3:00 PM',
        status: 'scheduled',
        link: '#'
    }
];

const PAST_SESSIONS = [
    {
        id: 101,
        mentor: { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        topic: 'Intro to System Design',
        date: 'Jan 28',
        rating: 5
    },
    {
        id: 102,
        mentor: { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
        topic: 'Investment Banking 101',
        date: 'Jan 20',
        rating: 4
    }
];

const RESOURCES = [
    { type: 'pdf', title: 'System Design Cheatsheet.pdf', size: '2.4 MB', date: 'Shared today' },
    { type: 'video', title: 'Session Recording: Jan 28', size: '450 MB', date: 'Jan 28' },
    { type: 'link', title: 'Recommended Reading List', size: 'External', date: 'Jan 15' },
];

export default function MenteeDashboard() {
    return (
        <main className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Learning Schedule</h1>
                    <p className="text-gray-500">Track your sessions and progress</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border">
                    Current Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Schedule */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Next Session Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">Up Next</Badge>
                                <div className="text-right">
                                    <div className="text-3xl font-bold">Today</div>
                                    <div className="text-blue-100">4:00 PM</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <img src={UPCOMING_SESSIONS[0].mentor.avatar} alt="Mentor" className="h-16 w-16 rounded-full border-2 border-white/50" />
                                <div>
                                    <h2 className="text-2xl font-bold">{UPCOMING_SESSIONS[0].topic}</h2>
                                    <p className="text-blue-100 flex items-center gap-2">
                                        with {UPCOMING_SESSIONS[0].mentor.name}
                                        <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                                        {UPCOMING_SESSIONS[0].mentor.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button className="bg-white text-blue-600 hover:bg-blue-50 border-0 font-semibold px-6">
                                    <Video className="h-4 w-4 mr-2" />
                                    Join Meeting
                                </Button>
                                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                                    Reschedule
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming List */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            Upcoming Sessions
                        </h3>
                        <div className="bg-white rounded-xl border shadow-sm divide-y">
                            {UPCOMING_SESSIONS.slice(1).map(session => (
                                <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 text-blue-600 rounded-lg">
                                            <span className="text-xs font-bold uppercase">{session.date.split(',')[0]}</span>
                                            <span className="text-lg font-bold">{session.date.split(' ')[2]}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{session.topic}</div>
                                            <div className="text-sm text-gray-500">
                                                {session.time} • with {session.mentor.name}
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </Button>
                                </div>
                            ))}
                            <div className="p-3 text-center">
                                <button className="text-sm text-blue-600 font-medium hover:underline">View Full Calendar</button>
                            </div>
                        </div>
                    </div>

                    {/* Past Sessions */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            Past Sessions
                        </h3>
                        <div className="bg-white rounded-xl border shadow-sm divide-y">
                            {PAST_SESSIONS.map(session => (
                                <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <img src={session.mentor.avatar} alt="Mentor" className="h-10 w-10 rounded-full grayscale opacity-70" />
                                        <div>
                                            <div className="font-medium text-gray-900">{session.topic}</div>
                                            <div className="text-sm text-gray-500">
                                                {session.date} • with {session.mentor.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(session.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sidebar: Resources */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl border shadow-sm p-5">
                        <h3 className="font-bold text-gray-900 mb-4">Class Resources</h3>
                        <div className="space-y-3">
                            {RESOURCES.map((res, i) => (
                                <div key={i} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <div className="p-2 bg-gray-100 rounded text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">{res.title}</div>
                                        <div className="text-xs text-gray-500 flex justify-between mt-1">
                                            <span>{res.date}</span>
                                            <span>{res.size}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">View All Files</Button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-blue-100 p-5">
                        <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-700 mb-4">
                            Have questions about your upcoming session? Chat with your mentor beforehand.
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            Message Mentor
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
