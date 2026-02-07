import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isValidEduEmail(email: string): boolean {
    const eduDomains = ['.edu', '.ac.', '.school', '.edu.vn', '.ac.uk', '.edu.au', '.edu.sg', '.edu.cn', '.edu.hk', '.edu.tw', '.edu.my', '.edu.ph', '.edu.th', '.edu.in', '.edu.pk', '.edu.bd', '.edu.lk', '.edu.np', '.edu.mv', '.edu.bt', '.edu.kh', '.edu.la', '.edu.mm', '.cs', '.uni'];
    return eduDomains.some(domain => email.toLowerCase().includes(domain));
}
