import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(`mx-auto text-center flex flex-col items-center gap-6 justify-center sm:p-10`,
            className
        )}>
            <h1 className="font-bold text-4xl text-sky-600">Daily Coding Challenges</h1>
            <p className="font-thin">Kickstart your day with a fresh coding challenge! Daily you can find a new design that you can transform into HTML, CSS, and JavaScript. It's the perfect way to keep your skills sharp and stay in the coding groove.</p>
        </section>
    )
}