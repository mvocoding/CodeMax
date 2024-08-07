import { useState } from "react"
import { twJoin, twMerge } from "tailwind-merge";
import { TabItem } from "../model";


interface TabButtonProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}
const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onClick }) => (
    <button type="button" className={twMerge('bg-gray-500/20  [&.active]:bg-purple-700 !p-2 ',
        isActive && 'active'
    )} onClick={onClick}>{title}
    </button>
)

interface TabContentProps {
    className?: string;
    content: React.ReactNode;
    isActive: boolean;
}

const TabContent: React.FC<TabContentProps> = ({ className, content, isActive }) => {
    return (
        <div 
            className={twMerge(' relative w-full transition-all duration-200 leading-6 text-sm h-full',
                isActive ? ' left-0 visible' : ' left-[10000px] invisible ',
                className
            )}>{content}</div>
    )
}

interface Props {
    tabsList: TabItem[];
    className?: string;
    orientation?: 'vertical' | 'horizontal';
    scroll?: 'scroll' | 'no';
}
export const Tab: React.FC<Props> = ({ tabsList, className, orientation = 'horizontal', scroll = 'scroll'}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={twMerge(`h-full grid ${orientation == 'horizontal' ? ' grid-rows-[auto_1fr] ' : ' grid-cols-[150px_1fr]'} `,
            className
        )}>
            <div className={`grid ${ orientation == 'horizontal' ? ' [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] [grid-auto-rows:1fr] '
                : ' max-h-[100px]'
             }  
                     *:border-b-0 *:
                `}>
                {tabsList.map((tab, index) => (
                    <TabButton key={index} title={tab.title} isActive={index == activeTab} onClick={() => setActiveTab(index)}></TabButton>
                ))}
            </div>
            <div className={twJoin(`bg-black/40 ring-8 ring-black/5 border  border-zinc-700/30 
            relative grid [grid-template-areas:'stack']`,
                scroll === 'scroll' && 'overflow-scroll'
            )}>
                {tabsList.map((tab, index) => (
                    <TabContent 
                    className="[grid-area:stack]"
                    key={index} content={tab.content} isActive={index == activeTab}></TabContent>
                ))}
            </div>
        </div>
    )
}

export default Tab;