import {QueryCache} from "../types";

export class QueryCacheManager {
    private cache: QueryCache = {};

    getCache(): QueryCache {
        return this.cache;
    }

    updateCache(key: string, data: any): void {
        this.cache[key] = {
            ...this.cache[key],
            data,
            lastUpdated: new Date(),
            optimisticData: undefined,
            optimisticId: undefined,
        };
    }

    optimisticUpdate(key: string, updateFn: (current: any) => any, optimisticId?: string): void {
        const currentItem = this.cache[key];
        if (!currentItem) return;

        const currentData = currentItem.optimisticData || currentItem.data;
        const newData = updateFn(currentData);

        this.cache[key] = {
            ...currentItem,
            optimisticData: newData,
            optimisticId: optimisticId || Date.now().toString(),
        };
    }

    cancelOptimisticUpdate(key: string, optimisticId?: string): void {
        const currentItem = this.cache[key];
        if (!currentItem || !currentItem.optimisticData) return;

        if (optimisticId && currentItem.optimisticId !== optimisticId) return;

        this.cache[key] = {
            ...currentItem,
            optimisticData: undefined,
            optimisticId: undefined,
        };
    }

    addSubscriber(key: string): void {
        if (!this.cache[key]) {
            this.cache[key] = {data: null, lastUpdated: new Date(), subscribers: 0};
        }
        this.cache[key].subscribers++;
    }

    removeSubscriber(key: string): void {
        if (this.cache[key]) {
            this.cache[key].subscribers--;
            if (this.cache[key].subscribers === 0) delete this.cache[key];
        }
    }
}