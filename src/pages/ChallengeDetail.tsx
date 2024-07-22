import { twMerge } from "tailwind-merge";
import { Post } from "../components/Post";

interface Props {
    className?: string;
}

export const ChallengeDetail: React.FC<Props> = ({ className }) => {

    return (
        <section className={twMerge(`max-w-[90%]`,
            className
        )}>
            <div>test</div>
            <Post className="mt-5 mx-auto"></Post>
        </section>
    )
}