import { Mentor } from '../types';

export const MOCK_MENTORS: Mentor[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        headline: 'Senior Software Engineer at Google | Ex-Amazon',
        tags: ['Software Engineering', 'System Design', 'Python'],
        languages: ['English', 'Mandarin'],
        timezone: 'UTC-8',
        priceStart: 150,
        priceEnd: 200,
        rating: 4.9,
        reviewCount: 42,
        responseRate: 98,
        isVerified: true,
        credentials: [
            { institution: 'Google', description: 'Senior Software Engineer (3 yrs)' },
            { institution: 'Stanford University', degree: 'MS Computer Science', description: 'Focus on AI' }
        ],
        contactInfo: { email: 'sarah.c@example.com', line: 'sarah_code' }
    },
    {
        id: '2',
        name: 'James Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        headline: 'Product Manager helping you break into PM',
        tags: ['Product Management', 'Interview Prep', 'Strategy'],
        languages: ['English'],
        timezone: 'UTC-5',
        priceStart: 100,
        priceEnd: 150,
        rating: 4.8,
        reviewCount: 28,
        responseRate: 95,
        isNew: true,
        credentials: [
            { institution: 'Uber', description: 'Product Manager' },
            { institution: 'MBA', description: 'Kellogg School of Management' }
        ],
        contactInfo: { email: 'j.wilson@example.com' }
    },
    {
        id: '3',
        name: 'Yuki Tanaka',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
        headline: 'Digital Artist & Illustrator | Freelance',
        tags: ['Digital Art', 'Illustration', 'Procreate'],
        languages: ['English', 'Japanese'],
        timezone: 'UTC+9',
        priceStart: 50,
        priceEnd: 80,
        rating: 5.0,
        reviewCount: 15,
        responseRate: 100,
        credentials: [
            { institution: 'ArtStation', description: 'Featured Artist' },
            { institution: 'Tokyo University of the Arts', degree: 'BFA', description: 'Fine Arts' }
        ],
        contactInfo: { email: 'yuki.art@example.com', whatsapp: '+819012345678' }
    },
    {
        id: '4',
        name: 'Michael Chang',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        headline: 'SAT Math Tutor with perfect score',
        tags: ['Math', 'SAT Prep', 'Calculus'],
        languages: ['English', 'Cantonese'],
        timezone: 'UTC-5',
        priceStart: 40,
        priceEnd: 60,
        rating: 4.7,
        reviewCount: 89,
        responseRate: 92,
        credentials: [
            { institution: 'SAT', testScore: '1600/1600', description: 'Perfect Score' },
            { institution: 'MIT', degree: 'BS Mathematics', description: 'Undergraduate' }
        ],
        contactInfo: { email: 'm.chang@example.com' }
    },
    {
        id: '5',
        name: 'Amelia Rodriguez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
        headline: 'Guitar Instructor - Classical & Acoustic',
        tags: ['Guitar', 'Music Theory', 'Songwriting'],
        languages: ['English', 'Spanish'],
        timezone: 'UTC+1',
        priceStart: 30,
        priceEnd: 50,
        rating: 4.9,
        reviewCount: 56,
        responseRate: 90,
        isVerified: true,
        credentials: [
            { institution: 'Berklee College of Music', description: 'Online Certificate' }
        ],
        contactInfo: { email: 'amelia.g@example.com' }
    },
    {
        id: '6',
        name: 'David Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        headline: 'Investment Banking Associate at Goldman Sachs',
        tags: ['Finance', 'Investment Banking', 'Excel'],
        languages: ['English', 'Korean'],
        timezone: 'UTC-5',
        priceStart: 200,
        priceEnd: 300,
        rating: 5.0,
        reviewCount: 12,
        responseRate: 85,
        credentials: [
            { institution: 'Goldman Sachs', description: 'Associate' },
            { institution: 'Wharton', degree: 'BBA', description: 'Finance' }
        ],
        contactInfo: { email: 'dkim.finance@example.com' }
    },
    {
        id: '7',
        name: 'Elena Popova',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        headline: 'Russian Language Tutor - Native Speaker',
        tags: ['Russian', 'Language Learning', 'Literature'],
        languages: ['Russian', 'English'],
        timezone: 'UTC+3',
        priceStart: 25,
        priceEnd: 40,
        rating: 4.8,
        reviewCount: 30,
        responseRate: 99,
        isNew: true,
        credentials: [
            { institution: 'Moscow State University', degree: 'BA Linguistics', description: 'Linguistics' }
        ],
        contactInfo: { email: 'elena.rus@example.com' }
    },
    {
        id: '8',
        name: 'Robert Fox',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
        headline: 'Piano Teacher for all ages',
        tags: ['Piano', 'Music', 'Jazz'],
        languages: ['English'],
        timezone: 'UTC-8',
        priceStart: 60,
        priceEnd: 90,
        rating: 4.6,
        reviewCount: 104,
        responseRate: 96,
        credentials: [
            { institution: 'Juilliard', description: 'Summer Intensive' }
        ],
        contactInfo: { email: 'bobby.keys@example.com' }
    },
    {
        id: '9',
        name: 'Priya Patel',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        headline: 'Frontend Developer (React/Vue) | UI/UX Enthusiast',
        tags: ['Web Development', 'React', 'JavaScript'],
        languages: ['English', 'Hindi'],
        timezone: 'UTC+5.5',
        priceStart: 35,
        priceEnd: 55,
        rating: 4.9,
        reviewCount: 22,
        responseRate: 94,
        credentials: [
            { institution: 'Freelance', description: 'Top Rated Upwork' }
        ],
        contactInfo: { email: 'priya.dev@example.com' }
    },
    {
        id: '10',
        name: 'Marcus Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        headline: 'Fitness Coach & Personal Trainer',
        tags: ['Fitness', 'Nutrition', 'Weight Loss'],
        languages: ['English'],
        timezone: 'UTC-5',
        priceStart: 70,
        priceEnd: 100,
        rating: 5.0,
        reviewCount: 45,
        responseRate: 97,
        isVerified: true,
        credentials: [
            { institution: 'NASM', description: 'Certified Personal Trainer' }
        ],
        contactInfo: { email: 'mj.fit@example.com' }
    },
    // Add 20 more to reach 30? I'll use a loop-like structure or just copy paste mock patterns with slight variations to ensure density.
    // For the sake of tokens and speed, I will generate a diverse set but maybe stick to 15 distinct ones and then replicate with slight ID/Name changes if needed to reach exactly 30, or just create 20 high quality ones. The PRD asks for 30.
    // I will generate unique ones.
    {
        id: '11', name: 'Linda Xu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda', headline: 'Data Scientist at Airbnb', tags: ['Data Science', 'Python', 'Machine Learning'], languages: ['English', 'Chinese'], timezone: 'UTC-8', priceStart: 120, priceEnd: 180, rating: 4.9, reviewCount: 18, responseRate: 90, credentials: [{ institution: 'Airbnb', description: 'Data Scientist' }], contactInfo: { email: 'linda.xu@example.com' }
    },
    {
        id: '12', name: 'Tom Baker', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom', headline: 'English Conversation Partner', tags: ['English', 'Conversation'], languages: ['English'], timezone: 'UTC+0', priceStart: 20, priceEnd: 30, rating: 4.5, reviewCount: 200, responseRate: 99, credentials: [{ institution: 'TEFL', description: 'Certified' }], contactInfo: { email: 'tom.speak@example.com' }
    },
    {
        id: '13', name: 'Sophie Martin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie', headline: 'French Tutor | Alliance Française', tags: ['French', 'Language'], languages: ['French', 'English'], timezone: 'UTC+1', priceStart: 40, priceEnd: 60, rating: 4.8, reviewCount: 50, responseRate: 95, credentials: [{ institution: 'Sorbonne', degree: 'MA Lit', description: 'French Literature' }], contactInfo: { email: 'sophie.fr@example.com' }
    },
    {
        id: '14', name: 'Carlos Mendez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', headline: 'Spanish for Business', tags: ['Spanish', 'Business'], languages: ['Spanish', 'English'], timezone: 'UTC-5', priceStart: 45, priceEnd: 70, rating: 4.7, reviewCount: 33, responseRate: 92, credentials: [{ institution: 'Business School', description: 'MBA' }], contactInfo: { email: 'carlos.m@example.com' }
    },
    {
        id: '15', name: 'Anna Kowalski', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', headline: 'Biology Tutor | Pre-Med Advice', tags: ['Biology', 'Science', 'Pre-Med'], languages: ['English', 'Polish'], timezone: 'UTC-6', priceStart: 35, priceEnd: 55, rating: 4.9, reviewCount: 14, responseRate: 98, isNew: true, credentials: [{ institution: 'Medical School', description: 'Student' }], contactInfo: { email: 'anna.bio@example.com' }
    },
    {
        id: '16', name: 'Kenji Sato', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji', headline: 'Japanese Calligraphy & Culture', tags: ['Japanese', 'Culture', 'Art'], languages: ['Japanese', 'English'], timezone: 'UTC+9', priceStart: 40, priceEnd: 60, rating: 5.0, reviewCount: 10, responseRate: 100, credentials: [{ institution: 'Master Calligrapher', description: '20 years exp' }], contactInfo: { email: 'kenji.arts@example.com' }
    },
    {
        id: '17', name: 'Rachel Green', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RachelG', headline: 'Fashion Design & Styling', tags: ['Fashion', 'Design'], languages: ['English'], timezone: 'UTC-5', priceStart: 80, priceEnd: 120, rating: 4.6, reviewCount: 67, responseRate: 88, credentials: [{ institution: 'Ralph Lauren', description: 'Designer' }], contactInfo: { email: 'rachel.style@example.com' }
    },
    {
        id: '18', name: 'Omar Hassan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', headline: 'Arabic Language & Quran', tags: ['Arabic', 'Religion'], languages: ['Arabic', 'English'], timezone: 'UTC+3', priceStart: 25, priceEnd: 40, rating: 4.9, reviewCount: 80, responseRate: 96, credentials: [{ institution: 'Al-Azhar', description: 'Graduate' }], contactInfo: { email: 'omar.h@example.com' }
    },
    {
        id: '19', name: 'Julia Roberts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia', headline: 'Acting Coach | Screen & Stage', tags: ['Acting', 'Drama', 'Public Speaking'], languages: ['English'], timezone: 'UTC-8', priceStart: 100, priceEnd: 150, rating: 4.7, reviewCount: 25, responseRate: 90, credentials: [{ institution: 'Actors Studio', description: 'Member' }], contactInfo: { email: 'julia.act@example.com' }
    },
    {
        id: '20', name: 'Lars Jensen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lars', headline: 'Full Stack Dev | Node/React', tags: ['Web Development', 'Node.js', 'React'], languages: ['English', 'Danish'], timezone: 'UTC+1', priceStart: 60, priceEnd: 90, rating: 4.8, reviewCount: 38, responseRate: 94, credentials: [{ institution: 'Spotify', description: 'Engineer' }], contactInfo: { email: 'lars.dev@example.com' }
    },
    // 21-30 abbreviated
    { id: '21', name: 'Maria Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', headline: 'Spanish Tutor', tags: ['Spanish'], languages: ['Spanish'], timezone: 'UTC-5', priceStart: 20, priceEnd: 30, rating: 4.5, reviewCount: 10, responseRate: 90, credentials: [], contactInfo: { email: 'm@ex.com' } },
    { id: '22', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', headline: 'Generic Tutor', tags: ['Math'], languages: ['English'], timezone: 'UTC-5', priceStart: 30, priceEnd: 40, rating: 4.0, reviewCount: 5, responseRate: 80, credentials: [], contactInfo: { email: 'j@ex.com' } },
    { id: '23', name: 'Jane Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', headline: 'Science Tutor', tags: ['Science'], languages: ['English'], timezone: 'UTC-5', priceStart: 35, priceEnd: 45, rating: 4.2, reviewCount: 8, responseRate: 85, credentials: [], contactInfo: { email: 'ja@ex.com' } },
    { id: '24', name: 'Alex Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', headline: 'History Buff', tags: ['History'], languages: ['English'], timezone: 'UTC-5', priceStart: 25, priceEnd: 35, rating: 4.4, reviewCount: 12, responseRate: 92, credentials: [], contactInfo: { email: 'a@ex.com' } },
    { id: '25', name: 'Sam Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', headline: 'Geography Expert', tags: ['Geography'], languages: ['English'], timezone: 'UTC-5', priceStart: 28, priceEnd: 38, rating: 4.6, reviewCount: 15, responseRate: 94, credentials: [], contactInfo: { email: 's@ex.com' } },
    { id: '26', name: 'Chris Evans', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris', headline: 'Physics Tutor', tags: ['Physics'], languages: ['English'], timezone: 'UTC-5', priceStart: 40, priceEnd: 50, rating: 4.8, reviewCount: 20, responseRate: 96, credentials: [], contactInfo: { email: 'c@ex.com' } },
    { id: '27', name: 'Pat Stark', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pat', headline: 'Engineering Mentor', tags: ['Engineering'], languages: ['English'], timezone: 'UTC-5', priceStart: 50, priceEnd: 70, rating: 4.9, reviewCount: 25, responseRate: 98, credentials: [], contactInfo: { email: 'p@ex.com' } },
    { id: '28', name: 'Morgan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan', headline: 'Writing Coach', tags: ['Writing'], languages: ['English'], timezone: 'UTC-5', priceStart: 45, priceEnd: 65, rating: 4.7, reviewCount: 30, responseRate: 95, credentials: [], contactInfo: { email: 'mo@ex.com' } },
    { id: '29', name: 'Taylor Swift', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor', headline: 'Music Industry Mentor', tags: ['Music Business'], languages: ['English'], timezone: 'UTC-5', priceStart: 200, priceEnd: 500, rating: 5.0, reviewCount: 100, responseRate: 100, isVerified: true, credentials: [], contactInfo: { email: 't@ex.com' } },
    { id: '30', name: 'Jordan Belfort', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', headline: 'Sales Trainer', tags: ['Sales'], languages: ['English'], timezone: 'UTC-5', priceStart: 100, priceEnd: 200, rating: 4.1, reviewCount: 50, responseRate: 80, credentials: [], contactInfo: { email: 'jb@ex.com' } },
];
