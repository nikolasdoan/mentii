'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const dates = [
        { day: 'Mon', date: 12 },
        { day: 'Tue', date: 13 },
        { day: 'Wed', date: 14 },
        { day: 'Thu', date: 15 },
        { day: 'Fri', date: 16 },
    ];

    const times = ['09:00 AM', '10:00 AM', '02:00 PM', '04:00 PM'];

    const handleConfirm = () => {
        setConfirmed(true);
    };

    if (confirmed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
                    <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-8">
                        Your session with Sarah Chen is set for {selectedTime}. You'll receive an email shortly.
                    </p>
                    <Link href="/dashboard/mentor">
                        <Button className="w-full">Return to Dashboard</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="bg-blue-600 p-6 text-white relative">
                    <Link href="/search" className="absolute top-6 left-6 text-white/80 hover:text-white">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <div className="text-center mt-4">
                        <h1 className="text-2xl font-bold">Book a Session</h1>
                        <p className="text-blue-100">with Sarah Chen</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="mb-8">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-500" /> Select Date
                        </h3>
                        <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                            {dates.map((d, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(d.date)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border w-20 shrink-0 transition-all ${selectedDate === d.date ? 'border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="text-xs font-medium uppercase text-gray-500">{d.day}</span>
                                    <span className="text-xl font-bold">{d.date}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`mb-8 transition-opacity ${selectedDate ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                        <h3 className="font-semibold text-gray-900 mb-4">Select Time</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {times.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${selectedTime === t ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        className="w-full h-12 text-lg"
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleConfirm}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </main>
    );
}
