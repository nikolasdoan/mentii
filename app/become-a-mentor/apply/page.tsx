'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, Upload, Video, Shield, Award, BookOpen, User, FileText, Camera } from 'lucide-react';
import { cn } from '@/components/ui/Button';

// Steps
const STEPS = [
    { number: 1, title: 'Expertise', icon: BookOpen },
    { number: 2, title: 'Credentials', icon: Award },
    { number: 3, title: 'Verification', icon: Shield },
    { number: 4, title: 'Assessment', icon: FileText },
    { number: 5, title: 'Intro Video', icon: Video },
];

export default function MentorApplicationPage() {
    const router = useRouter();
    const { mentorApplication, updateMentorApplication } = useStore();
    const [step, setStep] = useState(mentorApplication.step || 1);
    const [succeeded, setSucceeded] = useState(false);

    // Local state for form fields (sync to store on next)
    const [headline, setHeadline] = useState(mentorApplication.expertise?.headline || '');
    const [bio, setBio] = useState(mentorApplication.expertise?.bio || '');
    const [tags, setTags] = useState<string[]>(mentorApplication.expertise?.tags || []);
    const [tagInput, setTagInput] = useState('');

    const [uploadedDocs, setUploadedDocs] = useState<any[]>(mentorApplication.credentials || []);
    const [idDoc, setIdDoc] = useState(mentorApplication.verification?.documentUrl || '');

    // Quiz State
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

    // Video State
    const [videoUrl, setVideoUrl] = useState(mentorApplication.assessment?.videoUrl || '');

    const handleNext = () => {
        // Save current step data
        if (step === 1) {
            updateMentorApplication({ expertise: { headline, bio, tags } });
        } else if (step === 2) {
            updateMentorApplication({ credentials: uploadedDocs });
        } else if (step === 3) {
            updateMentorApplication({ verification: { documentUrl: idDoc } });
        } else if (step === 4) {
            // Calculate score mockup
            updateMentorApplication({ assessment: { ...mentorApplication.assessment, score: 100 } as any });
        } else if (step === 5) {
            updateMentorApplication({ assessment: { ...mentorApplication.assessment, videoUrl } as any, status: 'submitted' });
            setSucceeded(true);
            setTimeout(() => {
                router.push('/dashboard/mentor'); // Redirect to dashboard (which should ideally show "Pending" state)
            }, 3000);
            return;
        }

        setStep(s => s + 1);
        updateMentorApplication({ step: step + 1 });
    };

    const handleBack = () => {
        setStep(s => s - 1);
    };

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const simulateUpload = (setter: any, type: string) => {
        // Mock upload delay
        setTimeout(() => {
            if (type === 'list') {
                setter((prev: any) => [...prev, { id: Date.now().toString(), name: 'Certificate.pdf', fileUrl: '#' }]);
            } else {
                setter('mock_url_to_doc.jpg');
            }
        }, 1000);
    };

    if (succeeded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="text-center p-8">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
                    <p className="text-gray-600 mb-8">We have received your details. Our team will review them shortly.</p>
                    <div className="animate-pulse text-sm text-green-700 font-medium">Redirecting to your dashboard...</div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-purple-600">
                        <Shield className="h-6 w-6" />
                        <span>Mentii Verification</span>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                        Step {step} of 5
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-gray-100 w-full">
                    <motion.div
                        className="h-full bg-purple-600"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step / 5) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">
                <AnimatePresence mode="wait">

                    {/* STEP 1: EXPERTISE */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Expertise</h2>
                                <p className="text-gray-500">Tell us what you teach and your experience level.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="e.g. Senior Software Engineer at Google"
                                        value={headline}
                                        onChange={e => setHeadline(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills / Topics (Tags)</label>
                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {tags.map(t => (
                                            <span key={t} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1">
                                                {t} <button onClick={() => setTags(tags.filter(x => x !== t))} className="hover:text-purple-900">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                                            placeholder="Add a skill (e.g. Python)"
                                            value={tagInput}
                                            onChange={e => setTagInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addTag()}
                                        />
                                        <Button onClick={addTag} disabled={!tagInput}>Add</Button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Introduction</label>
                                    <textarea
                                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none h-32"
                                        placeholder="Briefly describe your teaching style and experience..."
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: CREDENTIALS */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Credentials & Certificates</h2>
                                <p className="text-gray-500">Upload degrees, certifications, or awards to build trust.</p>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => simulateUpload(setUploadedDocs, 'list')}>
                                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Upload className="h-8 w-8" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Click to Upload</h3>
                                <p className="text-sm text-gray-500 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                            </div>

                            {uploadedDocs.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                                    {uploadedDocs.map(doc => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium">{doc.name}</span>
                                            </div>
                                            <div className="text-green-500 text-sm flex items-center gap-1">
                                                <Check className="h-3 w-3" /> Uploaded
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 3: ID VERIFICATION (KYC) */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
                                <p className="text-gray-500">We require a valid government ID to verify your identity. This is kept private.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-purple-500 transition-all cursor-pointer" onClick={() => simulateUpload(setIdDoc, 'single')}>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Upload ID</h3>
                                        <p className="text-xs text-gray-500">Passport or Driver's License</p>
                                    </div>
                                </div>
                                <div className="border rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-purple-500 transition-all cursor-pointer" onClick={() => simulateUpload(setIdDoc, 'single')}>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Camera className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Take a Photo</h3>
                                        <p className="text-xs text-gray-500">Use your webcam</p>
                                    </div>
                                </div>
                            </div>

                            {idDoc && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span className="text-green-700 font-medium">Identity Document Received</span>
                                </div>
                            )}

                            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                                <Shield className="h-5 w-5 shrink-0" />
                                <p>Your data is encrypted and secure. We only use this for verification purposes and do not share it with third parties.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: ASSESSMENT */}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Teaching Style Assessment</h2>
                                <p className="text-gray-500">Answer a few questions to help us understand your methodology.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-gray-900">1. How do you handle a student who is struggling to understand a concept?</h3>
                                    {[
                                        "Repeat the same explanation until they get it.",
                                        "Break it down into smaller steps and use analogies.",
                                        "Tell them to study more before the next session.",
                                        "Move on to a different topic."
                                    ].map((opt, i) => (
                                        <label key={i} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input type="radio" name="q1" className="h-5 w-5 text-purple-600" onChange={() => setQuizAnswers({ ...quizAnswers, 1: i })} checked={quizAnswers[1] === i} />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-gray-900">2. What is your primary goal as a mentor?</h3>
                                    {[
                                        "To show off my knowledge.",
                                        "To empower the student to solve problems independently.",
                                        "To complete the session as quickly as possible.",
                                        "To get high ratings."
                                    ].map((opt, i) => (
                                        <label key={i} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input type="radio" name="q2" className="h-5 w-5 text-purple-600" onChange={() => setQuizAnswers({ ...quizAnswers, 2: i })} checked={quizAnswers[2] === i} />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: INTRO VIDEO */}
                    {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Introduction Video</h2>
                                <p className="text-gray-500">Record a 30-60 second video introducing yourself to future mentees.</p>
                            </div>

                            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                {videoUrl ? (
                                    <div className="w-full h-full flex items-center justify-center bg-black">
                                        <span className="text-white font-medium">Video Uploaded (Preview Mock)</span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer" onClick={() => simulateUpload(setVideoUrl, 'single')}>
                                            <Video className="h-8 w-8" />
                                        </div>
                                        <p className="text-gray-400">Click to Upload or Record</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700 space-y-2">
                                <h4 className="font-bold flex items-center gap-2"><Award className="h-4 w-4" /> Tips for a great video:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Ensure good lighting and clear audio.</li>
                                    <li>Smile and be energetic!</li>
                                    <li>Mention your experience and what students can expect.</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
                        Back
                    </Button>
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={
                            (step === 1 && (!headline || tags.length === 0)) ||
                            (step === 3 && !idDoc) ||
                            (step === 4 && Object.keys(quizAnswers).length < 2) ||
                            (step === 5 && !videoUrl)
                        }
                        className="px-8"
                    >
                        {step === 5 ? 'Submit Application' : 'Next Step'} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </main>
    );
}
