import { createContext, useContext } from 'react';

interface LargeScreenContextValue {
    [key: string]: any;
}

const LargeScreenContext = createContext<LargeScreenContextValue>(
    {} as LargeScreenContextValue
);

export const LargeScreenContextProvider = LargeScreenContext.Provider;
export const useLargeScreenContext = (): LargeScreenContextValue =>
    useContext(LargeScreenContext);
