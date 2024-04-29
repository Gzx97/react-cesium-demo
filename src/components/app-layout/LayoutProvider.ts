import { DataNode } from '@/constants/types';
import { createContext, useContext } from 'react';

interface LayoutContextValue {
    selectedKey?: string;
    treeData?: DataNode[];
    [key: string]: any;
}

const LayoutContext = createContext<LayoutContextValue>(
    {} as LayoutContextValue
);

export const LayoutContextProvider = LayoutContext.Provider;
export const useLayoutContext = (): LayoutContextValue =>
    useContext(LayoutContext);
