import { twMerge } from "tailwind-merge";
import { FormProvider, useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../components/FormField";

interface Props {
    className?: string;
}

const schema = z.object({
    email: z.string()
        .nonempty('Email is required!')
        .email('Invalid Email address'),
    password: z.string()
        .nonempty('Password is required!')
});
type FormValues = z.infer<typeof schema>;

export const Signin: React.FC<Props> = ({ className }) => {
    const methods = useForm<FormValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    });
    const { handleSubmit } = methods;

    const onSubmit = (data: FormValues) => {
        debugger;
    }

    return (
        <main className={twMerge(`
            mt-5 gap-5
            max-w-[90%] flex mx-auto *:flex-1
            
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
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5  border-b pb-14">
                        <FormField  id="email" name="email" type="email" label="" placeholder="Email Address"></FormField>
                        <FormField className="" id="password" name="password" type="password" label="" placeholder="Password"></FormField>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-[#0C5172] text-white  transition duration-300 hover:bg-[#115889] shadow-lg shadow-[#0C5172]/50" >
                                SIGN IN
                                <span className="material-symbols-outlined">arrow_right_alt</span>
                            </button>
                        </div>
                    </form>
                </FormProvider>

                <div className="
                space-y-5 
                [&>button]:border
                [&>button]:flex
                [&>button]:items-center
                [&>button]:w-full
                [&>button]:transition-all 
                [&>button]:duration-300
                hover:[&>button]:hover:bg-[#0C5172] 
                hover:[&>button]:hover:text-white
            ">
                    <button type="button">
                        Create New Account
                    </button>
                </div>
            </section>

            <section className="hidden lg:flex flex-col gap-12 p-10 bg-white rounded-xl text-gray-800">
                <img className="rounded-full w-[200px] mx-auto"
                    src="https://media.licdn.com/dms/image/C4D0BAQElUhj0AoCXPw/company-logo_200_200/0/1640987068231/courseralearning_logo?e=1729728000&v=beta&t=YjloNleFq08w-JIRa3sT7fOvQhG7B-YSOgdcHgSR52M" alt="Avatar" />

                <blockquote className="text-xl  
                after:right-0 after:text-5xl after:absolute after:content-[close-quote]
                before:left-0 before:-top-5 before:text-5xl before:absolute before:content-[open-quote]
                p-5 relative ">
                    
                    <div>
                        <h2>I've been using CodeDeck for my development projects, and it's been a game-changer. The intuitive interface and powerful features streamline my workflow, making coding more efficient and enjoyable. Highly recommend CodeDeck for developers looking to enhance their productivity</h2>
                    </div>
                </blockquote>
            </section>
        </main>
    )
}