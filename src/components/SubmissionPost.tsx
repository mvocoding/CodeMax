import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import HtmlIframe from "./HtmlIframe";

interface Props {
    className?: string;
    submissionsList: any[];
}

const createHTML = (html: string, css: string, js: string) => {
    const combinedHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;
    return combinedHtml;
}

export const SubmissionPost: React.FC<Props> = ({ className, submissionsList }) => {
    const navigate = useNavigate();
    return (
        <section
            className={twMerge(`mt-10 slide-in flex pb-20`,
                className
            )}>
            <div className={`w-full grid grid-cols-1 md:grid-cols-3 gap-2
                *:rounded-xl
                *:transition
                *:durartion-300
                *:cursor-pointer
                hover:*:bg-[#2C2446]
                hover:*:shadow-xl
                *:bg-[#2C2446]/50
                hover:*:scale-105
            `}>
                {submissionsList.map((submission, index) => (
                    <div onClick={() => navigate(`/challenges/${submission.challenges_id}/submissions/${submission.submission_id}`)} key={index}
                        className="">
                        <div className="p-3">
                            <HtmlIframe className="h-[20rem] min-w-full"
                            src={createHTML(submission.submission_code.html, 
                                submission.submission_code.css,
                                submission.submission_code.js
                            )} scrollbar="no"></HtmlIframe>
                        </div>
                        <div className="p-3 space-y-1">
                            <p className="uppercase font-semibold">{submission.challenge_name}</p>
                            <p>by <Link className="text-lg capitalize hover:underline" to={`/profile/${submission.username}`}>{submission.fullname}</Link></p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}