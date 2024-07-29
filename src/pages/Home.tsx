import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { Hero } from "../layout/Hero";
import { Banner } from "../layout/Banner";
import { LazyLoading } from "../components/LazyLoading";
import { ChallengePost } from "../components/ChallengePost";

interface Props {
    className?: string;
}
export const Home: React.FC<Props> = ({ className }) => {
    const { getChallenges } = useSupabase();
    const [challenges, setChallenges] = useState<any[] | null>(null);
    useEffect(() => {
        const getAllChallenges = async () => {
            const { error, data } = await getChallenges();
            if (!error) {
                setChallenges(data);
            }
        }
        getAllChallenges();
    }, []);

    return (
        <div className="py-10 fade-in-up"> 
            <Hero></Hero>
            <Banner className="max-w-[70%] flex mx-auto"></Banner>
            <LazyLoading isLoading={!challenges}>
                {/* <Filter></Filter> */}
                {/* <CategorySelect className="mt-5"></CategorySelect> */}
                <ChallengePost challengesList={challenges!} style="secondary" className="max-w-[90%] mt-5 mx-auto"></ChallengePost>
            </LazyLoading>
        </div>

    )
}