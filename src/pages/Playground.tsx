import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";

interface Props {
    className?: string;
}
export const Playground: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className="h-screen flex *:flex-1">
                <Tab tabsList={[
                    {
                        title: 'HTML',
                        content: (<Editor theme='vs-dark' defaultLanguage="html" defaultValue={`<h2>HTML</h2>`} />)
                    },
                    {
                        title: 'CSS',
                        content: (<Editor theme='vs-dark' defaultLanguage="css" defaultValue={`<h2>CSS</h2>`} />)
                    },
                    {
                        title: 'JS',
                        content: (<Editor theme='vs-dark' defaultLanguage="javascript" defaultValue={`<h2>JS</h2>`} />)
                    }
                ]}></Tab>
                <Editor theme='vs-dark' defaultLanguage="html" defaultValue={`<h2>Preview</h2>`} />
            </div>
        </>
    )
}