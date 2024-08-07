import { twJoin, twMerge } from "tailwind-merge";
import { ChallengePost } from "../components/ChallengePost";
import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { LazyLoading } from "../components/LazyLoading";
import { StarRating } from "../components/StarRating";

interface Props {
    className?: string;
}
interface Filter {
    name: string;
    tags: string[];
    rating: number;
    currentPage: number;
    pageSize: number;
}
interface FilterProps {
    className?: string;
    currentFilter: Filter;
    onChangeRating: (rating: number) => void;
}

const RATING_SELECT = [
    {
        "rating": -1,
        "text": "All Levels",
        "description": "Show all content regardless of skill level."
    },
    {
        "rating": 1,
        "text": "Beginner",
        "description": "Basic content for those new to the topic."
    },
    {
        "rating": 2,
        "text": "Intermediate",
        "description": "Content for those with some experience."
    },
    {
        "rating": 3,
        "text": "Advanced",
        "description": "Advanced content for experienced individuals."
    }
]


const FilterPanel: React.FC<FilterProps> = ({ className, onChangeRating, currentFilter }) => {
    return (
        <section className={twMerge(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 *:cursor-pointer
            *:border *:rounded-lg *:border-sky-500`,
            className
        )}>
            {RATING_SELECT.map((option, index) => (
                <div key={index}
                    onClick={() => onChangeRating(option.rating)}
                    className={twJoin(`flex items-center p-2 md:p-6`,
                        currentFilter.rating == option.rating && 'bg-purple-600/50'
                    )}>
                    <div>
                        <h4 className="text-xl font-semibold flex gap-2 items-center">
                            <StarRating rating={option.rating}></StarRating>
                            <p>{option.text}</p>
                        </h4>
                        <p className="max-sm:hidden">{option.description}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export const Algorithm: React.FC<Props> = ({ className }) => {
    const { getChallenges } = useSupabase();
    const [challenges, setChallenges] = useState<any[] | null>([]);
    const [filter, setFilter] = useState<Filter>({
        name: '',
        tags: [],
        rating: -1,
        currentPage: 1,
        pageSize: 1000
    });

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getChallenges(filter.name, filter.tags, filter.rating, filter.currentPage, filter.pageSize);
            if (error) {
                return;
            }
            setChallenges(data);
        }
        fetchData();
    }, [filter]);

    const setRating = (rating: number) => {
        setChallenges(null);
        setFilter(prev => ({
            ...prev,
            rating
        }));
    }

    return (
        <LazyLoading isLoading={!challenges} className="min-h-[400px]">
            <section className={twMerge(`max-w-[50%] mx-auto p-10`,
                className
            )}>
                {/* <FilterPanel currentFilter={filter} onChangeRating={setRating}></FilterPanel> */}
                <div className="flex-1 flex flex-col gap-5 h-100%  overflow-auto   ">

                    <div className="
            hover:bg-fuchsia-800   relative    
            flex flex-col sm:flex-row justify-center max-sm:items-center 
            p-5 sm:p-8  gap-5  rounded-lg cursor-pointer  w-full  bg-black/20 ">
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex justify-center max-sm:absolute max-sm:top-0 max-sm:w-full max-sm:left-0   ">
                                <StarRating rating={1}></StarRating>
                                <p className="opacity-70 ml-auto">25 April 2024</p>
                            </div>
                            <h3 className="font-bold text-lg sm:whitespace-nowrap ">TWO SUM</h3>
                            <ul className="text-xs  flex flex-wrap  sm:flex-row *:w-fit *:px-2 *:py-1   gap-2  
                                    :py-1 *:rounded-md  *:bg-white *:text-black/90   ">
                                <li>Development</li>
                                <li>Architecture</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </LazyLoading>
    )
}