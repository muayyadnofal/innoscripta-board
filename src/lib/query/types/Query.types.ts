import {ReactNode} from "react";

export interface QueryConfig {
    delay?: number;
    refetchInterval?: number;
    enabled?: boolean;
}

export interface QueryResult<T> {
    data: T | null;
    error: unknown;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => Promise<void>;
    lastUpdated?: Date;
}

export interface QueryProviderProps {
    children: ReactNode;
    config?: QueryConfig;
}