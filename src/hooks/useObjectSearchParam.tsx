import {useSearchParams} from "react-router-dom";

type RawParams = Record<string, string | string[] | undefined>;

export function useObjectSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const setParams = (paramsObj: RawParams) => {
        const newParams = new URLSearchParams();
        Object.entries(paramsObj).forEach(([key, value]) => {
            if (value === undefined) return;
            if (Array.isArray(value)) {
                value.forEach((v) => newParams.append(key, String(v)));
            } else {
                newParams.set(key, String(value));
            }
        });
        setSearchParams(newParams);
    };

    const getParams = (): RawParams => {
        const paramsObj: RawParams = {};
        for (const key of Array.from(searchParams.keys())) {
            const all = searchParams.getAll(key);
            paramsObj[key] = all.length > 1 ? all : all[0];
        }
        return paramsObj;
    };

    const getAll = (key: string): string[] => searchParams.getAll(key);

    const setArrayParam = (key: string, values: string[]) => {
        const next = new URLSearchParams(searchParams);
        next.delete(key);
        values.forEach((v) => next.append(key, v));
        setSearchParams(next);
    };

    const toggleArrayParamValue = (key: string, value: string) => {
        const current = searchParams.getAll(key);
        const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete(key);
        next.forEach((v) => nextParams.append(key, v));
        setSearchParams(nextParams);
    };

    const removeParam = (key: string) => {
        const next = new URLSearchParams(searchParams);
        next.delete(key);
        setSearchParams(next);
    };

    return {setParams, getParams, getAll, setArrayParam, toggleArrayParamValue, removeParam};
}
