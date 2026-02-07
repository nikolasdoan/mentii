export type Mentor = {
    id: string;
    name: string;
    avatar: string;
    headline: string;
    country: string;
    tags: string[];
    languages: string[];
    timezone: string;
    priceStart: number;
    priceEnd: number;
    rating: number;
    reviewCount: number;
    responseRate: number;
    credentials: {
        institution: string;
        degree?: string;
        testScore?: string;
        description: string;
    }[];
    contactInfo: {
        email: string;
        line?: string;
        whatsapp?: string;
    };
    isNew?: boolean;
    isVerified?: boolean;
    age?: number;
    school?: string;
    major?: string;
    gpa?: string;
};

export type Mentee = {
    id: string;
    name: string;
    avatar: string;
    segment?: 'High School' | 'University' | 'Professional' | 'Manager' | 'Other';
    goals?: string[];
    interests?: string[];
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type UserRole = 'mentor' | 'mentee' | 'admin';

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'none';

export type ApplicationStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export type MentorApplication = {
    id: string;
    step: number;
    status: ApplicationStatus;
    expertise: {
        headline: string;
        tags: string[];
        bio: string;
    };
    credentials: {
        id: string;
        name: string;
        fileUrl: string;
    }[];
    verification: {
        documentUrl: string;
    };
    assessment: {
        score: number;
        videoUrl: string;
    };
};
