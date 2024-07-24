import { twMerge } from "tailwind-merge";
import { Toast } from "../components/Toast";
import { createContext, ReactNode, useContext, useState } from "react";

interface ToastContextProps {
    showToast: (type: ToastType['type'], message: string) => void;
}
interface Props {
    children: ReactNode;
}
interface ToastType {
    id: number;
    message: string;
    type: 'error' | 'success' | 'inprogress';
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);
export const ToastProvider: React.FC<Props> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const showToast = (type: ToastType['type'], message: string) => {
        const newToast = { id: Date.now(), message, type };
        setToasts(prev => {
            if(toasts.length && toasts[length - 1].type == 'inprogress')
                return [...prev.slice(0, -1), newToast];
            return [...prev, newToast]
        });
    }
    const onClose = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            <div className={twMerge(`z-[1000] text-sm fixed right-0 top-0 space-y-2 `)}>
                {toasts.map((toast, index) => (
                    <Toast
                        onClose={onClose}
                        message={toast.message} key={index} id={toast.id} type={toast.type}></Toast>
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if(!context){
        throw Error('error');
    }
    return context;
}