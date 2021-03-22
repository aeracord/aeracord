import { Base, CacheManagerInterface, MatchFunction } from "../../internal";

export default function getItems<CachedObject extends Base<CachedObject>, FetchObject>(cacheManagerInterface: CacheManagerInterface<CachedObject, FetchObject>): Map<string, CachedObject> {

    // If theres no match function, get all objects
    if (!cacheManagerInterface._match) return cacheManagerInterface._cacheManager.getItems();

    // If theres a get IDs function, use it to create a map of objects
    else if (cacheManagerInterface._getIDs) {

        // Define results
        const results: Map<string, CachedObject> = new Map();

        // Loop through IDs
        cacheManagerInterface._getIDs().forEach((id: string) => {

            // Get object
            const object: CachedObject | undefined = cacheManagerInterface.get(id);

            // Add to results
            if (object) results.set(id, object);
        });

        // Return
        return results;
    }

    // Otherwise, use the match function to filter the cache
    else return cacheManagerInterface._cacheManager.filter((value: CachedObject) => (cacheManagerInterface._match as MatchFunction<CachedObject>)(value));
}