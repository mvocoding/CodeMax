import { twMerge } from "tailwind-merge";
import supabase from "../supabaseClient";

interface Props{
    className?: string;
}

export const CategorySelect: React.FC<Props> = ({ className }) => {


    return (
        <ul className={twMerge(`
        flex justify-center gap-10
        *:size-[70px] text-center
        [&_img]:object-cover [&_img]:object-top
            `,
            className
        )}>
            <li>
                <img className="w-full" src="images/css.svg" alt="category" />
                <p>CSS</p>
            </li>
            {/* <li>
                <img className="w-full" src="images/js.svg" alt="category" />
                <p>JAVASCRIPT</p>
            </li> */}
        </ul>
    )
}