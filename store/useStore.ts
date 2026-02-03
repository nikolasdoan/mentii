import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RequestStatus, UserRole } from '../types';

interface StoreState {
    currentUserType: UserRole;
    currentUserId: string; // ID of the current user (mentee or mentor)
    unlockedMentors: string[]; // List of mentor IDs whose contact info is unlocked
    requests: Record<string, RequestStatus>; // Map of mentorId -> status
    bookings: string[]; // List of mentor IDs booked

    // Actions
    setUserType: (type: UserRole) => void;
    unlockMentor: (mentorId: string) => void;
    sendRequest: (mentorId: string) => void;
    updateRequestStatus: (mentorId: string, status: RequestStatus) => void;
    bookMentor: (mentorId: string) => void;

    // Selectors (helpers)
    isUnlocked: (mentorId: string) => boolean;
    getRequestStatus: (mentorId: string) => RequestStatus;
    resetDemo: () => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            currentUserType: 'mentee',
            currentUserId: 'm1', // Default to Alice
            unlockedMentors: [],
            requests: {},
            bookings: [],

            setUserType: (type) => set({ currentUserType: type }),

            unlockMentor: (mentorId) =>
                set((state) => ({
                    unlockedMentors: [...state.unlockedMentors, mentorId]
                })),

            sendRequest: (mentorId) =>
                set((state) => ({
                    requests: { ...state.requests, [mentorId]: 'pending' }
                })),

            updateRequestStatus: (mentorId, status) =>
                set((state) => ({
                    requests: { ...state.requests, [mentorId]: status }
                })),

            bookMentor: (mentorId) =>
                set((state) => ({
                    bookings: [...state.bookings, mentorId]
                })),

            isUnlocked: (mentorId) => get().unlockedMentors.includes(mentorId),

            getRequestStatus: (mentorId) => get().requests[mentorId] || 'none',

            resetDemo: () => set({
                currentUserType: 'mentee',
                unlockedMentors: [],
                requests: {},
                bookings: []
            })
        }),
        {
            name: 'mentii-storage',
        }
    )
);
