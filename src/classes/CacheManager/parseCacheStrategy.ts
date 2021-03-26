import { CacheStrategy } from "../../internal";

export interface ParsedCacheStrategy {
    cacheFor?: number;
    garbageCollectionInterval?: number;
    cacheAll?: boolean;
}

export default function parseCacheStrategy(cacheStrategy?: CacheStrategy): ParsedCacheStrategy {

    // Return
    return {
        cacheFor: cacheStrategy ?

            // If theres a cache strategy, map `null` to `undefined` (never expire from cache)
            (cacheStrategy.cacheFor === null ? undefined : cacheStrategy.cacheFor) :

            // Otherwise, use the default
            60000,
        garbageCollectionInterval: cacheStrategy ?

            // If theres a cache strategy, map `null` to `undefined` (never garbage collect objects)
            (cacheStrategy.garbageCollectionInterval === null ? undefined : cacheStrategy.garbageCollectionInterval) :

            // Otherwise, use the default
            60000,
        cacheAll: cacheStrategy?.cacheAll
    };
}