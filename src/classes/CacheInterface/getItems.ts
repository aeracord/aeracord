import { Base, CacheInterface, MatchFunction } from "../../internal";

export default function getItems<CachedObject extends Base<CachedObject>, FetchObject>(cacheInterface: CacheInterface<CachedObject, FetchObject>): Map<string, CachedObject> {

    // If theres no match function, get all objects
    if (!cacheInterface._match) return cacheInterface._cacheManager.getItems();

    // If theres a get IDs function, use it to create a map of objects
    else if (cacheInterface._getIDs) {

        // Define results
        const results: Map<string, CachedObject> = new Map();

        // Loop through IDs
        cacheInterface._getIDs().forEach((id: string) => {

            // Get object
            const object: CachedObject | undefined = cacheInterface.get(id);

            // Add to results
            if (object) results.set(id, object);
        });

        // Return
        return results;
    }

    // Otherwise, use the match function to filter the cache
    else return cacheInterface._cacheManager.filter((value: CachedObject) => (cacheInterface._match as MatchFunction<CachedObject>)(value));
}