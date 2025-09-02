import {LocalStorageService, StorageService} from './storage.service';

export interface PersistConfig<T> {
    storageKey: string;
    initialData?: T[];
    fallbackToStorage?: boolean;
}

export class PersistenceService<T> {
    private storage: StorageService;
    private data: T[] = [];
    private initialized = false;

    constructor(private config: PersistConfig<T>, storageService?: StorageService) {
        this.storage = storageService || new LocalStorageService();
    }

    async initialize(): Promise<void> {
        if (this.initialized) return;

        const keyExists = await this.storageKeyExists();

        if (keyExists) {
            const storedData = await this.storage.getItem<T[]>(this.config.storageKey);
            if (storedData && storedData.length > 0) {
                this.data = storedData;
                this.initialized = true;
                return;
            }
        }

        this.data = this.config.initialData || [];
        this.initialized = true;

        if (this.config.fallbackToStorage !== false && this.data.length > 0) {
            await this.persist();
        }
    }

    async ensureInitialized(): Promise<void> {
        if (!this.initialized) await this.initialize();
    }

    async getAll(): Promise<T[]> {
        await this.ensureInitialized();
        return [...this.data];
    }

    async add(item: T): Promise<T> {
        await this.ensureInitialized();
        this.data.push(item);
        await this.persist();
        return item;
    }

    async update(
        filterFn: (item: T) => boolean,
        updateFn: (item: T) => T
    ): Promise<T | null> {
        await this.ensureInitialized();
        const index = this.data.findIndex(filterFn);
        if (index === -1) return null;

        this.data[index] = updateFn(this.data[index]);
        await this.persist();
        return this.data[index];
    }

    async delete(filterFn: (item: T) => boolean): Promise<boolean> {
        await this.ensureInitialized();
        const initialLength = this.data.length;
        this.data = this.data.filter(item => !filterFn(item));
        const changed = this.data.length < initialLength;

        if (changed) {
            await this.persist();
        }

        return changed;
    }

    async persist(): Promise<void> {
        if (this.config.fallbackToStorage !== false) {
            await this.storage.setItem(this.config.storageKey, this.data);
        }
    }

    async clearStorage(): Promise<void> {
        await this.storage.removeItem(this.config.storageKey);
        this.data = this.config.initialData || [];
        this.initialized = true;
    }

    private async storageKeyExists(): Promise<boolean> {
        try {
            const item = await this.storage.getItem(this.config.storageKey);
            return item !== null && item !== undefined;
        } catch (error) {
            return false;
        }
    }
}