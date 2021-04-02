export interface CacheStrategyData {
    cacheFor?: number | null;
    cacheDeletedFor?: number | null;
    garbageCollectionInterval?: number | null;
    cacheAll?: boolean;
}

export interface ParsedCacheStrategy {
    cacheFor?: number;
    cacheDeletedFor?: number;
    garbageCollectionInterval?: number;
    cacheAll?: boolean;
}

export default function parseCacheStrategy(cacheStrategyData: CacheStrategyData = {}): ParsedCacheStrategy {

    // Define parsed cache strategy
    const parsedCacheStrategy: ParsedCacheStrategy = {
        cacheAll: cacheStrategyData.cacheAll
    };

    // Parse cache for
    if (cacheStrategyData.cacheFor === undefined) parsedCacheStrategy.cacheFor = 60000;
    else if (cacheStrategyData.cacheFor === null) delete parsedCacheStrategy.cacheFor;
    else parsedCacheStrategy.cacheFor = cacheStrategyData.cacheFor;

    // Parse cache deleted for
    if (cacheStrategyData.cacheDeletedFor === undefined) parsedCacheStrategy.cacheDeletedFor = 60000;
    else if (cacheStrategyData.cacheDeletedFor === null) delete parsedCacheStrategy.cacheDeletedFor;
    else parsedCacheStrategy.cacheDeletedFor = cacheStrategyData.cacheDeletedFor;

    // Parse garbage collection interval
    if (cacheStrategyData.garbageCollectionInterval === undefined) parsedCacheStrategy.garbageCollectionInterval = 60000;
    else if (cacheStrategyData.garbageCollectionInterval === null) delete parsedCacheStrategy.garbageCollectionInterval;
    else parsedCacheStrategy.garbageCollectionInterval = cacheStrategyData.garbageCollectionInterval;

    // Return
    return parsedCacheStrategy;
}