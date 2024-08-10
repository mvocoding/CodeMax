import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SupabaseAuth, User } from "../model";
import { useSupabase } from "./SupabaseContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

interface AppContextProps {
    showLoader: (value: boolean) => void;
    setCurrentUser: (user: User) => void;
    setCurrentSession: (session: any) => void;
    currentUser: User | null;
    signout: () => any;
}
interface Props {
    children: ReactNode;
}
interface LayerOverlayProps {
    isVisible: boolean;
}

const LoaderOverlay: React.FC<LayerOverlayProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[1000] bg-opacity-100   bg-gray-800 flex justify-center items-center">
            <div className="absolute animate-spin rounded-full size-[15rem] border-t-8 border-b-8 border-[#0055D2] border-opacity-50"></div>
            <img
                className="size-40 "
                src="/images/thinking.svg" alt="Avatar Thinking" />
        </div>
    )
}

const AppContext = createContext<AppContextProps | undefined>(undefined);
export const AppProvider: React.FC<Props> = ({ children }) => {
    const { supabase } = useSupabase();
    const [loaderVisible, setLoaderVisible] = useState<boolean>(false);
    const [currentUser, setCurrentUserState] = useState<User | null>(null);
    const {showToast} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const savedUser = localStorage.getItem('supabase.auth.user');
            const savedSession = localStorage.getItem('supabase.auth.session');
            if (savedUser && savedSession) {
                setCurrentUserState(JSON.parse(savedUser));
                const { error } = await supabase.auth.setSession(JSON.parse(savedSession) as SupabaseAuth);
                if(error){
                    setCurrentUser(null);
                    setCurrentSession(null);
                    showToast("error", 'Your session has expired. Please log in again!');
                    navigate('/signin', { replace: true });
                }
            }
            else {
                setCurrentUserState({
                    id: '',
                    profile: {
                        username: ''
                    }
                });
            }
        }
        fetchCurrentUser();
    }, []);

    const showLoader = (value: boolean) => {
        setLoaderVisible(value);
    }
    const setCurrentUser = (user: User | null) => {
        setCurrentUserState(user);
        if (user)
            localStorage.setItem('supabase.auth.user', JSON.stringify(user));
        else
            localStorage.removeItem('supabase.auth.user');
    }

    const signout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setCurrentUser({
                id: '',
                profile: {
                    username: ''
                }
            });
        }
        return { error };
    }
    const setCurrentSession = (session: any) => {
        if (session)
            localStorage.setItem('supabase.auth.session', JSON.stringify(session));
        else
            localStorage.removeItem('supabase.auth.session');
    }

    return (
        <AppContext.Provider value={{ showLoader, currentUser, setCurrentUser, setCurrentSession, signout }}>
            <LoaderOverlay isVisible={loaderVisible}></LoaderOverlay>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = (): AppContextProps => {
    const context = useContext(AppContext);

    if (context == undefined) {
        throw new Error('');
    }

    return context;
}