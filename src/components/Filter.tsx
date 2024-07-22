import { twMerge } from "tailwind-merge";

interface Props{
    className?: string;
}

export const Filter: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(``,
            className
        )}>
            <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                <div className="w-full flex justify-center
                    [&_.switch]:rounded-full
                    [&_.switch]:cursor-pointer
                    [&_.switch]:grid
                    [&_.switch]:grid-cols-2
                    [&_.switch]:bg-sky-600
                    [&_.switch]:relative
                    [&_.switch]:isolate
                    [&_.switch]:transition
                    hover:[&_.switch]:bg-sky-800

                    before:[&_.switch]:absolute
                    before:[&_.switch]:rounded-full
                    before:[&_.switch]:m-auto
                    before:[&_.switch]:-z-10
                    before:[&_.switch]:bg-sky-950
                    before:[&_.switch]:transition-all
                    before:[&_.switch]:duration-500
                    before:[&_.switch]:ease-in-out
                    before:[&_.switch]:inset-[2px_50%_2px_3px]
                    before:[&_input:checked+label]:inset-[2px_3px_2px_50%]

                    [&_.switch>span]:py-2
                    [&_.switch>span]:px-24
                    [&_.switch>span]:grid
                    [&_.switch>span]:place-content-center
                    last:[&_.switch>span]:opacity-50
                    first:[&_input:checked+label>span]:opacity-50
                    last:[&_input:checked+label>span]:opacity-100
                    last:[&_input:checked+label>span]:delay-50
                    [&_.switch>span]:transiton
                    [&_.switch>span]:duration-300
                ">
                    <input type="checkbox" id="invite"  className="peer sr-only" />
                    <label for="invite" className="switch">
                        <span>Challengers</span>
                        <span id="method-2" >News Feed</span>
                    </label>
                </div>

            </div>

            
        </section>
    )
}