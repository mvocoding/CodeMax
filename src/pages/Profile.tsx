import { twMerge } from "tailwind-merge";
import { FormField } from "../components/FormField";
import { FormProvider, useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "../context/AppContext";
import { ReactNode, useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
    className?: string;
}
type FormStateKey = 'idle' | 'edit';
interface FormStateProps {
    formClass: string;
    btns: ReactNode;
}

export const Profile: React.FC<Props> = ({ className }) => {
    const { currentUser, setCurrentUser } = useApp();
    const [profile, setProfile] = useState(null);
    const [challenges, setChallenges] = useState<any[] | null>(null);
    const { checkUsernameAvailability, updateUserProfile, getUserProfile } = useSupabase();
    const [formState, setFormState] = useState<FormStateKey>('idle');
    const { showToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const formStateList: Record<FormStateKey, FormStateProps> = {
        'idle': {
            formClass: `[&_.editable_.input]:bg-transparent
                 [&_.editable_.input]:border-0
                 [&_.editable_.input]:pointer-events-none
                  `,
            btns: currentUser?.profile.username === id ? (
                <>
                    <button className="btn" type="button"
                        onClick={(e) => { e.preventDefault(); setFormState('edit') }}>Edit My Profile</button>
                    <button className="btn-primary" type="button"
                        onClick={(e) => { e.preventDefault(); setFormState('edit') }}>Start Another Challenge</button>
                </>
            )
                : (
                    <div></div>
                )
        },
        'edit': {
            formClass: '[&_.form-wrapper]:space-y-5',
            btns: (<button className="btn-primary" type="submit">Saves Change</button>)
        }
    }
    const { formClass, btns } = formStateList[formState];

    const schema = z.object({
        username: z.string().min(6)
            .refine(async (username) => {
                if (username != currentUser?.profile.username)
                    return await checkUsernameAvailability(username);
                return true;
            }, { message: 'Username is taken' }),
        fullname: z.string().min(6),
        description: z.string(),
        avatar: z.string(),
        userid: z.string()
    });
    type FieldValues = z.infer<typeof schema>;

    const methods = useForm<FieldValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
        if (currentUser) {
            setupProfile(id);
        }
    }, [currentUser, id]);

    const setupProfile = async (username: string) => {
        let tempProfile = null;
        if (currentUser!.profile.username == id) {
            tempProfile = {
                ...currentUser!.profile,
                is_editable: true
            };
        }
        else {
            const { error, data: profileData } = await getUserProfile(username);
            if (!error)
                tempProfile = profileData;
        }
        if (tempProfile) {
            setProfile(tempProfile);
            reset({
                fullname: tempProfile!.fullname,
                description: tempProfile!.description,
                username: tempProfile!.username,
                avatar: tempProfile!.avatar,
                userid: tempProfile!.user_id
            });
        }
    }

    const onSubmit = async (data: FieldValues) => {
        showToast('inprogress', 'Updating your profile...');
        const { error, data: profileData } = await updateUserProfile(data.userid, data.username, data.fullname,
            data.description, data.avatar);

        if (!error) {
            setCurrentUser({
                ...currentUser,
                profile: { ...profileData }
            });
            navigate(profileData?.username, { replace: true });
            showToast('success', 'Update profile successfully!');
        }
        else {
            showToast('error', 'Something went wrong!');
        }
    }

    if (!profile) return;

    return (
        <section className={twMerge(`relative mt-10
            `,
            className
        )}>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    data-state={formState}
                    className={`
                ${formClass}

                relative text-lg mx-auto flex 
                rounded-xl items-start max-w-[80%] bg-[#2C2446]
                [&_label]:min-w-[7rem]
                [&_.field>input]:flex-1
                *:p-10
                `}>

                    <div className="w-[30%] flex flex-col justify-center items-center gap-10 ">
                        <img src={"https://tailwindflex.com/public/images/" + profile?.avatar!} alt="Likes Dislikes Stats" className="w-full aspect-square rounded-full  object-cover object-top" />
                        <div className="w-full flex justify-between">
                            <p>Likes: {profile.likes}</p>
                            <p>Submissions: 10</p>
                        </div>
                    </div>
                    <div className="flex-1 form-wrapper">
                        <FormField
                            className="editable "
                            name="fullname" id="fullname" label="Full Name: " type="text" ></FormField>
                        <FormField
                            className="editable"
                            name="username" id="username" label="Username: " type="text" ></FormField>
                        <FormField
                            className="editable"
                            name="description" id="description" label="" row={2} inputType="textarea" type="text"></FormField>
                        <div className="btn-wrapper flex flex-col gap-3">
                            {btns}
                        </div>
                    </div>
                </form>
            </FormProvider>
            <Post className="flex mx-auto max-w-[90%]" challengeList={challenges}></Post>
        </section>)
}