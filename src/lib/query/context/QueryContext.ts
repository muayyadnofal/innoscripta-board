import {createContext, useContext} from "react";
import {QueryConfig} from "../types";

const QueryContext = createContext<QueryConfig>({});

export const useQueryConfig = (local?: QueryConfig): QueryConfig => {
    const global = useContext(QueryContext);
    return {...global, ...local};
};

export {QueryContext};