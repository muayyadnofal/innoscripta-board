import {useEffect, useRef, useState} from "react";
import {QueryConfig, QueryResult} from "../types";
import {useCache, useQueryConfig} from "../context";

export function useQuery<T>(key: string, fn: () => Promise<T>, config?: QueryConfig): QueryResult<T> {
    const {delay = 0, refetchInterval, enabled = true} = useQueryConfig(config);
    const {cache, updateCache, addSubscriber, removeSubscriber} = useCache();

    const [data, setData] = useState<T | null>(cache[key]?.data || null);
    const [error, setError] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<Date | undefined>(cache[key]?.lastUpdated);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isMountedRef = useRef(true);

    const fetchData = async (isBackgroundRefetch = false) => {
        if (!enabled) return;

        if (!isBackgroundRefetch) setIsLoading(true);
        setIsFetching(true);
        setError(null);

        try {
            if (delay) await new Promise((res) => setTimeout(res, delay));
            const result = await fn();

            if (isMountedRef.current) {
                setData(result);
                updateCache(key, result);
                setLastUpdated(new Date());

                if (!isBackgroundRefetch) setIsLoading(false);
                setIsFetching(false);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(err);
                setIsLoading(false);
                setIsFetching(false);
            }
        }
    };

    useEffect(() => {
        isMountedRef.current = true;
        addSubscriber(key);

        const currentCache = cache[key];
        if (currentCache) {
            const displayData = currentCache.optimisticData || currentCache.data;
            setData(displayData);
            setLastUpdated(currentCache.lastUpdated);
        }

        if (enabled && !currentCache?.optimisticData) {
            fetchData().then();
        }

        if (refetchInterval && enabled) {
            intervalRef.current = setInterval(() => {
                fetchData(true).then();
            }, refetchInterval);
        }

        return () => {
            isMountedRef.current = false;
            removeSubscriber(key);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [key, refetchInterval, enabled]);

    return {
        data: cache[key]?.data || data,
        error,
        isLoading,
        isFetching,
        refetch: () => fetchData(false),
        lastUpdated,
    };
}