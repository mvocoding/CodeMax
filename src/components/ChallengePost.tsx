import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    challengesList: any[] | null;
}

export const ChallengePost: React.FC<Props> = ({ className, challengesList }) => {
    const navigate = useNavigate();
    
    return (
        <section
            className={twMerge(`mt-10 slide-in flex `,
                className
            )}>
            <div className={`w-full grid grid-cols-3 gap-6
                *:rounded-xl
                *:transition
                *:durartion-300
                *:cursor-pointer
                hover:*:bg-[#2C2446]
                hover:*:shadow-xl
                [&_.capture]:object-cover
                [&_.capture]:h-60
                *:bg-[#2C2446]/50
            `}>
                {challengesList!.map((challenge, index) => (
                    <div onClick={() => navigate(`/`)} key={index} 
                    className="">
                        <div className="p-3">
                        <iframe src={``} className="w-full capture" />
                        </div>
                        <div className="p-3">
                            <p>by <Link className="text-lg capitalize hover:underline" to={`/`}>{``}</Link></p>
                            <div className="user">
                                <p></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}