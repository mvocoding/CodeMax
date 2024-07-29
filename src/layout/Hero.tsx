import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(`flex justify-center py-10`,
            className            
        )}>
            <div className="!max-w-[40%] text-center flex flex-col items-center gap-6 justify-center">
                <h1 className="font-bold text-4xl text-sky-600">Daily Coding Challenges</h1>
                <p className="font-thin">Kickstart your day with a fresh coding challenge! Daily you can find a new design that you can transform into HTML, CSS, and JavaScript. It's the perfect way to keep your skills sharp and stay in the coding groove.</p>

                {/* <div className="group flex items-center justify-center border rounded w-full focus-within:border-sky-900 transition p-2">
                    <button type="button" className="material-symbols-outlined border-none outline-none ring-0 size-10 transition hover:text-rose-600 focus-visible:text-rose-600">search</button>
                    <input type="text" placeholder="Search" className="w-full px-2 border-none outline-none ring-0 bg-transparent"/>
                </div> */}
            </div>
        </section>
    )
}