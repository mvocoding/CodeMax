import { twMerge } from "tailwind-merge";
import { FormField } from "../components/FormField";
import { FormProvider, useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "../context/AppContext";
import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";
import { useEffect, useRef } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "../context/ToastContext";
import { MonacoEditor } from "../model";
import { DEFAULT_CHALLENGE_CSS, DEFAULT_CHALLENGE_DESCRIPTION, DEFAULT_CHALLENGE_HTML, DEFAULT_CHALLENGE_JS } from "../data";

interface Props {
    className?: string;
}
const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required')
  });
type FieldValues = z.infer<typeof schema>;

export const Admin: React.FC<Props> = ({ className }) => {
    const { currentUser } = useApp();
    const methods = useForm<FieldValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    });
    const { handleSubmit, formState: {errors, isSubmitting} } = methods;
    const {addNewPost} = useSupabase();
    const { showToast } = useToast();

    useEffect(() => {
        if(isSubmitting)
            showToast('inprogress', 'Submitting in. Please wait...');
    }, [isSubmitting])
    
    const onSubmit = async (formData: FieldValues) => {
        const error = await addNewPost({
            ...formData,
            code: {
                'HTML': htmlEditorRef.current!.getValue(),
                'CSS': htmlEditorRef.current!.getValue(),
                'JS': htmlEditorRef.current!.getValue()
            },
            user_id: currentUser?.id!,
            thumbnail: ''
        })

        if(!error)
            showToast('success', 'Add New Challenge successfully!');
        else 
            showToast('error', 'Something went wrong!');
    }
    
    const htmlEditorRef = useRef<MonacoEditor | null>(null);
    const cssEditorRef = useRef<MonacoEditor | null>(null);
    const jsEditorRef = useRef<MonacoEditor | null>(null);
  
  
    const handleEditorDidMount = (editor: MonacoEditor, language: string) => {
      if (language === 'HTML') htmlEditorRef.current = editor;
      if (language === 'CSS') cssEditorRef.current = editor;
      if (language === 'JS') jsEditorRef.current = editor;
    };
  

    return (
        <section className={twMerge(`relative mt-10
            `,
            className
        )}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={`overflow-scroll relative text-lg mx-auto flex 
                rounded-br-xl rounded-bl-xl justify-center max-w-[70%] bg-[#2C2446]
                [&_label]:min-w-[7rem]
                [&_.field>input]:flex-1
                `}>
                    <div className="flex-1 p-10">
                        <FormField
                            name="name" id="name" label="Challenge Name: " type="text"></FormField>
                        <FormField
                            name="description" id="description" label="Challenge Description: " row={5} inputType="textarea" type="text"
                            defaultValue={DEFAULT_CHALLENGE_DESCRIPTION}></FormField>
                        <Tab className="" tabsList={[
                            {
                                title: 'HTML',
                                content: (<Editor onMount={(editor) => handleEditorDidMount(editor, 'HTML')} theme='vs-dark' defaultLanguage="html" defaultValue={DEFAULT_CHALLENGE_HTML} />)
                            },
                            {
                                title: 'CSS',
                                content: (<Editor onMount={(editor) => handleEditorDidMount(editor, 'CSS')} theme='vs-dark' defaultLanguage="css" defaultValue={DEFAULT_CHALLENGE_CSS} />)
                            },
                            {
                                title: 'JS',
                                content: (<Editor onMount={(editor) => handleEditorDidMount(editor, 'JS')} theme='vs-dark' defaultLanguage="javascript" defaultValue={DEFAULT_CHALLENGE_JS} />)
                            }
                        ]}></Tab>
                        <div className="flex flex-col gap-3">
                            <button type="submit" className="btn-primary">Add New Challenge</button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </section>)
}