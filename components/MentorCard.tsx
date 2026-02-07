import Link from 'next/link';
import Image from 'next/image';
import { Mentor } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MentorCardProps {
    mentor: Mentor;
    onCompareToggle?: (mentor: Mentor) => void;
    isSelectedForCompare?: boolean;
}

export function MentorCard({ mentor, onCompareToggle, isSelectedForCompare }: MentorCardProps) {
    return (
        <div className="group relative flex flex-col rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
            <div className="flex items-start justify-between gap-4">
                <Link href={`/mentor/${mentor.id}`} className="block shrink-0">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-100">
                        <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </Link>
                <div className="flex-1 min-w-0">
                    <Link href={`/mentor/${mentor.id}`} className="block">
                        <h3 className="font-semibold text-lg text-gray-900 truncate flex items-center gap-1.5">
                            {mentor.name}
                            {mentor.isVerified && (
                                <CheckCircle className="h-4 w-4 text-blue-500" fill="currentColor" color="white" />
                            )}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{mentor.headline}</p>
                    </Link>
                </div>
                <div className="text-right shrink-0">
                    <div className="font-bold text-gray-900">${mentor.priceStart}</div>
                    <div className="text-xs text-gray-500">/hr</div>
                </div>
            </div>

            {(mentor.school || mentor.age) && (
                <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2 items-center">
                    {mentor.school && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{mentor.school}</span>
                    )}
                    {mentor.age && (
                        <span>{mentor.age} y/o</span>
                    )}
                    {mentor.gpa && (
                        <span>GPA: {mentor.gpa}</span>
                    )}
                </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
                {mentor.isNew && <Badge variant="success">New</Badge>}
                {mentor.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-gray-100/80">{tag}</Badge>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-900">{mentor.rating}</span>
                    <span className="text-gray-400">({mentor.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{mentor.responseRate}% resp.</span>
                </div>
            </div>

            <div className="mt-5 flex gap-3 pt-4 border-t">
                <Link href={`/mentor/${mentor.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
                {onCompareToggle && (
                    <Button
                        variant={isSelectedForCompare ? "primary" : "secondary"}
                        onClick={() => onCompareToggle(mentor)}
                        className={cn("px-4", isSelectedForCompare && "bg-blue-600 text-white")}
                    >
                        {isSelectedForCompare ? "Comparing" : "Compare"}
                    </Button>
                )}
            </div>
        </div>
    );
}
