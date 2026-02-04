'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ChevronRight, X, MousePointerClick, Zap } from 'lucide-react';

export function DemoTutorial() {
    const { tutorialSeen, setTutorialSeen } = useStore();
    const [step, setStep] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [targetRect, setTargetRect] = useState<{ top: number, left: number, width: number, height: number } | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Steps configuration
    const steps = [
        {
            title: "Welcome to Mentii",
            text: "This is a functional demo of a mentorship platform. You can explore creating profiles, booking sessions, and more.",
            target: null, // Center
        },
        {
            title: "Navigation",
            text: "Use these links to browse mentors, view your dashboard, or search for specific topics.",
            target: "demo-nav-links"
        },
        {
            title: "Switch User Modes",
            text: "Want to see the app as a Mentor or Admin? Click here to instantly switch roles and test different workflows.",
            target: "demo-switch-mode"
        },
        {
            title: "Reset Anytime",
            text: "You can use the reset button (↺) in the header to clear data and start fresh.",
            target: null // Center finish
        }
    ];

    useEffect(() => {
        if (!tutorialSeen && mounted) {
            updateTarget();
            window.addEventListener('resize', updateTarget);
            return () => window.removeEventListener('resize', updateTarget);
        }
    }, [step, tutorialSeen, mounted]);

    const updateTarget = () => {
        const currentTargetId = steps[step].target;
        if (currentTargetId) {
            const el = document.getElementById(currentTargetId);
            if (el) {
                const rect = el.getBoundingClientRect();
                setTargetRect({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                });
            } else {
                setTargetRect(null); // Fallback to center if element not found (e.g. mobile hidden)
            }
        } else {
            setTargetRect(null);
        }
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setTutorialSeen(true);
        }
    };

    const handleSkip = () => {
        setTutorialSeen(true);
    };

    if (!mounted || tutorialSeen) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* Backdrop with hole or just overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-auto transition-opacity duration-300" />

            {/* Spotlight Effect (Visual only, simple implementation) */}
            {targetRect && (
                <motion.div
                    className="absolute bg-transparent border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] rounded-lg pointer-events-none transition-all duration-300 ease-in-out"
                    initial={false}
                    animate={{
                        top: targetRect.top - 8,
                        left: targetRect.left - 8,
                        width: targetRect.width + 16,
                        height: targetRect.height + 16
                    }}
                />
            )}

            {/* Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    className="absolute pointer-events-auto"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        // Position logic:
                        // If no target (Center), else position near target
                        top: targetRect ? targetRect.top + targetRect.height + 24 : '50%',
                        left: targetRect ? Math.min(window.innerWidth - 340, Math.max(20, targetRect.left)) : '50%',
                        x: targetRect ? 0 : '-50%',
                        y: targetRect ? 0 : '-50%',
                    }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-[320px] relative overflow-hidden">
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    {steps[step].target ? <MousePointerClick className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{steps[step].title}</h3>
                                    <div className="text-xs text-gray-400">Step {step + 1} of {steps.length}</div>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                {steps[step].text}
                            </p>

                            <div className="flex items-center justify-between">
                                <button onClick={handleSkip} className="text-xs text-gray-400 hover:text-gray-600 font-medium">
                                    Skip Tutorial
                                </button>
                                <Button size="sm" onClick={handleNext} className="gap-2">
                                    {step === steps.length - 1 ? "Get Started" : "Next"}
                                    <ChevronRight className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
