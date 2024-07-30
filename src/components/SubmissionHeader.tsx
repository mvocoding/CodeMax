import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useApp } from "../context/AppContext";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "../context/ToastContext";
import { useEffect, useState } from "react";

interface Props {
    className?: string;
}
type MenuOption = 'GUESS' | 'OWNER';

export const SubmissionHeader: React.FC<Props> = ({ className }) => {
    const { formData } = useSubmissionStore();
    const { updateSubmission } = useSupabase();
    const { currentUser } = useApp();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<MenuOption | null>(null);

    const handleSaveClick = async () => {
        showToast("inprogress", 'Updating your submission...')
        const { error, data } = await updateSubmission(formData?.submission_id!, formData?.submission_code!, formData?.submission_draft!);
        if (error) {
            showToast("error", 'Something went wrong!')
        }
        else {
            showToast("success", 'Update submission successfully !')
        }
    }
    const handleSubmitClick = async () => {
        showToast("inprogress", 'Submitting your submission...')
        const { error, data } = await updateSubmission(formData?.submission_id!, formData?.submission_code!, false);
        if (error) {
            showToast("error", 'Something went wrong!')
        }
        else {
            showToast("success", 'Submit submission successfully !')
        }
    }
    const handleTryChallengeClick = async () => {
        if (menu === "GUESS") {
            if (!currentUser?.id) {
                showToast("error", 'You need to login to Try this Challenge!');
                return;
            }
            navigate(`/challenges/${formData?.challenges_id}/newsubmission`);
            return;
        }
    }


    const MENULIST: Record<MenuOption, {
        text: string;
        onClick: () => void;
        className?: string;
    }[]> = {
        'OWNER': [
            {
                text: 'Back',
                onClick: () => navigate(`/challenges/${formData?.challenges_id}/submissions`),
            },
            {
                text: 'Preview',
                onClick: () => window.open(`/preview/${formData?.submission_id}`, '_blank'),
            },
            {
                text: 'Save',
                onClick: () => handleSaveClick(),
            },
            {
                text: 'Submit',
                onClick: () => handleSubmitClick(),
                className: 'active'
            }
        ],
        'GUESS': [
            {
                text: 'View Submissions',
                onClick: () => navigate(`/challenges/${formData?.challenges_id}/submissions`),
            },
            {
                text: 'Try This',
                onClick: () => handleTryChallengeClick(),
                className: 'active'
            },
        ]
    }

    useEffect(() => {
        if (formData && currentUser) {
            const currentMenu: MenuOption = currentUser?.profile.username == formData.username ? 'OWNER' : 'GUESS';
            setMenu(currentMenu);
        }
    }, [currentUser, formData]);

    if (!menu) return null;

    return (
        <header className={twMerge(`bg-[#2C2446] p-5 md:px-20 py-4 relative`,
            className
        )}>
            <div className=" flex items-center justify-between">
                <div className="max-sm:hidden">
                    <Link to={'/'} className="block w-16">
                        <img src="/images/logo.png" alt="Logo"/>
                    </Link>
                </div>
                <div className="max-md:hidden">
                    <p className="font-semibold text-xl uppercase">{formData!.challenger_name}</p>
                </div>
                <ul className="bg-transparent overflow-hidden flex gap-2 z-20 
                        items-center
                        justify-center
                        *:px-4
                        *:py-2
                        *:relative
                        *:transition-all
                        *:duration-300
                        *:rounded-full
                        [&_a]:block
                        [&_li.active]:bg-slate-300
                        [&_li.active]:text-zinc-800
                        *:cursor-pointer

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
                    {MENULIST[menu].map((option, index) => (
                        <li key={index} className={option.className}
                            onClick={option.onClick}>{option.text}</li>
                    ))}
                </ul>
            </div>
        </header>
    )
}