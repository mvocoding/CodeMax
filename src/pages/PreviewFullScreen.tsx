import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HtmlIframe from "../components/HtmlIframe";
import { LazyLoading } from "../components/LazyLoading";

interface Props {
    className?: string;
}
export const PreviewFullScreen: React.FC<Props> = ({ className }) => {
    const { submissionid } = useParams();
    const { getSubmissionbyID } = useSupabase();
    const [combineHTML, setCombineHTML] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getSubmissionbyID(submissionid!);
            setCombineHTML(createHTML(data.code.html, data.code.css, data.code.js));
        };
        
        if(submissionid)
            fetchData();
    }, [submissionid]);

    const createHTML = (html: string, css: string, js: string) => {
        const combinedHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                ${css}
                </style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;
        return combinedHtml;
    }

    return (
        <LazyLoading isLoading={!combineHTML}>
            <HtmlIframe className="min-h-screen min-w-full" htmlContent={combineHTML!} />
        </LazyLoading>
    )
}