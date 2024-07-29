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
    const [challenges, setChallenges] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getChallenges('', [], -1, 1, 1000);
            if (error) {
                return;
            }
            setChallenges(data);
        }
        fetchData();
    }, []);

    return (
        <LazyLoading isLoading={!challenges.length} className="min-h-[400px]">
            <section className={twMerge(`max-w-[90%] mx-auto
            `,
                className
            )}>
                <div>
                    <section className={twMerge(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6
            *:border *:rounded-lg *:border-sky-500`,
                        className
                    )}>
                        <div className="flex gap-4 items-center p-6">
                            <div>
                                <h4 className="text-xl font-semibold flex gap-2 items-center">
                                    <div className="flex">
                                        <label className="material-symbols-outlined text-yellow-500">
                                            star
                                        </label>
                                        <label className="material-symbols-outlined">
                                            star
                                        </label>
                                        <label className="material-symbols-outlined">
                                            star
                                        </label>
                                    </div>
                                    <p>Beginner</p>
                                </h4>
                                <p>High-quality content to enhance your coding skills</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center p-6">
                            <div>
                                <h4 className="text-xl font-semibold flex gap-2 items-center">
                                    <div className="flex">
                                        <label className="material-symbols-outlined text-yellow-500">
                                            star
                                        </label>
                                        <label className="material-symbols-outlined text-yellow-500">
                                            star
                                        </label>
                                        <label className="material-symbols-outlined">
                                            star
                                        </label>
                                    </div>
                                    <p>Intermediate</p>
                                </h4>
                                <p>High-quality content to enhance your coding skills</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center p-6">
                            <div>
                                <h4 className="text-xl font-semibold flex gap-2 items-center">
                                    <div className="flex">
                                        <label className="material-symbols-outlined text-yellow-500">
                                            star
                                        </label>
                                        <label className="material-symbols-outlined text-yellow-500">
                                            star
                                        </label>
                                        <label className="material-symbols-outlined text-yellow-500">
                                            star
                                        </label>
                                    </div>
                                    <p>Advanced</p>
                                </h4>
                                <p>High-quality content to enhance your coding skills</p>
                            </div>
                        </div>

                        
                    </section>
                </div>
                <ChallengePost challengesList={challenges}></ChallengePost>
            </section>
        </LazyLoading>
    )
}