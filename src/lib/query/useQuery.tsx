import {QueryConfig, QueryResult} from "./types";
import {useQueryConfig} from "./QueryProvider";
import {useEffect, useState} from "react";

export function useQuery<T>(key: string, fn: () => Promise<T>, config?: QueryConfig): QueryResult<T> {
    const {delay = 0, refetchInterval} = useQueryConfig(config);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (delay) await new Promise((res) => setTimeout(res, delay));
            const result = await fn();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
        if (refetchInterval) {
            const id = setInterval(fetchData, refetchInterval);
            return () => clearInterval(id);
        }
    }, [key, refetchInterval]);


    return {data, error, isLoading, refetch: fetchData};
}