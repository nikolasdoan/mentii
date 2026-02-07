'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { AvatarBuilder } from '@/components/AvatarBuilder';
import { toast } from 'sonner';

export default function MentorProfilePage() {
    const { currentUserId, communityMentors, updateMentorProfile } = useStore();
    const currentUser = communityMentors.find(m => m.id === currentUserId);
    const [isSaving, setIsSaving] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || '');

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // In a real app, we'd update the backend. 
        if (currentUser) {
            updateMentorProfile({ avatar: avatarUrl });
            toast.success('Profile updated successfully!');
        } else {
            toast.error('Failed to update profile. User not found.');
        }

        setIsSaving(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Your Avatar</h2>
                    <AvatarBuilder
                        initialAvatarUrl={avatarUrl}
                        onSave={setAvatarUrl}
                    />
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
