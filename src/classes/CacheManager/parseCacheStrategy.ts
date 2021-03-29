export interface CacheStrategyData {
    cacheFor?: number | null;
    garbageCollectionInterval?: number | null;
    cacheAll?: boolean;
}

export interface ParsedCacheStrategy {
    cacheFor?: number;
    garbageCollectionInterval?: number;
    cacheAll?: boolean;
}

export default function parseCacheStrategy(cacheStrategyData?: CacheStrategyData): ParsedCacheStrategy {

    // Return
    return {
        cacheFor: cacheStrategyData ?

            // If theres a cache strategy, map `null` to `undefined` (never expire from cache)
            (cacheStrategyData.cacheFor === null ? undefined : cacheStrategyData.cacheFor) :

            // Otherwise, use the default
            60000,
        garbageCollectionInterval: cacheStrategyData ?

            // If theres a cache strategy, map `null` to `undefined` (never garbage collect objects)
            (cacheStrategyData.garbageCollectionInterval === null ? undefined : cacheStrategyData.garbageCollectionInterval) :

            // Otherwise, use the default
            60000,
        cacheAll: cacheStrategyData?.cacheAll
    };
}