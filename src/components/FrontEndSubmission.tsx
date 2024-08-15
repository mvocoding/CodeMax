import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";
import { useEffect, useRef, useState } from "react";
import HtmlIframe from "../components/HtmlIframe";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { MonacoEditor } from "../model";

interface Props {
    className?: string;
    data: any;
}

export const FrontEndSubmission: React.FC<Props> = ({ className, data }) => {
    if(!data) return;

    const { formData, setFormData } = useSubmissionStore(state => ({
        formData: state.formData,
        setFormData: state.setFormData
    }));
    let htmlEditor = useRef<MonacoEditor | null>(null);
    let cssEditor = useRef<MonacoEditor | null>(null);
    let jsEditor = useRef<MonacoEditor | null>(null);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const updateHtmlContent = () => {
        setFormData({
            ...formData,
            submission_code: {
                html: htmlEditor.current?.getValue(),
                css: cssEditor.current?.getValue(),
                js: jsEditor.current?.getValue()
            }
        });
    };

    const handleEditorDidMount = (editor: MonacoEditor, type: string) => {
        if (type == 'HTML') htmlEditor.current = editor;
        if (type == 'CSS') cssEditor.current = editor;
        if (type == 'JS') jsEditor.current = editor;
    }

    return (
        <div className="h-screen flex fade-in-up *:flex-1">
            <Tab tabsList={[
                {
                    title: 'Challenge',
                    content: (<img className="w-full object-contain max-h-screen object-center " src={formData?.challenge_thumbnail} alt="Challenge Thumbnail" />)
                },

                {
                    title: 'HTML',
                    content: (<Editor
                        onChange={updateHtmlContent}
                        onMount={(editor) => handleEditorDidMount(editor, 'HTML')}
                        theme='vs-dark' defaultLanguage="html" defaultValue={formData?.submission_code?.html} />)
                },
                {
                    title: 'CSS',
                    content: (<Editor
                        onChange={updateHtmlContent}
                        onMount={(editor) => handleEditorDidMount(editor, 'CSS')}
                        theme='vs-dark' defaultLanguage="css" defaultValue={formData?.submission_code?.css} />)
                },
                {
                    title: 'JS',
                    content: (<Editor
                        onChange={updateHtmlContent}
                        onMount={(editor) => handleEditorDidMount(editor, 'JS')}
                        theme='vs-dark' defaultLanguage="javascript" defaultValue={formData?.submission_code?.js} />)
                },
                {
                    title: 'Preview',
                    content: (
                        <HtmlIframe className="min-h-screen min-w-full" height="100%" width="100%" src={formData?.submission_code!.preview!} />
                    )
                },
            ]}></Tab>
        </div>
    )
}