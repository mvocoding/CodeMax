import { z } from "zod";

export interface TabItem{
    title: string;
    content: React.ReactNode;
}

export interface User{
    id: string;
    email: string;
    username: string;
    avatar: string;
    fullname: string;
    description: string;
    user_metadata: {
        email_verified: boolean;
    }
}

const passwordRegex = /^.{6,}$/;

export const signUpSchema = z.object({
    fullname: z.string().min(1, 'Full name is required!'),
    email: z.string().email('Invalid Email'),
    password: z.string().regex(passwordRegex, 'Password too weak!'),
    confirmpassword: z.string()
}).refine((data) => data.password == data.confirmpassword, {
    message: 'Password must match',
    path: ['confirmpassword']
})

export type SignupForm = z.infer<typeof signUpSchema>;

