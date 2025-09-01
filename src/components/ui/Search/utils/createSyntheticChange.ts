import {ChangeEvent} from "react";

export function createSyntheticChange(value: string): ChangeEvent<HTMLInputElement> {
    return {target: {value}} as ChangeEvent<HTMLInputElement>;
}