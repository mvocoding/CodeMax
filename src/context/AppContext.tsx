import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps{
}

interface Props{
    children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);
export const AppContextProvider: React.FC<Props> = ({ children }) => {
    return (
        <AppContext.Provider value={{  }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);

    if(context == undefined){
        throw new Error('');
    }

    return context;
}