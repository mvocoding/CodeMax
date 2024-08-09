import { useSupabase } from "../context/SupabaseContext";
import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { LazyLoading } from "../components/LazyLoading";
import { FrontEndSubmission } from "../components/FrontEndSubmission";
import { AlgorithmSubmission } from "../components/AlgorithmSubmission";

interface Props {
    className?: string;
}

export const Submission: React.FC<Props> = ({ className }) => {
    const { challengeid, submissionid } = useParams();
    const { currentUser } = useApp();
    const { getSubmissionDetail } = useSupabase();
    const [submission, setSubmission] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser || !challengeid) return;
            const id = parseInt(submissionid!);
            const { error, data } = await getSubmissionDetail(id);

            if (error) {
                navigate('/notfound', { replace: true });
                return;
            }
            setSubmission(data);
        };

        fetchData();
    }, [currentUser, challengeid, getSubmissionDetail, navigate]);

    return (
        <LazyLoading isLoading={!submission} text="Loading Submission...">
            <AlgorithmSubmission data={submission}></AlgorithmSubmission>
        </LazyLoading>
    )
}