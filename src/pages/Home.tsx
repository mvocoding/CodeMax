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
            const { error, data } = await getChallenges({
                filter_name: '',
                filter_tag: [],
                filter_rating: -1,
                filter_lang: ['frontend'],
                page_number: 1,
                page_size: 12
            });
            if (!error) {
                setChallenges(data);
            }
        }
        getAllChallenges();
    }, []);

    return (
        <div className="py-10 fade-in-up"> 
            <Hero className="max-w-[60%] max-md:max-w-full"></Hero>
            <Banner className="max-w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mx-auto
            max-md:hidden"></Banner>
            <LazyLoading isLoading={!challenges}>
                <ChallengePost challengesList={challenges!} style="secondary" className="max-w-[100%] p-10 mx-auto"></ChallengePost>
            </LazyLoading>
        </div>

    )
}