import {ReactNode} from "react";

export interface QueryConfig {
    delay?: number;
    refetchInterval?: number;
}


export interface QueryResult<T> {
    data: T | null;
    error: unknown;
    isLoading: boolean;
    refetch: () => void;
}


export interface MutationResult<TData, TVariables> {
    mutate: (vars: TVariables) => Promise<TData | void>;
    isLoading: boolean;
    error: unknown;
}


export interface QueryProviderProps {
    children: ReactNode;
    config?: QueryConfig;
}