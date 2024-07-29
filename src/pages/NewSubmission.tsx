import { Editor } from "@monaco-editor/react";
import Tab from "../components/Tab";
import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

interface Props {
    className?: string;
}
export const NewSubmission: React.FC<Props> = ({ className }) => {
    const { id } = useParams();
    const { currentUser } = useApp();
    const { createOrUpdateSubmission } = useSupabase();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await createOrUpdateSubmission(currentUser?.id!, id!);
            if (!error){
                setLoading(false);
                navigate(`/challenges/${id}/submissions/${data.id}`, { replace: true });
            }
        }
        if (currentUser) {
            fetchData();
        }
    }, [currentUser, id]);

    if (loading) return null;
}