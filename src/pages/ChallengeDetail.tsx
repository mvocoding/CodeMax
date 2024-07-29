import { twMerge } from "tailwind-merge";
import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubmissionPost } from "../components/SubmissionPost";
import { LazyLoading } from "../components/LazyLoading";

interface Props {
    className?: string;
}
export const ChallengeDetail: React.FC<Props> = ({ className }) => {
    const { id } = useParams();
    const { getChallengeWithSubmission } = useSupabase();
    const [challenge, setChallenge] = useState<any | null>(null);
    const [submissions, setSubmissions] = useState<any | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const { challenge, submission } = await getChallengeWithSubmission(id);
            if (challenge) {
                setChallenge(challenge);
                setSubmissions(submission);
            }
        }
        fetchData();
    }, [id]);

    if(!challenge) return null;

    return (
        <section className={twMerge(`fade-in-up mt-10`,
            className
        )}>
            <article className="text-lg mx-auto flex *:flex-1 rounded-xl justify-center max-w-[80%] bg-[#2C2446]">
                <div className="">
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="w-full h-full rounded-bl-xl rounded-tl-xl  object-cover object-top" />
                </div>
                <div className="p-10 space-y-8">
                    <h2 className="text-3xl">{challenge?.name}</h2>
                    <p>Start with this design and transform it into a functional project using HTML, CSS, and JavaScript.

                        If you want to go the extra mile, expand upon it, and integrate your unique touch by adding animations and interactivity.

                        Prioritize creativity over pixel-perfect accuracy and showcase your developer ingenuity.</p>
                    <div className="flex flex-col *:w-full gap-5 *:rounded-lg *:py-2">
                        <Link to={`/challenges/${challenge?.id}/newsubmission`} className="btn-primary">Start This Challenge</Link>
                        <button className="btn">View All Challenges</button>
                    </div>
                </div>
            </article>
            <LazyLoading className="min-h-[400px]" text="Loading Submission..." isLoading={!submissions}>
                <SubmissionPost challengeID={challenge?.id} submissionsList={submissions}
                    className="mt-10 mx-auto max-w-[90%]"></SubmissionPost>
            </LazyLoading>
        </section>)
}