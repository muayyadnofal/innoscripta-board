export type JsonConfigArray<T> = {
    source?: T[];
    filePath?: string;
};

export class JsonArrayProvider<T> {
    private source: T[] = [];
    private initialized = false;

    constructor(private config?: JsonConfigArray<T>) {
        this.source = config?.source ?? [];
    }

    async getAll(filterFn?: (item: T) => boolean): Promise<T[]> {
        await this.ensureInit();
        return filterFn ? this.source.filter(filterFn) : [...this.source];
    }

    async add(item: T): Promise<T> {
        await this.ensureInit();
        this.source.push(item);
        return item;
    }

    async update(filterFn: (item: T) => boolean, updateFn: (item: T) => T): Promise<T | null> {
        await this.ensureInit();
        const index = this.source.findIndex(filterFn);
        if (index === -1) return null;
        this.source[index] = updateFn(this.source[index]);
        return this.source[index];
    }

    async delete(filterFn: (item: T) => boolean): Promise<boolean> {
        await this.ensureInit();
        const initialLength = this.source.length;
        this.source = this.source.filter(i => !filterFn(i));
        return this.source.length < initialLength;
    }

    private async init() {
        if (this.initialized) return;

        if (this.config?.filePath) {
            try {
                const response = await fetch(this.config.filePath);
                this.source = await response.json();
            } catch (error) {
                console.error("fetch JSON failed:", error);
                this.source = [];
            }
        }

        this.initialized = true;
    }


    private async ensureInit() {
        if (!this.initialized) {
            await this.init();
        }
    }
}
