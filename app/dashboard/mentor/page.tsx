'use client';

import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { MOCK_MENTEES } from '@/data/mentees';
import { Badge } from '@/components/ui/Badge';
import { Check, X, Clock, User, DollarSign, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function MentorDashboard() {
    const { currentUserId, requests, updateRequestStatus, currentUserType } = useStore();

    // In a real app we'd fetch the mentor profile. Here we assume we are simulating "Sarah Chen" (id: 1) or whoever is currentUserId.
    // But wait, the store defaults currentUserId to 'm1' (Alice). 
    // If the user switched to 'mentor', we should probably treat them as one of the mentors. 
    // For the demo, let's say when you are in 'mentor' mode, you view the dashboard AS "Sarah Chen" (id: 1) for simplicity 
    // OR we just check if there are ANY requests for ANY mentor and show them for demo purposes.
    // The PRD says: "Mentor dashboard shows a new request (fake routing)".
    // Let's assume the user IS the mentor they sent a request to? 
    // Or better: The Dashboard shows "Incoming Requests" for ALL mentors that have requests, effectively acting as "The Admin/Mentor View".
    // This makes the demo smoother: You request "Sarah", switch to Mentor Mode, and see the request for Sarah.

    const activeRequests = Object.entries(requests).map(([mentorId, status]) => ({
        mentorId,
        status
    })).filter(r => r.status === 'pending');

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
                    <p className="text-gray-500">Manage your profile and requests</p>
                </div>
                <Badge variant="outline" className="px-3 py-1">Verified Mentor</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">$1,250</div>
                        <div className="text-sm text-gray-500">Earnings this month</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <User className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">12</div>
                        <div className="text-sm text-gray-500">Active Mentees</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <BarChart className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">98%</div>
                        <div className="text-sm text-gray-500">Response Rate</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-900">Incoming Requests</h2>
                    <Badge variant="secondary">{activeRequests.length} Pending</Badge>
                </div>

                {activeRequests.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No new requests pending.</p>
                        <p className="text-sm">Switch to Mentee mode and request a mentor to see it here.</p>
                        <Link href="/search">
                            <Button variant="outline" className="mt-4">Go to Search</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y">
                        {activeRequests.map((req, index) => {
                            // Fake mentee data
                            const mentee = MOCK_MENTEES[index % MOCK_MENTEES.length];
                            return (
                                <div key={req.mentorId} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <img src={mentee.avatar} alt="Mentee" className="h-12 w-12 rounded-full" />
                                        <div>
                                            <div className="font-medium text-gray-900">{mentee.name}</div>
                                            <div className="text-sm text-gray-500">Wants to book a session</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => updateRequestStatus(req.mentorId, 'rejected')}
                                        >
                                            <X className="h-4 w-4 mr-2" /> Reject
                                        </Button>
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={() => updateRequestStatus(req.mentorId, 'approved')}
                                        >
                                            <Check className="h-4 w-4 mr-2" /> Approve
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="mt-8 bg-white rounded-xl border shadow-sm p-6">
                <h2 className="font-bold text-lg text-gray-900 mb-4">Profile Settings</h2>
                <form className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Headline</label>
                        <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" defaultValue="Senior Software Engineer at Google" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                        <input type="number" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" defaultValue="150" />
                    </div>
                    <div className="pt-2">
                        <Button>Save Changes</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
