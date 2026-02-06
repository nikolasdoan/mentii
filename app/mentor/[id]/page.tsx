'use client';

import { useParams, useRouter } from 'next/navigation';
import { MOCK_MENTORS } from '@/data/mentors';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UnlockModal } from '@/components/UnlockModal';
import { useState } from 'react';
import { ArrowLeft, MessageSquare, Calendar, Lock, Mail, Phone, MapPin, Globe, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MentorProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const mentor = MOCK_MENTORS.find(m => m.id === id);

    const { isUnlocked, unlockMentor, requests, sendRequest, getRequestStatus } = useStore();
    const [showUnlockModal, setShowUnlockModal] = useState(false);

    if (!mentor) {
        return <div className="p-10 text-center">Mentor not found</div>;
    }

    const unlocked = isUnlocked(mentor.id);
    const requestStatus = getRequestStatus(mentor.id);
    const isRequested = requestStatus === 'pending' || requestStatus === 'approved';

    const handleUnlockConfirm = () => {
        unlockMentor(mentor.id);
        setShowUnlockModal(false);
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Cover */}
            <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                <Link href="/search" className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" /> Back to Search
                </Link>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative">
                <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                                <img src={mentor.avatar} alt={mentor.name} className="h-full w-full object-cover" />
                            </div>
                            {mentor.isVerified && (
                                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full ring-4 ring-white" title="Verified Mentor">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4 pt-2">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    {mentor.name}
                                    {mentor.isNew && <Badge variant="success" className="text-sm">New</Badge>}
                                </h1>
                                <p className="text-xl text-gray-600 mt-1">{mentor.headline}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {mentor.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">{tag}</Badge>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 text-gray-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-500 font-bold text-lg">★ {mentor.rating}</span>
                                    <span className="underline decoration-dotted">{mentor.reviewCount} reviews</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Globe className="h-4 w-4" />
                                    {mentor.languages.join(', ')}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {mentor.timezone}
                                </div>
                            </div>
                        </div>

                        {/* Action Card */}
                        <div className="w-full md:w-80 bg-gray-50 rounded-xl p-6 border space-y-4 shrink-0">
                            <div className="text-center pb-4 border-b border-gray-200">
                                <div className="text-3xl font-bold text-gray-900">${mentor.priceStart}<span className="text-lg font-normal text-gray-500">/hr</span></div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    className={cn("w-full h-12 text-lg", isRequested ? "bg-green-600 hover:bg-green-700" : "")}
                                    disabled={isRequested}
                                    onClick={() => sendRequest(mentor.id)}
                                >
                                    {isRequested ? 'Request Sent ✓' : 'Request Mentor'}
                                </Button>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/chat" className={cn("block", !unlocked && "pointer-events-none")}>
                                        <Button variant="outline" className="w-full" disabled={!unlocked}>
                                            <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                        </Button>
                                    </Link>
                                    <Link href="/booking" className={cn("block", !unlocked && "pointer-events-none")}>
                                        <Button variant="outline" className="w-full" disabled={!unlocked}>
                                            <Calendar className="mr-2 h-4 w-4" /> Book
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {!unlocked && (
                                <div className="text-xs text-center text-gray-500">
                                    Unlock contact to chat & book
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Left col: Bio & Credentials */}
                        <div className="md:col-span-2 space-y-10">
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Experience & Credentials</h3>
                                <div className="space-y-4">
                                    {mentor.credentials.map((cred, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                                {cred.institution[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{cred.institution}</div>
                                                <div className="text-gray-600">{cred.description}</div>
                                                {cred.degree && <div className="text-sm text-gray-500">{cred.degree}</div>}
                                                {cred.testScore && <div className="text-sm font-medium text-blue-600">Score: {cred.testScore}</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Contact Info Section (Blur/Unlock) */}
                            <section className="bg-gradient-to-br from-gray-50 to-white border rounded-xl p-6 relative overflow-hidden">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    Contact Information
                                    {unlocked && <Badge variant="success" className="ml-2">Unlocked</Badge>}
                                </h3>

                                <div className={cn("space-y-4 transition-all duration-500", !unlocked && "blur-sm select-none opacity-50")}>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium">{mentor.contactInfo.email}</span>
                                    </div>
                                    {mentor.contactInfo.line && (
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">LINE</div>
                                            <span className="font-medium">ID: {mentor.contactInfo.line}</span>
                                        </div>
                                    )}
                                    {mentor.contactInfo.whatsapp && (
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">{mentor.contactInfo.whatsapp}</span>
                                        </div>
                                    )}
                                </div>

                                {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/30">
                                        <Button size="lg" className="shadow-xl" onClick={() => setShowUnlockModal(true)}>
                                            <Lock className="mr-2 h-4 w-4" />
                                            Unlock Contact Info ($5)
                                        </Button>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Right col: Reviews (Static placeholder) */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900">Reviews ({mentor.reviewCount})</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border-b pb-4 last:border-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-8 w-8 rounded-full bg-gray-200" />
                                            <div className="text-sm font-medium">Mentee User {i}</div>
                                        </div>
                                        <div className="flex text-yellow-400 text-xs mb-1">★★★★★</div>
                                        <p className="text-sm text-gray-600">"Great mentor! Really helped me understand the concepts."</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showUnlockModal && (
                <UnlockModal
                    mentorName={mentor.name}
                    price={5}
                    onClose={() => setShowUnlockModal(false)}
                    onConfirm={handleUnlockConfirm}
                />
            )}
        </main>
    );
}
