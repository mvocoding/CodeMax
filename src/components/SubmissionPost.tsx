import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    submissionsList: any[] | null;
    challengeID: string;
}

export const SubmissionPost: React.FC<Props> = ({ className, submissionsList, challengeID }) => {
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
                {submissionsList!.map((submission, index) => (
                    <div onClick={() => navigate(`/challenges/${challengeID}/submissions/${submission.submission_id}`)} key={index} 
                    className="">
                        <div className="p-3">
                        <iframe src={`http://localhost:5173/preview/${submission.submission_id}`} className="w-full capture" />
                        </div>
                        <div className="p-3">
                            <p>by <Link className="text-lg capitalize hover:underline" to={`/profile/${submission.username}`}>{submission.fullname}</Link></p>
                            <div className="user">
                                <p>{submission.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}