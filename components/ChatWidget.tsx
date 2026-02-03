'use client';

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { X, Send, User, ChevronLeft, Minimize2 } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "./ui/Button";

interface Message {
    id: number;
    sender: 'me' | 'other';
    text: string;
}

interface Conversation {
    id: string;
    name: string;
    role: string; // 'System Admin' | 'Mentor' | 'Mentee'
    avatar?: string;
    messages: Message[];
}

import { MessageSquare } from "lucide-react";

// ... existing imports

export function ChatWidget() {
    const { isChatOpen, toggleChat, currentUserType } = useStore();
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");

    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: 'admin',
            name: 'System Admin',
            role: 'Support',
            messages: [
                { id: 1, sender: 'other', text: 'Welcome to Mentii! Let us know if you need help getting started.' }
            ]
        },
        {
            id: 'peer',
            name: currentUserType === 'mentee' ? 'Sarah Chen' : 'Alice Wang',
            role: currentUserType === 'mentee' ? 'Mentor' : 'Mentee',
            avatar: currentUserType === 'mentee' ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            messages: [
                { id: 1, sender: 'other', text: currentUserType === 'mentee' ? 'Hi there! Thanks for your request. I would love to help you with React.' : 'Hi Sarah! I really admire your work. Can we book a session?' }
            ]
        }
    ]);

    const activeConv = conversations.find(c => c.id === activeConversationId);

    const handleSend = () => {
        if (!inputText.trim() || !activeConv) return;

        const newMessage: Message = { id: Date.now(), sender: 'me', text: inputText };

        setConversations(prev => prev.map(c => {
            if (c.id === activeConversationId) {
                return { ...c, messages: [...c.messages, newMessage] };
            }
            return c;
        }));
        setInputText("");

        // Auto reply
        setTimeout(() => {
            setConversations(prev => prev.map(c => {
                if (c.id === activeConversationId) {
                    return { ...c, messages: [...c.messages, { id: Date.now() + 1, sender: 'other', text: "Thanks for the message! I'll get back to you shortly." }] };
                }
                return c;
            }));
        }, 1500);
    };

    if (!isChatOpen) {
        return (
            <button
                onClick={toggleChat}
                className="fixed bottom-6 left-6 z-50 h-14 w-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200"
            >
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
        );
    }

    return (
        <div className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-200 ease-in-out origin-bottom-left" style={{ height: '500px' }}>
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    {activeConversationId && (
                        <button onClick={() => setActiveConversationId(null)} className="hover:bg-blue-700 p-1 rounded">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    )}
                    <h3 className="font-bold">{activeConv ? activeConv.name : 'Messages'}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={toggleChat} className="hover:bg-blue-700 p-1 rounded">
                        <Minimize2 className="h-4 w-4" />
                    </button>
                    <button onClick={toggleChat} className="hover:bg-blue-700 p-1 rounded">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
                {!activeConversationId ? (
                    // Conversation List
                    <div className="divide-y">
                        {conversations.map(conv => (
                            <div
                                key={conv.id}
                                className="p-4 hover:bg-white cursor-pointer transition-colors flex items-center gap-3"
                                onClick={() => setActiveConversationId(conv.id)}
                            >
                                <div className="relative">
                                    {conv.avatar ? (
                                        <img src={conv.avatar} alt={conv.name} className="h-10 w-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                            <User className="h-6 w-6" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-semibold text-gray-900 truncate">{conv.name}</h4>
                                        <span className="text-xs text-gray-500">Just now</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{conv.messages[conv.messages.length - 1].text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Chat Thread
                    <div className="p-4 space-y-4">
                        {activeConv?.messages.map(msg => (
                            <div key={msg.id} className={cn("flex", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                                <div className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                    msg.sender === 'me'
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white border text-gray-800 rounded-bl-none shadow-sm"
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Area (Only in thread view) */}
            {activeConversationId && (
                <div className="p-4 bg-white border-t">
                    <form
                        className="flex gap-2"
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <Button type="submit" size="sm" className="rounded-full h-10 w-10 p-0 flex items-center justify-center">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
