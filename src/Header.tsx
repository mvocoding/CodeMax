import { twMerge } from "tailwind-merge";

interface Props{
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={twMerge(`border-b border-zinc-100 py-4 relative`,
            className
        )}>
            <div className=" flex items-center justify-between">
                <div className="tracking-widest uppercase font-bold text-3xl text-sky-600 translate-x-8 sm:translate-x-0">LETSCODE</div>
        
                <nav className="absolute left-0 sm:static top-4 w-full max-w-6xl mx-auto flex items-center">
                <input type="checkbox" className="peer sr-only" id="nav" />
                
                <label for="nav" aria-label="primiary nav toggle" className="grid [grid-template-areas:'stack'] place-content-center cursor-pointer size-12  sm:hidden  hover:text-sky-500 
                    *:transition-all
                    *:origin-center
                    *:[grid-area:stack]
                    last:*:scale-0 
                    peer-checked:first:*:scale-0 
                    peer-checked:last:*:scale-100
                ">
                    <span className="material-symbols-outlined block text-xl">menu</span>
                    <span className="material-symbols-outlined block  text-xl">close</span>
                </label>
                    
                <div className="w-full transition-all ease-[cubic-bezier(.47,1.64,.41,.8)]
                    absolute
                    left-0
                    top-12
                    grid
                    grid-rows-[0fr]
                    sm:top-0
                    sm:relative
                    sm:flex 
                    peer-checked:grid-rows-[1fr]
                    peer-checked:duration-500
                    
                    sm:peer-checked:duration-0
                    sm:peer-checked:transition-none
                ">
                    <ul className="bg-zinc-800 sm:bg-transparent overflow-hidden flex   w-full flex-col sm:gap-6 z-20 
                        sm:flex-row 
                        sm:items-center
                        sm:justify-center
                        *:px-4
                        *:py-2
                        sm:*:py-2
                        *:relative
                        *:mx-4
                        sm:*:mx-0
                        *:transition-all
                        *:duration-300
                        *:rounded-full
                        [&_a]:block
                        [&_li.active]:bg-slate-300
                        [&_li.active]:text-zinc-800
                        first:*:mt-4
                        last:*:mb-4
                        sm:first:*:mt-0
                        sm:last:*:mb-0

                        before:[&_li]:absolute
                        before:[&_li]:inset-full
                        before:[&_li]:bg-sky-600
                        before:[&_li]:transition-all
                        before:[&_li]:durartion-300
                        before:[&_li]:ease-[cubic-bezier(.47,1.64,.41,.8)]
                        before:[&_li]:-z-10
                        before:[&_li]:rounded-full
                        hover:before:[&_li]:inset-0
                    ">
                        <li><a href="javascript:void(0);">Learn</a></li>
                        <li className="active"><a href="javascript:void(0);">Challengers</a></li>
                        <li><a href="javascript:void(0);">Playground</a></li>
                    </ul>
                </div>
                </nav>
                <div className="flex gap-2 
                    *:border-none
                    *:outline-none
                    *:py-3
                    *:px-4
                    *:rounded-md
                    *:text-sm 
                    *:whitespace-nowrap
                    *:min-w-min
                    *:transition
                    *:durartion-300
                    hover:*:bg-sky-600 
                    Xhover:*:text-slate-900
                    last:*:bg-amber-600
                    last:*:text-white

                ">
                    <button type="button">Log In</button>
                    <button type="button">Sign Up</button>
                </div>
            </div>
        </header>
    )
}