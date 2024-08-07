import { Editor, Monaco } from "@monaco-editor/react";
import { twMerge } from "tailwind-merge";
import Tab from "../components/Tab";

import axios from "axios";
import { useMemo, useRef, useState } from "react";
const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
};

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
    const response = await API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
                content: sourceCode,
            },
        ],
    });
    return response.data;
};

interface Props {
    className?: string;
}
export const Learn: React.FC<Props> = ({ className }) => {
    const ide = useRef(null);
    const [output, setOutput] = useState('');
    const handleTest = async () => {
        const res = await executeCode('python', ide.current.getValue());
        setOutput(res.run.output);
    }

    const editor = useMemo(() => (
        <Editor
            onMount={(editor) => { ide.current = editor }}
            defaultValue={`print(1)`} className=""
            theme='vs-dark' defaultLanguage="python"
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
        <section className={twMerge(`fade-in-up h-screen`)}>
            <div>

            </div>
            <Tab scroll="no" tabsList={[
                {
                    title: 'Problem',
                    content: (
                        <div className="w-[80%] h-[80%] flex mx-auto">
                            <img className="w-full h-full object-contain object-center " src="https://i.ibb.co/PTwz8jM/Snap-1.png" alt="Coding Challenge" />
                        </div>
                    )
                },
                {
                    title: 'Playground',
                    content: (
                        <div className="grid grid-cols-[70%_1fr] 
                        [&_select]:text-gray-900 [&_select]:w-36 [&_select]:px-2 [&_select]:py-1 [&_select]:rounded-lg
                        [&_option]:text-gray-900 
                        ">
                            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                                <div className="text-lg p-3 flex justify-center gap-x-10">
                                    <div className="space-x-3 flex items-center">
                                        <label htmlFor="">Language:</label>
                                        <select name="" id="">
                                            <option value="python">Python</option>
                                            <option value="python">Python</option>
                                            <option value="python">Python</option>
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
                            <div>
                                <p className="p-3 bg-gray-300 text-center text-gray-900">Code Preview</p>
                                <div className="p-1">
                                    {output}
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    title: 'Test Case',
                    content: (
                        <Tab scroll="no" tabsList={[
                            {
                                title: 'Test Result',
                                content: (
                                    <div className="p-5 space-y-1 text-lg">
                                        <p>Test 1 <span className="text-green-500">PASS</span></p>
                                        <p>Test 2 <span className="text-green-500">PASS</span></p>
                                        <p>Test 3 <span className="text-red-500">FAILED</span></p>
                                    </div>
                                )
                            },
                            {
                                title: 'Test Case',
                                content: (
                                    <Tab scroll="no" tabsList={[
                                        {
                                            title: 'Test 1',
                                            content: (
                                                <div className="p-5 space-y-5 [&_p]:p-1 [&_p]:rounded-md">
                                                    <div className="space-y-1">
                                                        <p className="">Params = </p>
                                                        <p className="bg-gray-300 text-gray-900 max-w-[80%]">[1,2,3]</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="">Target = </p>
                                                        <p className="bg-gray-300 text-gray-900 max-w-[80%]">5</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}></Tab>
                                )
                            }
                        ]}></Tab>
                    )
                }
            ]}></Tab>
        </section>
    )
}