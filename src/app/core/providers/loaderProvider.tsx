import {createContext, ReactNode, useState} from 'react';

interface LoaderContextType {
    isLoading: boolean;
    toggleLoading: (value: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType>({
    isLoading: false,
    toggleLoading: () => {
    }
});

export const LoaderProvider = ({children}: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = (value: boolean) => {
        setIsLoading(value);
    };

    return (
        <LoaderContext.Provider value={{isLoading, toggleLoading}}>
            {children}
        </LoaderContext.Provider>
    );
};
