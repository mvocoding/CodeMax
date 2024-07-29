import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    text?: string;
    children: ReactNode;
    isLoading: boolean;
}

export const LazyLoading: React.FC<Props> = ({
    className, isLoading = true, children, text = "Loading..."
}) => {
    const [showChildren, setShowChildren] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if(!isLoading){
            timeout = setTimeout(() => {
                setShowChildren(true);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    return (
        <>
            {!showChildren ? (
                <div className={twMerge(`relative flex items-center justify-center
                min-w-full
                min-h-[200px]
                before:absolute before:size-[30px] before:rounded-full
                before:border-[5px] before:border-t-transparent before:animate-spin 
                `,
                    className
                )}>
                    <p className="relative top-10">{text}</p>
                </div>
            ) : (
                <>{children}</>
            )}
        </>
    )
}