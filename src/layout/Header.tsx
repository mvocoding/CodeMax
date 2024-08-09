import { Link, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useApp } from "../context/AppContext";
import { User } from "../model";

interface Props {
    className?: string;
}

const Guess = () => {
    return (
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
        last:*:bg-amber-600
        last:*:text-white">
            <Link className="btn " to={'/signin'} type="button">Sign In</Link>
            <Link className="btn " to={'/signup'} type="button">Sign Up</Link>
        </div>
    )
}

const UserSignedIn: React.FC<{ currentUser: User }> = ({ currentUser }) => {
    return (
        <div className="flex justify-start items-center gap-3 ">
            <div className="capitalize text-center">
                <p className="px-4 py-1 bg-yellow-400 text-purple-900 font-bold rounded-lg">{currentUser.profile!.role}</p>
            </div>
            <Link className="size-12" to={`/profile/${currentUser.profile!.username}`}>
                <img className="w-full object-cover object-top border border-sky-800 rounded-full" src={currentUser.profile?.avatar} alt="User Avatar" />
            </Link>
        </div>
    )
}
export const Header: React.FC<Props> = ({ className }) => {
    const { currentUser } = useApp();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const MENU: {
        text: string,
        className: string,
        onClick: () => void
    }[] = [
        {
            text: 'Home',
            className: pathname == '/' ? 'active': '',
            onClick: () => navigate('/')
        },
        {
            text: 'Front-End Challenges',
            className: pathname == '/challenges/frontend' ? 'active': '',
            onClick: () => navigate('/challenges/frontend')
        },
        {
            text: 'Data Structure & Algorithm',
            className: pathname == '/challenges/algorithm' ? 'active': '',
            onClick: () => navigate('/challenges/algorithm')
        },
        {
            text: 'My Profile',
            className: !currentUser?.profile!.username ? 'hidden' : pathname.includes('/profile/') ? 'active' : '',
            onClick: () => navigate(`/profile/${currentUser?.profile!.username}`)
        },
        {
            text: 'About Us',
            className: '',
            onClick: () => window.open('https://www.linkedin.com/company/codemax-australia/', '_blank')
        }
    ]
    return (
        <header className={twMerge(`py-4 px-10 relative bg-[#2C2446]`,
            className
        )}>
            <div className=" flex items-center justify-between">
                <Link to={'/'} className="block w-16">
                    <img src="/images/logo.png" alt="Logo" />
                </Link>

                <nav className="absolute left-0 sm:static top-4 w-full max-w-6xl mx-auto flex items-center">
                    <input type="checkbox" className="peer sr-only" id="nav" />

                    <label htmlFor="nav" aria-label="primiary nav toggle" className="grid [grid-template-areas:'stack'] place-content-center cursor-pointer size-12  sm:hidden  hover:text-sky-500 
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

                        *:cursor-pointer
                    ">
                            {MENU.map((option, index) => (
                                <li className={option.className} 
                                onClick={option.onClick}
                                key={index}>{option.text}</li>
                            ))}
                        </ul>
                    </div>
                </nav>
                <div className="ml-auto">
                    {currentUser?.id ? (<UserSignedIn currentUser={currentUser} />) : (<Guess />)}
                </div>
            </div>
        </header>
    )
}