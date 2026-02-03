export type Mentor = {
    id: string;
    name: string;
    avatar: string;
    headline: string;
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
};

export type Mentee = {
    id: string;
    name: string;
    avatar: string;
};

export type UserRole = 'mentor' | 'mentee' | 'admin';

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'none';
