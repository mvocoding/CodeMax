import { createContext, ReactNode, useContext } from "react";
import { NewChallengeForm, SigninForm, SignupForm } from "../model";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

interface SupabaseContextProps {
    supabase: SupabaseClient;
    signup: (formData: SignupForm) => Promise<SupabaseResponse>;
    signin: (formData: SigninForm) => Promise<SupabaseResponse>;
    addNewPost: (newPost: NewChallengeForm) => Promise<boolean>;
    getChallenges: (name: string, tag: string[], rating: number, pagenumber: number, pagesize: number) => Promise<any>;
    getUserSubmission: (userID: string) => Promise<any>;
    submitPost: (userID: string, postID: string, code: Record<string, string>) => Promise<any>;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
    updateUserProfile: (userid: string, username: string, fullname: string, description: string, avatar: string) => Promise<any>;

    getUserProfile: (username: string) => Promise<any>;
    getChallengeWithSubmission: (id: string) => Promise<any>;
    getChallengeById: (id: string) => Promise<any>;
    createOrUpdateSubmission: (userid: string, challengeid: string) => Promise<any>;
    updateSubmission: (submissionid: string, code: Record<string, string>, draft: boolean) => Promise<any>;
    getSubmissionbyID: (submissionid: string) => Promise<any>;
    getSubmissionsByUsername: (username: string) => Promise<any>;
}
interface Props {
    children: ReactNode;
}
interface SupabaseResponse {
    error: any | null;
    data: any; // Define this based on what data you expect to return
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const SupabaseProvider: React.FC<Props> = ({ children }) => {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const signup = async (formData: SignupForm): Promise<SupabaseResponse> => {
        try {
            const { data: { user, session }, error } = await supabase.auth.signUp(formData);

            if (user) {
                const { data: profileData, error: profileError } = await supabase.rpc('create_profile', {
                    userid: user.id,
                    user_fullname: formData.fullname,
                    user_email: formData.email
                }).single();

                return {
                    error: profileError!,
                    data: {
                        user: {
                            ...user,
                            profile: profileData,
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

    const signin = async (formData: SigninForm): Promise<SupabaseResponse> => {
        try {
            const { error, data: { user, session } } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });

            if (!error) {
                const { error: profileError, data: { roles, profiles } } = await supabase.from('user_roles').select(`
                roles:role_id(name),
                profiles:user_id(*)
                `).eq('user_id', user?.id).single();

                if (!profileError) {
                    return {
                        data: {
                            user: {
                                ...user,
                                rolename: roles.name,
                                ...profiles
                            },
                            session
                        },
                        error: null
                    }
                }
            }

            return {
                error: 'Something went wrong!',
                data: null
            }
        }
        catch (error) {
            return {
                error: 'Something went wrong!',
                data: null
            }
        }
    }

    const checkUsernameAvailability = async (username: string): Promise<boolean> => {
        try {
            const { error, data } = await supabase.rpc('check_username_availability', {
                param_username: username
            });
            return !!data;
        }
        catch (error) {
            return false;
        }
    }

    const getUserProfile = async (username: string): Promise<any> => {
        try {
            const { error, data } = await supabase.rpc('get_profile', {
                user_username: username
            }).single();
            return { error, data };
        }
        catch (error) {
            return {
                error: true,
                data: null
            };
        }
    }

    const updateUserProfile = async (userid: string, username: string, fullname: string, description: string, avatar: string): Promise<any> => {
        try {
            const { error, data } = await supabase.rpc('update_profile', {
                user_userid: userid,
                user_username: username,
                user_fullname: fullname,
                user_description: description,
                user_avatar: avatar
            }).single();
            return { error, data };
        }
        catch (error) {
            return false;
        }
    }

    const getUserSubmission = async (userID: string): Promise<any> => {
        try {
            const { error, data } = await supabase.rpc('get_submissions_by_userid', {
                userid: userID
            });

            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }

    const getSubmissionsByUsername = async (username: string): Promise<any> => {
        try {
            const { error, data } = await supabase.rpc('get_submissions_by_username', {
                param_username: username
            });

            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }

    const addNewPost = async (newPost: NewChallengeForm): Promise<boolean> => {
        try {
            const { error: challengeError } = await supabase.from('challenges').insert({
                created_by: newPost.user_id,
                name: newPost.name,
                description: newPost.description,
                thumbnail: 'forgot-password-form/thumb_u.min.webp',
                code: newPost.code
            });
            return false;
        }
        catch (error) {
            return true;
        }
    }


    const submitPost = async (userID: string, postID: string, code: Record<string, string>): Promise<any> => {
        try {
            const { error } = await supabase
                .from('submissions')
                .upsert({
                    user_id: userID,
                    challenge_id: postID,
                    code
                }, { onConflict: ['user_id', 'challenge_id'] });

            return { error };
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }


    const getChallenges = async (name: string, tag: string[], rating: number, pagenumber: number, pagesize: number): Promise<any> => {
        try {
            const { error, data } = await supabase.rpc('filter_challenges', {
                filter_name: name,
                filter_tag: tag,
                filter_rating: rating,
                page_number: pagenumber,
                page_size: pagesize
            });
            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }

    const getChallengeById = async (id: string): Promise<any> => {
        try {
            const {error, data}  = await supabase.rpc('get_challenge_byid', {
                challenge_id: id
            }).single()
            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }    

    const getSubmissionbyID = async (submissionid: string): Promise<any> => {
        try {
            const {error, data}  = await supabase.rpc('get_submission_byid', {
                param_submissionid: submissionid
            }).single()
            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }   
    
    const getChallengeWithSubmission = async (id: string): Promise<any> => {
        try {
            const [challengeResp, submissionResp]  = await Promise.all([
                    supabase.rpc('get_challenge_byid', {
                        challenge_id: id
                    }).single(),
                    supabase.rpc('get_submissions_by_challengeid', {
                        challenge_id: id
                    }),
                ]);
            const { error: challengeError, data: challengeData } = challengeResp;
            const { error: submissionError, data: submissionData } = submissionResp;
            return {
                challenge: challengeData,
                submission: submissionData
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }

    const createOrUpdateSubmission = async (userid: string, challengeid: string): Promise<any> => {
        try {
            const {error, data}  = await supabase.rpc('create_or_update_draft', {
                param_userid: userid,
                param_challengeid: challengeid
            }).single();
            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }
    
    const updateSubmission = async (submissionid: string, code: Record<string, string>, draft: boolean): Promise<any> => {
        try {
            const {error, data}  = await supabase.rpc('update_submission', {
                param_submissionid: submissionid,
                param_code: code,
                param_draft: draft,
            }).single();
            return {
                error,
                data
            }
        }
        catch (error) {
            return {
                error: true,
                data: null
            }
        }
    }

    return (
        <SupabaseContext.Provider value={{
            supabase, signup, signin, addNewPost, getChallenges, getUserSubmission, submitPost, checkUsernameAvailability,
            updateUserProfile, getUserProfile, getChallengeWithSubmission, getChallengeById, createOrUpdateSubmission, updateSubmission,
            getSubmissionbyID, getSubmissionsByUsername
        }}>
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
