import { Editor } from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";
import Tab from "../components/Tab";
import { useEffect, useRef } from "react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import HtmlIframe from "./HtmlIframe";
import { MonacoEditor } from "../model";
import { FormProvider, useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormField";

const schema = z.object({
    language: z.string()
});
type FieldValues = z.infer<typeof schema>;

const LANGUAGE_LIST = [
    {
        text: 'JAVASCRIPT',
        value: 'javascript'
    },
    {
        text: 'PYTHON',
        value: 'python'
    }
]

interface Props {
    className?: string;
    data: any;
}

export const AlgorithmSubmission: React.FC<Props> = ({ className, data }) => {
    const { formData, setFormData, setUserCode } = useSubmissionStore(state => ({
        formData: state.formData,
        setFormData: state.setFormData,
        setUserCode: state.setUserCode,
    }));

    const methods = useForm<FieldValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
        defaultValues: {
            language: 'javascript'
        }
    });

    const { watch } = methods;
    const language = watch('language');
    const ide = useRef<MonacoEditor | null>(null);

    const updateCode = () => {
        const code = ide.current!.getValue();
        setUserCode(code, language);
    };

    useEffect(() => {
        if (data){
            setFormData(data);
        }
    }, [data]);

    if (!formData) return;

    return (
        <div className={twMerge(`h-screen flex fade-in-up *:flex-1 `)}>
            <Tab scroll="no" tabsList={[
                {
                    title: 'Problem',
                    content: (
                        <div className="w-[80%] h-[80%] flex mx-auto">
                            <img className="w-full h-full object-contain object-center " src={formData.challenge_thumbnail} alt="Coding Challenge" />
                        </div>
                    )
                },
                {
                    title: 'Playground',
                    content: (
                        <div className="
                        [&_select]:text-gray-900 [&_select]:w-36 [&_select]:px-2 [&_select]:py-1 [&_select]:rounded-lg
                        [&_option]:text-gray-900 
                        ">
                            <div className="grid  min-h-screen">
                                <FormProvider {...methods}>
                                    <form
                                        className="text-lg p-3 flex justify-center gap-x-10 [&_.input]:!bg-white [&_.field-input]:flex [&_.field-input]:items-center [&_.field-input]:gap-3">
                                        <FormField id="language" name="language" inputType="select"
                                            defaultValue={formData?.submission_code?.currentLanguage}
                                            label="LANGUAGE: "
                                            data={LANGUAGE_LIST}></FormField>
                                    </form>
                                </FormProvider>

                                <Editor
                                    onChange={updateCode}
                                    onMount={(editor) => { ide.current = editor }}
                                    value={formData?.submission_code[language]} className="!text-3xl"
                                    theme='vs-dark'
                                    language={language}
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerLanes: 0,
                                        scrollbar: {
                                            horizontal: "hidden",
                                            handleMouseWheel: false,
                                        },
                                        wordWrap: 'on',
                                        fontSize: 20,
                                    }}
                                />
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Preview',
                    content: (
                        <HtmlIframe className="min-h-screen min-w-full" height="100%" width="100%" src={formData?.submission_code!.preview!} />
                    )
                }
            ]}></Tab>
        </div>
    )
}