import {createContext, useContext} from "react";
import {QueryConfig, QueryProviderProps} from "./types";

const QueryContext = createContext<QueryConfig>({});

export const QueryProvider = ({children, config}: QueryProviderProps) => {
    return (
        <QueryContext.Provider value={config || {}}>
            {children}
        </QueryContext.Provider>
    );
};


export const useQueryConfig = (local?: QueryConfig): QueryConfig => {
    const global = useContext(QueryContext);
    return {...global, ...local};
};