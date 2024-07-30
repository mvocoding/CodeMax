import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

const RANDOM_QUOTE: string[] = [
    'Hi, I’m Max. I created this website to help people accelerate their learning process. When it comes to picking up a new language or technology, finding the right tools and resources can make all the difference. That’s why I developed CodeMax to make coding more efficient and enjoyable. I hope you find it as valuable as I do!',

    'Hi, I’m Max. I created this site to make learning new coding skills easier and more enjoyable. I hope CodeDeck helps you streamline your workflow and boosts your productivity. If you have any questions or feedback, feel free to reach out!',

    'Hey, I’m Max. I know how challenging it can be to learn a new language, so I created CodeMax to help with that. I’ve found that learning from others can really accelerate the process, and I hope CodeMax makes your learning journey smoother and faster.'
]
export const Testimonial: React.FC<Props> = ({ className }) => {
    const randomIndex = Math.floor(Math.random() * RANDOM_QUOTE.length);
    return (
        <section className={twMerge(`hidden lg:flex justify-center items-center flex-col gap-10 p-5 bg-white rounded-xl text-gray-800`,
            className
        )}>
            <img className="rounded-full w-[200px] mx-auto"
                src="https://rygjutogekdmouvlnaoa.supabase.co/storage/v1/object/public/images/maxvo.png" alt="Avatar" />

            <blockquote className="max-w-[90%] text-sm opacity-90 before:opacity-50 after:opacity-50
                after:right-0 after:text-5xl after:absolute after:content-[close-quote]
                before:left-0 before:-top-5 before:text-5xl before:absolute before:content-[open-quote]
                p-5 relative ">

                <div>
                    <h2>{RANDOM_QUOTE[randomIndex]}</h2>
                </div>
            </blockquote>
        </section>
    )
}