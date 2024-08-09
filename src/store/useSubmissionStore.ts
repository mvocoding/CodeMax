import {create} from 'zustand';

interface SubmissionCode {
    html?: string;
    css?: string;
    js?: string;
    testcase?: string;
    currentLanguage?: string; // Add this if it's part of your data
    python?: string;
    javascript?: string;
}

interface FormData{
    submission_code?: SubmissionCode,
    submission_draft?: boolean;
    submission_id?: string;
    challenger_name?: string;
    challenges_id?: string;
    username?: string;
    challenge_thumbnail?: string;
    preview?: string;
}

interface SubmissionStore{
    formData: FormData | null;
    setFormData: (data: FormData) => void;
    setPreviewHTML: (preview: string) => void;
    setUserCode: (preview: string) => void;
}

export const useSubmissionStore = create<SubmissionStore>((set, get) => ({
    formData: null,
    setFormData: (data: FormData) => set ({ formData:  data}),
    setPreviewHTML: (preview: string) => set((state) => ({
        formData: {
            ...state.formData, 
            preview: preview  
        }
    })),
    setUserCode: (usercode: string) => set((state) => ({
        formData: {
            ...state.formData, 
            submission_code: {
                ...state.formData!.submission_code,
                [state.formData!.submission_code!.currentLanguage!]: usercode
            }
        }
    }))
}))