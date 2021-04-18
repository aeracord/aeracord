import { Base, CacheInterface, MatchFunction } from "../../internal";

export default function clear<CachedObject extends Base<CachedObject>, FetchObject>(cacheInterface: CacheInterface<CachedObject, FetchObject>) {

    // If theres no match function, clear all objects
    if (!cacheInterface._match) cacheInterface._cacheManager.clear();

    // If theres a get IDs function, use it to clear objects
    else if (cacheInterface._getIDs) {

        // Loop through IDs and uncache objects
        cacheInterface._getIDs().forEach((id: string) => cacheInterface._cacheManager.uncache(id));
    }

    // Otherwise, use the match function to filter the cache
    else cacheInterface._cacheManager.filter((value: CachedObject) => !(cacheInterface._match as MatchFunction<CachedObject>)(value), true);
}