import {create} from 'zustand';

interface SubmissionCode {
    html?: string;
    css?: string;
    js?: string;
    testcase?: string;
    currentLanguage?: string; // Add this if it's part of your data
    python?: string;
    javascript?: string;
    preview?: string;
}

interface FormData{
    submission_code?: SubmissionCode,
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
    setPreviewHTML: (preview: string) => void;
    setUserCode: (usercode: string, language: string) => void;
}

export const useSubmissionStore = create<SubmissionStore>((set, get) => ({
    formData: null,
    setFormData: (data: FormData) => set ({ formData:  data}),
    setPreviewHTML: (preview: string) => set((state) => ({
        formData: {
            ...state.formData, 
            submission_code: {
                ...state.formData!.submission_code,
                preview
            }
        }
    })),
    setUserCode: (usercode: string, language: string) => set((state) => ({
        formData: {
            ...state.formData, 
            submission_code: {
                ...state.formData!.submission_code,
                [language]: usercode,
                currentLanguage: language
            }
        }
    }))
}))