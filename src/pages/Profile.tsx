import { twMerge } from "tailwind-merge";
import { Post } from "../components/Post";
import { FormField } from "../components/FormField";
import { FormProvider, useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "../context/AppContext";

interface Props {
    className?: string;
}
const schema = z.object({
    username: z.string()
});
type FieldValues = z.infer<typeof schema>;

export const Profile: React.FC<Props> = ({ className }) => {
    const methods = useForm<FieldValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    });
    const { handleSubmit } = methods;
    const onSubmit = (formData: FieldValues) => {

    }
    const { currentUser } = useApp();

    return (
        <section className={twMerge(`relative mt-10
            `,
            className
        )}>
            <div className="max-w-[70%] rounded-tl-xl rounded-tr-xl flex p-1 gap-5 items-center justify-center mx-auto  bg-red-500/50">
                <p>Please Verify to Claim Your Profile</p>
                <button className="btn-primary">Resend Email</button>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${!currentUser?.user_metadata.email_verified ? '' : ''} relative text-lg mx-auto flex 
                rounded-br-xl rounded-bl-xl justify-center max-w-[70%] bg-[#2C2446]`}>

                    <div className="w-[30%]  flex flex-col justify-center items-center gap-5">
                        <img src={ currentUser?.avatar || '/images/thinking.svg' } alt="Likes Dislikes Stats" className="max-w-[80%] aspect-square rounded-full  object-cover object-top" />
                    </div>
                    <div className="flex-1 p-10 space-y-3">
                        <FormField
                            className="editable show "
                            name="fullname" id="fullname" label="Full Name: " type="text" placeholder={currentUser?.fullname}></FormField>
                        <FormField
                            className="editable"
                            name="username" id="username" label="Username: " type="text" placeholder={currentUser?.username}></FormField>
                        <FormField
                            className="editable"
                            name="description" id="description" label="Description: " type="text" placeholder={currentUser?.description}></FormField>
                        <div className="flex flex-col gap-3">
                            <button className="btn-primary">Edit Profile</button>
                            <button className="btn-primary">Start Another Challenge</button>
                        </div>
                    </div>
                </form>
            </FormProvider>
            <Post className="mt-5 mx-auto max-w-[80%]"></Post>
        </section>)
}