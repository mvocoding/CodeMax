import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    submissionsList: any[];
}

export const SubmissionPost: React.FC<Props> = ({ className, submissionsList }) => {
    const navigate = useNavigate();
    
    return (
        <section
            className={twMerge(`mt-10 slide-in flex `,
                className
            )}>
            <div className={`w-full grid grid-cols-1 md:grid-cols-3 gap-6
                *:rounded-xl
                *:transition
                *:durartion-300
                *:cursor-pointer
                hover:*:bg-[#2C2446]
                hover:*:shadow-xl
                [&_.capture]:object-cover
                [&_.capture]:h-[20rem]
                *:bg-[#2C2446]/50
                hover:*:scale-105
            `}>
                {submissionsList.map((submission, index) => (
                    <div onClick={() => navigate(`/challenges/${submission.challenges_id}/submissions/${submission.submission_id}`)} key={index} 
                    className="">
                        <div className="p-3">
                        <iframe src={`http://localhost:5173/preview/${submission.submission_id}`} className="w-full capture" />
                        </div>
                        <div className="p-3 space-y-1">
                            <p className="uppercase font-semibold">{submission.challenger_name}</p>
                            <p>by <Link className="text-lg capitalize hover:underline" to={`/profile/${submission.username}`}>{submission.fullname}</Link></p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}