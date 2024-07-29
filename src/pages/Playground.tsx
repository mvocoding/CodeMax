import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";
import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

interface Props {
    className?: string;
}
export const Playground: React.FC<Props> = ({ className }) => {
    const { id } = useParams();
    const { getPost, submitPost } = useSupabase();
    const { currentUser } = useApp();
    const [challenge, setChallenge] = useState<any | null>(null);
    useEffect(() => {
        const getChallenge = async() => {
            const test = await getPost(currentUser!.id, id!);
            setChallenge(test.data);
        }
        if(currentUser && id)
            getChallenge();
    }, [currentUser, id]);

    let htmlEditor = useRef(null);
    let cssEditor = useRef(null);
    let jsEditor = useRef(null);

    const handleEditorDidMount = (editor, type) => {
        if(type == 'HTML') htmlEditor.current = editor;
        if(type == 'CSS') cssEditor.current = editor;
        if(type == 'JS') jsEditor.current = editor;
    }

    const onSummit = async () => {
        const {error} = await submitPost(currentUser?.id, challenge.id, {
            HTML: htmlEditor.current!.getValue(),
            CSS: '',
            JS: ''
        })
    }

    if(!challenge) return null;
    return (
        <>
            <button onClick={onSummit}>Submit</button>
            <div className="h-screen flex *:flex-1">
                <Tab tabsList={[
                    {
                        title: 'HTML',
                        content: (<Editor 
                            onMount={(editor) => handleEditorDidMount(editor, 'HTML')}
                            theme='vs-dark' defaultLanguage="html" defaultValue={challenge.code.HTML} />)
                    },
                    {
                        title: 'CSS',
                        content: (<Editor 
                            onMount={(editor) => handleEditorDidMount(editor, 'CSS')}
                            theme='vs-dark' defaultLanguage="css" defaultValue={challenge.code.CSS} />)
                    },
                    {
                        title: 'JS',
                        content: (<Editor 
                            onMount={(editor) => handleEditorDidMount(editor, 'JS')}
                            theme='vs-dark' defaultLanguage="javascript" defaultValue={challenge.code.JS} />)
                    }
                ]}></Tab>
                <Editor theme='vs-dark' defaultLanguage="html" defaultValue={`<h2>Preview</h2>`} />
            </div>
        </>
    )
}