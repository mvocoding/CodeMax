import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

export const Testimonial: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(`hidden lg:flex justify-center items-center flex-col gap-10 p-5 bg-white rounded-xl text-gray-800`,
            className
        )}>
            <img className="rounded-full w-[200px] mx-auto"
                src="https://media.licdn.com/dms/image/C4D0BAQElUhj0AoCXPw/company-logo_200_200/0/1640987068231/courseralearning_logo?e=1729728000&v=beta&t=YjloNleFq08w-JIRa3sT7fOvQhG7B-YSOgdcHgSR52M" alt="Avatar" />

            <blockquote className="text-lg
                after:right-0 after:text-5xl after:absolute after:content-[close-quote]
                before:left-0 before:-top-5 before:text-5xl before:absolute before:content-[open-quote]
                p-5 relative ">

                <div>
                    <h2>I've been using CodeDeck for my development projects, and it's been a game-changer. The intuitive interface and powerful features streamline my workflow, making coding more efficient and enjoyable. Highly recommend CodeDeck for developers looking to enhance their productivity</h2>
                </div>
            </blockquote>
        </section>
    )
}