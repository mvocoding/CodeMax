import { Editor } from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";
import Tab from "../components/Tab";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import HtmlIframe from "./HtmlIframe";

interface Props {
    className?: string;
    data: any;
}
export const AlgorithmSubmission: React.FC<Props> = ({ className, data }) => {
    if (!data) return;

    const { formData, setFormData, setUserCode} = useSubmissionStore(state => ({
        formData: state.formData,
        setFormData: state.setFormData,
        setUserCode: state.setUserCode,
    }));
    const ide = useRef(null);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const updateCode = () => {
        const code = ide.current!.getValue();
        setUserCode(code);
    };

    const editor = useMemo(() => (
        <Editor
            onChange={updateCode}
            onMount={(editor) => { ide.current = editor }}
            defaultValue={data.submission_code[data.submission_code.currentLanguage]} className=""
            theme='vs-dark' defaultLanguage={data.submission_code.currentLanguage}
            options={{
                minimap: { enabled: false },
                overviewRulerLanes: 0,
                scrollbar: {
                    horizontal: "hidden",
                    handleMouseWheel: false,
                },
                wordWrap: 'on',
            }}
        />
    ), []);

    return (
        <div className={twMerge(`h-screen flex fade-in-up *:flex-1 `)}>
            <Tab scroll="no" tabsList={[
                {
                    title: 'Problem',
                    content: (
                        <div className="w-[80%] h-[80%] flex mx-auto">
                            <img className="w-full h-full object-contain object-center " src={data.challenge_thumbnail} alt="Coding Challenge" />
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
                                <div className="text-lg p-3 flex justify-center gap-x-10">
                                    <div className="space-x-3 flex items-center">
                                        <label htmlFor="">Language:</label>
                                        <select name="" id="">
                                            <option value="javascript">Javascript</option>
                                            <option value="python">Python</option>
                                        </select>
                                    </div>
                                    <div className="space-x-3 flex items-center">
                                        <label htmlFor="">Font Size:</label>
                                        <select name="" id="">
                                            <option value="python">15</option>
                                            <option value="python">16</option>
                                            <option value="python">17</option>
                                            <option value="python">18</option>
                                            <option value="python">19</option>
                                            <option value="python">20</option>
                                        </select>
                                    </div>
                                </div>
                                {editor}
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Preview',
                    content: (
                        <HtmlIframe className="min-h-screen min-w-full" height="100%" width="100%" src={formData?.submission_code.preview!} />
                    )
                }
            ]}></Tab>
        </div>
    )
}