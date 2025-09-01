import {MutationResult, QueryConfig} from "./types";
import {useQueryConfig} from "./QueryProvider";
import {useState} from "react";

export function useMutation<TData, TVariables = void>(fn: (vars: TVariables) => Promise<TData>, config?: QueryConfig): MutationResult<TData, TVariables> {
    const {delay = 0} = useQueryConfig(config);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);


    const mutate = async (vars: TVariables) => {
        setIsLoading(true);
        setError(null);
        try {
            if (delay) await new Promise((res) => setTimeout(res, delay));
            return await fn(vars);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };


    return {mutate, isLoading, error};
}