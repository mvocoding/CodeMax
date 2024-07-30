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
import { LazyLoading } from "../components/LazyLoading";
import { SubmissionPost } from "../components/SubmissionPost";

interface Props {
    className?: string;
}
type FormStateKey = 'owner' | 'viewer' | 'edit';
interface FormStateProps {
    formClass: string;
    btns: ReactNode;
}

export const Profile: React.FC<Props> = ({ className }) => {
    const { currentUser, setCurrentUser, signout } = useApp();
    const [profile, setProfile] = useState(null);
    const [submissions, setSubmissions] = useState<any[] | null>(null);
    const { checkUsernameAvailability, updateUserProfile, getUserProfile, getSubmissionsByUsername } = useSupabase();
    const [formState, setFormState] = useState<FormStateKey>('viewer');
    const { showToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const formStateList: Record<FormStateKey, FormStateProps> = {
        'owner': {
            formClass: `[&_.editable_.input]:bg-transparent
                 [&_.editable_.input]:border-0
                 [&_.editable_.input]:pointer-events-none
                  `,
            btns: (
                <>
                    <button className="btn-primary" type="button"
                        onClick={(e) => { e.preventDefault(); setFormState('edit') }}>Edit My Profile</button>
                    <button className="btn-primary" type="button"
                        onClick={(e) => { navigate('/challenges')}}>Start Another Challenge</button>
                </>
            )
        },
        'viewer': {
            formClass: `[&_.editable_.input]:bg-transparent
                 [&_.editable_.input]:border-0
                 [&_.editable_.input]:pointer-events-none
                  `,
            btns: (
                <>
                </>
            )
        },
        'edit': {
            formClass: '[&_.form-wrapper]:space-y-5',
            btns: (
                <>
                    <button className="btn-primary" type="submit">Saves Change</button>
                    <button className="btn" type="button" onClick={() => setFormState('owner')}>Back</button>
                </>
            )
        }
    }

    const { formClass, btns } = formStateList[formState];

    const schema = z.object({
        username: z.string().min(6)
            .refine(async (username) => {
                if (username != currentUser!.profile!.username)
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
        const fetchData = async () => {
            const { error, data } = await getSubmissionsByUsername(id!);
            if (error) {
                return;
            }
            setSubmissions(data);
        }

        if (currentUser && id) {
            setupProfile(id);
            fetchData();
        }
    }, [currentUser, id]);

    const setupProfile = async (username: string) => {
        let tempProfile = null;
        if (currentUser!.profile!.username == id) {
            tempProfile = {
                ...currentUser!.profile,
                is_editable: true
            };
            setFormState("owner");
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
            navigate(`/profile/${profileData?.username}`, { replace: true });
            showToast('success', 'Update profile successfully!');
        }
        else {
            showToast('error', 'Something went wrong!');
        }
    }

    const handleSignout = async () => {
        const { error } = await signout();
        showToast("success", "Hope we can see you again!");
        navigate('/signin');
        return;
    }

    if (!profile || !submissions) return;

    return (
        <section className={twMerge(`relative mt-10 fade-in-up
            `,
            className
        )}>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    data-state={formState}
                    className={`
                ${formClass}
                min-h-[18rem]
                relative text-lg mx-auto flex flex-col justify-center max-md:items-center md:flex-row
                rounded-xl items-start max-w-[80%] bg-[#2C2446]
                [&_label]:min-w-[7rem]
                [&_.field>input]:flex-1
                *:p-5 md:*:p-10
                `}>

                    <div className="w-full md:w-[30%] flex flex-col justify-center items-center gap-5 ">
                        <img src={profile?.avatar!} alt="Likes Dislikes Stats" className="w-[11rem] aspect-square rounded-full  object-cover object-top" />

                        {formState === "owner" && (
                            <button type="button"
                                onClick={handleSignout}
                                className="btn-secondary">Sign out</button>
                        )}


                    </div>
                    <div className="flex-1 form-wrapper max-md:w-full" >
                        <FormField
                            className="editable"
                            name="fullname" id="fullname" label="" type="text" ></FormField>
                        <FormField
                            className="editable"
                            name="username" id="username" label="" type="text" ></FormField>
                        <FormField
                            className="editable"
                            name="description" id="description" label="" row={2} inputType="textarea" type="text"></FormField>
                        <div className="btn-wrapper flex flex-col gap-3">
                            {btns}
                        </div>
                    </div>
                </form>
            </FormProvider>
            <LazyLoading className="min-h-[400px]" text="Loading Submission..." isLoading={!submissions}>
                <SubmissionPost submissionsList={submissions}
                    className="p-10 mx-auto max-w-[100%]"></SubmissionPost>
            </LazyLoading>
        </section>)
}