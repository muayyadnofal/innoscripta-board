import {JsonArrayProvider, JsonConfigArray} from "./json-provider.class";

export class JsonServiceArray<T> {
    protected provider: JsonArrayProvider<T>;

    constructor(config?: JsonConfigArray<T>) {
        this.provider = new JsonArrayProvider<T>(config);
    }

    async getAll<U = T>(filterFn?: (item: T) => boolean, mapFn?: (item: T) => U): Promise<U[]> {
        const results = await this.provider.getAll(filterFn);
        return mapFn ? results.map(mapFn) : (results as unknown as U[]);
    }

    async add<U = T>(item: T, mapFn?: (item: T) => U): Promise<U> {
        const result = await this.provider.add(item);
        return mapFn ? mapFn(result) : (result as unknown as U);
    }

    async update<U = T>(filterFn: (item: T) => boolean, updateFn: (item: T) => T, mapFn?: (item: T | null) => U | null): Promise<U | null> {
        const result = await this.provider.update(filterFn, updateFn);
        return mapFn ? mapFn(result) : (result as unknown as U | null);
    }

    async delete(filterFn: (item: T) => boolean): Promise<boolean> {
        return this.provider.delete(filterFn);
    }
}
