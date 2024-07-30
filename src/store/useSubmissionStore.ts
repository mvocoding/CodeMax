import {create} from 'zustand';

interface FormData{
    submission_code?: {
        html?: string;
        css?: string;
        js?: string;
    },
    submission_draft?: boolean;
    submission_id?: string;
    challenger_name?: string;
    challenges_id?: string;
    username?: string;
    challenge_thumbnail?: string;
}

interface SubmissionStore{
    formData: FormData | null;
    setFormData: (data: FormData) => void;
}


export const useSubmissionStore = create<SubmissionStore>((set, get) => ({
    formData: null,
    setFormData: (data: FormData) => set ({ formData:  data})
}))