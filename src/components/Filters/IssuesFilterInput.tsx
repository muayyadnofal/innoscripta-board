import {ChangeEvent, useEffect, useState} from "react";
import {useObjectSearchParams} from "../../hooks/useObjectSearchParam";
import {Input} from "../ui/Input/Input";

export function IssuesFilterInput() {
    const {getParams, setParams, removeParam} = useObjectSearchParams();
    const [value, setValue] = useState("");

    useEffect(() => {
        const {search} = getParams();
        setValue(search ? String(search) : "");
    }, [getParams]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (newValue) setParams({...getParams(), search: newValue});
        else removeParam("search");
    };

    return (
        <Input width={300} name="search" value={value} onChange={handleChange} size="md"
               placeholder={"search by title, tag"}
               allowClear/>
    );
}
