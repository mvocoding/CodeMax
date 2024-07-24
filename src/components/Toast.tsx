import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props{
    id: number;
    className?: string;
    type?: 'error' | 'success' | 'inprogress';
    message?: string;
    onClose?: (id: number) => void;
    duration?: number;
}

export const Toast: React.FC<Props> = ({ id, className, type = 'error', message, onClose, duration = 5000 }) => {


    const getStyles = (type: Props['type']) => {
        switch(type){
            case 'success':
                return {
                    duration,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-600',
                    icon: '✓',
                    message: message || 'Action completed successfully.',
                };
            case 'error':
                return {
                    duration,
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-600',
                    icon: '✗',
                    message: message || 'An error occurred.',
                };
            default:
                return {
                    duration: 100000,
                    bgColor: 'bg-white',
                    textColor: 'text-gray-600',
                    icon: <span className="block rounded-full size-[20px] border-[3px] border-gray-400 border-t-transparent animate-spin"></span>,
                    message: message || 'Action in progress...',
                };
        }
    }

    const styles = getStyles(type);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(onClose) onClose(id);
            clearInterval(timer);
        }, styles.duration);
    }, [styles.duration, onClose])


    return (
        <div className={twMerge(`${styles.textColor} ${styles.bgColor} border-current border rounded-tl-xl rounded-bl-xl shadow-lg p-4 min-w-[300px]`,
        className)}>
            <div className="flex items-center gap-2 ">
                <p>{styles.icon}</p>
                <p>{styles.message}</p>
                {onClose && (
                    <button onClick={() => onClose(id)} className="ml-auto text-xl">&times;</button>
                )}
            </div>
        </div>
    )
}