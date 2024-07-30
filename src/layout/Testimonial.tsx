import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

const RANDOM_QUOTE: string[] = [
    'Hi, I’m Max. I created this website to help people accelerate their learning process. When it comes to picking up a new language or technology, finding the right tools and resources can make all the difference. That’s why I developed CodeMax — to provide an intuitive interface and powerful features that streamline your workflow and make coding more efficient and enjoyable. I hope you find it as valuable as I do!',


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