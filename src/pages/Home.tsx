import { Filter } from "../components/Filter";
import { Post } from "../components/Post";
import { Banner } from "../layout/Banner";
import { Hero } from "../layout/Hero";

interface Props {
    className?: string;
}
export const Home: React.FC<Props> = ({ className }) => {
    return (
        <div className="py-10">
            <Hero></Hero>
            <Banner></Banner>
            <Filter></Filter>
            <Post className="max-w-[90%] mx-auto"></Post>
        </div>
    )
}