import { twJoin, twMerge } from "tailwind-merge";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SigninForm, signInSchema } from "../model";
import { Testimonial } from "../layout/Testimonial";
import { useToast } from "../context/ToastContext";
import { useSupabase } from "../context/SupabaseContext";

interface Props {
    className?: string;
}

export const Signin: React.FC<Props> = ({ className }) => {
    const methods = useForm<SigninForm>({
        mode: 'onBlur',
        resolver: zodResolver(signInSchema)
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;
    const { showToast } = useToast();
    const { signin } = useSupabase();
    const { setCurrentUser, setCurrentSession } = useApp();
    const navigate = useNavigate();

    const onSubmit = async (formdata: SigninForm) => {
        showToast('inprogress', 'Signing in. Please wait...');
        const { error, data } = await signin(formdata);

        if (!error) {
            showToast('success', 'Signin successfully!');
            setCurrentUser(data.user);
            setCurrentSession(data.session);
            navigate('/', { replace: true });
        }
        else
            showToast('error', 'The Email or Password you entered is incorrect!');
    }

    return (
        <main className={twMerge(`
            fade-in-up
            mt-5 gap-5
            w-full md:w-[80%] flex mx-auto *:flex-1
            
            [&_button]:uppercase
            [&_button]:py-2
            [&_button]:px-6
            [&_button]:flex
            [&_button]:items-center
            [&_button]:gap-2
            [&_button]:justify-center
            [&_button]:rounded-md
           
            [&_button]:overflow-hidden
            focus:[&_button]:ring-0
            focus:[&_button]:outline-none
        `,
            className
        )}>
            <section className="p-8
            bg-[#2C2446] text-lg text-white  rounded-xl shadow-xl overflow-hidden">
                <header className="space-y-2">
                    <h1 className="text-2xl font-semibold">Sign In</h1>
                    <p className="text-md">Sign in to your account to solve coding challenges, track your progress, and compete with other developers.</p>
                </header>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5  pb-14">
                        <FormField id="email" name="email" type="email" label="" placeholder="Email Address"></FormField>
                        <FormField className="" id="password" name="password" type="password" label="" placeholder="Password"></FormField>
                        <div className="flex justify-center">
                            <button type="submit" className={twJoin("btn-primary",
                                isSubmitting && 'loading'
                            )} >
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </FormProvider>

                <div className="">
                    <Link to={'/signup'} className="btn-dark">
                        Create New Account
                    </Link>
                </div>
            </section>

            <Testimonial></Testimonial>
        </main>
    )
}