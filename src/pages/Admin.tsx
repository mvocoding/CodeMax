import { twMerge } from "tailwind-merge";
import { FormField } from "../components/FormField";
import { FormProvider, useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "../context/AppContext";
import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";
import { useRef } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "../context/ToastContext";
import { MonacoEditor } from "../model";
import { DEFAULT_CHALLENGE_CSS, DEFAULT_CHALLENGE_DESCRIPTION, DEFAULT_CHALLENGE_HTML, DEFAULT_CHALLENGE_JAVASCRIPT, DEFAULT_CHALLENGE_JS, DEFAULT_CHALLENGE_PYTHON } from "../data";

interface Props {
    className?: string;
}
const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    tags: z.string().min(1, 'Description is required'),
    testcase: z.string(),
    rating: z.string(),
    language: z.string()
});
type FieldValues = z.infer<typeof schema>;

export const Admin: React.FC<Props> = ({ className }) => {
    const { currentUser } = useApp();
    const methods = useForm<FieldValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    });
    const { handleSubmit, formState } = methods;
    const { createChallenge } = useSupabase();
    const { showToast } = useToast();

    const onSubmit = async (formData: FieldValues) => {
        const rating = formData.rating;
        const language = formData.language;
        const tags = formData.tags.split(',');
        let code = undefined;
        if (language === 'frontend') {
            code = {
                html: htmlEditorRef!.current!.getValue(),
                css: cssEditorRef!.current!.getValue(),
                js: jsEditorRef!.current!.getValue()
            }
        }
        else {
            code = {
                python: pythonEditorRef!.current!.getValue(),
                javascript: javascriptEditorRef!.current!.getValue(),
                testcase: formData.testcase,
                currentLanguage: 'javascript'
            }
        }

        showToast('inprogress', 'Submitting in. Please wait...');
        const { error, data } = await createChallenge(currentUser?.id!,
            tags, rating, formData.name, formData.description,
            code,
            [language]
        );
        if (!error)
            showToast('success', 'Add New Challenge successfully!');
        else
            showToast('error', 'Something went wrong!');
    }

    const htmlEditorRef = useRef<MonacoEditor | null>(null);
    const cssEditorRef = useRef<MonacoEditor | null>(null);
    const jsEditorRef = useRef<MonacoEditor | null>(null);
    const pythonEditorRef = useRef<MonacoEditor | null>(null);
    const javascriptEditorRef = useRef<MonacoEditor | null>(null);
    const javaEditorRef = useRef<MonacoEditor | null>(null);
    const csharpEditorRef = useRef<MonacoEditor | null>(null);

    const handleEditorDidMount = (editor: MonacoEditor, language: string) => {
        if (language === 'HTML') htmlEditorRef.current = editor;
        if (language === 'CSS') cssEditorRef.current = editor;
        if (language === 'JS') jsEditorRef.current = editor;

        if (language === 'PYTHON') pythonEditorRef.current = editor;
        if (language === 'JAVASCRIPT') javascriptEditorRef.current = editor;
        if (language === 'JAVA') javaEditorRef.current = editor;
        if (language === 'CSHARP') csharpEditorRef.current = editor;
    };

    return (
        <section className={twMerge(`relative mt-10 
            `,
            className
        )}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={`relative text-lg mx-auto flex  max-w-[90%]
                rounded-br-xl rounded-bl-xl justify-center  bg-[#2C2446]
                [&_label]:min-w-[7rem]
                [&_.field>input]:flex-1
                [&_canvas]:!relative
                `}>
                    <div className="flex-1 p-10">
                        <FormField
                            name="name" id="name" label="Challenge Name: " type="text"></FormField>
                        <FormField
                            data={[
                                {
                                    text: 'Front End',
                                    value: 'frontend'
                                },
                                {
                                    text: 'Algorithm',
                                    value: 'algorithm'
                                }
                            ]}
                            name="language" id="language" label="Language: " inputType="select"></FormField>

                        <FormField
                            data={[
                                {
                                    text: 'Beginner',
                                    value: '1'
                                },
                                {
                                    text: 'Intermediate',
                                    value: '2'
                                },
                                {
                                    text: 'Advanced',
                                    value: '3'
                                }
                            ]}
                            name="rating" id="rating" label="Difficulty: " inputType="select"></FormField>

                        <FormField
                            name="tags" id="tags" label="Tags: " type="text"></FormField>
                        <FormField
                            name="testcase" id="testcase" label="Test Case: " type="text"></FormField>
                        <FormField
                            name="description" id="description" label="Challenge Description: " row={5} inputType="textarea" type="text"
                            defaultValue={DEFAULT_CHALLENGE_DESCRIPTION}></FormField>

                        <Tab className="max-h-[400px]" tabsList={[
                            {
                                title: 'HTML',
                                content: (<Editor
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerLanes: 0,
                                        scrollbar: {
                                            horizontal: "hidden",
                                            handleMouseWheel: false,
                                        },
                                        wordWrap: 'on',
                                    }}
                                    onMount={(editor) => handleEditorDidMount(editor, 'HTML')} theme='vs-dark' defaultLanguage="html" defaultValue={DEFAULT_CHALLENGE_HTML} />)
                            },
                            {
                                title: 'CSS',
                                content: (<Editor
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerLanes: 0,
                                        scrollbar: {
                                            horizontal: "hidden",
                                            handleMouseWheel: false,
                                        },
                                        wordWrap: 'on',
                                    }}
                                    onMount={(editor) => handleEditorDidMount(editor, 'CSS')} theme='vs-dark' defaultLanguage="css" defaultValue={DEFAULT_CHALLENGE_CSS} />)
                            },
                            {
                                title: 'JS',
                                content: (<Editor
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerLanes: 0,
                                        scrollbar: {
                                            horizontal: "hidden",
                                            handleMouseWheel: false,
                                        },
                                        wordWrap: 'on',
                                    }}
                                    onMount={(editor) => handleEditorDidMount(editor, 'JS')} theme='vs-dark' defaultLanguage="javascript" defaultValue={DEFAULT_CHALLENGE_JS} />)
                            }
                        ]}></Tab>
                        <Tab className="max-h-[400px]" tabsList={[
                            {
                                title: 'JAVASCRIPT',
                                content: (<Editor
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerLanes: 0,
                                        scrollbar: {
                                            horizontal: "hidden",
                                            handleMouseWheel: false,
                                        },
                                        wordWrap: 'on',
                                    }}
                                    onMount={(editor) => handleEditorDidMount(editor, 'JAVASCRIPT')} theme='vs-dark' defaultLanguage="javascript" defaultValue={DEFAULT_CHALLENGE_JAVASCRIPT} />)
                            },
                            {
                                title: 'PYTHON',
                                content: (<Editor
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerLanes: 0,
                                        scrollbar: {
                                            horizontal: "hidden",
                                            handleMouseWheel: false,
                                        },
                                        wordWrap: 'on',
                                    }}
                                    onMount={(editor) => handleEditorDidMount(editor, 'PYTHON')} theme='vs-dark' defaultLanguage="python" defaultValue={DEFAULT_CHALLENGE_PYTHON} />)
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