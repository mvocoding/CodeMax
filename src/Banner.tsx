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
                    <h4 className="text-xl font-semibold">Free Shipping</h4>
                    <p>Free shipping on all orders over $19.99</p>
                </div>
            </div>


            <div className="flex gap-4 items-center p-6">
                <div>
                    <h4 className="text-xl font-semibold">Money Back</h4>
                    <p>Within 30 days of purchase</p>
                </div>
            </div>


            <div className="flex gap-4 items-center p-6">
                <div>
                    <h4 className="text-xl font-semibold">Online Support</h4>
                    <p>Our online support is here for you</p>
                </div>
            </div>
        </section>
    )
}