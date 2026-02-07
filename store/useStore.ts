import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RequestStatus, UserRole, Mentee, MentorApplication, Mentor } from '../types';

interface StoreState {
    currentUserType: UserRole;
    currentUserId: string; // ID of the current user (mentee or mentor)
    menteeProfile: Partial<Mentee>; // Current mentee's profile data
    mentorApplication: Partial<MentorApplication>;
    unlockedMentors: string[]; // List of mentor IDs whose contact info is unlocked
    requests: Record<string, RequestStatus>; // Map of mentorId -> status
    bookings: string[]; // List of mentor IDs booked
    communityMentors: Mentor[]; // User-generated mentors
    currentUser: Mentee | Mentor | undefined; // Derived helper

    // Actions
    setUserId: (id: string) => void;
    setUserType: (type: UserRole) => void;
    updateMenteeProfile: (data: Partial<Mentee>) => void;
    updateMentorApplication: (data: Partial<MentorApplication>) => void;
    updateMentorProfile: (data: Partial<Mentor>) => void;
    unlockMentor: (mentorId: string) => void;
    sendRequest: (mentorId: string) => void;
    updateRequestStatus: (mentorId: string, status: RequestStatus) => void;
    bookMentor: (mentorId: string) => void;
    addCommunityMentor: (mentor: Mentor) => void;

    // Selectors (helpers)
    isUnlocked: (mentorId: string) => boolean;
    getRequestStatus: (mentorId: string) => RequestStatus;
    isChatOpen: boolean;
    toggleChat: () => void;
    resetDemo: () => void;
    tutorialSeen: boolean;
    setTutorialSeen: (seen: boolean) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            currentUserType: 'mentee',
            currentUserId: 'm1', // Default to Alice
            currentUser: undefined,
            menteeProfile: {},
            mentorApplication: { step: 1, expertise: { tags: [] } as any, credentials: [], verification: {} as any, assessment: {} as any },
            unlockedMentors: [],
            requests: {},
            bookings: [],
            communityMentors: [],
            isChatOpen: false,
            tutorialSeen: false,

            setTutorialSeen: (seen) => set({ tutorialSeen: seen }),

            setUserType: (type) => set({ currentUserType: type }),

            updateMenteeProfile: (data) => set((state) => ({
                menteeProfile: { ...state.menteeProfile, ...data }
            })),

            updateMentorApplication: (data) => set((state) => {
                const current = state.mentorApplication || {};
                // Deep merge for nested objects if needed, but simple spread is fine for top level partials.
                // For deep nested updates (like expertise), we might need to be careful, but we'll handle that in the component or simple spread here.
                // Let's do a shallow merge of the top level properties, and rely on the caller to provide full objects for nested fields if they change.
                /* 
                   Actually, a better way for nested updates in Zustand simple setters is to just Merge.
                   let's do a simple merge.
                */
                return { mentorApplication: { ...state.mentorApplication, ...data } };
            }),

            toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

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

            setUserId: (id) => set({ currentUserId: id }),

            updateMentorProfile: (data) => set((state) => ({
                communityMentors: state.communityMentors.map(m =>
                    m.id === state.currentUserId ? { ...m, ...data } : m
                )
            })),

            addCommunityMentor: (mentor) =>
                set((state) => ({
                    communityMentors: [mentor, ...state.communityMentors]
                })),

            isUnlocked: (mentorId) => get().unlockedMentors.includes(mentorId),

            getRequestStatus: (mentorId) => get().requests[mentorId] || 'none',

            resetDemo: () => set({
                currentUserType: 'mentee',
                unlockedMentors: [],
                requests: {},
                bookings: [],
                tutorialSeen: false
            })
        }),
        {
            name: 'mentii-storage',
        }
    )
);
