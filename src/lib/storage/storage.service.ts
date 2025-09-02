export interface StorageService {
    getItem<T>(key: string): Promise<T | null>;

    setItem<T>(key: string, value: T): Promise<void>;

    removeItem(key: string): Promise<void>;

    clear(): Promise<void>;
}

export class LocalStorageService implements StorageService {
    async getItem<T>(key: string): Promise<T | null> {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            return null;
        }
    }

    async setItem<T>(key: string, value: T): Promise<void> {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            throw error;
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            throw error;
        }
    }

    async clear(): Promise<void> {
        try {
            localStorage.clear();
        } catch (error) {
            throw error;
        }
    }
}