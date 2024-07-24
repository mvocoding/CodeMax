import { createContext, ReactNode, useContext } from "react";
import { SignupForm } from "../model";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

interface SupabaseContextProps {
    supabase: SupabaseClient;
    signup: (formData: SignupForm) => Promise<SupabaseResponse>;
}
interface Props {
    children: ReactNode;
}
interface SupabaseResponse {
    error: string | null;
    data: any; // Define this based on what data you expect to return
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

const randomUsername = (length = 10): string => {
    const numbers = '123456789';
    let username = 'User';

    for (let i = 0; i < length; ++i) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        username += numbers.charAt(randomIndex);
    }
    return username;
}

export const SupabaseProvider: React.FC<Props> = ({ children }) => {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const signup = async (formData: SignupForm): Promise<SupabaseResponse> => {
        try {
            const { data, error } = await supabase.auth.signUp(formData);
            const { user, session} = data;

            if (user) {
                const extraInfo = {
                    user_id: user.id,
                    fullname: formData.fullname,
                    avatar: null,
                    username: randomUsername(),
                    description: ''
                }

                const [roleResp, profileResp] = await Promise.all([
                    supabase.from('roles').select('id').eq('name', 'member').single(),
                    supabase.from('profiles').insert(extraInfo)
                ])

                const roleId = roleResp.data?.id;

                await supabase.from('user_roles').insert({
                    user_id: user.id,
                    role_id: roleId
                });

                return {
                    error: null,
                    data: {
                        user: {
                            ...user,
                            ...extraInfo
                        },
                        session
                    }
                }
            }
            return { error: 'Something went wrong!', data: null };
        }
        catch (error) {
            return {
                error: 'Something went wrong!',
                data: null
            }
        }
    }

    const signin = () => {

    }

    return (
        <SupabaseContext.Provider value={{ supabase, signup }}>
            {children}
        </SupabaseContext.Provider>
    )
}

export const useSupabase = (): SupabaseContextProps => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw Error('Something went wrong!');
    }
    return context;
}
