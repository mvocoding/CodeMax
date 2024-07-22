import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

export const Banner: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6
            *:border *:rounded-lg *:border-sky-500`,
            className
        )}>
            <div className="flex gap-4 items-center p-6">
                <div>
                    <h4 className="text-xl font-semibold">Quality Learning</h4>
                    <p>High-quality content to enhance your coding skills</p>
                </div>
            </div>


            <div className="flex gap-4 items-center p-6">
                <div>
                    <h4 className="text-xl font-semibold">Flexible Access</h4>
                    <p>Learn at your own pace, anytime, anywhere</p>
                </div>
            </div>


            <div className="flex gap-4 items-center p-6">
                <div>
                    <h4 className="text-xl font-semibold">Expert Support</h4>
                    <p>Our experts are here to help you with any questions</p>
                </div>
            </div>
        </section>
    )
}