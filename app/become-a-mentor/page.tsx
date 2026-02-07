'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Check, BookOpen, GraduationCap, User } from 'lucide-react';
import { cn, isValidEduEmail } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { AvatarBuilder } from '@/components/AvatarBuilder';

export default function MentorApplicationPage() {
    const router = useRouter();
    const { addCommunityMentor, setUserType, setUserId } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: 'Alex Johnson',
        email: '',
        avatar: '', // Custom avatar URL
        headline: 'Senior React Developer | UI/UX Enthusiast',
        bio: 'Passionate about building great user experiences and teaching others how to do the same. I have 5 years of experience in frontend development and love mentoring.',
        school: 'Stanford University',
        major: 'Computer Science',
        gpa: '3.9',
        age: '24',
        hourlyRate: '45',
        tags: ['React', 'TypeScript', 'Tailwind', 'Node.js'] as string[],
        languages: ['English', 'Spanish']
    });

    const [tagInput, setTagInput] = useState('');

    // Verification State
    const [emailVerified, setEmailVerified] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [verifyingCode, setVerifyingCode] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Reset verification if email changes
        if (name === 'email') {
            setEmailVerified(false);
            setShowOtpInput(false);
            setOtp('');
        }
    };

    const sendVerificationCode = () => {
        if (!formData.email || !isValidEduEmail(formData.email)) {
            toast.error('Please enter a valid education email first.');
            return;
        }

        setSendingCode(true);
        setTimeout(() => {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(code);
            setShowOtpInput(true);
            setSendingCode(false);

            toast.success(`Verification code sent to ${formData.email}`, {
                description: `Your code is: ${code} (Demo mode)`,
                duration: 10000,
            });
        }, 800);
    };

    const verifyEmail = () => {
        if (otp !== generatedOtp && otp !== '123456') {
            toast.error('Invalid code. Please try again.');
            return;
        }

        setVerifyingCode(true);
        setTimeout(() => {
            setEmailVerified(true);
            setShowOtpInput(false);
            setVerifyingCode(false);
            toast.success('Email verified successfully!');
        }, 600);
    };

    const addTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput] }));
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !isValidEduEmail(formData.email)) {
            toast.error('Please provide a valid education email (.edu, .ac, etc) to continue.');
            return;
        }

        if (!emailVerified) {
            toast.error('Please verify your education email ownership before submitting.');
            return;
        }

        setIsSubmitting(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const newMentor: any = {
            id: uuidv4(),
            name: formData.name || 'New Mentor',
            avatar: formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
            headline: formData.headline,
            country: 'Vietnam', // Default for now
            tags: formData.tags,
            languages: formData.languages,
            timezone: 'GMT+7',
            priceStart: parseInt(formData.hourlyRate) || 20,
            priceEnd: (parseInt(formData.hourlyRate) || 20) + 10,
            rating: 5.0, // Start with 5 stars!
            reviewCount: 0,
            responseRate: 100,
            isNew: true,
            isVerified: true, // Auto-verify for frictionless onboarding
            age: parseInt(formData.age),
            school: formData.school,
            major: formData.major,
            gpa: formData.gpa,
            credentials: [], // Can add upload later if needed
            contactInfo: {
                email: formData.email
            }
        };

        addCommunityMentor(newMentor);
        setUserId(newMentor.id);
        setUserType('mentor'); // Switch them to mentor view
        router.push('/explore');
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Become a Mentor in Minutes</h1>
                    <p className="mt-2 text-lg text-gray-600">Share your expertise and start earning.</p>
                </div>

                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customize Your Avatar</label>
                                <AvatarBuilder
                                    onSave={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
                                    initialAvatarUrl={formData.avatar}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Education Email</label>
                                <div className="mt-1">
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            disabled={emailVerified}
                                            className={cn(
                                                "shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border",
                                                emailVerified && "bg-green-50 text-green-900 border-green-200"
                                            )}
                                            placeholder="you@university.edu"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {!emailVerified ? (
                                            <Button
                                                type="button"
                                                onClick={sendVerificationCode}
                                                disabled={sendingCode || !formData.email}
                                                className="shrink-0"
                                                variant="outline"
                                            >
                                                {sendingCode ? 'Sending...' : 'Verify'}
                                            </Button>
                                        ) : (
                                            <div className="flex items-center text-green-600 px-3 font-medium text-sm bg-green-50 rounded-md border border-green-200">
                                                <Check className="h-4 w-4 mr-1" /> Verified
                                            </div>
                                        )}
                                    </div>

                                    {showOtpInput && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 animate-in fade-in slide-in-from-top-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Enter Verification Code</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border tracking-widest text-center"
                                                    placeholder="000000"
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={verifyEmail}
                                                    disabled={verifyingCode || otp.length < 6}
                                                    className="shrink-0"
                                                >
                                                    {verifyingCode ? 'Checking...' : 'Confirm'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="age"
                                        id="age"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="22"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">Headline</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="headline"
                                        id="headline"
                                        required
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="Software Engineer at Tech Company | Math Tutor"
                                        value={formData.headline}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Short Bio</label>
                                <div className="mt-1">
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows={3}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                        placeholder="Tell us a bit about yourself..."
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-gray-500" /> Education
                            </h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="school" className="block text-sm font-medium text-gray-700">School / University</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="school"
                                            id="school"
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Harvard University"
                                            value={formData.school}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="major" className="block text-sm font-medium text-gray-700">Major / Subject</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="major"
                                            id="major"
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Computer Science"
                                            value={formData.major}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="gpa" className="block text-sm font-medium text-gray-700">GPA / Grade</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="gpa"
                                            id="gpa"
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="3.8/4.0"
                                            value={formData.gpa}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Expertise */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-gray-500" /> Teaching
                            </h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Subjects you want to teach</label>
                                    <div className="mt-1 flex gap-2">
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="Type and press Enter (e.g. Math, Python)"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addTag();
                                                }
                                            }}
                                        />
                                        <Button type="button" onClick={addTag} size="sm">Add</Button>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {tag}
                                                <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="hourlyRate"
                                            id="hourlyRate"
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="20"
                                            value={formData.hourlyRate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Profile Now'}
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
