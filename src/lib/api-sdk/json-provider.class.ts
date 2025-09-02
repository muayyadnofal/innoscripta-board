import {PersistenceService} from '../storage/persistence.service';

export type JsonConfigArray<T> = {
    source?: T[];
    filePath?: string;
    storageKey?: string;
    persistToStorage?: boolean;
};

export class JsonArrayProvider<T> {
    readonly useFile: boolean = false;
    readonly persistence: PersistenceService<T>;
    private fileData: T[] = [];
    private storageInitialized = false;

    constructor(private config?: JsonConfigArray<T>) {
        const storageKey = config?.storageKey || config?.filePath?.replace(/\//g, '_') || 'json_data';

        this.persistence = new PersistenceService<T>({
            storageKey,
            initialData: config?.source,
            fallbackToStorage: config?.persistToStorage !== false
        });

        this.useFile = !!config?.filePath;
    }

    async getAll(filterFn?: (item: T) => boolean): Promise<T[]> {
        await this.ensureInit();
        const data = this.useFile ? this.fileData : await this.persistence.getAll();
        return filterFn ? data.filter(filterFn) : [...data];
    }

    async add(item: T): Promise<T> {
        if (this.useFile) {
            await this.ensureInit();
            this.fileData.push(item);
            await this.persistence.add(item);
            return item;
        }

        return this.persistence.add(item);
    }

    async update(filterFn: (item: T) => boolean, updateFn: (item: T) => T): Promise<T | null> {
        if (this.useFile) {
            await this.ensureInit();
            const index = this.fileData.findIndex(filterFn);
            if (index === -1) return null;

            this.fileData[index] = updateFn(this.fileData[index]);
            await this.persistence.update(filterFn, updateFn);
            return this.fileData[index];
        }

        return this.persistence.update(filterFn, updateFn);
    }

    async delete(filterFn: (item: T) => boolean): Promise<boolean> {
        if (this.useFile) {
            await this.ensureInit();
            const initialLength = this.fileData.length;
            this.fileData = this.fileData.filter(i => !filterFn(i));
            const changed = this.fileData.length < initialLength;

            if (changed) await this.persistence.delete(filterFn);

            return changed;
        }

        return this.persistence.delete(filterFn);
    }

    private async init() {
        if (this.useFile && this.config?.filePath && !this.storageInitialized) {
            try {
                const hasExistingData = await this.persistenceHasData();

                if (!hasExistingData) {
                    const response = await fetch(this.config.filePath);
                    this.fileData = await response.json();

                    await this.persistence.clearStorage();
                    for (const item of this.fileData) await this.persistence.add(item);
                } else {
                    this.fileData = await this.persistence.getAll();
                }

                this.storageInitialized = true;
            } catch (error) {
                console.error('Failed to initialize from file:', error);
                this.fileData = await this.persistence.getAll();
                this.storageInitialized = true;
            }
        }
    }

    private async ensureInit() {
        if (this.useFile && !this.storageInitialized) {
            await this.init();
        }
    }

    private async persistenceHasData(): Promise<boolean> {
        try {
            const data = await this.persistence.getAll();
            return data.length > 0;
        } catch (error) {
            return false;
        }
    }
}