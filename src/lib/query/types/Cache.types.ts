export interface QueryCacheItem {
    data: any;
    lastUpdated: Date;
    subscribers: number;
    optimisticData?: any;
    optimisticId?: string;
}

export interface QueryCache {
    [key: string]: QueryCacheItem;
}

export interface CacheContextValue {
    cache: QueryCache;
    updateCache: (key: string, data: any) => void;
    addSubscriber: (key: string) => void;
    removeSubscriber: (key: string) => void;
}