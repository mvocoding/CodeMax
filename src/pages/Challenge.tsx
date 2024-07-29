import { twMerge } from "tailwind-merge";
import { ChallengePost } from "../components/ChallengePost";
import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { LazyLoading } from "../components/LazyLoading";

interface Props {
    className?: string;
}
export const Challenge: React.FC<Props> = ({ className }) => {
    const { getChallenges } = useSupabase();
    const [challenges, setChallenges] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getChallenges(null, null, null, 1, 12);
            if (error) {
                return;
            }
            setChallenges(data);
        }
        fetchData();
    }, []);

    return (
        <LazyLoading isLoading={!challenges} className="min-h-[400px]">
            <section className={twMerge(`max-w-[90%] mx-auto
            `,
                className
            )}>
                <ChallengePost challengesList={challenges}></ChallengePost>
            </section>
        </LazyLoading>
    )
}