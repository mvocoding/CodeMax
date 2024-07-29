import create from 'zustand';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SignupForm, SigninForm, NewChallengeForm } from '../model';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

interface SupabaseStore {
  supabase: SupabaseClient;
  signup: (formData: SignupForm) => Promise<SupabaseResponse>;
  signin: (formData: SigninForm) => Promise<SupabaseResponse>;
  addNewPost: (newPost: NewChallengeForm) => Promise<boolean>;
  getChallenges: () => Promise<any>;
  getUserSubmission: (userID: string) => Promise<any>;
  submitPost: (userID: string, postID: string, code: Record<string, string>) => Promise<any>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
  updateUserProfile: (userid: string, username: string, fullname: string, description: string, avatar: string) => Promise<any>;
  getUserProfile: (username: string) => Promise<any>;
  getChallengeWithSubmission: (id: string) => Promise<any>;
  getChallengeById: (id: string) => Promise<any>;
  createOrUpdateSubmission: (userid: string, challengeid: string) => Promise<any>;
  updateSubmission: (submissionid: string, code: Record<string, string>, draft: boolean) => Promise<any>;
}

interface SupabaseResponse {
  error: any | null;
  data: any;
}

export const useSupabaseStore = create<SupabaseStore>((set) => {
  const supabase = createClient(supabaseUrl, supabaseKey);

  return {
    supabase,
    signup: async (formData: SignupForm): Promise<SupabaseResponse> => {
      try {
        const { data: { user, session }, error } = await supabase.auth.signUp(formData);
        if (user) {
          const { data: profileData, error: profileError } = await supabase.rpc('create_profile', {
            userid: user.id,
            user_fullname: formData.fullname,
            user_email: formData.email
          }).single();
          return {
            error: profileError,
            data: {
              user: { ...user, profile: profileData },
              session
            }
          };
        }
        return { error: 'Something went wrong!', data: null };
      } catch (error) {
        return { error: 'Something went wrong!', data: null };
      }
    },
    signin: async (formData: SigninForm): Promise<SupabaseResponse> => {
      try {
        const { data: { user, session }, error } = await supabase.auth.signInWithPassword(formData);
        if (!error) {
          const { error: profileError, data: { roles, profiles } } = await supabase.from('user_roles').select(`
            roles:role_id(name),
            profiles:user_id(*)
          `).eq('user_id', user?.id).single();
          if (!profileError) {
            return {
              data: {
                user: { ...user, rolename: roles.name, ...profiles },
                session
              },
              error: null
            };
          }
        }
        return { error: 'Something went wrong!', data: null };
      } catch (error) {
        return { error: 'Something went wrong!', data: null };
      }
    },
    checkUsernameAvailability: async (username: string): Promise<boolean> => {
      try {
        const { data, error } = await supabase.rpc('check_username_availability', { param_username: username });
        return !!data;
      } catch (error) {
        return false;
      }
    },
    getUserProfile: async (username: string): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('get_profile', { user_username: username }).single();
        return { error, data };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    updateUserProfile: async (userid: string, username: string, fullname: string, description: string, avatar: string): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('update_profile', {
          user_userid: userid,
          user_username: username,
          user_fullname: fullname,
          user_description: description,
          user_avatar: avatar
        }).single();
        return { error, data };
      } catch (error) {
        return false;
      }
    },
    getUserSubmission: async (userID: string): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('get_submissions_by_userid', { userid: userID });
        return { error, data };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    addNewPost: async (newPost: NewChallengeForm): Promise<boolean> => {
      try {
        const { error } = await supabase.from('challenges').insert({
          created_by: newPost.user_id,
          name: newPost.name,
          description: newPost.description,
          thumbnail: 'forgot-password-form/thumb_u.min.webp',
          code: newPost.code
        });
        return !error;
      } catch (error) {
        return false;
      }
    },
    submitPost: async (userID: string, postID: string, code: Record<string, string>): Promise<any> => {
      try {
        const { error } = await supabase.from('submissions').upsert({
          user_id: userID,
          challenge_id: postID,
          code
        }, { onConflict: ['user_id', 'challenge_id'] });
        return { error };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    getChallenges: async (): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('filter_challenges', {
          filter_name: null,
          filter_tag: null,
          filter_rating: null,
          page_number: 1,
          page_size: 12
        });
        return { error, data };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    getChallengeById: async (id: string): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('get_challenge_byid', { challenge_id: id }).single();
        return { error, data };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    getChallengeWithSubmission: async (id: string): Promise<any> => {
      try {
        const [challengeResp, submissionResp] = await Promise.all([
          supabase.rpc('get_challenge_byid', { challenge_id: id }).single(),
          supabase.rpc('get_submissions_by_challengeid', { challenge_id: id })
        ]);
        const { data: challengeData, error: challengeError } = challengeResp;
        const { data: submissionData, error: submissionError } = submissionResp;
        return {
          challenge: challengeData,
          submission: submissionData
        };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    createOrUpdateSubmission: async (userid: string, challengeid: string): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('create_or_update_draft', {
          param_userid: userid,
          param_challengeid: challengeid
        }).single();
        return { error, data };
      } catch (error) {
        return { error: true, data: null };
      }
    },
    updateSubmission: async (submissionid: string, code: Record<string, string>, draft: boolean): Promise<any> => {
      try {
        const { data, error } = await supabase.rpc('update_submission', {
          param_submissionid: submissionid,
          param_code: code,
          param_draft: draft
        }).single();
        return { error, data };
      } catch (error) {
        return { error: true, data: null };
      }
    }
  };
});
