import { CategorySelect } from "../components/CategorySelect";
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
            <Banner className="max-w-[70%] flex mx-auto"></Banner>
            <Filter></Filter>
            <CategorySelect className="mt-5"></CategorySelect>
            <Post className="max-w-[90%] mt-5 mx-auto"></Post>
        </div>
    )
}