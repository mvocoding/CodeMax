import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props{
    className?: string;
    type?: 'error' | 'success' | 'inprogress';
    message?: string;
    onClose?: () => void;
    duration?: number;
}

export const Toast: React.FC<Props> = ({ className, type = 'error', message, onClose, duration = 1000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if(onClose) onClose();
            clearInterval(timer);
        }, duration);
    }, [duration, onClose])

    const getStyles = (type: Props['type']) => {
        switch(type){
            case 'success':
                case 'success':
                    return {
                        bgColor: 'bg-green-100',
                        textColor: 'text-green-600',
                        icon: '✓',
                        message: message || 'Action completed successfully.',
                    };
                case 'error':
                    return {
                        bgColor: 'bg-red-100',
                        textColor: 'text-red-600',
                        icon: '✗',
                        message: message || 'An error occurred.',
                    };
                case 'inprogress':
                default:
                    return {
                        bgColor: 'bg-blue-100',
                        textColor: 'text-blue-600',
                        icon: <span className="block rounded-full w-4 h-4 border-4 border-t-transparent animate-spin"></span>,
                        message: message || 'Action in progress...',
                    };
        }
    }

    const styles = getStyles(type);

    return (
        <div className={twMerge(`${styles.textColor} ${styles.bgColor} border-current border rounded-tl-xl rounded-bl-xl shadow-lg  z-[1000] text-sm fixed right-0 top-0
        space-y-2 p-4 min-w-[300px]`,
        className)}>
            <div className="flex items-center gap-2 ">
                <p>{styles.icon}</p>
                <p>{styles.message}</p>
                {onClose && (
                    <button onClick={onClose} className="ml-auto text-xl">&times;</button>
                )}
            </div>
        </div>
    )
}