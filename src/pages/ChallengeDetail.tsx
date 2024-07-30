import { twMerge } from "tailwind-merge";
import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmissionPost } from "../components/SubmissionPost";
import { LazyLoading } from "../components/LazyLoading";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

interface Props {
    className?: string;
}
export const ChallengeDetail: React.FC<Props> = ({ className }) => {
    const { id } = useParams();
    const { getChallengeWithSubmission } = useSupabase();
    const [challenge, setChallenge] = useState<any | null>(null);
    const [submissions, setSubmissions] = useState<any | null>(null);
    const navigate = useNavigate();
    const { currentUser } = useApp();
    const { showToast } = useToast();

    const handleStartChallengeClick = () => {
        if(!currentUser?.id){
            showToast("error", 'You need to Signin to Start this Challenge!');
            return;
        }
        navigate(`/challenges/${challenge?.id}/newsubmission`);
    }
    useEffect(() => {
        const fetchData = async () => {
            const { challenge, submission } = await getChallengeWithSubmission(id!);
            if (challenge) {
                setChallenge(challenge);
                setSubmissions(submission);
            }
            else{
                navigate('/notfound');
                return;
            }
        }
        if(id)
            fetchData();
    }, [id]);

    if(!challenge) return null;

    return (
        <section className={twMerge(`fade-in-up mt-10`,
            className
        )}>
            <article className="text-lg mx-auto flex max-md:flex-col *:flex-1 rounded-xl justify-center max-w-[80%] bg-[#2C2446]">
                <div className="">
                    <img src={challenge.thumbnail} alt="Challenge Thumbnail" className="w-full h-full rounded-bl-xl rounded-tl-xl  object-cover object-top" />
                </div>
                <div className="p-10 space-y-8">
                    <h2 className="text-xl">Challenge: <span className="font-semibold capitalize">{challenge?.name}</span></h2>
                    <p className="whitespace-pre-line leading-6">{challenge?.description}</p>
                    <div className="flex flex-col *:w-full gap-5 *:rounded-lg *:py-2">
                        <button onClick={handleStartChallengeClick} className="btn-primary">Start This Challenge</button>
                        <Link to={'/challenges'} className="btn-dark">View All Challenges</Link>
                    </div>
                </div>
            </article>
            <LazyLoading className="min-h-[400px]" text="Loading Submission..." isLoading={!submissions}>
                <SubmissionPost submissionsList={submissions}
                    className="mt-10 mx-auto max-w-[90%]"></SubmissionPost>
            </LazyLoading>
        </section>)
}