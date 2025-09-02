import {createContext, useContext} from "react";
import {CacheContextValue} from "../types";

export const CacheContext = createContext<CacheContextValue>({
    cache: {},
    updateCache: () => {
    },
    addSubscriber: () => {
    },
    removeSubscriber: () => {
    },
});

export const useCache = () => useContext(CacheContext);