import { z } from "zod";

export interface TabItem{
    title: string;
    content: React.ReactNode;
}

export interface SupabaseAuth{
    access_token: string;
    refresh_token: string;
}

export interface User{
    id?: string;
    created_at?: string;
    email?: string;
    user_metadata?: {
        email_verified: boolean;
    }
    profile?: {
        avatar?: string;
        created_at?: string;
        description?: string;
        fullname?: string;
        likes?: number;
        role?: string;
        user_id?: string;
        username?: string;
    }
}

export interface NewChallengeForm{
    name: string;
    description: string;
    thumbnail: string;
    code: Record<string, string>;
    user_id: string;
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

export const signInSchema = z.object({
    email: z.string().min(1, 'Email is required!'),
    password: z.string().min(1, 'Password is required!')
});
export type SignupForm = z.infer<typeof signUpSchema>;
export type SigninForm = z.infer<typeof signInSchema>;

export interface MonacoEditor{
    getValue: () => string;
}

export interface FilterChallengeParams{
    filter_name: string;
    filter_tag: string[];
    filter_rating: number;
    filter_lang: string[];
    page_number: number,
    page_size: number;
}