import { twJoin, twMerge } from "tailwind-merge";
import { ChallengePost } from "../components/ChallengePost";
import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { LazyLoading } from "../components/LazyLoading";
import { StarRating } from "../components/StarRating";
import { useParams } from "react-router-dom";

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
        <section className={twMerge(``,
            className
        )}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {RATING_SELECT.map((option, index) => (
                    <div key={index}
                        onClick={() => onChangeRating(option.rating)}
                        className={twJoin(`border rounded-lg border-sky-500 cursor-pointer flex items-center p-2 md:p-6`,
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
            </div>
        </section>
    )
}

export const Challenge: React.FC<Props> = ({ className }) => {
    const { getChallenges } = useSupabase();
    const [challenges, setChallenges] = useState<any[] | null>([]);
    const { type } = useParams();
    const [filter, setFilter] = useState<Filter>({
        name: '',
        tags: [],
        rating: -1,
        currentPage: 1,
        pageSize: 1000
    });

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getChallenges(
                {
                    filter_name: filter.name,
                    filter_tag: filter.tags,
                    filter_rating: filter.rating,
                    filter_lang: [type!],
                    page_number: filter.currentPage,
                    page_size: filter.pageSize
                });
            if (error) {
                return;
            }
            setChallenges(data);
        }
        if(filter && type)
            fetchData();
    }, [filter, type]);

    const setRating = (rating: number) => {
        setChallenges(null);
        setFilter(prev => ({
            ...prev,
            rating
        }));
    }

    return (
        <LazyLoading isLoading={!challenges} className="min-h-[400px]">
            <section className={twMerge(`max-w-[100%] mx-auto p-10`,
                className
            )}>
                <FilterPanel currentFilter={filter} onChangeRating={setRating}></FilterPanel>
                <ChallengePost challengesList={challenges}></ChallengePost>
            </section>
        </LazyLoading>
    )
}