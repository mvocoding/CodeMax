import { twMerge } from "tailwind-merge";
import { Post } from "../components/Post";

interface Props {
    className?: string;
}
export const Challenge: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(`mt-10
            `,
            className
        )}>
            <article className="text-lg mx-auto flex *:flex-1 rounded-xl justify-center max-w-[80%] bg-[#2C2446]">
                <div className="">
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="w-full h-full rounded-bl-xl rounded-tl-xl  object-cover object-top" />
                </div>
                <div className="p-10 space-y-8">
                    <h2 className="text-3xl">Challenge: Birthday List                    </h2>
                    <p>Start with this design and transform it into a functional project using HTML, CSS, and JavaScript. If you want to go the extra mile, expand upon it, and integrate your unique touch by adding animations and interactivity. Prioritize creativity over pixel-perfect accuracy and showcase your developer ingenuity.</p>
                    <div className="flex *:flex-1 [&_button]:bg-purple-600 *:rounded-lg *:py-2">
                        <button>Start</button>
                    </div>
                </div>
            </article>
            <Post className="mt-5 mx-auto max-w-[80%]"></Post>
        </section>)
}