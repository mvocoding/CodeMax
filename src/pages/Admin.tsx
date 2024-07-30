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
            showToast('inprogress', 'Signing in. Please wait...');
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
                            name="description" id="description" label="Challenge Description: " row={5} inputType="textarea" type="text"></FormField>
                        <Tab className="" tabsList={[
                            {
                                title: 'HTML',
                                content: (<Editor onMount={(editor) => handleEditorDidMount(editor, 'HTML')} theme='vs-dark' defaultLanguage="html" defaultValue={`<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Remove the line below if you don't want to use TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>

</head>

<!-- Change code below this line -->
<body class="bg-[#181028] flex justify-center items-center min-h-screen">
    <div class="bg-white text-[#181028] p-8 space-y-4 shadow-lg rounded-xl w-full max-w-xl">

        <p class="text-lg">Transform the design (bottom-right) <svg class="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 8h.01"></path><path d="M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5"></path><path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4"></path><path d="M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598"></path><path d="M16 19h6"></path><path d="M19 16v6"></path></svg> into a functional project using HTML and CSS.</p>

        <h2 class="text-2xl">Want to go the extra mile?</h2>
        <p class="flex gap-2 font-medium text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
            </svg>

            Add animations and make the project interactive using JavaScript! 😎
        </p>
        <p class="flex gap-2 font-medium text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
            </svg>

            Prioritize creativity over pixel-perfect accuracy and showcase your developer ingenuity.
        </p>
        <p class="text-sm border-t pt-6">This example uses TailwindCSS by adding the CDN in the head tag. You can import any libraries you want using a CDN.</p>
    </div>
</body>
<!-- Change code above this line -->

</html>`} />)
                            },
                            {
                                title: 'CSS',
                                content: (<Editor onMount={(editor) => handleEditorDidMount(editor, 'CSS')} theme='vs-dark' defaultLanguage="css" defaultValue={``} />)
                            },
                            {
                                title: 'JS',
                                content: (<Editor onMount={(editor) => handleEditorDidMount(editor, 'JS')} theme='vs-dark' defaultLanguage="javascript" defaultValue={``} />)
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