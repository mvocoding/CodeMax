import { twJoin, twMerge } from "tailwind-merge";

interface StarRatingProps {
    className?: string;
    rating: number;
}
export const StarRating: React.FC<StarRatingProps> = ({ className, rating }) => {
    const MAX_STAR = 3;

    return (
        <div className={twMerge(`flex`, className)}>
            {Array.from({ length: MAX_STAR }, (_, index) => (
                <label key={index} className={twJoin("material-symbols-outlined",
                    index < rating && 'text-yellow-500'
                )}>
                    star
                </label>
            ))}
        </div>
    )
}