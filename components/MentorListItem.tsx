import Link from 'next/link';
import { Mentor } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, CheckCircle, Clock, MapPin, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MentorListItemProps {
    mentor: Mentor;
    onCompareToggle?: (mentor: Mentor) => void;
    isSelectedForCompare?: boolean;
}

export function MentorListItem({ mentor, onCompareToggle, isSelectedForCompare }: MentorListItemProps) {
    return (
        <div className="group relative flex flex-col sm:flex-row rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-200 gap-6">
            {/* Left: Avatar & Quick Info */}
            <Link href={`/mentor/${mentor.id}`} className="shrink-0 flex flex-col items-center sm:items-start gap-3">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-gray-50 shadow-sm">
                    <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="h-full w-full object-cover"
                    />
                    {mentor.isVerified && (
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle className="h-5 w-5 text-blue-500 fill-white" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mentor.rating}</span>
                        <span className="text-gray-500">({mentor.reviewCount})</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {mentor.responseRate}% response rate
                    </div>
                </div>
            </Link>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <Link href={`/mentor/${mentor.id}`} className="group-hover:text-blue-600 transition-colors">
                        <h3 className="font-bold text-xl text-gray-900">{mentor.name}</h3>
                        <p className="text-gray-600 font-medium">{mentor.headline}</p>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mt-1">
                    {mentor.school && (
                        <div className="flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>{mentor.school}</span>
                        </div>
                    )}
                    {mentor.country && (
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{mentor.country}</span>
                        </div>
                    )}
                    {mentor.age && (
                        <div className="flex items-center gap-1">
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{mentor.age} y/o</span>
                        </div>
                    )}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mt-2 leading-relaxed">
                    {/* Fallback bio if not available in current mock data structure, or use headline/tags expansion */}
                    Specializing in {mentor.tags.join(', ')}. I help students achieve their academic and career goals through personalized mentorship.
                </p>

                <div className="mt-auto pt-3 flex flex-wrap gap-2">
                    {mentor.isNew && <Badge variant="success">New</Badge>}
                    {mentor.tags.slice(0, 5).map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100/80">{tag}</Badge>
                    ))}
                    {mentor.tags.length > 5 && (
                        <span className="text-xs text-gray-500 self-center">+{mentor.tags.length - 5} more</span>
                    )}
                </div>
            </div>

            {/* Right: Price & Action */}
            <div className="shrink-0 flex flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l sm:pl-6 pt-4 sm:pt-0 gap-4 min-w-[140px]">
                <div className="text-center sm:text-right">
                    <div className="text-sm text-gray-500">Starting at</div>
                    <div className="flex items-baseline justify-center sm:justify-end gap-1">
                        <span className="text-2xl font-bold text-gray-900">${mentor.priceStart}</span>
                        <span className="text-gray-500">/hr</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Link href={`/mentor/${mentor.id}`} className="w-full">
                        <Button className="w-full">View Profile</Button>
                    </Link>
                    {onCompareToggle && (
                        <Button
                            variant={isSelectedForCompare ? "primary" : "outline"}
                            onClick={() => onCompareToggle(mentor)}
                            className={cn("w-full", isSelectedForCompare && "bg-blue-600 text-white")}
                            size="sm"
                        >
                            {isSelectedForCompare ? "Comparing" : "Compare"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
