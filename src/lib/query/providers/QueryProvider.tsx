import {useRef} from "react";
import {QueryProviderProps} from "../types";
import {CacheContext, QueryContext} from "../context";
import {QueryCacheManager} from "../cache";

export const QueryProvider = ({children, config}: QueryProviderProps) => {
    const cacheManagerRef = useRef(new QueryCacheManager());

    const cacheContextValue = {
        cache: cacheManagerRef.current.getCache(),
        updateCache: (key: string, data: any) => cacheManagerRef.current.updateCache(key, data),
        addSubscriber: (key: string) => cacheManagerRef.current.addSubscriber(key),
        removeSubscriber: (key: string) => cacheManagerRef.current.removeSubscriber(key),
        optimisticUpdate: (key: string, updateFn: (current: any) => any, optimisticId?: string) =>
            cacheManagerRef.current.optimisticUpdate(key, updateFn, optimisticId),
        cancelOptimisticUpdate: (key: string, optimisticId?: string) =>
            cacheManagerRef.current.cancelOptimisticUpdate(key, optimisticId),
    };

    return (
        <QueryContext.Provider value={config || {}}>
            <CacheContext.Provider value={cacheContextValue}>
                {children}
            </CacheContext.Provider>
        </QueryContext.Provider>
    );
};