import { CacheManager } from "../../internal";

export default function filter<CachedObject>(cacheManager: CacheManager<CachedObject>, predicate: (value: CachedObject, index: number) => any, modify?: boolean): Map<string, CachedObject> {

    // Define index and results
    let index = 0;
    const results: Map<string, CachedObject> = new Map();

    // Loop through entries
    for (let entry of cacheManager._cache.entries()) {

        // Entry doesnt match filter
        if (!predicate(entry[1], index++)) {

            // If the cache needs to be modified, remove the entry from the cache
            if (modify) cacheManager.uncache(entry[0]);

            // Continue
            continue;
        }

        // Add to results
        results.set(entry[0], entry[1]);
    }

    // Return
    return results;
}