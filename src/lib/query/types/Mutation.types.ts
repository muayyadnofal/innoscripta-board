export interface MutationResult<TData, TVariables> {
    mutate: (vars: TVariables) => Promise<TData | void>;
    isLoading: boolean;
    error: unknown;
}