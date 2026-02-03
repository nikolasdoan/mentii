'use client';

import { Button } from '@/components/ui/Button';
import { Check, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface UnlockModalProps {
    onClose: () => void;
    onConfirm: () => void;
    mentorName: string;
    price: number;
}

export function UnlockModal({ onClose, onConfirm, mentorName, price }: UnlockModalProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');

    const handlePay = () => {
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onConfirm();
            }, 1500);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative overflow-hidden">

                {step === 'select' && (
                    <>
                        <div className="mb-6 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Lock className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Unlock Contact Info</h3>
                            <p className="mt-2 text-gray-500">
                                Get direct access to {mentorName}'s email, WhatsApp, and Line ID.
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between rounded-lg border-2 border-blue-500 bg-blue-50 p-4 ring-1 ring-blue-500">
                                <div className="flex items-center gap-3">
                                    <div className="h-5 w-5 rounded-full border-2 border-blue-600 bg-blue-600 flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">Single Unlock</div>
                                        <div className="text-xs text-blue-700">One-time access</div>
                                    </div>
                                </div>
                                <div className="font-bold text-gray-900">$5.00</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
                            <ShieldCheck className="h-3 w-3" />
                            Secure payment powered by Stripe (Fake)
                        </div>

                        <div className="flex gap-3">
                            <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handlePay}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Pay $5.00
                            </Button>
                        </div>
                    </>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mb-4" />
                        <p className="text-gray-600 font-medium">Processing payment...</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 animate-bounce">
                            <Check className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
                        <p className="text-gray-500 mt-2">Unlocking contact details...</p>
                    </div>
                )}

            </div>
        </div>
    );
}
