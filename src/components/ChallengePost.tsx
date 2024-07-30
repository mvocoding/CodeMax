import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { StarRating } from "./StarRating";


interface Props {
    className?: string;
    challengesList: any[] | null;
    style?: 'primary' | 'secondary';
}

export const ChallengePost: React.FC<Props> = ({ className, challengesList, style = 'primary' }) => {
    const navigate = useNavigate();
    if(!challengesList) return;

    return (
        <div
            data-style={style}
            className={twMerge(`fade-in-up 
                mt-10 side-in w-full grid grid-cols-1 md:grid-cols-3 gap-6
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

                [&[data-style="primary"]_.top-card_p]:hidden
                [&[data-style="primary"]_.btns-wrapper]:hidden

                [&[data-style="secondary"]_.bottom-card]:hidden
                [&[data-style="secondary"]_.capture]:rounded-xl
                [&[data-style="secondary"]_.capture]:h-[25rem]
            `,
                className)}>
            {challengesList.map((challenge, index) => (
                <div onClick={() => navigate(`/challenges/${challenge.id}/submissions`)} key={index}
                    className="relative text-lg group overflow-hidden">
                    <div className="group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-[20px] transition-all duration-300 
                    btns-wrapper absolute bottom-0 left-0 w-full">
                        <button className="bg-purple-600 w-full py-2 rounded-bl-xl rounded-br-xl font-semibold">START</button>
                    </div>
                    <div className="top-card bg-purple-900/60 rounded-tr-xl absolute top-0 right-0 px-5 py-2 gap-2 max-md:w-full flex items-center ">
                        <p className="uppercase font-semibold">{challenge.name}</p>
                        <StarRating rating={challenge.rating}></StarRating>
                    </div>
                    <div className=" ">
                        <img src={challenge.thumbnail} className="rounded-tl-xl rounded-tr-xl w-full capture" />
                    </div>
                    <div className="bottom-card p-3 flex items-center justify-between">
                        <div className="space-y-2">
                            <p className="uppercase font-semibold">{challenge.name}</p>
                            <div className="flex flex-wrap uppercase text-sm
                            *:px-2 *:bg-yellow-400 text-purple-900 *:rounded-md gap-2">
                                {challenge.tags!.map((tag: string, index: number) => (
                                    <p key={index}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}