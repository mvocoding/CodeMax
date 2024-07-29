import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}
export const NotFound: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(`mt-10`,
            className
        )}>
            <article className="text-lg mx-auto flex *:flex-1 rounded-xl justify-center max-w-[80%] bg-[#2C2446]">
                <div className="">
                    <img src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png" alt="Likes Dislikes Stats" className="w-full h-full rounded-bl-xl rounded-tl-xl  object-cover object-top" />
                </div>
                <div className="p-10 space-y-8">
                    <h2 className="text-3xl">OOps, Page Not Found</h2>
                    <p>Oops! The page you’re looking for doesn’t seem to exist.</p>
                    <ul>
                        <li>You’ve followed a broken or outdated link.</li>
                        <li>The page might have been moved or deleted.</li>
                        <li>You might have typed the URL incorrectly.</li>
                    </ul>
                    <div className="flex flex-col *:w-full gap-5 *:rounded-lg *:py-2">
                        <Link to={'/'} className="btn-primary">Back to Homepage</Link>
                    </div>
                </div>
            </article>
        </section>)
}