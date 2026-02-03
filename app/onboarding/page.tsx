'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, GraduationCap, Briefcase, School, User, BookOpen, Target, Sparkles, Code, Globe, PenTool } from 'lucide-react';
import { cn } from '@/components/ui/Button';

// Step Data
const SEGMENTS = [
    { id: 'High School', label: 'High School Student', icon: School, desc: 'Looking for college prep & tutoring' },
    { id: 'University', label: 'University Student', icon: GraduationCap, desc: 'Need help with courses or career' },
    { id: 'Professional', label: 'Working Professional', icon: Briefcase, desc: 'Upskilling or career pivoting' },
    { id: 'Manager', label: 'Manager / Executive', icon: User, desc: 'Leadership & management skills' },
    { id: 'Other', label: 'Lifelong Learner', icon: Sparkles, desc: 'Just learning for fun' },
];

const GOALS = [
    'Improve Grades', 'Learn a New Skill', 'Career Advancement', 'Interview Prep', 'Personal Project', 'Certification'
];

const INTERESTS = [
    { id: 'Tech', label: 'Technology & Coding', icon: Code },
    { id: 'Languages', label: 'Languages', icon: Globe },
    { id: 'Business', label: 'Business & Finance', icon: Briefcase },
    { id: 'Design', label: 'Design & Creative', icon: PenTool },
    { id: 'Academics', label: 'Academic Subjects', icon: BookOpen },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { updateMenteeProfile } = useStore();
    const [step, setStep] = useState(1);

    // Form State
    const [segment, setSegment] = useState<string>('');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [level, setLevel] = useState<string>('');

    const nextStep = () => setStep(s => s + 1);

    const handleComplete = () => {
        updateMenteeProfile({
            segment: segment as any,
            goals: selectedGoals,
            interests: selectedInterests,
            level: level as any
        });

        // Simulate "Processing" then redirect
        setTimeout(() => {
            router.push('/explore');
        }, 800);
    };

    const toggleSelection = (list: string[], setList: (L: string[]) => void, item: string) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    // Animation Variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <main className="min-h-screen bg-white flex flex-col md:flex-row">
            {/* Left Panel: Progress & Context */}
            <div className="w-full md:w-1/3 bg-blue-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/50 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 font-bold text-xl mb-12">
                        <Sparkles className="h-6 w-6" />
                        <span>Mentii</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        Let's personalize your experience.
                    </h1>
                    <p className="text-blue-100 text-lg">
                        We'll help you find the perfect mentors based on your goals and interests.
                    </p>
                </div>

                <div className="relative z-10 mt-8">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2 text-blue-200">
                        <span>Step {step} of 3</span>
                    </div>
                    <div className="w-full bg-blue-800/50 h-2 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white transition-all duration-500 ease-out"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="w-full md:w-2/3 p-8 md:p-24 flex flex-col justify-center bg-gray-50/50">
                <AnimatePresence mode="wait">

                    {/* STEP 1: SEGMENT */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-2xl w-full mx-auto"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Which describes you best?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {SEGMENTS.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setSegment(s.id)}
                                        className={cn(
                                            "flex items-start gap-4 p-6 rounded-xl border text-left transition-all hover:scale-[1.02] duration-200",
                                            segment === s.id
                                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2"
                                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                                        )}
                                    >
                                        <div className={cn("p-3 rounded-lg shrink-0", segment === s.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500")}>
                                            <s.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className={cn("font-bold text-lg mb-1", segment === s.id ? "text-blue-900" : "text-gray-900")}>{s.label}</div>
                                            <div className="text-sm text-gray-500 leading-snug">{s.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-10 flex justify-end">
                                <Button size="lg" disabled={!segment} onClick={nextStep} className="px-8 text-lg">
                                    Next Step <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: GOALS & INTERESTS */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-2xl w-full mx-auto space-y-10"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What are your main goals?</h2>
                                <div className="flex flex-wrap gap-3">
                                    {GOALS.map((g) => (
                                        <button
                                            key={g}
                                            onClick={() => toggleSelection(selectedGoals, setSelectedGoals, g)}
                                            className={cn(
                                                "px-5 py-3 rounded-full border text-sm font-medium transition-all",
                                                selectedGoals.includes(g)
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                            )}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Any specific interests?</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {INTERESTS.map((i) => (
                                        <button
                                            key={i.id}
                                            onClick={() => toggleSelection(selectedInterests, setSelectedInterests, i.id)}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all h-32",
                                                selectedInterests.includes(i.id)
                                                    ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                                                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                            )}
                                        >
                                            <i.icon className={cn("h-8 w-8 mb-3", selectedInterests.includes(i.id) ? "text-blue-600" : "text-gray-400")} />
                                            {i.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-6">
                                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                <Button size="lg" disabled={selectedGoals.length === 0} onClick={nextStep} className="px-8 text-lg">
                                    Next Step <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: LEVEL & FINISH */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-2xl w-full mx-auto"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">What is your current experience level?</h2>

                            <div className="space-y-4 mb-10">
                                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLevel(l)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-6 rounded-xl border transition-all text-left",
                                            level === l ? "bg-green-50 border-green-500 ring-1 ring-green-500" : "bg-white border-gray-200 hover:border-gray-300"
                                        )}
                                    >
                                        <div>
                                            <div className="font-bold text-lg text-gray-900">{l}</div>
                                            <div className="text-gray-500">I want to {l === 'Beginner' ? 'learn the basics' : l === 'Intermediate' ? 'improve my existing skills' : 'master advanced concepts'}</div>
                                        </div>
                                        {level === l && <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white"><Check className="h-4 w-4" /></div>}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-6">
                                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                                <Button
                                    size="lg"
                                    disabled={!level}
                                    onClick={handleComplete}
                                    className="px-8 text-lg bg-green-600 hover:bg-green-700"
                                >
                                    Finish Setup <Check className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </main>
    );
}
