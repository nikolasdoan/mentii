'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'mentor', text: 'Hi! Thanks for unlocking my contact info. How can I help you today?', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Hi Sarah, I am looking for help with System Design interviews.', time: '10:05 AM' },
        { id: 3, sender: 'mentor', text: 'Great! I have a lot of experience with that. When are you free to chat?', time: '10:10 AM' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { id: Date.now(), sender: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setInput('');

        // Auto reply
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'mentor', text: "Sounds good! Let's book a session.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        }, 1000);
    };

    return (
        <main className="flex flex-col h-screen max-h-screen bg-gray-50">
            <div className="bg-white border-b px-4 py-3 flex items-center gap-3 shrink-0">
                <Link href="/search" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 relative overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="object-cover" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">Sarah Chen</div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                            <span className="block h-2 w-2 rounded-full bg-green-500"></span> Online
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-gray-800 rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border-t p-4 shrink-0">
                <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Type a message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="rounded-full h-10 w-10 p-0 flex items-center justify-center">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </main>
    );
}
