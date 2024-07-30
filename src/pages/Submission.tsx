import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";
import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import HtmlIframe from "../components/HtmlIframe";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { LazyLoading } from "../components/LazyLoading";

interface Props {
    className?: string;
}
export const Submission: React.FC<Props> = ({ className }) => {
    const { challengeid, submissionid } = useParams();
    const { currentUser } = useApp();
    const { getSubmissionDetail } = useSupabase();
    const navigate = useNavigate();
    const { formData, setFormData } = useSubmissionStore(state => ({
        formData: state.formData,
        setFormData: state.setFormData
    }));
    let htmlEditor = useRef(null);
    let cssEditor = useRef(null);
    let jsEditor = useRef(null);
    const [combineHTML, setCombineHTML] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser || !challengeid) return;
            const id = parseInt(submissionid!);
            const { error, data } = await getSubmissionDetail(id);

            if (error) {
                navigate('/notfound', { replace: true });
                return;
            }
            setFormData(data);
            setCombineHTML(createHTML(data.submission_code.html, data.submission_code.css, data.submission_code.js));
        };

        fetchData();
    }, [currentUser, challengeid, getSubmissionDetail, navigate, setFormData]);

    // useEffect(() => {
    //     const autoSave = setInterval(() => {
    //         if (formData) {
    //             console.log('Auto saving...');
    //         }
    //     }, 60000);
    //     return () => clearInterval(autoSave);
    // }, [formData, setFormData]);

    const createHTML = (html: string, css: string, js: string) => {
        const combinedHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;
        return combinedHtml;
    }
    const updateHtmlContent = () => {
        const html = htmlEditor.current?.getValue();
        const css = cssEditor.current?.getValue();
        const js = jsEditor.current?.getValue();

        setFormData({
            ...formData,
            challenge_code: {
                html: htmlEditor.current?.getValue(),
                css: cssEditor.current?.getValue(),
                js: jsEditor.current?.getValue()
            }
        });

        const combinedHtml = createHTML(html, css, js);
        setCombineHTML(combinedHtml);
    };

    const handleEditorDidMount = (editor, type) => {
        if (type == 'HTML') htmlEditor.current = editor;
        if (type == 'CSS') cssEditor.current = editor;
        if (type == 'JS') jsEditor.current = editor;
    }

    return (
        <LazyLoading isLoading={!formData || !combineHTML} text="Loading Submission...">
            <div className="h-screen flex fade-in-up *:flex-1">
                <Tab tabsList={[
                    {
                        title: 'Challenge',
                        content: (<HtmlIframe htmlContent={`<img src='https://icodethis.com/images/projects/social_profile_2.jpeg'/>`} />)
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
                            <HtmlIframe htmlContent={combineHTML!} />
                        )
                    },
                ]}></Tab>
            </div>
        </LazyLoading>
    )
}