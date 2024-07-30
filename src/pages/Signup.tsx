import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormField } from "../components/FormField";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Testimonial } from "../layout/Testimonial";
import { SignupForm, signUpSchema } from "../model";
import { useSupabase } from "../context/SupabaseContext";
import { useApp } from "../context/AppContext";

interface Props {
    className?: string; 
}

export const Signup: React.FC<Props> = ({ className }) => {
    const methods = useForm<SignupForm>({
        mode: 'onBlur',
        resolver: zodResolver(signUpSchema)
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;
    const { showToast } = useToast();
    const { setCurrentUser, setCurrentSession } = useApp();
    const { signup } = useSupabase();
    const navigate = useNavigate()

    useEffect(() => {
        if(isSubmitting)
            showToast('inprogress', 'Signing up. Please wait...');
    }, [isSubmitting]);

    const onSubmit = async (formData: SignupForm) => {
        const { error, data } = await signup(formData);
        if(!error){
            showToast('success', 'Signup successfully!');
            setCurrentUser(data.user);
            setCurrentSession(data.session);
            navigate('/', { replace: true });
        }
        else 
            showToast('error', 'Something went wrong!');
    }       

    return (
        <main className={twMerge(`
            mt-5 gap-5
            max-w-[90%] flex mx-auto *:flex-1
        `,
            className
        )}>
            <section className="p-8
            bg-[#2C2446] text-lg text-white  rounded-xl shadow-xl overflow-hidden">
                <header className="space-y-2">
                    <h1 className="text-2xl font-semibold">Sign up</h1>
                    <p className="text-md">Sign up for an account to solve coding challenges, track your progress, and compete with other developers. </p>
                </header>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5  pb-14">
                        <FormField  id="fullname" name="fullname" type="text" label="" placeholder="Full Name"></FormField>
                        <FormField  id="email" name="email" type="email" label="" placeholder="Email Address"></FormField>
                        <FormField id="password" name="password" type="password" label="" placeholder="Password"></FormField>
                        <FormField id="confirmpassword" name="confirmpassword" type="password" label="" placeholder="Confirm Password"></FormField>
                        <div className="flex justify-center">
                            <button type="submit" className={`btn-primary ${isSubmitting ? 'loading' : undefined}`} >
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </FormProvider>

                <div className="">
                    <Link to={'/signin'} className="btn-dark" type="button">
                        <span className="material-symbols-outlined">arrow_left_alt</span>
                        Back to Sign In
                    </Link>
                </div>
            </section>
            <Testimonial></Testimonial>
        </main>
    )
}