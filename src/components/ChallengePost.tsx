import { Link, useNavigate } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { LazyLoading } from "./LazyLoading";


interface Props {
    className?: string;
    challengesList: any[] | null;
    style?: 'primary' | 'secondary';
}
interface StarRatingProps {
    className?: string;
    rating: number;
}
const StarRating: React.FC<StarRatingProps> = ({ className, rating }) => {
    const MAX_STAR = 3;

    return (
        <div className={twMerge(className)}>
            {Array.from({ length: MAX_STAR }, (_, index) => (
                <label className={twJoin("material-symbols-outlined",
                    index < rating && 'text-yellow-500'
                )}>
                    star
                </label>
            ))}
        </div>
    )
}
export const ChallengePost: React.FC<Props> = ({ className, challengesList, style = 'primary' }) => {
    const navigate = useNavigate();

    return (
        <div
            data-style={style}
            className={twMerge(`fade-in-up 
                mt-10 side-in w-full grid grid-cols-3 gap-6
                *:rounded-xl
                *:transition
                *:durartion-300
                *:cursor-pointer
                hover:*:bg-[#2C2446]
                hover:*:shadow-xl
                hover:*:scale-105
                [&_.capture]:object-cover
                [&_.capture]:h-[22rem]
                *:bg-[#2C2446]/50

                [&[data-style="primary"]_.top-card]:hidden
                [&[data-style="secondary"]_.bottom-card]:hidden
                [&[data-style="secondary"]_.capture]:rounded-xl
                [&[data-style="secondary"]_.capture]:h-[25rem]
            `,
                className)}>
            {challengesList!.map((challenge, index) => (
                <div onClick={() => navigate(`/`)} key={index}
                    className="relative text-lg">
                    <div className="top-card bg-purple-900/60 rounded-tr-xl absolute top-0 right-0 px-5 py-2 gap-2 flex items-center ">
                        <p className="uppercase">{challenge.name}</p>
                        <StarRating rating={2}></StarRating>
                    </div>
                    <div className=" ">
                        <img src={challenge.thumbnail} className="rounded-tl-xl rounded-tr-xl w-full capture" />
                    </div>
                    <div className="bottom-card p-3 flex items-center justify-between">
                        <div className="space-y-2">
                            <p className="uppercase">{challenge.name}</p>
                            <div className="flex flex-wrap capitalize text-sm
                            *:px-2 *:bg-yellow-400 text-purple-900 *:rounded-md gap-2">
                                <p>Tag</p>
                                <p>Tag</p>
                                <p>Tag</p>
                                <p>Tag</p>
                            </div>
                        </div>
                        <div>
                            <StarRating rating={2}></StarRating>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}