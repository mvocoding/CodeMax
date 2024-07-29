import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useApp } from "../context/AppContext";
import { User } from "../model";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "../context/ToastContext";

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
                <p className="px-4 py-1 bg-yellow-400 text-purple-900 font-bold rounded-lg">{currentUser.profile.role}</p>
            </div>
            <Link className="size-12" to={`/profile/${currentUser.profile.username}`}>
                <img className="w-full object-cover object-top border border-sky-800 rounded-full" src={'/images/thinking.svg'} alt="User Avatar" />
            </Link>
        </div>
    )
}
export const SubmissionHeader: React.FC<Props> = ({ className }) => {
    const { formData } = useSubmissionStore();
    const { updateSubmission } = useSupabase();
    const { currentUser } = useApp();
    const { showToast } = useToast();

    const handleSaveClick = async () => {
        showToast("inprogress", 'Updating your submission...')
        const { error, data } = await updateSubmission(formData?.id!, formData?.challenge_code!, formData?.draft!);
        if (error) {
            showToast("error", 'Something went wrong!')
        }
        else {
            showToast("success", 'Update submission successfully !')
        }
    }
    const handleSubmitClick = async () => {
        showToast("inprogress", 'Submitting your submission...')
        const { error, data } = await updateSubmission(formData?.id!, formData?.challenge_code!, false);
        if (error) {
            showToast("error", 'Something went wrong!')
        }
        else {
            showToast("success", 'Submit submission successfully !')
        }
    }

    return (
        <header className={twMerge(`bg-[#2C2446] py-4 relative`,
            className
        )}>
            <div className=" flex items-center justify-between">
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
                    <li className="">Preview</li>
                    <li className="" onClick={handleSaveClick}>Save Changes</li>
                    <li className="active" onClick={handleSubmitClick}>Submit</li>
                </ul>
            </div>
        </header>
    )
}