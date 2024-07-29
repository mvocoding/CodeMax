import {create} from 'zustand';

interface FormData{
    challenge_code?: {
        html?: string;
        css?: string;
        js?: string;
    },
    draft?: boolean;
    id?: string;
}

interface SubmissionStore{
    formData: FormData | null;
    setFormData: (data: FormData) => void;
}


export const useSubmissionStore = create<SubmissionStore>((set, get) => ({
    formData: null,
    setFormData: (data: FormData) => set ({ formData:  data})
}))